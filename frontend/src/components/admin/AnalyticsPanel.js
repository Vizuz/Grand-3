import React, { useState } from 'react';
import { TrendingUp, Users, Eye, Phone, Building2, Home, Calendar, Download } from 'lucide-react';

export default function AnalyticsPanel() {
  const [timeRange, setTimeRange] = useState('week');

  // Примерные данные аналитики
  const stats = {
    visitors: { value: 1234, change: '+12%', trend: 'up' },
    pageViews: { value: 5678, change: '+8%', trend: 'up' },
    leads: { value: 45, change: '+25%', trend: 'up' },
    conversions: { value: 12, change: '+15%', trend: 'up' }
  };

  const topPages = [
    { page: 'Главная страница', views: 1234, percentage: 35 },
    { page: 'Каталог квартир', views: 980, percentage: 28 },
    { page: 'Квартира №12 (ЖК AQBIDAI 1)', views: 567, percentage: 16 },
    { page: 'О компании', views: 345, percentage: 10 },
    { page: 'Контакты', views: 234, percentage: 7 },
    { page: 'Квартира №45 (ЖК AQBIDAI 2)', views: 156, percentage: 4 }
  ];

  const popularApartments = [
    { id: 1, number: '12', project: 'ЖК AQBIDAI 1', views: 567, leads: 8 },
    { id: 2, number: '45', project: 'ЖК AQBIDAI 2', views: 456, leads: 6 },
    { id: 6, number: '101', project: 'ЖК ЭДЕМ', views: 389, leads: 12 },
    { id: 3, number: '78', project: 'ЖК AQBIDAI 3', views: 234, leads: 4 },
    { id: 5, number: '15', project: 'ЖК Гармония', views: 189, leads: 3 }
  ];

  const trafficSources = [
    { source: 'Прямые переходы', visits: 456, percentage: 38 },
    { source: 'Google поиск', visits: 389, percentage: 32 },
    { source: 'Социальные сети', visits: 234, percentage: 19 },
    { source: 'Реферальные ссылки', visits: 134, percentage: 11 }
  ];

  const weeklyData = [
    { day: 'Пн', visitors: 45, leads: 3 },
    { day: 'Вт', visitors: 52, leads: 4 },
    { day: 'Ср', visitors: 48, leads: 2 },
    { day: 'Чт', visitors: 61, leads: 7 },
    { day: 'Пт', visitors: 55, leads: 5 },
    { day: 'Сб', visitors: 38, leads: 2 },
    { day: 'Вс', visitors: 34, leads: 1 }
  ];

  const exportData = () => {
    alert('Экспорт отчёта начался! Файл будет готов через несколько минут.');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary-900">Аналитика</h2>
        
        <div className="flex space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="day">Сегодня</option>
            <option value="week">Неделя</option>
            <option value="month">Месяц</option>
            <option value="quarter">Квартал</option>
          </select>
          
          <button
            onClick={exportData}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Экспорт
          </button>
        </div>
      </div>

      {/* Основная статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Посетители</p>
              <p className="text-2xl font-bold text-primary-900">{stats.visitors.value}</p>
              <p className="text-sm text-green-500">{stats.visitors.change}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Просмотры</p>
              <p className="text-2xl font-bold text-primary-900">{stats.pageViews.value}</p>
              <p className="text-sm text-green-500">{stats.pageViews.change}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mr-4">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Лиды</p>
              <p className="text-2xl font-bold text-primary-900">{stats.leads.value}</p>
              <p className="text-sm text-green-500">{stats.leads.change}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Конверсии</p>
              <p className="text-2xl font-bold text-primary-900">{stats.conversions.value}</p>
              <p className="text-sm text-green-500">{stats.conversions.change}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* График активности по дням */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-primary-900 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Активность по дням недели
          </h3>
          
          <div className="space-y-3">
            {weeklyData.map((day, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 w-8">{day.day}</span>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(day.visitors / 70) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-primary-900">{day.visitors}</div>
                  <div className="text-xs text-gray-500">{day.leads} лидов</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Источники трафика */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-primary-900 mb-4">Источники трафика</h3>
          
          <div className="space-y-4">
            {trafficSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{source.source}</span>
                    <span className="text-sm text-gray-500">{source.visits} визитов</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-accent h-2 rounded-full" 
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <span className="ml-4 text-sm font-semibold text-primary-900">{source.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Популярные страницы */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-primary-900 mb-4">Популярные страницы</h3>
          
          <div className="space-y-3">
            {topPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="text-sm font-medium text-primary-900">{page.page}</div>
                  <div className="text-xs text-gray-500">{page.views} просмотров</div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-accent">{page.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Популярные квартиры */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-primary-900 mb-4 flex items-center">
            <Home className="w-5 h-5 mr-2" />
            Популярные квартиры
          </h3>
          
          <div className="space-y-3">
            {popularApartments.map((apartment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-xs font-bold">#{apartment.number}</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-primary-900">
                      Квартира №{apartment.number}
                    </div>
                    <div className="text-xs text-gray-500">{apartment.project}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-primary-900">{apartment.views}</div>
                  <div className="text-xs text-green-600">{apartment.leads} лидов</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Дополнительная информация */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-primary-900 mb-4">Ключевые метрики</h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-2">3.4%</div>
            <div className="text-sm text-gray-600">Конверсия в лиды</div>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-2">2:34</div>
            <div className="text-sm text-gray-600">Среднее время на сайте</div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-2">4.2</div>
            <div className="text-sm text-gray-600">Страниц за сессию</div>
          </div>
        </div>
      </div>
    </div>
  );
}
