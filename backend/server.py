from fastapi import FastAPI, APIRouter, HTTPException, Body
import boto3
from fastapi import UploadFile, File
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime
import httpx
import jwt
import datetime as dt

TELEGRAM_TOKEN = "8430480476:AAHNc5T2gLrFNdazGVK6Vqy6DtDjBJvSI-M"
CHAT_IDS = [1868738810, 6773362695]
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Yandex Object Storage config
YANDEX_ACCESS_KEY = os.getenv("YANDEX_ACCESS_KEY")
YANDEX_SECRET_KEY = os.getenv("YANDEX_SECRET_KEY")
BUCKET_NAME = os.getenv("BUCKET_NAME", "vizuz")
ENDPOINT_URL = "https://storage.yandexcloud.net"

ADMIN_USERNAME = os.getenv("ADMIN_USERNAME")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")
SECRET_KEY = os.getenv("SECRET_KEY", "secret")
s3 = boto3.client(
    "s3",
    endpoint_url=ENDPOINT_URL,
    aws_access_key_id=YANDEX_ACCESS_KEY,
    aws_secret_access_key=YANDEX_SECRET_KEY
)

# MongoDB connection
client = AsyncIOMotorClient(os.environ['MONGO_URL'])
db = client[os.environ['DB_NAME']]

# Create the FastAPI app
app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Общий роутер с префиксом /api
api = APIRouter(prefix="/api")

# ─── MODELS ─────────────────────────────────────────────────────────────────────

class LoginRequest(BaseModel):
    username: str
    password: str

class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        extra = "ignore"  # игнорировать лишние поля из Mongo (_id)

class StatusCheckCreate(BaseModel):
    client_name: str

class Application(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    message: Optional[str] = None
    apartmentId: Optional[int] = None
    apartmentNumber: Optional[str] = None
    projectName: str
    source: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    status: str = "new"

    class Config:
        extra = "ignore"

class Apartment(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    # number: Optional[int] = None  
    project: str
    area: float
    floor: int
    totalFloors: int
    price: Optional[int] = None
    images: Optional[List[str]] = []
    description: Optional[str] = None 
    features: Optional[List[str]] = []
    rooms: int
    # available: bool = True

    class Config:
        extra = "ignore"

# ─── ROUTES: StatusCheck ─────────────────────────────────────────────────────────

@api.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    docs = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**d) for d in docs]

@api.post("/status", response_model=StatusCheck)
async def create_status_check(body: StatusCheckCreate):
    obj = StatusCheck(**body.dict())
    await db.status_checks.insert_one(obj.dict())
    return obj


# ─── ROUTES: Applications ────────────────────────────────────────────────────────

@api.get("/applications", response_model=List[Application])
async def get_applications():
    docs = await db.applications.find().to_list(1000)
    return [Application(**d) for d in docs]

@api.post("/applications", response_model=Application)
async def create_application(application: Application):
    await db.applications.insert_one(application.dict())
    # Отправка уведомления в Telegram
    message = f"""
📩 Новая заявка!
👤 Имя: {application.name}
📞 Телефон: {application.phone}
🏢 Проект: {application.projectName}
📝 Сообщение: {application.message or "-"}
    """.strip()
    for chat_id in CHAT_IDS:
        try:
            async with httpx.AsyncClient() as client_http:
                resp = await client_http.post(
                    f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage",
                    json={"chat_id": chat_id, "text": message}
                )
                logging.info(f"Telegram response to {chat_id}: {resp.status_code} {resp.text}")
        except Exception as e:
            logging.exception(f"Ошибка отправки в Telegram для {chat_id}")
    return application


# ─── PATCH: Update Application Status ────────────────────────────────────────────

@api.patch("/applications/{app_id}", response_model=Application)
async def update_application_status(app_id: str, status: str = Body(..., embed=True)):
    res = await db.applications.find_one({"id": app_id})
    if not res:
        raise HTTPException(404, "Application not found")

    await db.applications.update_one(
        {"id": app_id},
        {"$set": {"status": status}}
    )

    updated = await db.applications.find_one({"id": app_id})
    return Application(**updated)

@api.delete("/applications/{app_id}")
async def delete_application(app_id: str):
    res = await db.applications.delete_one({"id": app_id})
    if res.deleted_count == 0:
        raise HTTPException(404, "Application not found")
    return {"ok": True}



# ─── ROUTE: Upload Image to Yandex Object Storage ───────────────────────────────

@api.post("/upload-image")
async def upload_image(file: UploadFile = File(...)):
    try:
        key = f"apartments/{uuid.uuid4()}_{file.filename}"
        s3.upload_fileobj(file.file, BUCKET_NAME, key, ExtraArgs={"ACL": "public-read", "ContentType": file.content_type})
        url = f"{ENDPOINT_URL}/{BUCKET_NAME}/{key}"
        return {"url": url}
    except Exception as e:
        logging.exception("Ошибка загрузки в Yandex Object Storage")
        raise HTTPException(status_code=500, detail=str(e))


# ─── ROUTES: Apartments ──────────────────────────────────────────────────────────

@api.get("/apartments", response_model=List[Apartment])
async def get_apartments():
    docs = await db.apartments.find().to_list(1000)
    return [Apartment(**d) for d in docs]

@api.post("/apartments", response_model=Apartment)
async def create_apartment(apt: Apartment):
    await db.apartments.insert_one(apt.dict())
    return apt

@api.put("/apartments/{apt_id}", response_model=Apartment)
async def update_apartment(apt_id: str, apt: Apartment):
    res = await db.apartments.replace_one({"id": apt_id}, apt.dict())
    if res.modified_count == 0:
        raise HTTPException(404, "Apartment not found")
    return apt

@api.delete("/apartments/{apt_id}")
async def delete_apartment(apt_id: str):
    res = await db.apartments.delete_one({"id": apt_id})
    if res.deleted_count == 0:
        raise HTTPException(404, "Apartment not found")
    return {"ok": True}

# --- ROUTE: Admin Login ─────────────────────────────────────────────────────────────
@api.post("/login")
def login(request: LoginRequest):
    if request.username == ADMIN_USERNAME and request.password == ADMIN_PASSWORD:
        token = jwt.encode(
            {"sub": request.username, "exp": dt.datetime.utcnow() + dt.timedelta(hours=1)},
            SECRET_KEY,
            algorithm="HS256"
        )
        return {"token": token}
    raise HTTPException(status_code=401, detail="Invalid credentials")

# ─── FINAL SETUP ────────────────────────────────────────────────────────────────

app.include_router(api)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s %(levelname)s %(name)s: %(message)s'
)

@app.on_event("shutdown")
async def close_db():
    client.close()
