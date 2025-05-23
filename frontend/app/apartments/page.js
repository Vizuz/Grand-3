'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Search, Filter, SlidersHorizontal, Grid, List } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ApartmentCard from '../components/ApartmentCard';
import ApartmentFilters from '../components/ApartmentFilters';
import MortgageCalculator from '../components/MortgageCalculator';
import { apartmentsData } from '../data/projectsData';

export default function ApartmentsPage() {
  const [filters, setFilters] = useState({
    rooms: [],
    priceRange: [20000000, 60000000],
    areaRange: [40, 100],
    floorRange: [1, 20],
    projectId: null
  });
  const [sortBy, setSortBy] = useState('price-asc');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Filter and sort apartments
  const filteredApartments = useMemo(() => {
    let filtered = apartmentsData.filter(apartment => {
      // Room filter
      if (filters.rooms.length > 0 && !filters.rooms.includes(apartment.rooms)) {
        return false;
      }
      
      // Price filter
      if (apartment.price < filters.priceRange[0] || apartment.price > filters.priceRange[1]) {
        return false;
      }
      
      // Area filter
      if (apartment.area < filters.areaRange[0] || apartment.area > filters.areaRange[1]) {
        return false;
      }
      
      // Floor filter
      if (apartment.floor < filters.floorRange[0] || apartment.floor > filters.floorRange[1]) {
        return false;
      }
      
      // Project filter
      if (filters.projectId && apartment.projectId !== filters.projectId) {
        return false;
      }
      
      return true;
    });

    // Sort apartments
    switch (sortBy) {
      case 'price-asc':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return filtered.sort((a, b) => b.price - a.price);
      case 'area-asc':
        return filtered.sort((a, b) => a.area - b.area);
      case 'area-desc':
        return filtered.sort((a, b) => b.area - a.area);
      case 'rooms-asc':
        return filtered.sort((a, b) => a.rooms - b.rooms);
      case 'rooms-desc':
        return filtered.sort((a, b) => b.rooms - a.rooms);
      default:
        return filtered;
    }
  }, [apartmentsData, filters, sortBy]);

  return (
    <div className="min-h-screen bg-neutral-light">
      <Navigation />
      
      {/* Page Header */}
      <section className="pt-24 pb-12 bg-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl lg:text-6xl font-bold font-serif mb-6">
              Каталог квартир
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Выберите идеальную квартиру из {apartmentsData.length} предложений в наших жилых комплексах
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar with Filters */}
          <div className="lg:w-80">
            {/* Filter Toggle for Mobile */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center justify-between"
              >
                <span className="flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Фильтры
                </span>
                <SlidersHorizontal className="w-5 h-5" />
              </button>
            </div>

            {/* Filters */}
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
              <ApartmentFilters filters={filters} setFilters={setFilters} />
              
              {/* Mortgage Calculator Toggle */}
              <div className="mt-6">
                <button
                  onClick={() => setShowCalculator(!showCalculator)}
                  className="w-full bg-accent hover:bg-accent-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
                >
                  {showCalculator ? 'Скрыть калькулятор' : 'Ипотечный калькулятор'}
                </button>
                
                {showCalculator && (
                  <div className="mt-4">
                    <MortgageCalculator />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls Bar */}
            <div className="bg-white rounded-lg p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <span className="text-gray-600">
                  Найдено: <span className="font-semibold text-primary-900">{filteredApartments.length}</span> квартир
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="price-asc">Цена: по возрастанию</option>
                  <option value="price-desc">Цена: по убыванию</option>
                  <option value="area-asc">Площадь: по возрастанию</option>
                  <option value="area-desc">Площадь: по убыванию</option>
                  <option value="rooms-asc">Комнаты: по возрастанию</option>
                  <option value="rooms-desc">Комнаты: по убыванию</option>
                </select>

                {/* View Mode Toggle */}
                <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-accent text-white' : 'bg-white text-gray-600'}`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-accent text-white' : 'bg-white text-gray-600'}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Apartments Grid/List */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className={`${
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
                  : 'space-y-4'
              }`}
            >
              {filteredApartments.map((apartment, index) => (
                <motion.div
                  key={apartment.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ApartmentCard apartment={apartment} viewMode={viewMode} />
                </motion.div>
              ))}
            </motion.div>

            {/* No Results */}
            {filteredApartments.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Квартиры не найдены
                </h3>
                <p className="text-gray-500">
                  Попробуйте изменить параметры фильтра
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}