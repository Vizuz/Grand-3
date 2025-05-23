import React, { useState } from 'react';
import { 
  Home, Building2, Users, FileText, BarChart3, 
  LogOut, Settings, Plus, Edit, Trash2, Eye 
} from 'lucide-react';
import ProjectsManager from './ProjectsManager';
import ApartmentsManager from './ApartmentsManager';
import ApplicationsManager from './ApplicationsManager';
import ContentManager from './ContentManager';
import AnalyticsPanel from './AnalyticsPanel';

export default function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');

  const menuItems = [
    { id: 'overview', label: 'Обзор', icon: Home },
    { id: 'projects', label: 'Проекты', icon: Building2 },
    { id: 'apartments', label: 'Квартиры', icon: Settings },
    { id: 'applications', label: 'Заявки', icon: FileText },
    { id: 'content', label: 'Контент', icon: Edit },
    { id: 'analytics', label: 'Аналитика', icon: BarChart3 },
  ];

  const stats = [
    { label: 'Всего проектов', value: '5', icon: Building2, color: 'bg-blue-500' },
    { label: 'Активных квартир', value: '6', icon: Home, color: 'bg-green-500' },
    { label: 'Новых заявок', value: '12', icon: FileText, color: 'bg-yellow-500' },
    { label: 'Просмотров сегодня', value: '234', icon: Eye, color: 'bg-purple-500' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'projects':
        return <ProjectsManager />;
      case 'apartments':
        return <ApartmentsManager />;
      case 'applications':
        return <ApplicationsManager />;
      case 'content':
        return <ContentManager />;
      case 'analytics':
        return <AnalyticsPanel />;
      default:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-primary-900 mb-6">Обзор системы</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mr-4`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                        <p className="text-2xl font-bold text-primary-900">{stat.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-primary-900 mb-4">Последние заявки</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Иван Петров', apartment: 'Кв. №12', time: '2 часа назад' },
                    { name: 'Мария Сидорова', apartment: 'Кв. №45', time: '4 часа назад' },
                    { name: 'Алексей Козлов', apartment: 'Кв. №78', time: '6 часов назад' },
                  ].map((app, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-primary-900">{app.name}</p>
                        <p className="text-sm text-gray-600">{app.apartment}</p>
                      </div>
                      <span className="text-xs text-gray-500">{app.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-primary-900 mb-4">Быстрые действия</h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => setActiveTab('apartments')}
                    className="w-full bg-accent hover:bg-accent-600 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Добавить квартиру
                  </button>
                  <button 
                    onClick={() => setActiveTab('projects')}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Добавить проект
                  </button>
                  <button 
                    onClick={() => setActiveTab('applications')}
                    className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Просмотреть заявки
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-900">GRAND</h1>
              <span className="ml-3 px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full">
                Админ-панель
              </span>
            </div>
            
            <button
              onClick={onLogout}
              className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Выйти
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white min-h-screen shadow-sm">
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? 'bg-accent text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
