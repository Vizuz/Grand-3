import React, { useState } from 'react';
import { Eye, Phone, Mail, MessageCircle, Clock, CheckCircle, X } from 'lucide-react';

export default function ApplicationsManager() {
  const [applications, setApplications] = useState([
    {
      id: 1,
      name: 'Иван Петров',
      phone: '+7 (777) 123-45-67',
      email: 'ivan@example.com',
      message: 'Интересуюсь квартирой №12 в ЖК AQBIDAI 1. Можно ли посмотреть?',
      apartmentId: 1,
      apartmentNumber: '12',
      projectName: 'ЖК AQBIDAI 1',
      status: 'new',
      date: '2024-01-15 14:30',
      source: 'Контактная форма'
    },
    {
      id: 2,
      name: 'Мария Сидорова',
      phone: '+7 (707) 987-65-43',
      email: 'maria@example.com',
      message: 'Хочу узнать о возможностях ипотеки для квартиры №45',
      apartmentId: 2,
      apartmentNumber: '45',
      projectName: 'ЖК AQBIDAI 2',
      status: 'in_progress',
      date: '2024-01-15 12:15',
      source: 'Ипотечный калькулятор'
    },
    {
      id: 3,
      name: 'Алексей Козлов',
      phone: '+7 (771) 234-56-78',
      email: 'alexey@example.com',
      message: 'Интересует студия в новом проекте ЭДЕМ',
      apartmentId: 6,
      apartmentNumber: '101',
      projectName: 'ЖК ЭДЕМ',
      status: 'completed',
      date: '2024-01-14 16:45',
      source: 'Страница квартиры'
    },
    {
      id: 4,
      name: 'Елена Иванова',
      phone: '+7 (702) 345-67-89',
      email: 'elena@example.com',
      message: 'Планирую покупку в рассрочку. Какие условия?',
      apartmentId: null,
      apartmentNumber: null,
      projectName: 'Общий вопрос',
      status: 'new',
      date: '2024-01-15 10:20',
      source: 'Главная страница'
    }
  ]);

  const [selectedApp, setSelectedApp] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const statusConfig = {
    new: { label: 'Новая', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    in_progress: { label: 'В работе', color: 'bg-blue-100 text-blue-800', icon: MessageCircle },
    completed: { label: 'Завершена', color: 'bg-green-100 text-green-800', icon: CheckCircle }
  };

  const updateStatus = (id, newStatus) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
  };

  const deleteApplication = (id) => {
    if (window.confirm('Удалить заявку?')) {
      setApplications(applications.filter(app => app.id !== id));
    }
  };

  const filteredApplications = filterStatus === 'all' 
    ? applications 
    : applications.filter(app => app.status === filterStatus);

  const stats = {
    total: applications.length,
    new: applications.filter(app => app.status === 'new').length,
    in_progress: applications.filter(app => app.status === 'in_progress').length,
    completed: applications.filter(app => app.status === 'completed').length
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary-900">Заявки клиентов</h2>
        
        <div className="flex space-x-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="all">Все заявки</option>
            <option value="new">Новые</option>
            <option value="in_progress">В работе</option>
            <option value="completed">Завершённые</option>
          </select>
        </div>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-500 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold">#{stats.total}</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Всего заявок</p>
              <p className="text-2xl font-bold text-primary-900">{stats.total}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-yellow-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Новые</p>
              <p className="text-2xl font-bold text-primary-900">{stats.new}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <MessageCircle className="w-8 h-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">В работе</p>
              <p className="text-2xl font-bold text-primary-900">{stats.in_progress}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Завершённые</p>
              <p className="text-2xl font-bold text-primary-900">{stats.completed}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Список заявок */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Клиент
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Объект интереса
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Дата
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Статус
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredApplications.map((app) => {
                const StatusIcon = statusConfig[app.status].icon;
                return (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-primary-900">{app.name}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Phone className="w-3 h-3 mr-1" />
                          {app.phone}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {app.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{app.projectName}</div>
                      {app.apartmentNumber && (
                        <div className="text-sm text-gray-500">Квартира №{app.apartmentNumber}</div>
                      )}
                      <div className="text-xs text-gray-400">{app.source}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {app.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[app.status].color}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusConfig[app.status].label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Просмотреть"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        
                        {app.status === 'new' && (
                          <button
                            onClick={() => updateStatus(app.id, 'in_progress')}
                            className="text-yellow-600 hover:text-yellow-900"
                            title="Взять в работу"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </button>
                        )}
                        
                        {app.status === 'in_progress' && (
                          <button
                            onClick={() => updateStatus(app.id, 'completed')}
                            className="text-green-600 hover:text-green-900"
                            title="Завершить"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        
                        <button
                          onClick={() => deleteApplication(app.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Удалить"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Модальное окно детальной информации */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-primary-900">Заявка #{selectedApp.id}</h3>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Имя клиента</label>
                  <p className="text-gray-900">{selectedApp.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Дата заявки</label>
                  <p className="text-gray-900">{selectedApp.date}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Телефон</label>
                  <p className="text-gray-900">{selectedApp.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="text-gray-900">{selectedApp.email}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Объект интереса</label>
                <p className="text-gray-900">
                  {selectedApp.projectName}
                  {selectedApp.apartmentNumber && ` - Квартира №${selectedApp.apartmentNumber}`}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Сообщение</label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedApp.message}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Источник</label>
                <p className="text-gray-900">{selectedApp.source}</p>
              </div>
              
              <div className="flex space-x-3 pt-4">
                {selectedApp.status === 'new' && (
                  <button
                    onClick={() => {
                      updateStatus(selectedApp.id, 'in_progress');
                      setSelectedApp(null);
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Взять в работу
                  </button>
                )}
                
                {selectedApp.status === 'in_progress' && (
                  <button
                    onClick={() => {
                      updateStatus(selectedApp.id, 'completed');
                      setSelectedApp(null);
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                  >
                    Завершить
                  </button>
                )}
                
                <a
                  href={`tel:${selectedApp.phone}`}
                  className="bg-accent hover:bg-accent-600 text-white px-4 py-2 rounded-lg inline-flex items-center"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Позвонить
                </a>
                
                <a
                  href={`mailto:${selectedApp.email}`}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg inline-flex items-center"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Написать
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
