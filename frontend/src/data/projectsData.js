// Mock data для проектов GRAND
export const projectsData = [
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

// Данные квартир с реальными планировками
export const apartmentsData = [
  // Квартиры из ЖК AQBIDAI 1
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
    layoutImage: '/images/layout-2room-60sqm.jpg', // Планировка пользователя
    photos: [
      'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg',
      'https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg'
    ],
    features: ['Панорамные окна', 'Балкон', 'Кухня-гостиная'],
    description: 'Уютная двухкомнатная квартира с продуманной планировкой'
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
    layoutImage: '/images/layout-3room-91sqm.jpg', // Планировка пользователя
    photos: [
      'https://images.pexels.com/photos/1457841/pexels-photo-1457841.jpeg',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnR8ZW58MHx8fHwxNzQ4MDE1MTkzfDA&ixlib=rb-4.1.0&q=85'
    ],
    features: ['3 спальни', '2 санузла', 'Гардеробная', 'Лоджия'],
    description: 'Просторная трёхкомнатная квартира для большой семьи'
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
    layoutImage: '/images/layout-1room-47sqm.jpg', // Планировка пользователя
    photos: [
      'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg'
    ],
    features: ['Студия', 'Высокие потолки', 'Французский балкон'],
    description: 'Современная студия с оптимальным использованием пространства'
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
    description: 'Угловая двухкомнатная квартира с дополнительным освещением'
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
    description: 'Готовая к заселению квартира в тихом районе'
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