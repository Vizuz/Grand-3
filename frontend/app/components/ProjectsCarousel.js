'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, MapPin, Calendar, Building } from 'lucide-react';
import Image from 'next/image';
import { projectsData } from '../data/projectsData';

export default function ProjectsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projectsData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projectsData.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold font-serif text-primary-900 mb-6">
            Наши проекты
          </h2>
          <p className="text-xl text-neutral-dark/70 max-w-3xl mx-auto">
            Каждый жилой комплекс GRAND — это воплощение высоких стандартов качества и комфорта
          </p>
        </motion.div>

        {/* Carousel Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <div className="overflow-hidden rounded-2xl shadow-luxury">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="grid lg:grid-cols-2 min-h-[600px]">
                  {/* Image Section */}
                  <div className="relative">
                    <Image
                      src={projectsData[currentIndex].image}
                      alt={projectsData[currentIndex].name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-6 left-6">
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        projectsData[currentIndex].isNew
                          ? 'bg-accent text-white'
                          : projectsData[currentIndex].status.includes('процессе')
                          ? 'bg-orange-500 text-white'
                          : 'bg-green-500 text-white'
                      }`}>
                        {projectsData[currentIndex].isNew ? 'НОВИНКА' : projectsData[currentIndex].status}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="bg-white p-8 lg:p-12 flex flex-col justify-center">
                    <h3 className="text-3xl lg:text-4xl font-bold font-serif text-primary-900 mb-4">
                      {projectsData[currentIndex].name}
                    </h3>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center text-neutral-dark/70">
                        <MapPin className="w-5 h-5 mr-3 text-accent" />
                        <span>{projectsData[currentIndex].address}</span>
                      </div>
                      
                      <div className="flex items-center text-neutral-dark/70">
                        <Calendar className="w-5 h-5 mr-3 text-accent" />
                        <span>Сдача: {projectsData[currentIndex].completion}</span>
                      </div>
                      
                      <div className="flex items-center text-neutral-dark/70">
                        <Building className="w-5 h-5 mr-3 text-accent" />
                        <span>{projectsData[currentIndex].totalApartments} квартир, {projectsData[currentIndex].floors} этажей</span>
                      </div>
                    </div>

                    <p className="text-lg text-neutral-dark/80 mb-8">
                      {projectsData[currentIndex].description}
                    </p>

                    {/* Features */}
                    <div className="mb-8">
                      <h4 className="font-semibold text-primary-900 mb-3">Преимущества:</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {projectsData[currentIndex].features.map((feature, index) => (
                          <div key={index} className="flex items-center">
                            <div className="w-2 h-2 bg-accent rounded-full mr-3" />
                            <span className="text-neutral-dark/80">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button className="bg-accent hover:bg-accent-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg">
                        Смотреть квартиры
                      </button>
                      {projectsData[currentIndex].bookingOpen && (
                        <button className="border-2 border-accent text-accent hover:bg-accent hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300">
                          Забронировать
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
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

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-3">
            {projectsData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-accent w-8' 
                    : 'bg-neutral-dark/30 hover:bg-accent/50'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}