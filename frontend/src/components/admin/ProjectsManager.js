import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Building2, MapPin } from 'lucide-react';
import { projectsData } from '../../data/projectsData';

export default function ProjectsManager() {
  const [projects, setProjects] = useState(projectsData);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    status: '',
    image: '',
    description: '',
    totalApartments: '',
    floors: '',
    completion: '',
    features: '',
    isNew: false,
    bookingOpen: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const projectData = {
      ...formData,
      id: editingProject ? editingProject.id : Date.now(),
      features: formData.features.split(',').map(f => f.trim()),
      totalApartments: parseInt(formData.totalApartments),
      floors: parseInt(formData.floors)
    };

    if (editingProject) {
      setProjects(projects.map(p => p.id === editingProject.id ? projectData : p));
    } else {
      setProjects([...projects, projectData]);
    }

    setShowForm(false);
    setEditingProject(null);
    setFormData({
      name: '', address: '', status: '', image: '', description: '',
      totalApartments: '', floors: '', completion: '', features: '',
      isNew: false, bookingOpen: false
    });
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      ...project,
      features: project.features.join(', ')
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Удалить проект?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary-900">Управление проектами</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-accent hover:bg-accent-600 text-white px-4 py-2 rounded-lg font-medium flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Добавить проект
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
            <h3 className="text-xl font-bold text-primary-900 mb-4">
              {editingProject ? 'Редактировать проект' : 'Добавить проект'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Название</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Адрес</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Статус</label>
                  <input
                    type="text"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Квартир</label>
                  <input
                    type="number"
                    value={formData.totalApartments}
                    onChange={(e) => setFormData({...formData, totalApartments: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Этажей</label>
                  <input
                    type="number"
                    value={formData.floors}
                    onChange={(e) => setFormData({...formData, floors: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Изображение URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
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
                  placeholder="Подземная парковка, Детская площадка, Фитнес-зал"
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
                    checked={formData.bookingOpen}
                    onChange={(e) => setFormData({...formData, bookingOpen: e.target.checked})}
                    className="mr-2"
                  />
                  Открыто бронирование
                </label>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="bg-accent hover:bg-accent-600 text-white px-6 py-2 rounded-lg font-medium"
                >
                  {editingProject ? 'Сохранить' : 'Добавить'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingProject(null);
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

      <div className="grid gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex">
              <div className="w-48 h-32">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-primary-900 mb-2">
                      {project.name}
                      {project.isNew && (
                        <span className="ml-2 px-2 py-1 bg-accent text-white text-xs rounded-full">
                          НОВИНКА
                        </span>
                      )}
                    </h3>
                    
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-2" />
                      {project.address}
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-3">
                      <Building2 className="w-4 h-4 mr-2" />
                      {project.totalApartments} квартир, {project.floors} этажей
                    </div>
                    
                    <p className="text-gray-700 mb-2">{project.description}</p>
                    <p className="text-sm text-gray-500">{project.status}</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
