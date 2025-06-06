import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function ApartmentFilters({ filters, setFilters }) {
  const { apartments = [], projects = [] } = useData();
  const [localFilters, setLocalFilters] = useState(filters);

  // Собираем min/max для динамики
  const priceValues = useMemo(() => apartments.map(a => a.price), [apartments]);
  const areaValues = useMemo(() => apartments.map(a => a.area), [apartments]);
  const floorValues = useMemo(() => apartments.map(a => a.floor), [apartments]);
  const roomsValues = useMemo(() => [...new Set(apartments.map(a => a.rooms))].sort((a, b) => a - b), [apartments]);

  const priceMin = priceValues.length ? Math.min(...priceValues) : 0;
  const priceMax = priceValues.length ? Math.max(...priceValues) : 100_000_000;
  const areaMin = areaValues.length ? Math.min(...areaValues) : 1;
  const areaMax = areaValues.length ? Math.max(...areaValues) : 500;
  const floorMin = floorValues.length ? Math.min(...floorValues) : 1;
  const floorMax = floorValues.length ? Math.max(...floorValues) : 50;

  const handleRangeChange = (type, values) => {
    const updated = { ...localFilters, [type]: values };
    setLocalFilters(updated);
    setFilters(updated);
  };

  const handleRoomsChange = (rooms) => {
    const newRooms = localFilters.rooms.includes(rooms)
      ? localFilters.rooms.filter(r => r !== rooms)
      : [...localFilters.rooms, rooms];
    const newFilters = { ...localFilters, rooms: newRooms };
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
      priceRange: [priceMin, priceMax],
      areaRange: [areaMin, areaMax],
      floorRange: [floorMin, floorMax],
      projectId: null
    };
    setLocalFilters(defaultFilters);
    setFilters(defaultFilters);
  };

  const formatPrice = (price) => {
    if (price >= 1_000_000) {
      return (price / 1_000_000).toLocaleString('ru-RU', { maximumFractionDigits: 1 }) + ' млн ₸';
    }
    return price.toLocaleString('ru-RU') + ' ₸';
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
          {roomsValues.map((rooms) => (
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

      {/* Цена */}
      <div className="mb-6">
        <h4 className="font-semibold text-primary-900 mb-3">
          Цена: {formatPrice(localFilters.priceRange[0])} — {formatPrice(localFilters.priceRange[1])}
        </h4>
        <Slider
          range
          min={priceMin}
          max={priceMax}
          step={100000}
          value={localFilters.priceRange}
          onChange={vals => handleRangeChange('priceRange', vals)}
          allowCross={false}
          railStyle={{ backgroundColor: "#f1f5f9", height: 6 }}
          trackStyle={[{ backgroundColor: "#ea9600", height: 6 }]}
          handleStyle={[
            { borderColor: "#ea9600", backgroundColor: "#fff", height: 20, width: 20 },
            { borderColor: "#ea9600", backgroundColor: "#fff", height: 20, width: 20 }
          ]}
        />
      </div>

      {/* Площадь */}
      <div className="mb-6">
        <h4 className="font-semibold text-primary-900 mb-3">
          Площадь: {localFilters.areaRange[0]} — {localFilters.areaRange[1]} м²
        </h4>
        <Slider
          range
          min={areaMin}
          max={areaMax}
          step={1}
          value={localFilters.areaRange}
          onChange={vals => handleRangeChange('areaRange', vals)}
          allowCross={false}
          railStyle={{ backgroundColor: "#f1f5f9", height: 6 }}
          trackStyle={[{ backgroundColor: "#ea9600", height: 6 }]}
          handleStyle={[
            { borderColor: "#ea9600", backgroundColor: "#fff", height: 20, width: 20 },
            { borderColor: "#ea9600", backgroundColor: "#fff", height: 20, width: 20 }
          ]}
        />
      </div>

      {/* Этаж */}
      <div className="mb-6">
        <h4 className="font-semibold text-primary-900 mb-3">
          Этаж: {localFilters.floorRange[0]} — {localFilters.floorRange[1]}
        </h4>
        <Slider
          range
          min={floorMin}
          max={floorMax}
          step={1}
          value={localFilters.floorRange}
          onChange={vals => handleRangeChange('floorRange', vals)}
          allowCross={false}
          railStyle={{ backgroundColor: "#f1f5f9", height: 6 }}
          trackStyle={[{ backgroundColor: "#ea9600", height: 6 }]}
          handleStyle={[
            { borderColor: "#ea9600", backgroundColor: "#fff", height: 20, width: 20 },
            { borderColor: "#ea9600", backgroundColor: "#fff", height: 20, width: 20 }
          ]}
        />
      </div>

      {/* Project Filter */}
      <div className="mb-6">
        <h4 className="font-semibold text-primary-900 mb-3">Жилой комплекс</h4>
        <div className="space-y-2">
          {projects.map((project) => (
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