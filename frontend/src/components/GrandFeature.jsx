import React from "react";
import { Link, useLocation } from "react-router-dom";
export default function SoulFeature() {
  const images = [
    "https://storage.yandexcloud.net/vizuz/book.webp",
    "https://storage.yandexcloud.net/vizuz/music.webp",
    "https://storage.yandexcloud.net/vizuz/dog.webp",
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* === Изображения === */}
        <div className="flex flex-col sm:flex-row -mx-2 mb-12">
          {/* 1-я картинка — всегда видна */}
          <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4 sm:mb-0">
            <div className="h-96 sm:h-56 md:h-72 lg:h-96 overflow-hidden">
              <img
                src={images[0]}
                alt="Book"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* 2-я картинка — показываем с sm */}
          <div className="hidden sm:block sm:w-1/2 lg:w-1/3 px-2 mb-4 sm:mb-0">
            <div className="h-40 sm:h-56 md:h-72 lg:h-72 overflow-hidden">
              <img
                src={images[1]}
                alt="Music"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* 3-я картинка — показываем с lg */}
          <div className="hidden lg:block lg:w-1/3 px-2">
            <div className="h-40 sm:h-56 md:h-72 lg:h-96 overflow-hidden">
              <img
                src={images[2]}
                alt="Dog"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* === Текстовая часть === */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Сделайте свой дом маленьким раем
            </h2>
            <Link to="/apartments">
              <button
                className="w-full sm:w-auto text-lg sm:text-base
                         px-6 py-4 sm:py-3
                         border-2 border-black
                         text-black hover:bg-black hover:text-white
                         transition"
              >
                Каталог квартир
              </button>
            </Link>
          </div>
          <div className="text-gray-700">
            <p>
              Grand Komfort Stroy предлагает квартиры с одной, двумя и тремя
              спальнями. Каждая планировка создана для максимального комфорта и
              удобства семьи.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
