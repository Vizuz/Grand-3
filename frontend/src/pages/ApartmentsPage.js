import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal, Grid, List } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ApartmentCard from '../components/ApartmentCard';
import ApartmentFilters from '../components/ApartmentFilters';
import MortgageCalculator from '../components/MortgageCalculator';
import { OrbitProgress } from 'react-loading-indicators';
export default function ApartmentsPage() {
  const { apartments, trackPageView } = useData();
  const [filters, setFilters] = useState({
    rooms:        [],
    priceRange:  [100000, 60000000],
    areaRange:   [1, 10000],
    floorRange:  [1, 2000],
    projectName: null
  });
  const [sortBy, setSortBy]       = useState('price-asc');
  const [viewMode, setViewMode]   = useState('grid');
  const [showFilters, setShowFilters]     = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    trackPageView('Каталог квартир');
  }, [trackPageView]);

  useEffect(() => {
    if (apartments) setLoading(false);
  }, [apartments]);

  const filteredApartments = useMemo(() => {
    if (loading) return [];
    let filtered = apartments.filter(apartment => {
      if (apartment.available === false) return false;

      if (filters.rooms.length > 0 && !filters.rooms.includes(apartment.rooms)) {
        return false;
      }

      if (apartment.price < filters.priceRange[0] || apartment.price > filters.priceRange[1]) {
        return false;
      }

      if (apartment.area < filters.areaRange[0] || apartment.area > filters.areaRange[1]) {
        return false;
      }

      if (apartment.floor < filters.floorRange[0] || apartment.floor > filters.floorRange[1]) {
        return false;
      }

      if (filters.projectName && apartment.project !== filters.projectName) {
        return false;
      }

      return true;
    });

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
        return filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }
  }, [apartments, filters, sortBy, loading]);

  return (
    <div className="min-h-screen bg-neutral-light">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-32">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80">
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

            <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
              <ApartmentFilters filters={filters} setFilters={setFilters} />
            </div>
          </div>

          {/* Main */}
          <div className="flex-1">
            <div className="bg-white p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <span className="text-gray-600">
                  Найдено: <span className="font-semibold text-primary-900">{filteredApartments.length}</span> квартир
                </span>
              </div>

              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="border border-gray-200 px-3 py-2 text-sm"
                >
                  <option value="price-asc">Цена: по возрастанию</option>
                  <option value="price-desc">Цена: по убыванию</option>
                  <option value="area-asc">Площадь: по возрастанию</option>
                  <option value="area-desc">Площадь: по убыванию</option>
                  <option value="rooms-asc">Комнаты: по возрастанию</option>
                  <option value="rooms-desc">Комнаты: по убыванию</option>
                </select>

                <div className="hidden lg:flex border border-gray-200 overflow-hidden">
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

            {loading && (
              <div className="text-center py-12">
                <OrbitProgress color="#000" size="small" text="" textColor="" />
                <h3 className="text-xl font-semibold text-black-600 mb-2">
                  Загружаем список квартир
                </h3>
                <p className="text-gray-500">
                  Это может занять до минуты. Пока квартиры загружаются, вы можете ознакомиться с информацией о нашей компании
                </p>
              </div>
            )}

            <div className={`${
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                : 'space-y-4'
            }`}>
              {filteredApartments.map((apartment, index) => (
                <div key={apartment.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <ApartmentCard apartment={apartment} viewMode={viewMode} />
                </div>
              ))}
            </div>

            {/* {!loading && filteredApartments.length === 0 && (
              <div className="text-center py-12">
                <div className="text-black-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-black-600 mb-2">
                  Нет подходящих квартир
                </h3>
                <p className="text-gray-500 mb-8">
                  К сожалению, по заданным параметрам нет подходящих квартир. Оставьте заявку и наши менеджеры помогут вам с выбором
                </p>
                <div className="space-y-4">
                  <Link
                    to="/contacts"
                    className="text-center border border-accent text-accent px-20 py-4 transition-colors hover:bg-accent"
                  >
                    Оставить заявку
                  </Link>
                </div>
              </div>

               
            )} */}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
