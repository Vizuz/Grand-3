import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Facebook, Instagram, Youtube } from 'lucide-react';

export default function ContactsPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const [openFaq, setOpenFaq] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.');
    setFormData({ name: '', phone: '', message: '' });
  };

  const faqItems = [
    {
      question: 'Какие документы нужны для покупки квартиры?',
      answer: 'Для покупки квартиры потребуется паспорт, справка о доходах и справка об отсутствии задолженностей. Наши специалисты помогут подготовить все необходимые документы.'
    },
    {
      question: 'Возможна ли покупка в рассрочку?',
      answer: 'Да, мы предлагаем гибкие условия рассрочки. Первоначальный взнос от 30%, срок рассрочки до 24 месяцев без процентов.'
    },
    {
      question: 'Помогаете ли вы с ипотекой?',
      answer: 'Конечно! Мы сотрудничаем с ведущими банками и поможем оформить ипотеку на выгодных условиях. Наши специалисты сопровождают весь процесс оформления.'
    },
    {
      question: 'Можно ли посмотреть квартиру перед покупкой?',
      answer: 'Обязательно! Мы организуем показ квартир в удобное для вас время. Также доступны виртуальные туры по нашим объектам.'
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-light">
      <Navigation />
      
      <section className="pt-24 pb-16 luxury-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white animate-fade-in">
            <h1 className="text-4xl lg:text-6xl font-bold font-serif mb-6">
              Контакты
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Свяжитесь с нами любым удобным способом. Мы всегда готовы ответить на ваши вопросы
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold font-serif text-primary-900 mb-8 animate-slide-in-left">
              Как с нами связаться
            </h2>

            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-lg p-6 hover-lift animate-slide-up">
                <div className="flex items-start">
                  <MapPin className="w-8 h-8 text-accent mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-primary-900 mb-2">Офис продаж</h3>
                    <p className="text-gray-600 mb-2">г. Алматы, ул. Абая 125, офис 501</p>
                    <p className="text-sm text-gray-500">БЦ "Алматы Тауэр", 5 этаж</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 hover-lift animate-slide-up">
                <div className="flex items-start">
                  <Phone className="w-8 h-8 text-accent mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-primary-900 mb-2">Телефон</h3>
                    <p className="text-gray-600 mb-1">+7 (727) 123-45-67</p>
                    <p className="text-sm text-gray-500">Звонки принимаются круглосуточно</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 hover-lift animate-slide-up">
                <div className="flex items-start">
                  <Mail className="w-8 h-8 text-accent mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-primary-900 mb-2">Email</h3>
                    <p className="text-gray-600 mb-1">info@grand-construction.kz</p>
                    <p className="text-sm text-gray-500">Ответим в течение 2 часов</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 hover-lift animate-slide-up">
                <div className="flex items-start">
                  <Clock className="w-8 h-8 text-accent mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-primary-900 mb-2">Время работы</h3>
                    <div className="text-gray-600 space-y-1">
                      <p>Пн-Пт: 09:00 - 19:00</p>
                      <p>Сб-Вс: 10:00 - 18:00</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 hover-lift animate-slide-up">
                <h3 className="text-xl font-bold text-primary-900 mb-4">Мы в социальных сетях</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-colors">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-colors">
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-colors">
                    <Youtube className="w-6 h-6" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-colors">
                    <MessageCircle className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold font-serif text-primary-900 mb-8 animate-slide-in-right">
              Напишите нам
            </h2>

            <div className="bg-white rounded-lg shadow-lg p-8 animate-slide-up">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent transition-colors"
                    placeholder="Введите ваше имя"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent transition-colors"
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Сообщение *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent transition-colors resize-none"
                    placeholder="Расскажите, что вас интересует..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent-600 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Отправить сообщение
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold font-serif text-primary-900 mb-8 text-center animate-fade-in">
            Как нас найти
          </h2>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-slide-up">
            <div className="h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2906.4199721912473!2d76.94269151551203!3d43.23859057913701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38836e8ca2c8bb69%3A0x7b5c4d2c1f3a8c5b!2sAbay%20Ave%20125%2C%20Almaty%2C%20Kazakhstan!5e0!3m2!1sen!2s!4v1640000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Офис GRAND на карте"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold font-serif text-primary-900 mb-8 text-center animate-fade-in">
            Часто задаваемые вопросы
          </h2>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-slide-up">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b border-gray-200 last:border-b-0">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full text-left px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-primary-900 pr-4">
                      {item.question}
                    </h3>
                    <div className={`transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`}>
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </button>
                
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
