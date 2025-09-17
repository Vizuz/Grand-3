import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  Home,
  Maximize,
  Building2,
  Star,
  Building,
} from "lucide-react";

export default function ApartmentCard({ apartment, viewMode = "grid" }) {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "KZT",
      currencyDisplay: "narrowSymbol",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // общий класс для корня карточки: full-height + flex-col
  const cardClass =
    "bg-white  overflow-hidden hover-lift cursor-pointer h-full flex flex-col";
  //rounded-lg shadow-lg
  if (viewMode === "list") {
    return (
      <div
        className={cardClass}
        onClick={() => navigate(`/apartments/${apartment.id}`)}
      >
        <div className="flex flex-col md:flex-row flex-1">
          <div className="md:w-80 h-48 md:h-auto relative flex-shrink-0">
            <img
              src={apartment.images?.[0] || "/placeholder.jpg"}
              alt={`Квартира №${apartment.number}`}
              className="w-full h-full object-contain"
            />
            {apartment.isNew && (
              <div className="absolute top-4 left-4">
                <span className="bg-accent text-white px-3 py-1 rounded-full text-sm">
                  НОВИНКА
                </span>
              </div>
            )}
          </div>

          <div className="flex-1 p-6 flex flex-col justify-between">
            {/* Верхняя часть карточки */}
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-primary-900 mb-2">
                    Квартира №{apartment.number}
                  </h3>
                  <p className="text-accent">{apartment.projectName}</p>
                </div>
                <div className="text-2xl font-bold text-primary-900">
                  {apartment.price ? formatPrice(apartment.price) : "Старт продаж"}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-gray-600">
                <div className="flex items-center">
                  <Home className="w-4 h-4 mr-2 text-accent" />
                  <span>{apartment.rooms} комн.</span>
                </div>
                <div className="flex items-center">
                  <Maximize className="w-4 h-4 mr-2 text-accent" />
                  <span>{apartment.area} м²</span>
                </div>
                <div className="flex items-center">
                  <Building2 className="w-4 h-4 mr-2 text-accent" />
                  <span>
                    {apartment.floor}/{apartment.totalFloors} эт.
                  </span>
                </div>
                <div className="flex items-center">
                  <Building className="w-4 h-4 mr-2 text-accent" />
                  <span style={{ fontSize: "12px" }}>{apartment.project}</span>
                </div>
                {/* <div className="flex items-center">
            <Star className="w-4 h-4 mr-2 text-accent" />
            <span>Премиум</span>
          </div> */}
              </div>

              {apartment.description && (
                <p className="text-gray-600 mb-4">{apartment.description}</p>
              )}
            </div>

            {/* Нижняя часть карточки */}
            <div className="flex justify-between items-center">
              <div className="flex flex-wrap gap-2 min-h-[1.5rem]">
                {/* даже если features пуст, этот блок займёт место */}
                {apartment.features?.slice(0, 3).map((feature, i) => (
                  <span
                    key={i}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <Link
                to={`/apartments/${apartment.id}`}
                onClick={(e) => e.stopPropagation()}
                className="bg-accent hover:bg-accent-600 text-white px-6 py-2 rounded transition-colors"
              >
                Подробнее
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // === Grid view ===
  return (
    <div
      className={cardClass}
      onClick={() => navigate(`/apartments/${apartment.id}`)}
    >
      <div className="relative h-48">
        <img
          src={apartment.images?.[0] || "/placeholder.jpg"}
          alt={`Квартира №${apartment.number}`}
          className="w-full h-full object-contain"
        />
        {apartment.isNew && (
          <div className="absolute top-4 left-4">
            <span className="bg-accent text-white px-3 py-1 rounded-full text-sm">
              НОВИНКА
            </span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col justify-between flex-1">
        {/* Верхняя часть */}
        <div>
          <div className="mb-4">
            {/* <h3 className="text-lg font-bold text-primary-900 mb-1">
              Квартира №{apartment.number}
            </h3> */}
            <p className="text-accent text-sm">{apartment.projectName}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Home className="w-4 h-4 mr-2 text-accent" />
              <span>{apartment.rooms} комн.</span>
            </div>
            <div className="flex items-center">
              <Maximize className="w-4 h-4 mr-2 text-accent" />
              <span>{apartment.area} м²</span>
            </div>
            <div className="flex items-center">
              <Building2 className="w-4 h-4 mr-2 text-accent" />
              <span>
                {apartment.floor}/{apartment.totalFloors} эт.
              </span>
            </div>
            <div className="flex items-center">
              <Building className="w-4 h-4 mr-2 text-accent" />
              <span>{apartment.project}</span>
            </div>
          </div>

          <div className="mb-4">
            <div className="text-2xl font-bold text-primary-900">
              {apartment.price ? formatPrice(apartment.price) : "Старт продаж"}
            </div>
          </div>
        </div>

        {/* Нижняя часть */}
        <div>
          <div className="flex flex-wrap gap-1 mb-4 min-h-[1.5rem]">
            {apartment.features?.slice(0, 2).map((feature, i) => (
              <span
                key={i}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
              >
                {feature}
              </span>
            ))}
          </div>

          <Link
            to={`/apartments/${apartment.id}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center justify-center w-full bg-[#242f3c] text-white font-medium px-4 py-2 rounded-lg transition-transform duration-200 hover:scale-105 "
          >
            Подробнее
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="ml-2 w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>

          
        </div>
      </div>
    </div>
  );
}
