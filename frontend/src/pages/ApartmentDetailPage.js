import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Home,
  Maximize,
  Building2,
  Building,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import MortgageCalculator from "../components/MortgageCalculator";
import { useData } from "../context/DataContext";
import { IoLogoWhatsapp } from "react-icons/io";
export default function ApartmentDetailPage() {
  const { id } = useParams();
  const { apartments } = useData();
  const [apartment, setApartment] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (apartments && apartments.length > 0) {
      const apt = apartments.find((apt) => String(apt.id) === String(id));
      setApartment(apt || null);
      setCurrentImageIndex(0);
    }
  }, [id, apartments]);

  if (!apartments || apartments.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p>Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!apartment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Квартира не найдена</p>
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "KZT",
      currencyDisplay: "narrowSymbol",
      minimumFractionDigits: 0,
    }).format(price);
  };
  const formatPricePerSqm = (price) => {
    if (price == null || isNaN(price)) return "—";
    return new Intl.NumberFormat("ru-RU", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0, // добавили
    }).format(price);
  };
  // Вычисляем цену за м²: либо из поля apartment.pricePerSqm, либо считаем сами
  const pricePerSqmValue =
    apartment.pricePerSqm != null
      ? apartment.pricePerSqm
      : apartment.price && apartment.area
        ? apartment.price / apartment.area
        : null;

  return (
    <div className="min-h-screen bg-neutral-light">
      <Navigation />

      {/* Header */}
      <section className="pt-40 pb-8 luxury-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Link
              to="/apartments"
              className="flex items-center text-white hover:text-accent transition-colors mr-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Назад к каталогу
            </Link>
          </div>

          <div className="text-white">
            <h1 className="text-3xl lg:text-5xl font-bold font-serif mb-4">
              Квартира №{apartment.number}
            </h1>
            <p className="text-xl text-accent mb-2">{apartment.projectName}</p>
            <p className="text-lg opacity-80">{apartment.description}</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white  shadow-lg overflow-hidden mb-8">
              <div className="relative h-96">
                {apartment.images && apartment.images.length > 0 ? (
                  <img
                    src={apartment.images[currentImageIndex]}
                    alt={`Квартира №${apartment.number}`}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                    Нет фото
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {apartment.images && apartment.images.length > 1 && (
                <div className="p-4 flex space-x-4 overflow-x-auto">
                  {apartment.images.map((photo, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? "border-accent"
                          : "border-gray-200"
                      }`}
                    >
                      <img
                        src={photo}
                        alt={`Вид ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Apartment Details */}
            <div className="bg-white shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-primary-900 mb-6">
                Характеристики
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <Home className="w-8 h-8 text-accent mr-4" />
                  <div>
                    <div className="text-sm text-gray-600">Комнаты</div>
                    <div className="text-xl font-bold text-primary-900">
                      {apartment.rooms}
                    </div>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <Maximize className="w-8 h-8 text-accent mr-4" />
                  <div>
                    <div className="text-sm text-gray-600">Площадь</div>
                    <div className="text-xl font-bold text-primary-900">
                      {apartment.area} м²
                    </div>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <Building2 className="w-8 h-8 text-accent mr-4" />
                  <div>
                    <div className="text-sm text-gray-600">Этаж</div>
                    <div className="text-xl font-bold text-primary-900">
                      {apartment.floor} из {apartment.totalFloors}
                    </div>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <Building className="w-8 h-8 text-accent mr-4" />
                  <div>
                    <div className="text-sm text-gray-600">Жилой комплекс</div>
                    <div className="text-xl font-bold text-primary-900">
                      {apartment.project}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            {apartment.features && apartment.features.length > 0 && (
              <div className="bg-white  shadow-lg p-8">
                <h2 className="text-2xl font-bold text-primary-900 mb-6">
                  Особенности
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  {apartment.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-3 h-3 bg-accent  mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Price Card */}
            <div className="bg-white shadow-lg p-8 mb-8">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-primary-900 mb-2">
                  {formatPrice(apartment.price)}
                </div>
                <div className="text-md">
                  {formatPricePerSqm(pricePerSqmValue)} ₸/м²
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <Link
                  to="/contacts"
                  className="w-full border-2 border-[#1a3d76] text-[#1a3d76] hover:bg-[#1a3d76] hover:text-white px-8 py-4 text-lg rounded-lg transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Оставить заявку
                </Link>
              </div>

              {/* Contact Info */}
              <div className="border-t pt-6">
                <h3 className="text-primary-900 mb-4">Связаться с нами</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="w-6 h-6 mr-3 text-accent" />
                    <a
                      href="tel:+77006512373"
                      className="block text-lg font-medium hover:opacity-80"
                      onClick={(e) => e.stopPropagation()}
                    >
                      +7 (700) 651-23-73
                    </a>
                  </div>
                  <div className="flex items-center">
                    <a
                      href="https://wa.me/77006512373"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center space-x-2 text-lg hover:opacity-80"
                    >
                      <IoLogoWhatsapp className="w-6 h-6 text-primary-600 flex-shrink-0" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
