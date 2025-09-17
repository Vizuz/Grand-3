import React, { useState } from "react";
import { Plus, Edit, Trash2, Home, Maximize, Building2 } from "lucide-react";
import { useData } from "../../context/DataContext";

// Фиксированные особенности для чекбоксов
const FEATURES_OPTIONS = [
  "Просторная кухня",
  "Просторный зал",
  "Огромная лоджия",
  "Раздельный туалет и ванная",
  "Высокие потолки",
  "Большой санузел",
  "Гардеробная",
  "Кладовка",
  "Две спальни",
  "Три спальни",
];

// Соответствие особенности -> emoji-иконка (заглушка)
const FEATURES_ICONS = {
  "Просторная кухня": "🍳",
  "Просторный зал": "🛋️",
  "Огромная лоджия": "🌇",
  "Раздельный туалет и ванная": "🚽",
  "Высокие потолки": "🏛️",
  "Большой санузел": "🚿",
  "Гардеробная": "👗",
  "Кладовка": "📦",
  "Две спальни": "🛏️",
  "Три спальни": "🛏️",
};

export default function ApartmentsManager() {
  const {
    apartments = [],
    projects = [],
    addApartment,
    updateApartment,
    deleteApartment,
  } = useData();

  const [showForm, setShowForm] = useState(false);
  const [editingApartment, setEditingApartment] = useState(null);
  const [uploading, setUploading] = useState(false);

  const emptyForm = {
    projectName: "",
    rooms: "",
    area: "",
    floor: "",
    totalFloors: "",
    price: "",
    layoutImage: "",
    images: "",
    features: [],
    description: "",
    // isNew: false, // убрали поле
    // available: true, // убрали поле
  };
  const [formData, setFormData] = useState(emptyForm);

  const formatPrice = (price) => {
    if (!price) return "";
    // Число -> "8 000 000 ₸"
    const num = typeof price === "string" ? parseInt(price.replace(/\D/g, "")) : price;
    if (!num) return "";
    return `${new Intl.NumberFormat("ru-RU").format(num)} ₸`;
  };

  // Загрузка изображений через backend endpoint и обновление formData.images
  async function handleImageUpload(e) {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    try {
      const uploadedUrls = [];
      for (const file of files) {
        const formDataUpload = new FormData();
        formDataUpload.append("file", file);

        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/upload-image`,
          {
            method: "POST",
            body: formDataUpload,
          },
        );

        if (!res.ok) throw new Error("Ошибка загрузки файла");
        const data = await res.json();
        if (data.url) {
          uploadedUrls.push(data.url);
        }
      }
      setFormData((fd) => ({
        ...fd,
        images: [
          ...(Array.isArray(fd.images)
            ? fd.images
            : fd.images
              ? fd.images.split(",").map((p) => p.trim())
              : []),
          ...uploadedUrls,
        ],
      }));
    } catch (err) {
      console.error(err);
      alert("Ошибка загрузки фото: " + err.message);
    } finally {
      setUploading(false);
      e.target.value = null;
    }
  }

  // Установка этажности по проекту
  const handleProjectChange = (value) => {
    let floors = "";
    if (value === "ЖК AQBIDAI 4") {
      floors = "5";
    } else if (value === "ЖК ЭДЕМ") {
      floors = "9";
    }
    setFormData({ ...formData, projectName: value, totalFloors: floors });
  };

  // --- submit ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    const apartmentPayload = {
      project: formData.projectName,
      area: parseFloat(formData.area),
      floor: parseInt(formData.floor),
      totalFloors: parseInt(formData.totalFloors),
      price: parseInt(formData.price),
      images: Array.isArray(formData.images)
        ? formData.images
        : formData.images
          ? formData.images
              .split(",")
              .map((p) => p.trim())
              .filter(Boolean)
          : [],
      description: formData.description,
      features: Array.isArray(formData.features)
        ? formData.features
        : [],
      rooms: parseInt(formData.rooms),
      // available: formData.available, // убрали поле
    };

    try {
      if (editingApartment) {
        await updateApartment(editingApartment.id, apartmentPayload);
      } else {
        await addApartment(apartmentPayload);
      }
    } catch (err) {
      console.error("Failed to save apartment:", err);
    }

    setShowForm(false);
    setEditingApartment(null);
    setFormData(emptyForm);
  };

  // --- edit ---
  const handleEdit = (apartment) => {
    setEditingApartment(apartment);
    setFormData({
      projectName: apartment.project || "",
      rooms: apartment.rooms?.toString() ?? "",
      area: apartment.area?.toString() ?? "",
      floor: apartment.floor?.toString() ?? "",
      totalFloors: apartment.totalFloors?.toString() ?? "",
      price: apartment.price?.toString() ?? "",
      images: Array.isArray(apartment.images)
        ? apartment.images.join(", ")
        : "",
      features: Array.isArray(apartment.features)
        ? apartment.features
        : [],
      description: apartment.description,
      // isNew: apartment.isNew, // убрали поле
      // available: apartment.available, // убрали поле
    });
    setShowForm(true);
  };

  // --- delete ---
  const handleDelete = async (id) => {
    if (window.confirm("Удалить квартиру?")) {
      try {
        await deleteApartment(id);
      } catch (err) {
        console.error("Failed to delete apartment:", err);
      }
    }
  };

  // No need for filteredProjects, hardcoded project options now.

  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary-900">
          Управление квартирами
        </h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingApartment(null);
            setFormData(emptyForm);
          }}
          className="bg-black hover:bg-accent-600 text-white px-4 py-2 rounded-lg font-medium flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Добавить квартиру
        </button>
      </div>

      {/* форма создания / редактирования */}
      {showForm && (
        <Modal
          onClose={() => {
            setShowForm(false);
            setEditingApartment(null);
          }}
        >
          <h3 className="text-xl font-bold text-primary-900 mb-4">
            {editingApartment ? "Редактировать квартиру" : "Добавить квартиру"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4 pb-20">
            {/* --- Блок 1: Информация о проекте --- */}
            <div>
              <div className="font-semibold text-lg text-primary-900 mb-2">
                Информация о проекте
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Проект
                  </label>
                  <select
                    value={formData.projectName}
                    onChange={(e) => handleProjectChange(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  >
                    <option value="">Выберите проект</option>
                    <option value="ЖК AQBIDAI 4">ЖК AQBIDAI 4</option>
                    <option value="ЖК ЭДЕМ">ЖК ЭДЕМ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Комнат
                  </label>
                  <select
                    value={formData.rooms}
                    onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  >
                    <option value="">Выберите</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Площадь (м²)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.area}
                    onChange={(e) =>
                      setFormData({ ...formData, area: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Этаж
                  </label>
                  <select
                    value={formData.floor}
                    onChange={(e) =>
                      setFormData({ ...formData, floor: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                    disabled={!formData.totalFloors}
                  >
                    <option value="">Выберите этаж</option>
                    {Number(formData.totalFloors) > 0 &&
                      Array.from({ length: Number(formData.totalFloors) }, (_, i) => (
                        <option value={String(i + 1)} key={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Всего этажей
                  </label>
                  <input
                    type="number"
                    value={formData.totalFloors}
                    readOnly
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>
              </div>
            </div>
            {/* --- Блок 2: Цена --- */}
            <div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Цена (₸)
                </label>
                <input
                  type="text"
                  value={
                    formData.price
                      ? formData.price
                          .replace(/\D/g, "")
                          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                      : ""
                  }
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, "");
                    setFormData({
                      ...formData,
                      price: raw,
                    });
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                  inputMode="numeric"
                  pattern="[0-9\s]*"
                  autoComplete="off"
                />
              </div>
            </div>
            {/* --- Блок 3: Фото --- */}
            <div>
              <div className="font-semibold text-lg text-primary-900 mb-2">
                Фото
              </div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Загрузить фото с компьютера
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                disabled={uploading}
                onChange={handleImageUpload}
                className="w-full"
              />
              {uploading && <p className="text-sm text-gray-500">Загрузка…</p>}
              {/* Превью фото */}
              <div className="flex flex-wrap mt-2">
                {(Array.isArray(formData.images)
                  ? formData.images
                  : formData.images
                  ? formData.images.split(",").map((p) => p.trim()).filter(Boolean)
                  : []
                ).map((img, idx) => (
                  <div key={img} className="relative mr-2 mb-2 inline-block">
                    <img
                      src={img}
                      alt={`Фото ${idx + 1}`}
                      className="w-16 h-16 object-cover rounded mr-2 inline-block border"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-white bg-opacity-80 rounded-full px-1 py-0 text-xs"
                      title="Удалить"
                      onClick={() => {
                        setFormData((fd) => ({
                          ...fd,
                          images: (Array.isArray(fd.images)
                            ? fd.images
                            : fd.images
                            ? fd.images.split(",").map((p) => p.trim()).filter(Boolean)
                            : []
                          ).filter((url) => url !== img),
                        }));
                      }}
                    >
                      ❌
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/* --- Блок 4: Описание и особенности --- */}
            <div>
              <div className="font-semibold text-lg text-primary-900 mb-2">
                Описание и особенности
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Описание
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  rows="3"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Особенности
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {FEATURES_OPTIONS.map((option) => {
                    const checked = formData.features.includes(option);
                    return (
                      <div
                        key={option}
                        className={`border rounded-lg p-2 flex items-center cursor-pointer hover:border-black transition ${
                          checked ? "border-black bg-gray-100" : "border-gray-300"
                        }`}
                        onClick={() => {
                          if (!checked) {
                            setFormData({
                              ...formData,
                              features: [...formData.features, option],
                            });
                          } else {
                            setFormData({
                              ...formData,
                              features: formData.features.filter((f) => f !== option),
                            });
                          }
                        }}
                        tabIndex={0}
                        role="checkbox"
                        aria-checked={checked}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          readOnly
                          tabIndex={-1}
                          className="mr-2 accent-black"
                        />
                        <span className="text-xl mr-2">{FEATURES_ICONS[option] || "🏠"}</span>
                        <span className="text-sm">{option}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* --- Кнопки --- */}
            <div className="sticky bottom-0 bg-white py-3 flex justify-end space-x-3 border-t z-10 -mx-6 px-6">
              <button
                type="submit"
                className="bg-black hover:bg-accent-600 text-white px-4 py-2 rounded-lg font-medium flex items-center"
              >
                {editingApartment ? "Сохранить" : "Добавить"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingApartment(null);
                  setFormData(emptyForm);
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium"
              >
                Отмена
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Список квартир */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Квартира
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Проект
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Характеристики
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Цена
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Статус
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {apartments.map((apartment) => (
                <tr key={apartment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={
                          apartment.images && apartment.images.length > 0
                            ? apartment.images[0]
                            : ""
                        }
                        alt="Квартира"
                        className="w-12 h-12 rounded-lg object-cover mr-3"
                        onError={(e) => {
                          e.target.src = "/no-image.png";
                        }}
                      />
                      <div>
                        <div className="text-sm font-medium text-primary-900">
                          Квартира
                        </div>
                        <div className="text-sm text-gray-500 whitespace-normal break-words max-w-xs">
                          {apartment.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {apartment.project}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>{apartment.rooms} комн.</div>
                    <div>{apartment.area} м²</div>
                    <div>
                      {apartment.floor}/{apartment.totalFloors} эт.
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-primary-900">
                      {formatPrice(apartment.price)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {apartment.pricePerSqm
                        ? new Intl.NumberFormat("ru-RU").format(
                            apartment.pricePerSqm,
                          )
                        : ""}{" "}
                      ₸/м²
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      {apartment.isNew && (
                        <span className="px-2 py-1 text-xs bg-accent text-white rounded-full">
                          Новинка
                        </span>
                      )}
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          apartment.available !== false
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {apartment.available !== false ? "Доступна" : "Продана"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(apartment)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(apartment.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-screen overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
