import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Building,
} from "lucide-react";

export default function ProjectsCarousel() {
  const projects = [
    {
      name: "ЖК Акбидай 1",
      address: "ул Акбидай 11А",
      completion: "2022",
      totalApartments: 40,
      floors: 5,
      description: "Первый жилой комплекс премиум класса в районе Акбидай.",
      features: ["Детская площадка", "Удобная парковка"],
      image: "./img/aqbiday-1.jpg",
      status: "Сдано",

      bookingOpen: false,
    },
    {
      name: "ЖК Акбидай 2",
      address: "ул Акбидай 13Б",
      completion: "2023",
      totalApartments: 40,
      floors: 5,
      description: "Продолжение успешного проекта с улучшенной планировкой.",
      features: ["Детская площадка", "Удобная парковка"],
      image: "./img/aqbiday-2.jpg",
      status: "Сдано",
      bookingOpen: false,
    },
    {
      name: "ЖК Акбидай 3",
      address: "ул Кенжетаева 18",
      completion: "2024",
      totalApartments: 40,
      floors: 5,
      description: "Продолжение успешного проекта с улучшенной планировкой.",
      features: ["Детская площадка", "Удобная парковка"],
      image: "./img/aqbiday-3.jpg",
      status: "Сдано",
      bookingOpen: false,
    },
    {
      name: "ЖК Акбидай 4",
      address: "ул Кенжетаева 24",
      completion: "2026 (в процессе строительства)",
      totalApartments: 115,
      floors: 5,
      description: "Продолжение успешного проекта с улучшенной планировкой.",
      features: ["Детская площадка", "Удобная парковка"],
      image: "./img/aqbiday-4.jpg",
      status: "В процессе строительства",
      bookingOpen: false,
      pdf: "/files/aqbidai.pdf", // ← ссылка на ваш PDF
    },
    {
      name: "ЖК Гармония",
      address: "ул Васильковский 18/2",
      completion: "2022",
      totalApartments: 90,
      floors: 9,
      description: "",
      features: ["Детская площадка", "Близко к школам", "Перспективный район"],
      image: "./img/garmonia.jpg",
      status: "Сдано",
      bookingOpen: false,
    },
    {
      name: "ЖК Эдем",
      address: "ул Васильковский 18/1",
      completion: "2025 (в процессе строительства)",
      totalApartments: 90,
      floors: 9,
      description:
        "Новый проект с уникальной архитектурой. Открыто бронирование!",
      features: ["Детская площадка", "Близко к школам", "Перспективный район"],
      image: "./img/adem.jpg",
      status: "В процессе строительства",
      bookingOpen: false,
      pdf: "/files/adem.pdf", // ← и здесь ваш второй PDF
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Авто‑прокрутка
  useEffect(() => {
    if (!isAutoPlaying || projects.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % projects.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, projects.length]);

  // Сброс индекса, если проектов стало меньше
  useEffect(() => {
    if (currentIndex >= projects.length && projects.length > 0) {
      setCurrentIndex(0);
    }
  }, [projects.length, currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((i) => (i + 1) % projects.length);
    setIsAutoPlaying(false);
  };
  const prevSlide = () => {
    setCurrentIndex((i) => (i - 1 + projects.length) % projects.length);
    setIsAutoPlaying(false);
  };
  const goToSlide = (i) => {
    setCurrentIndex(i);
    setIsAutoPlaying(false);
  };

  const current = projects[currentIndex];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold font-serif text-primary-900 mb-6">
            Наши проекты
          </h2>
          <p className="text-xl text-neutral-dark/70 max-w-3xl mx-auto">
            Каждый жилой комплекс GRAND — это воплощение высоких стандартов
            качества и комфорта
          </p>
        </div>

        {/* Карусель */}
        <div className="relative">
          <div className="overflow-hidden shadow-luxury">
            <div className="grid lg:grid-cols-2 min-h-[600px]">
              {/* Изображение */}
              <div className="relative">
                <img
                  src={current.image}
                  alt={current.name}
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                <span className="absolute top-6 left-6 px-4 py-2 text-sm bg-[#1a3d76] text-white rounded">
                  {current.status}
                </span>
              </div>

              {/* Содержимое */}
              <div className="bg-white p-8 lg:p-12 flex flex-col justify-center">
                <h3 className="text-3xl lg:text-4xl font-bold font-serif text-primary-900 mb-4">
                  {current.name}
                </h3>
                <div className="space-y-4 mb-6 text-neutral-dark/70">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-3 text-accent" />
                    <span>{current.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-3 text-accent" />
                    <span>Сдача: {current.completion}</span>
                  </div>
                  <div className="flex items-center">
                    <Building className="w-5 h-5 mr-3 text-accent" />
                    <span>
                      {current.totalApartments} квартир, {current.floors} этажей
                    </span>
                  </div>
                </div>
                {current.description && (
                  <p className="text-lg text-neutral-dark/80 mb-8">
                    {current.description}
                  </p>
                )}
                <div className="mb-8">
                  <h4 className="text-primary-900 mb-3">Преимущества:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {current.features.map((f, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-accent mr-3" />
                        <span className="text-neutral-dark/80">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Кнопки действий */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Кнопка «Узнать больше» */}
                  {current.pdf && (
                    <a
                      href={current.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full border-2 border-[#1a3d76] text-[#1a3d76]
               hover:bg-[#1a3d76] hover:text-white px-8 py-4
               rounded-lg text-lg transition-all duration-300
               flex items-center justify-center"
                    >
                      Узнать больше
                    </a>
                  )}

                  {current.bookingOpen && (
                    <button className="border-2 border-accent text-accent hover:bg-accent hover:text-white px-6 py-3 rounded-lg transition-all duration-300">
                      Забронировать
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Стрелки */}
          {projects.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-primary-900 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-primary-900 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Индикаторы */}
          {projects.length > 1 && (
            <div className="flex justify-center mt-8 space-x-3">
              {projects.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "bg-accent w-8"
                      : "bg-neutral-dark/30 hover:bg-accent/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
