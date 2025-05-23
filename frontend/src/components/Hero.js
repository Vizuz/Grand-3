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

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden luxury-gradient">
      {/* Background overlay with parallax effect */}
      <div 
        className="absolute inset-0 bg-black/30"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />
      
      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold font-serif mb-6">
            <span className="text-gradient">GRAND</span>
          </h1>
          
          <p className="text-xl sm:text-2xl lg:text-3xl font-light mb-8 max-w-3xl mx-auto animate-slide-up"
             style={{ transform: `translateY(${scrollY * 0.2}px)`, animationDelay: '0.6s' }}>
            Вы художник своей жизни.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up"
               style={{ animationDelay: '1s' }}>
            <Link 
              to="/apartments"
              className="bg-accent hover:bg-accent-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              Смотреть квартиры
            </Link>
            <Link 
              to="/about"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Узнать больше
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-fade-in" style={{ animationDelay: '1.5s' }}>
        <div className="text-white/80 cursor-pointer hover:text-accent transition-colors animate-bounce">
          <ChevronDown size={32} />
        </div>
      </div>
    </section>
  );
}