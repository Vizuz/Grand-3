import React from "react";
import { Award, Shield, Users, TrendingUp } from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function AboutSection() {
  // Блок преимуществ
  const advantages = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Высокое качество",
      description:
        "Используем только проверенные материалы и современные технологии строительства",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Надёжность",
      description:
        "Более 5 лет на рынке недвижимости. Все проекты сдаются точно в срок",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Клиентский сервис",
      description:
        "Персональный менеджер для каждого клиента и поддержка на всех этапах",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Рост стоимости",
      description:
        "Наши объекты показывают стабильный рост цены благодаря удачному расположению",
    },
  ];

  // Подготовка статистики с анимацией счёта
  const stats = [
    { end: 5, suffix: "+", label: "лет опыта" },
    { end: 740, suffix: "+", label: "довольных семей" },
    { end: 5, suffix: "", label: "жилых комплексов" },
    { end: 100, suffix: "%", label: "сданы в срок" },
  ];

  // Хук intersection observer
  const [statsRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section className="py-20 bg-neutral-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold font-serif text-primary-900 mb-6">
            Почему выбирают GRAND
          </h2>
          <p className="text-xl text-neutral-dark/70 max-w-3xl mx-auto">
            Мы создаём не просто дома — мы создаём пространства для счастливой
            жизни
          </p>
        </div>

        {/* Сетка преимуществ */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((adv, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl shadow-luxury hover-lift group animate-slide-up"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <div className="text-accent mb-6 group-hover:scale-110 transition-transform duration-300">
                {adv.icon}
              </div>
              <h3 className="text-xl font-bold text-primary-900 mb-4">
                {adv.title}
              </h3>
              <p className="text-neutral-dark/70 leading-relaxed">
                {adv.description}
              </p>
            </div>
          ))}
        </div>

        {/* Статистика с эффектом подсчёта */}
        <div
          ref={statsRef}
          className="mt-20 luxury-gradient rounded-2xl p-8 lg:p-12"
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((s, idx) => (
              <div key={idx} className="text-white">
                <div className="text-4xl lg:text-5xl font-bold text-accent mb-2">
                  {inView ? (
                    <CountUp end={s.end} suffix={s.suffix} duration={1.5} />
                  ) : (
                    `0${s.suffix}`
                  )}
                </div>
                <div className="text-lg opacity-80">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
