import React, { useState, useMemo, useEffect } from 'react';
import { useData } from '../context/DataContext';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function ApartmentFilters({ filters, setFilters }) {
  const { apartments = [] } = useData();

  // Для отладки
  useEffect(() => {
    console.log('→ пример данных apartments:', apartments.slice(0, 5));
  }, [apartments]);

  // Жилые комплексы — данные прямо в коде, с флагом soldOut
  const localProjects = [
    { id: 1, name: 'ЖК AQBIDAI 1', address: 'ул Акбидай 11А', soldOut: true },
    { id: 2, name: 'ЖК AQBIDAI 2', address: 'ул Акбидай 13Б', soldOut: true },
    { id: 3, name: 'ЖК AQBIDAI 3', address: 'ул Кенжетаева 18', soldOut: true },
    { id: 4, name: 'ЖК AQBIDAI 4', address: 'ул Кенжетаева 18', soldOut: false },
    { id: 5, name: 'ЖК Гармония',    address: 'ул Васильковский 18/2', soldOut: true },
    { id: 6, name: 'ЖК ЭДЕМ',        address: 'ул Васильковский 18/1', soldOut: false },
  ];

  // Цвета
  const primaryColor = '#242f3c';
  const accentColor  = '#ce9270';

  // Вычисляем реальные min/max для остальных фильтров
  const priceValues = useMemo(() => apartments.map(a => a.price), [apartments]);
  const areaValues  = useMemo(() => apartments.map(a => a.area),  [apartments]);
  const floorValues = useMemo(() => apartments.map(a => a.floor), [apartments]);
  const roomsValues = useMemo(
    () => [...new Set(apartments.map(a => a.rooms))].sort((a, b) => a - b),
    [apartments]
  );

  const priceMin = priceValues.length ? Math.min(...priceValues) : 0;
  const priceMax = priceValues.length ? Math.max(...priceValues) : 100_000_000;
  const areaMin  = areaValues.length  ? Math.min(...areaValues)  : 1;
  const areaMax  = areaValues.length  ? Math.max(...areaValues)  : 500;
  const floorMin = floorValues.length ? Math.min(...floorValues) : 1;
  const floorMax = floorValues.length ? Math.max(...floorValues) : 50;

  // Локальный стейт фильтров
  const [localFilters, setLocalFilters] = useState(null);

  // Инициализация
  useEffect(() => {
    if (apartments.length && !localFilters) {
      const df = {
        rooms:        [],
        priceRange:  [priceMin, priceMax],
        areaRange:   [areaMin, areaMax],
        floorRange:  [floorMin, floorMax],
        projectName: null,
      };
      setLocalFilters(df);
      setFilters(df);
    }
  }, [apartments, priceMin, priceMax, areaMin, areaMax, floorMin, floorMax]);

  // Синхронизация с внешними filters
  useEffect(() => {
    if (filters && localFilters) {
      setLocalFilters(filters);
    }
  }, [filters]);

  if (!localFilters) {
    return <div>Загрузка фильтров…</div>;
  }

  const resetFilters = () => {
    const df = {
      rooms:        [],
      priceRange:  [priceMin, priceMax],
      areaRange:   [areaMin, areaMax],
      floorRange:  [floorMin, floorMax],
      projectName: null,
    };
    setLocalFilters(df);
    setFilters(df);
  };

  const handleRangeChange = (type, vals) => {
    const up = { ...localFilters, [type]: vals };
    setLocalFilters(up);
    setFilters(up);
  };

  const handleRoomsChange = (rooms) => {
    const newRooms = localFilters.rooms.includes(rooms)
      ? localFilters.rooms.filter(r => r !== rooms)
      : [...localFilters.rooms, rooms];
    const up = { ...localFilters, rooms: newRooms };
    setLocalFilters(up);
    setFilters(up);
  };

  const handleProjectChange = (projName) => {
    const up = {
      ...localFilters,
      projectName: projName === localFilters.projectName ? null : projName
    };
    setLocalFilters(up);
    setFilters(up);
  };

  const formatPrice = (price) => {
    if (price >= 1_000_000) {
      return (price / 1_000_000)
        .toLocaleString('ru-RU', { maximumFractionDigits: 1 }) + ' млн ₸';
    }
    return price.toLocaleString('ru-RU') + ' ₸';
  };

  return (
    <div style={{ background: '#fff', padding: 24, color: primaryColor }}>
      {/* Заголовок */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h3 style={{ fontSize: 18, fontWeight: 500, margin: 0 }}>Фильтры</h3>
        <button
          onClick={resetFilters}
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: 14,
            color: accentColor,
            cursor: 'pointer'
          }}
        >
          Сбросить
        </button>
      </div>

      {/* Количество комнат */}
      <div style={{ marginBottom: 24 }}>
        <h4 style={{ fontSize: 16, fontWeight: 500, margin: '0 0 12px' }}>Количество комнат</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {roomsValues.map(rooms => {
            const active = localFilters.rooms.includes(rooms);
            return (
              <button
                key={rooms}
                onClick={() => handleRoomsChange(rooms)}
                style={{
                  fontSize: 14,
                  width: '50px',
                  height: '50px',
                  border: `1px solid ${active ? accentColor : '#ccc'}`,
                  background: active ? 'rgba(206,146,112,0.1)' : 'transparent',
                  color: active ? accentColor : primaryColor,
                  cursor: 'pointer',
                  transition: '0.2s'
                }}
              >
                {rooms}
              </button>
            );
          })}
        </div>
      </div>

      {/* Цена */}
      <div style={{ marginBottom: 24 }}>
        <h4 style={{ fontSize: 16, fontWeight: 500, margin: '0 0 12px' }}>
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
          railStyle={{ backgroundColor: '#eaeaea', height: 2 }}
          trackStyle={[{ backgroundColor: primaryColor, height: 2 }]}
          handleStyle={[
            {
              borderColor: primaryColor,
              width: 11,
              height: 11,
              borderRadius: '0%',
              backgroundColor: primaryColor,
              boxShadow: 'none',
              outline: 'none',
              opacity: 1,
            },
            {
              borderColor: primaryColor,
              width: 11,
              height: 11,
              borderRadius: '0%',
              backgroundColor: primaryColor,
              boxShadow: 'none',
              outline: 'none',
              opacity: 1,
            }
          ]}
        />
      </div>

      {/* Площадь */}
      <div style={{ marginBottom: 24 }}>
        <h4 style={{ fontSize: 16, fontWeight: 500, margin: '0 0 12px' }}>
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
          railStyle={{ backgroundColor: '#eaeaea', height: 2 }}
          trackStyle={[{ backgroundColor: primaryColor, height: 2 }]}
          handleStyle={[
            {
              borderColor: primaryColor,
              width: 11,
              height: 11,
              borderRadius: '0%',
              backgroundColor: primaryColor,
              boxShadow: 'none',
              outline: 'none',
              opacity: 1,
            },
            {
              borderColor: primaryColor,
              width: 11,
              height: 11,
              borderRadius: '0%',
              backgroundColor: primaryColor,
              boxShadow: 'none',
              outline: 'none',
              opacity: 1,
            }
          ]}
        />
      </div>

      {/* Этаж */}
      <div style={{ marginBottom: 24 }}>
        <h4 style={{ fontSize: 16, fontWeight: 500, margin: '0 0 12px' }}>
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
          railStyle={{ backgroundColor: '#eaeaea', height: 2 }}
          trackStyle={[{ backgroundColor: primaryColor, height: 2 }]}
          handleStyle={[
            {
              borderColor: primaryColor,
              width: 11,
              height: 11,
              borderRadius: '0%',
              backgroundColor: primaryColor,
              boxShadow: 'none',
              outline: 'none',
              opacity: 1,
            },
            {
              borderColor: primaryColor,
              width: 11,
              height: 11,
              borderRadius: '0%',
              backgroundColor: primaryColor,
              boxShadow: 'none',
              outline: 'none',
              opacity: 1,
            }
          ]}
        />
      </div>

      {/* Жилой комплекс */}
      <div style={{ marginBottom: 0 }}>
        <h4 style={{ fontSize: 16, fontWeight: 500, margin: '0 0 12px' }}>
          Жилой комплекс
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {localProjects.map(project => {
            const active = localFilters.projectName === project.name;
            return (
              <button
                key={project.id}
                onClick={() => handleProjectChange(project.name)}
                disabled={project.soldOut}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '8px 12px',
                  border: `1px solid ${active ? accentColor : '#ccc'}`,
                  background: active ? 'rgba(206,146,112,0.1)' : 'transparent',
                  color: project.soldOut ? '#999' : primaryColor,
                  cursor: project.soldOut ? 'not-allowed' : 'pointer',
                  opacity: project.soldOut ? 0.6 : 1,
                  transition: '0.2s'
                }}
              >
                <div style={{ fontWeight: 500 }}>{project.name}</div>
                <div style={{ fontSize: 14, opacity: 0.7 }}>{project.address}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
