import React from 'react';
import { Award, Shield, Users, TrendingUp } from 'lucide-react';

export default function AboutSection() {
  const advantages = [
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Высокое качество',
      description: 'Используем только проверенные материалы и современные технологии строительства'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Надёжность',
      description: 'Более 15 лет на рынке недвижимости. Все проекты сдаются точно в срок'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Клиентский сервис',
      description: 'Персональный менеджер для каждого клиента и поддержка на всех этапах'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Рост стоимости',
      description: 'Наши объекты показывают стабильный рост стоимости благодаря удачному расположению'
    }
  ];

  return (
    <section className="py-20 bg-neutral-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold font-serif text-primary-900 mb-6">
            Почему выбирают GRAND
          </h2>
          <p className="text-xl text-neutral-dark/70 max-w-3xl mx-auto">
            Мы создаём не просто дома — мы создаём пространства для счастливой жизни
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-luxury hover-lift group animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-accent mb-6 group-hover:scale-110 transition-transform duration-300">
                {advantage.icon}
              </div>
              
              <h3 className="text-xl font-bold text-primary-900 mb-4">
                {advantage.title}
              </h3>
              
              <p className="text-neutral-dark/70 leading-relaxed">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-20 luxury-gradient rounded-2xl p-8 lg:p-12 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="text-white">
              <div className="text-4xl lg:text-5xl font-bold text-accent mb-2">15+</div>
              <div className="text-lg opacity-80">лет опыта</div>
            </div>
            
            <div className="text-white">
              <div className="text-4xl lg:text-5xl font-bold text-accent mb-2">740+</div>
              <div className="text-lg opacity-80">довольных семей</div>
            </div>
            
            <div className="text-white">
              <div className="text-4xl lg:text-5xl font-bold text-accent mb-2">5</div>
              <div className="text-lg opacity-80">жилых комплексов</div>
            </div>
            
            <div className="text-white">
              <div className="text-4xl lg:text-5xl font-bold text-accent mb-2">100%</div>
              <div className="text-lg opacity-80">сданы в срок</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}