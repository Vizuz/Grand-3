import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Award, Users, Building, Target, Star, Shield } from 'lucide-react';

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Алексей Петров',
      position: 'Генеральный директор',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?crop=face&w=300&h=300',
      experience: '20 лет в строительстве'
    },
    {
      name: 'Мария Иванова',
      position: 'Главный архитектор',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?crop=face&w=300&h=300',
      experience: '15 лет проектирования'
    },
    {
      name: 'Дмитрий Козлов',
      position: 'Руководитель отдела продаж',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?crop=face&w=300&h=300',
      experience: '12 лет в недвижимости'
    }
  ];

  const values = [
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Качество',
      description: 'Мы используем только лучшие материалы и следуем высочайшим стандартам строительства'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Надёжность',
      description: 'Наша репутация построена на доверии клиентов и выполнении обязательств'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Клиентоориентированность',
      description: 'Каждый проект создаётся с учётом потребностей и пожеланий наших клиентов'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Инновации',
      description: 'Мы внедряем современные технологии для комфорта и безопасности жильцов'
    }
  ];

  const achievements = [
    {
      year: '2020',
      title: 'Основание компании',
      description: 'Начало пути в сфере элитного строительства'
    },
    {
      year: '2021',
      title: 'Первый ЖК',
      description: 'Успешная сдача первого жилого комплекса'
    },
    {
      year: '2024',
      title: 'Премия "Строитель года"',
      description: 'Признание профессионального сообщества'
    },
    {
      year: '2025',
      title: '740+ счастливых семей',
      description: 'Более 740 семей обрели дом своей мечты'
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-light">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 luxury-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white animate-fade-in">
            <h1 className="text-4xl lg:text-6xl font-bold font-serif mb-6">
              О компании GRAND
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Уже более 5 лет мы создаём элитную недвижимость, объединяя традиции качественного строительства с современными технологиями
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-3xl lg:text-4xl font-bold font-serif text-primary-900 mb-6">
                Наша история
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Компания GRAND была основана в 2020 году с одной простой, но амбициозной целью — создавать жильё премиум-класса, которое станет настоящим домом для наших клиентов.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                За годы работы мы завоевали репутацию надёжного застройщика, который не просто строит дома, а создаёт комфортную среду для жизни. Каждый наш проект — это результат тщательного планирования, использования качественных материалов и внимания к деталям.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Сегодня GRAND — это команда профессионалов, объединённых общей идеей создания качественного и комфортного жилья для людей, которые ценят качество жизни.
              </p>
            </div>
            
            <div className="animate-slide-in-right">
              <img
                src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg"
                alt="О компании GRAND"
                className="rounded-2xl shadow-luxury"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-bold font-serif text-primary-900 mb-6">
              Наши ценности
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Принципы, которыми мы руководствуемся в работе
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-accent/5 transition-colors animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-accent mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-bold font-serif text-primary-900 mb-6">
              Ключевые достижения
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Путь развития компании GRAND
            </p>
          </div>

          <div className="space-y-8">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-lg p-8 hover-lift animate-slide-up"
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-8">
                  <div className="text-4xl font-bold text-accent bg-accent/10 w-20 h-20 rounded-full flex items-center justify-center">
                    {achievement.year}
                  </div>
                </div>
                
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-primary-900 mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600 text-lg">
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-bold font-serif text-primary-900 mb-6">
              Наша команда
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Профессионалы, которые воплощают ваши мечты в реальность
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="text-center bg-gray-50 rounded-2xl p-8 hover-lift animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h3 className="text-xl font-bold text-primary-900 mb-2">
                  {member.name}
                </h3>
                
                <p className="text-accent font-semibold mb-3">
                  {member.position}
                </p>
                
                <p className="text-gray-600">
                  {member.experience}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}