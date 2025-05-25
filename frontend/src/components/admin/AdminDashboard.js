import React, { useState } from 'react';
import { 
  Home, Building2, Users, FileText, BarChart3, 
  LogOut, Settings, Plus, Edit, Trash2, Eye 
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import ProjectsManager from './ProjectsManager';
import ApartmentsManager from './ApartmentsManager';
import ApplicationsManager from './ApplicationsManager';
import ContentManager from './ContentManager';
import AnalyticsPanel from './AnalyticsPanel';

export default function AdminDashboard({ onLogout }) {
  const { projects, apartments, applications, getAdminStats } = useData();
  const [activeTab, setActiveTab] = useState('overview');
  
  const stats = getAdminStats();

  const menuItems = [
    { id: 'overview', label: 'Обзор', icon: Home },
    { id: 'projects', label: 'Проекты', icon: Building2 },
    { id: 'apartments', label: 'Квартиры', icon: Settings },
    { id: 'applications', label: 'Заявки', icon: FileText },
    { id: 'content', label: 'Контент', icon: Edit },
    { id: 'analytics', label: 'Аналитика', icon: BarChart3 },
  ];

  const dashboardStats = [
    { 
      label: 'Всего проектов', 
      value: stats.totalProjects, 
      icon: Building2, 
      color: 'bg-blue-500' 
    },
    { 
      label: 'Доступных квартир', 
      value: stats.availableApartments, 
      icon: Home, 
      color: 'bg-green-500' 
    },
    { 
      label: 'Новых заявок', 
      value: stats.newApplications, 
      icon: FileText, 
      color: 'bg-yellow-500' 
    },
    { 
      label: 'Посетителей всего', 
      value: stats.totalVisitors, 
      icon: Eye, 
      color: 'bg-purple-500' 
    },
  ];

  const recentApplications = applications
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3)
    .map(app => ({
      name: app.name,
      apartment: app.apartmentNumber ? `Кв. №${app.apartmentNumber}` : 'Общий вопрос',
      time: new Date(app.date).toLocaleString('ru-RU', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      })
    }));

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
                {dashboardStats.map((stat, index) => (
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
                {recentApplications.length > 0 ? (
                  <div className="space-y-3">
                    {recentApplications.map((app, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-primary-900">{app.name}</p>
                          <p className="text-sm text-gray-600">{app.apartment}</p>
                        </div>
                        <span className="text-xs text-gray-500">{app.time}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">Заявок пока нет</p>
                )}
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
                    Просмотреть заявки ({stats.newApplications} новых)
                  </button>
                </div>
              </div>
            </div>

            {/* Аналитика в реальном времени */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-4">Аналитика в реальном времени</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{stats.totalPageViews}</div>
                  <div className="text-sm text-gray-600">Просмотров страниц</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">{stats.totalLeads}</div>
                  <div className="text-sm text-gray-600">Лидов всего</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-1">{stats.totalConversions}</div>
                  <div className="text-sm text-gray-600">Конверсий</div>
                </div>
                
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600 mb-1">{stats.conversionRate}%</div>
                  <div className="text-sm text-gray-600">Конверсия</div>
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
                    {item.id === 'applications' && stats.newApplications > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {stats.newApplications}
                      </span>
                    )}
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
