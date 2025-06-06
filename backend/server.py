from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime
from typing import Optional

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Define Application model
class Application(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: str = ""
    message: str
    apartmentId: Optional[int] = None
    apartmentNumber: Optional[str] = None
    projectName: str
    source: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    status: str = "new"

class Apartment(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    number: int
    project: str
    area: float
    floor: int
    totalFloors: int
    price: int
    images: Optional[List[str]] = []
    description: str = ""
    features: Optional[List[str]] = []
    rooms: int
    available: bool = True
# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# New endpoints for applications
@api_router.post("/applications", response_model=Application)
async def create_application(application: Application):
    await db.applications.insert_one(application.dict())
    return application

@api_router.get("/applications", response_model=List[Application])
async def get_applications():
    apps = await db.applications.find().to_list(1000)
    return [Application(**app) for app in apps]


apartments_router = APIRouter(prefix="/api")

@apartments_router.get("/apartments", response_model=List[Apartment])
async def get_apartments():
    apartments = await db.apartments.find().to_list(1000)
    return [Apartment(**apt) for apt in apartments]

@apartments_router.post("/apartments", response_model=Apartment)
async def create_apartment(apt: Apartment):
    await db.apartments.insert_one(apt.dict())
    return apt

@apartments_router.put("/apartments/{apt_id}", response_model=Apartment)
async def update_apartment(apt_id: str, apt: Apartment):
    result = await db.apartments.replace_one({"id": apt_id}, apt.dict())
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Not found")
    return apt

@apartments_router.delete("/apartments/{apt_id}")
async def delete_apartment(apt_id: str):
    result = await db.apartments.delete_one({"id": apt_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Not found")
    return {"ok": True}
# Include the router in the main app
app.include_router(api_router)
app.include_router(apartments_router)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
