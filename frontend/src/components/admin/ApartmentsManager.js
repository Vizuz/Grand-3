import React, { useState } from 'react';
import { Plus, Edit, Trash2, Home, Maximize, Building2 } from 'lucide-react';
import { apartmentsData, projectsData } from '../../data/projectsData';

export default function ApartmentsManager() {
  const [apartments, setApartments] = useState(apartmentsData);
  const [showForm, setShowForm] = useState(false);
  const [editingApartment, setEditingApartment] = useState(null);
  const [formData, setFormData] = useState({
    projectId: '',
    projectName: '',
    number: '',
    rooms: '',
    area: '',
    floor: '',
    totalFloors: '',
    price: '',
    pricePerSqm: '',
    layoutImage: '',
    photos: '',
    features: '',
    description: '',
    isNew: false,
    available: true
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'KZT',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const selectedProject = projectsData.find(p => p.id === parseInt(formData.projectId));
    
    const apartmentData = {
      ...formData,
      id: editingApartment ? editingApartment.id : Date.now(),
      projectId: parseInt(formData.projectId),
      projectName: selectedProject ? selectedProject.name : '',
      rooms: parseInt(formData.rooms),
      area: parseFloat(formData.area),
      floor: parseInt(formData.floor),
      totalFloors: parseInt(formData.totalFloors),
      price: parseInt(formData.price),
      pricePerSqm: Math.round(parseInt(formData.price) / parseFloat(formData.area)),
      photos: formData.photos.split(',').map(p => p.trim()).filter(p => p),
      features: formData.features.split(',').map(f => f.trim()).filter(f => f)
    };

    if (editingApartment) {
      setApartments(apartments.map(a => a.id === editingApartment.id ? apartmentData : a));
    } else {
      setApartments([...apartments, apartmentData]);
    }

    setShowForm(false);
    setEditingApartment(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      projectId: '', projectName: '', number: '', rooms: '', area: '', floor: '',
      totalFloors: '', price: '', pricePerSqm: '', layoutImage: '', photos: '',
      features: '', description: '', isNew: false, available: true
    });
  };

  const handleEdit = (apartment) => {
    setEditingApartment(apartment);
    setFormData({
      ...apartment,
      photos: apartment.photos.join(', '),
      features: apartment.features.join(', ')
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Удалить квартиру?')) {
      setApartments(apartments.filter(a => a.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary-900">Управление квартирами</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-accent hover:bg-accent-600 text-white px-4 py-2 rounded-lg font-medium flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Добавить квартиру
        </button>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <Home className="w-8 h-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Всего квартир</p>
              <p className="text-2xl font-bold text-primary-900">{apartments.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <Building2 className="w-8 h-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Доступных</p>
              <p className="text-2xl font-bold text-primary-900">
                {apartments.filter(a => a.available !== false).length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <Maximize className="w-8 h-8 text-purple-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Средняя площадь</p>
              <p className="text-2xl font-bold text-primary-900">
                {Math.round(apartments.reduce((sum, a) => sum + a.area, 0) / apartments.length)} м²
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 text-accent mr-3 text-xl font-bold">₸</div>
            <div>
              <p className="text-sm text-gray-600">Средняя цена</p>
              <p className="text-lg font-bold text-primary-900">
                {Math.round(apartments.reduce((sum, a) => sum + a.price, 0) / apartments.length / 1000000)} млн
              </p>
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
            <h3 className="text-xl font-bold text-primary-900 mb-4">
              {editingApartment ? 'Редактировать квартиру' : 'Добавить квартиру'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Проект</label>
                  <select
                    value={formData.projectId}
                    onChange={(e) => setFormData({...formData, projectId: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  >
                    <option value="">Выберите проект</option>
                    {projectsData.map(project => (
                      <option key={project.id} value={project.id}>{project.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Номер квартиры</label>
                  <input
                    type="text"
                    value={formData.number}
                    onChange={(e) => setFormData({...formData, number: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Комнат</label>
                  <input
                    type="number"
                    value={formData.rooms}
                    onChange={(e) => setFormData({...formData, rooms: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Площадь (м²)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.area}
                    onChange={(e) => setFormData({...formData, area: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Этаж</label>
                  <input
                    type="number"
                    value={formData.floor}
                    onChange={(e) => setFormData({...formData, floor: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Всего этажей</label>
                  <input
                    type="number"
                    value={formData.totalFloors}
                    onChange={(e) => setFormData({...formData, totalFloors: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Цена (₸)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Фотографии (URL через запятую)</label>
                <input
                  type="text"
                  value={formData.photos}
                  onChange={(e) => setFormData({...formData, photos: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="https://example.com/photo1.jpg, https://example.com/photo2.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Описание</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  rows="3"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Особенности (через запятую)</label>
                <input
                  type="text"
                  value={formData.features}
                  onChange={(e) => setFormData({...formData, features: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Панорамные окна, Балкон, Кухня-гостиная"
                />
              </div>

              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isNew}
                    onChange={(e) => setFormData({...formData, isNew: e.target.checked})}
                    className="mr-2"
                  />
                  Новинка
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.available}
                    onChange={(e) => setFormData({...formData, available: e.target.checked})}
                    className="mr-2"
                  />
                  Доступна
                </label>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="bg-accent hover:bg-accent-600 text-white px-6 py-2 rounded-lg font-medium"
                >
                  {editingApartment ? 'Сохранить' : 'Добавить'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingApartment(null);
                  }}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium"
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Список квартир */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Квартира
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Проект
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Характеристики
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Цена
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
              {apartments.map((apartment) => (
                <tr key={apartment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={apartment.photos[0]}
                        alt={`Квартира №${apartment.number}`}
                        className="w-12 h-12 rounded-lg object-cover mr-3"
                      />
                      <div>
                        <div className="text-sm font-medium text-primary-900">
                          Квартира №{apartment.number}
                        </div>
                        <div className="text-sm text-gray-500">
                          {apartment.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {apartment.projectName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>{apartment.rooms} комн.</div>
                    <div>{apartment.area} м²</div>
                    <div>{apartment.floor}/{apartment.totalFloors} эт.</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-primary-900">
                      {formatPrice(apartment.price)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Intl.NumberFormat('ru-RU').format(apartment.pricePerSqm)} ₸/м²
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      {apartment.isNew && (
                        <span className="px-2 py-1 text-xs bg-accent text-white rounded-full">
                          Новинка
                        </span>
                      )}
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        apartment.available !== false 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {apartment.available !== false ? 'Доступна' : 'Продана'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(apartment)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(apartment.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
