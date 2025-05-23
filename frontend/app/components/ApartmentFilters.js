'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '../data/projectsData';

export default function ApartmentFilters({ filters, setFilters }) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleRoomsChange = (rooms) => {
    const newRooms = localFilters.rooms.includes(rooms)
      ? localFilters.rooms.filter(r => r !== rooms)
      : [...localFilters.rooms, rooms];
    
    const newFilters = { ...localFilters, rooms: newRooms };
    setLocalFilters(newFilters);
    setFilters(newFilters);
  };

  const handleRangeChange = (type, value) => {
    const newFilters = { ...localFilters, [type]: value };
    setLocalFilters(newFilters);
    setFilters(newFilters);
  };

  const handleProjectChange = (projectId) => {
    const newFilters = { 
      ...localFilters, 
      projectId: projectId === localFilters.projectId ? null : projectId 
    };
    setLocalFilters(newFilters);
    setFilters(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      rooms: [],
      priceRange: [20000000, 60000000],
      areaRange: [40, 100],
      floorRange: [1, 20],
      projectId: null
    };
    setLocalFilters(defaultFilters);
    setFilters(defaultFilters);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 0,
    }).format(price / 1000000) + ' млн ₸';
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-primary-900">Фильтры</h3>
        <button
          onClick={resetFilters}
          className="text-sm text-accent hover:text-accent-600 transition-colors"
        >
          Сбросить
        </button>
      </div>

      {/* Room Filter */}
      <div className="mb-6">
        <h4 className="font-semibold text-primary-900 mb-3">Количество комнат</h4>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4].map((rooms) => (
            <button
              key={rooms}
              onClick={() => handleRoomsChange(rooms)}
              className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                localFilters.rooms.includes(rooms)
                  ? 'border-accent bg-accent text-white'
                  : 'border-gray-200 text-gray-600 hover:border-accent hover:text-accent'
              }`}
            >
              {rooms} комн.
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-semibold text-primary-900 mb-3">
          Цена: {formatPrice(localFilters.priceRange[0])} - {formatPrice(localFilters.priceRange[1])}
        </h4>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Минимальная цена</label>
            <input
              type="range"
              min="20000000"
              max="60000000"
              step="1000000"
              value={localFilters.priceRange[0]}
              onChange={(e) => handleRangeChange('priceRange', [parseInt(e.target.value), localFilters.priceRange[1]])}
              className="w-full mt-2 accent-accent"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Максимальная цена</label>
            <input
              type="range"
              min="20000000"
              max="60000000"
              step="1000000"
              value={localFilters.priceRange[1]}
              onChange={(e) => handleRangeChange('priceRange', [localFilters.priceRange[0], parseInt(e.target.value)])}
              className="w-full mt-2 accent-accent"
            />
          </div>
        </div>
      </div>

      {/* Area Range */}
      <div className="mb-6">
        <h4 className="font-semibold text-primary-900 mb-3">
          Площадь: {localFilters.areaRange[0]} - {localFilters.areaRange[1]} м²
        </h4>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Минимальная площадь</label>
            <input
              type="range"
              min="40"
              max="120"
              step="5"
              value={localFilters.areaRange[0]}
              onChange={(e) => handleRangeChange('areaRange', [parseInt(e.target.value), localFilters.areaRange[1]])}
              className="w-full mt-2 accent-accent"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Максимальная площадь</label>
            <input
              type="range"
              min="40"
              max="120"
              step="5"
              value={localFilters.areaRange[1]}
              onChange={(e) => handleRangeChange('areaRange', [localFilters.areaRange[0], parseInt(e.target.value)])}
              className="w-full mt-2 accent-accent"
            />
          </div>
        </div>
      </div>

      {/* Floor Range */}
      <div className="mb-6">
        <h4 className="font-semibold text-primary-900 mb-3">
          Этаж: {localFilters.floorRange[0]} - {localFilters.floorRange[1]}
        </h4>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Минимальный этаж</label>
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={localFilters.floorRange[0]}
              onChange={(e) => handleRangeChange('floorRange', [parseInt(e.target.value), localFilters.floorRange[1]])}
              className="w-full mt-2 accent-accent"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Максимальный этаж</label>
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={localFilters.floorRange[1]}
              onChange={(e) => handleRangeChange('floorRange', [localFilters.floorRange[0], parseInt(e.target.value)])}
              className="w-full mt-2 accent-accent"
            />
          </div>
        </div>
      </div>

      {/* Project Filter */}
      <div className="mb-6">
        <h4 className="font-semibold text-primary-900 mb-3">Жилой комплекс</h4>
        <div className="space-y-2">
          {projectsData.map((project) => (
            <button
              key={project.id}
              onClick={() => handleProjectChange(project.id)}
              className={`w-full text-left px-3 py-2 rounded-lg border transition-all ${
                localFilters.projectId === project.id
                  ? 'border-accent bg-accent/5 text-accent'
                  : 'border-gray-200 text-gray-600 hover:border-accent hover:text-accent'
              }`}
            >
              <div className="font-medium">{project.name}</div>
              <div className="text-sm opacity-75">{project.address}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}