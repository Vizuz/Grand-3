// Центральная система управления данными
class DataService {
  constructor() {
    this.initializeData();
    this.initializeAnalytics();
  }

  // Инициализация данных
  initializeData() {
    // Если данных нет в localStorage, создаём начальные
    if (!localStorage.getItem('grand_projects')) {
      this.resetToDefaults();
    }
  }

  // Сброс к начальным данным
  resetToDefaults() {
    const initialProjects = [
      {
        id: 1,
        name: 'ЖК AQBIDAI 1',
        address: 'ул. Акбидай 11А',
        status: 'Сдан в 2022',
        image: 'https://images.pexels.com/photos/323772/pexels-photo-323772.jpeg',
        description: 'Первый жилой комплекс премиум-класса в районе Акбидай',
        totalApartments: 120,
        floors: 9,
        completion: '2022',
        features: ['Подземная парковка', 'Детская площадка', 'Фитнес-зал']
      },
      {
        id: 2,
        name: 'ЖК AQBIDAI 2',
        address: 'ул. Акбидай 113Б',
        status: 'Сдан в 2023',
        image: 'https://images.unsplash.com/photo-1519662978799-2f05096d3636?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmV8ZW58MHx8fHwxNzQ4MDE1MTk5fDA&ixlib=rb-4.1.0&q=85',
        description: 'Продолжение успешного проекта с улучшенной планировкой',
        totalApartments: 150,
        floors: 12,
        completion: '2023',
        features: ['SPA-зона', 'Кафе на первом этаже', 'Консьерж-сервис']
      },
      {
        id: 3,
        name: 'ЖК AQBIDAI 3',
        address: 'ул. Кенжетаева 18',
        status: 'Введён в эксплуатацию август 2024',
        image: 'https://images.unsplash.com/photo-1574848296471-28f79a036f79?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmV8ZW58MHx8fHwxNzQ4MDE1MTk5fDA&ixlib=rb-4.1.0&q=85',
        description: 'Самый современный комплекс с инновационными решениями',
        totalApartments: 180,
        floors: 16,
        completion: '2024',
        features: ['Умный дом', 'Панорамное остекление', 'Крытый бассейн']
      },
      {
        id: 4,
        name: 'ЖК Гармония',
        address: 'мкр. Васильковский 18/2',
        status: 'Сдан в 2022',
        image: 'https://images.unsplash.com/photo-1546349851-64285be8e9fa?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmV8ZW58MHx8fHwxNzQ4MDE1MTk5fDA&ixlib=rb-4.1.0&q=85',
        description: 'Жилой комплекс в тихом районе с развитой инфраструктурой',
        totalApartments: 90,
        floors: 8,
        completion: '2022',
        features: ['Зелёный двор', 'Охраняемая территория', 'Близко к школам']
      },
      {
        id: 5,
        name: 'ЖК ЭДЕМ',
        address: 'мкр. Васильковский 18/1',
        status: 'В процессе строительства',
        image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg',
        description: 'Новый проект с уникальной архитектурой. Открыто бронирование!',
        totalApartments: 200,
        floors: 20,
        completion: '2025',
        features: ['Видовые квартиры', 'Коммерческие помещения', 'Многоуровневая парковка'],
        isNew: true,
        bookingOpen: true
      }
    ];

    const initialApartments = [
      {
        id: 1,
        projectId: 1,
        projectName: 'ЖК AQBIDAI 1',
        number: '12',
        rooms: 2,
        area: 60.0,
        floor: 3,
        totalFloors: 9,
        price: 35000000,
        pricePerSqm: 583333,
        layoutImage: '/images/layout-2room-60sqm.jpg',
        photos: [
          'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg',
          'https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg'
        ],
        features: ['Панорамные окна', 'Балкон', 'Кухня-гостиная'],
        description: 'Уютная двухкомнатная квартира с продуманной планировкой',
        available: true
      },
      {
        id: 2,
        projectId: 2,
        projectName: 'ЖК AQBIDAI 2',
        number: '45',
        rooms: 3,
        area: 91.0,
        floor: 7,
        totalFloors: 12,
        price: 55000000,
        pricePerSqm: 604395,
        layoutImage: '/images/layout-3room-91sqm.jpg',
        photos: [
          'https://images.pexels.com/photos/1457841/pexels-photo-1457841.jpeg',
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnR8ZW58MHx8fHwxNzQ4MDE1MTkzfDA&ixlib=rb-4.1.0&q=85'
        ],
        features: ['3 спальни', '2 санузла', 'Гардеробная', 'Лоджия'],
        description: 'Просторная трёхкомнатная квартира для большой семьи',
        available: true
      },
      {
        id: 3,
        projectId: 3,
        projectName: 'ЖК AQBIDAI 3',
        number: '78',
        rooms: 1,
        area: 47.9,
        floor: 5,
        totalFloors: 16,
        price: 28000000,
        pricePerSqm: 584551,
        layoutImage: '/images/layout-1room-47sqm.jpg',
        photos: [
          'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg'
        ],
        features: ['Студия', 'Высокие потолки', 'Французский балкон'],
        description: 'Современная студия с оптимальным использованием пространства',
        available: true
      },
      {
        id: 4,
        projectId: 1,
        projectName: 'ЖК AQBIDAI 1',
        number: '23',
        rooms: 2,
        area: 65.5,
        floor: 6,
        totalFloors: 9,
        price: 38000000,
        pricePerSqm: 580153,
        layoutImage: '/images/layout-2room-60sqm.jpg',
        photos: [
          'https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg'
        ],
        features: ['Угловая квартира', 'Дополнительные окна', 'Кладовая'],
        description: 'Угловая двухкомнатная квартира с дополнительным освещением',
        available: true
      },
      {
        id: 5,
        projectId: 4,
        projectName: 'ЖК Гармония',
        number: '15',
        rooms: 3,
        area: 85.2,
        floor: 4,
        totalFloors: 8,
        price: 48000000,
        pricePerSqm: 563380,
        layoutImage: '/images/layout-3room-91sqm.jpg',
        photos: [
          'https://images.pexels.com/photos/1457841/pexels-photo-1457841.jpeg'
        ],
        features: ['Тихий двор', 'Евроремонт включён', 'Кондиционеры'],
        description: 'Готовая к заселению квартира в тихом районе',
        available: true
      },
      {
        id: 6,
        projectId: 5,
        projectName: 'ЖК ЭДЕМ',
        number: '101',
        rooms: 2,
        area: 70.8,
        floor: 12,
        totalFloors: 20,
        price: 42000000,
        pricePerSqm: 593220,
        layoutImage: '/images/layout-2room-60sqm.jpg',
        photos: [
          'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg'
        ],
        features: ['Видовая квартира', 'Smart home', 'Премиум отделка'],
        description: 'Инновационная квартира с системой умного дома',
        isNew: true,
        available: true
      }
    ];

    localStorage.setItem('grand_projects', JSON.stringify(initialProjects));
    localStorage.setItem('grand_apartments', JSON.stringify(initialApartments));
    localStorage.setItem('grand_applications', JSON.stringify([]));
    localStorage.setItem('grand_analytics', JSON.stringify({
      visitors: 0,
      pageViews: 0,
      leads: 0,
      conversions: 0,
      dailyStats: {},
      pageStats: {},
      apartmentViews: {}
    }));
  }

  // ПРОЕКТЫ
  getProjects() {
    return JSON.parse(localStorage.getItem('grand_projects') || '[]');
  }

  saveProjects(projects) {
    localStorage.setItem('grand_projects', JSON.stringify(projects));
    this.trackEvent('projects_updated', { count: projects.length });
  }

  addProject(project) {
    const projects = this.getProjects();
    const newProject = { ...project, id: Date.now() };
    projects.push(newProject);
    this.saveProjects(projects);
    return newProject;
  }

  updateProject(id, projectData) {
    const projects = this.getProjects();
    const index = projects.findIndex(p => p.id === id);
    if (index !== -1) {
      projects[index] = { ...projectData, id };
      this.saveProjects(projects);
      return projects[index];
    }
    return null;
  }

  deleteProject(id) {
    const projects = this.getProjects();
    const filtered = projects.filter(p => p.id !== id);
    this.saveProjects(filtered);
    
    // Также удаляем связанные квартиры
    const apartments = this.getApartments();
    const filteredApartments = apartments.filter(a => a.projectId !== id);
    this.saveApartments(filteredApartments);
    
    return true;
  }

  // КВАРТИРЫ
  getApartments() {
    return JSON.parse(localStorage.getItem('grand_apartments') || '[]');
  }

  saveApartments(apartments) {
    localStorage.setItem('grand_apartments', JSON.stringify(apartments));
    this.trackEvent('apartments_updated', { count: apartments.length });
  }

  addApartment(apartment) {
    const apartments = this.getApartments();
    const projects = this.getProjects();
    const project = projects.find(p => p.id === parseInt(apartment.projectId));
    
    const newApartment = { 
      ...apartment, 
      id: Date.now(),
      projectName: project ? project.name : '',
      pricePerSqm: Math.round(apartment.price / apartment.area)
    };
    
    apartments.push(newApartment);
    this.saveApartments(apartments);
    return newApartment;
  }

  updateApartment(id, apartmentData) {
    const apartments = this.getApartments();
    const projects = this.getProjects();
    const project = projects.find(p => p.id === parseInt(apartmentData.projectId));
    
    const index = apartments.findIndex(a => a.id === id);
    if (index !== -1) {
      apartments[index] = { 
        ...apartmentData, 
        id,
        projectName: project ? project.name : '',
        pricePerSqm: Math.round(apartmentData.price / apartmentData.area)
      };
      this.saveApartments(apartments);
      return apartments[index];
    }
    return null;
  }

  deleteApartment(id) {
    const apartments = this.getApartments();
    const filtered = apartments.filter(a => a.id !== id);
    this.saveApartments(filtered);
    return true;
  }

  // ЗАЯВКИ
  getApplications() {
    return JSON.parse(localStorage.getItem('grand_applications') || '[]');
  }

  saveApplications(applications) {
    localStorage.setItem('grand_applications', JSON.stringify(applications));
  }

  addApplication(application) {
    const applications = this.getApplications();
    const newApplication = {
      ...application,
      id: Date.now(),
      status: 'new',
      date: new Date().toISOString()
    };
    
    applications.push(newApplication);
    this.saveApplications(applications);
    this.trackEvent('lead_generated', { source: application.source });
    return newApplication;
  }

  updateApplicationStatus(id, status) {
    const applications = this.getApplications();
    const index = applications.findIndex(a => a.id === id);
    if (index !== -1) {
      applications[index].status = status;
      this.saveApplications(applications);
      
      if (status === 'completed') {
        this.trackEvent('conversion', { applicationId: id });
      }
      
      return applications[index];
    }
    return null;
  }

  deleteApplication(id) {
    const applications = this.getApplications();
    const filtered = applications.filter(a => a.id !== id);
    this.saveApplications(filtered);
    return true;
  }

  // АНАЛИТИКА
  initializeAnalytics() {
    // Инициализируем аналитику если её нет
    if (!localStorage.getItem('grand_analytics')) {
      localStorage.setItem('grand_analytics', JSON.stringify({
        visitors: 0,
        pageViews: 0,
        leads: 0,
        conversions: 0,
        dailyStats: {},
        pageStats: {},
        apartmentViews: {},
        trafficSources: {}
      }));
    }
  }

  getAnalytics() {
    return JSON.parse(localStorage.getItem('grand_analytics') || '{}');
  }

  trackPageView(page) {
    const analytics = this.getAnalytics();
    const today = new Date().toISOString().split('T')[0];
    
    // Увеличиваем общие счётчики
    analytics.pageViews = (analytics.pageViews || 0) + 1;
    
    // Дневная статистика
    if (!analytics.dailyStats[today]) {
      analytics.dailyStats[today] = { views: 0, visitors: 0, leads: 0 };
    }
    analytics.dailyStats[today].views++;
    
    // Статистика по страницам
    if (!analytics.pageStats[page]) {
      analytics.pageStats[page] = 0;
    }
    analytics.pageStats[page]++;
    
    this.saveAnalytics(analytics);
  }

  trackVisitor() {
    const analytics = this.getAnalytics();
    const today = new Date().toISOString().split('T')[0];
    
    // Проверяем, новый ли это посетитель (по сессии)
    if (!sessionStorage.getItem('visitor_tracked')) {
      analytics.visitors = (analytics.visitors || 0) + 1;
      
      if (!analytics.dailyStats[today]) {
        analytics.dailyStats[today] = { views: 0, visitors: 0, leads: 0 };
      }
      analytics.dailyStats[today].visitors++;
      
      sessionStorage.setItem('visitor_tracked', 'true');
      this.saveAnalytics(analytics);
    }
  }

  trackApartmentView(apartmentId) {
    const analytics = this.getAnalytics();
    
    if (!analytics.apartmentViews[apartmentId]) {
      analytics.apartmentViews[apartmentId] = 0;
    }
    analytics.apartmentViews[apartmentId]++;
    
    this.saveAnalytics(analytics);
  }

  trackEvent(event, data = {}) {
    const analytics = this.getAnalytics();
    const today = new Date().toISOString().split('T')[0];
    
    switch (event) {
      case 'lead_generated':
        analytics.leads = (analytics.leads || 0) + 1;
        if (!analytics.dailyStats[today]) {
          analytics.dailyStats[today] = { views: 0, visitors: 0, leads: 0 };
        }
        analytics.dailyStats[today].leads++;
        break;
        
      case 'conversion':
        analytics.conversions = (analytics.conversions || 0) + 1;
        break;
    }
    
    this.saveAnalytics(analytics);
  }

  saveAnalytics(analytics) {
    localStorage.setItem('grand_analytics', JSON.stringify(analytics));
  }

  // Получение статистики для админки
  getAdminStats() {
    const analytics = this.getAnalytics();
    const projects = this.getProjects();
    const apartments = this.getApartments();
    const applications = this.getApplications();
    
    const availableApartments = apartments.filter(a => a.available !== false).length;
    const newApplications = applications.filter(a => a.status === 'new').length;
    
    return {
      totalProjects: projects.length,
      totalApartments: apartments.length,
      availableApartments,
      newApplications,
      totalVisitors: analytics.visitors || 0,
      totalPageViews: analytics.pageViews || 0,
      totalLeads: analytics.leads || 0,
      totalConversions: analytics.conversions || 0,
      conversionRate: analytics.leads > 0 ? ((analytics.conversions / analytics.leads) * 100).toFixed(1) : '0.0'
    };
  }

  // Получение детальной аналитики
  getDetailedAnalytics() {
    const analytics = this.getAnalytics();
    const apartments = this.getApartments();
    
    // Популярные квартиры
    const popularApartments = Object.entries(analytics.apartmentViews || {})
      .map(([id, views]) => {
        const apartment = apartments.find(a => a.id === parseInt(id));
        return apartment ? { ...apartment, views } : null;
      })
      .filter(Boolean)
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);
    
    // Статистика по дням
    const dailyStats = Object.entries(analytics.dailyStats || {})
      .sort(([a], [b]) => new Date(b) - new Date(a))
      .slice(0, 7)
      .reverse();
    
    return {
      popularApartments,
      dailyStats,
      pageStats: analytics.pageStats || {}
    };
  }
}

export default new DataService();
