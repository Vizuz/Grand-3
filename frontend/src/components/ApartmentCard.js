import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Home, Maximize, Building2, Star } from 'lucide-react';

export default function ApartmentCard({ apartment, viewMode = 'grid' }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'KZT',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatPricePerSqm = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover-lift">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-80 h-48 md:h-auto relative">
            <img
              src={apartment.photos[0]}
              alt={`Квартира №${apartment.number}`}
              className="w-full h-full object-cover"
            />
            {apartment.isNew && (
              <div className="absolute top-4 left-4">
                <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
                  НОВИНКА
                </span>
              </div>
            )}
          </div>
          
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-primary-900 mb-2">
                  Квартира №{apartment.number}
                </h3>
                <p className="text-accent font-semibold">{apartment.projectName}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary-900">
                  {formatPrice(apartment.price)}
                </div>
                <div className="text-sm text-gray-500">
                  {formatPricePerSqm(apartment.pricePerSqm)} ₸/м²
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center text-gray-600">
                <Home className="w-4 h-4 mr-2 text-accent" />
                <span>{apartment.rooms} комн.</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Maximize className="w-4 h-4 mr-2 text-accent" />
                <span>{apartment.area} м²</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Building2 className="w-4 h-4 mr-2 text-accent" />
                <span>{apartment.floor}/{apartment.totalFloors} этаж</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2 text-accent" />
                <span>Центр</span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">{apartment.description}</p>
            
            <div className="flex justify-between items-center">
              <div className="flex flex-wrap gap-2">
                {apartment.features.slice(0, 3).map((feature, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              
              <Link
                to={`/apartments/${apartment.id}`}
                className="bg-accent hover:bg-accent-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Подробнее
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover-lift">
      <div className="relative h-48">
        <img
          src={apartment.photos[0]}
          alt={`Квартира №${apartment.number}`}
          className="w-full h-full object-cover"
        />
        {apartment.isNew && (
          <div className="absolute top-4 left-4">
            <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
              НОВИНКА
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-primary-900 mb-1">
            Квартира №{apartment.number}
          </h3>
          <p className="text-accent font-semibold text-sm">{apartment.projectName}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div className="flex items-center text-gray-600">
            <Home className="w-4 h-4 mr-2 text-accent" />
            <span>{apartment.rooms} комн.</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Maximize className="w-4 h-4 mr-2 text-accent" />
            <span>{apartment.area} м²</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Building2 className="w-4 h-4 mr-2 text-accent" />
            <span>{apartment.floor}/{apartment.totalFloors} эт.</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Star className="w-4 h-4 mr-2 text-accent" />
            <span>Премиум</span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="text-2xl font-bold text-primary-900">
            {formatPrice(apartment.price)}
          </div>
          <div className="text-sm text-gray-500">
            {formatPricePerSqm(apartment.pricePerSqm)} ₸/м²
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {apartment.features.slice(0, 2).map((feature, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
            >
              {feature}
            </span>
          ))}
        </div>
        
        <Link
          to={`/apartments/${apartment.id}`}
          className="block w-full bg-accent hover:bg-accent-600 text-white text-center px-4 py-2 rounded-lg font-semibold transition-colors"
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
}