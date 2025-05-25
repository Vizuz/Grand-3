import React, { useState } from 'react';
import { Save, Edit, Plus, Trash2, User } from 'lucide-react';

export default function ContentManager() {
  const [activeSection, setActiveSection] = useState('company');
  
  const [companyInfo, setCompanyInfo] = useState({
    title: 'О компании GRAND',
    description: 'Уже более 15 лет мы создаём элитную недвижимость, объединяя традиции качественного строительства с современными технологиями',
    story: 'Компания GRAND была основана в 2008 году с одной простой, но амбициозной целью — создавать жильё премиум-класса, которое станет настоящим домом для наших клиентов.',
    mission: 'Мы создаём не просто дома — мы создаём пространства для счастливой жизни'
  });

  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: 'Алексей Петров',
      position: 'Генеральный директор',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?crop=face&w=300&h=300',
      experience: '20 лет в строительстве'
    },
    {
      id: 2,
      name: 'Мария Иванова',
      position: 'Главный архитектор',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?crop=face&w=300&h=300',
      experience: '15 лет проектирования'
    },
    {
      id: 3,
      name: 'Дмитрий Козлов',
      position: 'Руководитель отдела продаж',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?crop=face&w=300&h=300',
      experience: '12 лет в недвижимости'
    }
  ]);

  const [faqItems, setFaqItems] = useState([
    {
      id: 1,
      question: 'Какие документы нужны для покупки квартиры?',
      answer: 'Для покупки квартиры потребуется паспорт, справка о доходах и справка об отсутствии задолженностей. Наши специалисты помогут подготовить все необходимые документы.'
    },
    {
      id: 2,
      question: 'Возможна ли покупка в рассрочку?',
      answer: 'Да, мы предлагаем гибкие условия рассрочки. Первоначальный взнос от 30%, срок рассрочки до 24 месяцев без процентов.'
    },
    {
      id: 3,
      question: 'Помогаете ли вы с ипотекой?',
      answer: 'Конечно! Мы сотрудничаем с ведущими банками и поможем оформить ипотеку на выгодных условиях. Наши специалисты сопровождают весь процесс оформления.'
    },
    {
      id: 4,
      question: 'Можно ли посмотреть квартиру перед покупкой?',
      answer: 'Обязательно! Мы организуем показ квартир в удобное для вас время. Также доступны виртуальные туры по нашим объектам.'
    }
  ]);

  const [showTeamForm, setShowTeamForm] = useState(false);
  const [showFaqForm, setShowFaqForm] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const [editingFaq, setEditingFaq] = useState(null);

  const [teamForm, setTeamForm] = useState({
    name: '', position: '', image: '', experience: ''
  });

  const [faqForm, setFaqForm] = useState({
    question: '', answer: ''
  });

  const handleCompanySubmit = (e) => {
    e.preventDefault();
    alert('Информация о компании сохранена!');
  };

  const handleTeamSubmit = (e) => {
    e.preventDefault();
    
    if (editingTeam) {
      setTeamMembers(teamMembers.map(member => 
        member.id === editingTeam.id ? { ...teamForm, id: editingTeam.id } : member
      ));
    } else {
      setTeamMembers([...teamMembers, { ...teamForm, id: Date.now() }]);
    }
    
    setShowTeamForm(false);
    setEditingTeam(null);
    setTeamForm({ name: '', position: '', image: '', experience: '' });
  };

  const handleFaqSubmit = (e) => {
    e.preventDefault();
    
    if (editingFaq) {
      setFaqItems(faqItems.map(item => 
        item.id === editingFaq.id ? { ...faqForm, id: editingFaq.id } : item
      ));
    } else {
      setFaqItems([...faqItems, { ...faqForm, id: Date.now() }]);
    }
    
    setShowFaqForm(false);
    setEditingFaq(null);
    setFaqForm({ question: '', answer: '' });
  };

  const editTeamMember = (member) => {
    setEditingTeam(member);
    setTeamForm(member);
    setShowTeamForm(true);
  };

  const deleteTeamMember = (id) => {
    if (window.confirm('Удалить сотрудника?')) {
      setTeamMembers(teamMembers.filter(member => member.id !== id));
    }
  };

  const editFaqItem = (item) => {
    setEditingFaq(item);
    setFaqForm(item);
    setShowFaqForm(true);
  };

  const deleteFaqItem = (id) => {
    if (window.confirm('Удалить вопрос?')) {
      setFaqItems(faqItems.filter(item => item.id !== id));
    }
  };

  const sections = [
    { id: 'company', label: 'Информация о компании' },
    { id: 'team', label: 'Команда' },
    { id: 'faq', label: 'FAQ' }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary-900">Управление контентом</h2>

      {/* Навигация по разделам */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeSection === section.id
                  ? 'border-accent text-accent'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Информация о компании */}
      {activeSection === 'company' && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleCompanySubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Заголовок страницы "О компании"
              </label>
              <input
                type="text"
                value={companyInfo.title}
                onChange={(e) => setCompanyInfo({...companyInfo, title: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Краткое описание
              </label>
              <textarea
                value={companyInfo.description}
                onChange={(e) => setCompanyInfo({...companyInfo, description: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                rows="3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                История компании
              </label>
              <textarea
                value={companyInfo.story}
                onChange={(e) => setCompanyInfo({...companyInfo, story: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                rows="5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Миссия компании
              </label>
              <textarea
                value={companyInfo.mission}
                onChange={(e) => setCompanyInfo({...companyInfo, mission: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                rows="2"
              />
            </div>

            <button
              type="submit"
              className="bg-accent hover:bg-accent-600 text-white px-6 py-2 rounded-lg font-medium flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              Сохранить изменения
            </button>
          </form>
        </div>
      )}

      {/* Команда */}
      {activeSection === 'team' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-primary-900">Команда</h3>
            <button
              onClick={() => setShowTeamForm(true)}
              className="bg-accent hover:bg-accent-600 text-white px-4 py-2 rounded-lg font-medium flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Добавить сотрудника
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h4 className="text-lg font-semibold text-primary-900 mb-1">{member.name}</h4>
                  <p className="text-accent font-medium mb-2">{member.position}</p>
                  <p className="text-sm text-gray-600 mb-4">{member.experience}</p>
                  
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => editTeamMember(member)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteTeamMember(member.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Форма добавления/редактирования сотрудника */}
          {showTeamForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-xl font-bold text-primary-900 mb-4">
                  {editingTeam ? 'Редактировать сотрудника' : 'Добавить сотрудника'}
                </h3>
                
                <form onSubmit={handleTeamSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
                    <input
                      type="text"
                      value={teamForm.name}
                      onChange={(e) => setTeamForm({...teamForm, name: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Должность</label>
                    <input
                      type="text"
                      value={teamForm.position}
                      onChange={(e) => setTeamForm({...teamForm, position: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Фото (URL)</label>
                    <input
                      type="url"
                      value={teamForm.image}
                      onChange={(e) => setTeamForm({...teamForm, image: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Опыт</label>
                    <input
                      type="text"
                      value={teamForm.experience}
                      onChange={(e) => setTeamForm({...teamForm, experience: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      placeholder="15 лет в строительстве"
                      required
                    />
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="submit"
                      className="bg-accent hover:bg-accent-600 text-white px-4 py-2 rounded-lg font-medium"
                    >
                      {editingTeam ? 'Сохранить' : 'Добавить'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowTeamForm(false);
                        setEditingTeam(null);
                        setTeamForm({ name: '', position: '', image: '', experience: '' });
                      }}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium"
                    >
                      Отмена
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* FAQ */}
      {activeSection === 'faq' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-primary-900">Часто задаваемые вопросы</h3>
            <button
              onClick={() => setShowFaqForm(true)}
              className="bg-accent hover:bg-accent-600 text-white px-4 py-2 rounded-lg font-medium flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Добавить вопрос
            </button>
          </div>

          <div className="space-y-4">
            {faqItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-primary-900 mb-2">{item.question}</h4>
                    <p className="text-gray-700">{item.answer}</p>
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => editFaqItem(item)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteFaqItem(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Форма добавления/редактирования FAQ */}
          {showFaqForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                <h3 className="text-xl font-bold text-primary-900 mb-4">
                  {editingFaq ? 'Редактировать вопрос' : 'Добавить вопрос'}
                </h3>
                
                <form onSubmit={handleFaqSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Вопрос</label>
                    <input
                      type="text"
                      value={faqForm.question}
                      onChange={(e) => setFaqForm({...faqForm, question: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ответ</label>
                    <textarea
                      value={faqForm.answer}
                      onChange={(e) => setFaqForm({...faqForm, answer: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      rows="4"
                      required
                    />
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="submit"
                      className="bg-accent hover:bg-accent-600 text-white px-4 py-2 rounded-lg font-medium"
                    >
                      {editingFaq ? 'Сохранить' : 'Добавить'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowFaqForm(false);
                        setEditingFaq(null);
                        setFaqForm({ question: '', answer: '' });
                      }}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium"
                    >
                      Отмена
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
