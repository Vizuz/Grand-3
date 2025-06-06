import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Параметры затухания и лимиты сдвига
  const fadeDistance = window.innerHeight / 2;
  const opacity = Math.max(0, 1 - scrollY / fadeDistance);

  // Ограничим смещение, чтобы текст не заезжал на кнопки
  const maxShift = fadeDistance * 0.3;
  const shiftTitle = Math.min(scrollY * 0.3, maxShift);
  const shiftText = Math.min(scrollY * 0.2, maxShift);
  const shiftBg = Math.min(scrollY * 0.5, window.innerHeight * 0.5);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden luxury-gradient-bg">
      {/* Параллакс-фон */}
      <div
        className="absolute inset-0 bg-black/30"
        style={{
          transform: `translateY(${shiftBg}px)`,
        }}
      />

      {/* Контент Hero */}
      <div
        className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8"
        style={{
          transform: `translateY(${shiftTitle}px)`,
          opacity,
          transition: 'opacity 0.1s linear, transform 0.2s ease-out',
        }}
      >
        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold font-serif mb-6">
          <span className="text-gradient">GRAND</span>
        </h1>

        <p
          className="text-xl sm:text-2xl lg:text-3xl font-light mb-8 max-w-3xl mx-auto"
          style={{ transform: `translateY(${shiftText}px)`, transition: 'transform 0.2s ease-out' }}
        >
          Жилые пространства, созданные для жизни и вдохновения.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/apartments"
            className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
          >
            Смотреть квартиры
          </Link>
          <Link
            to="/about"
            className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
          >
            Узнать больше
          </Link>
        </div>
      </div>

      {/* Индикатор прокрутки */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-fade-in"
        style={{ animationDelay: '1.5s' }}
      >
        <div className="text-white/80 cursor-pointer hover:text-accent transition-colors animate-bounce">
          <ChevronDown size={32} />
        </div>
      </div>
    </section>
  );
}