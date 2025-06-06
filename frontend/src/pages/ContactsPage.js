import React, { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Facebook,
  Instagram,
  Youtube
} from 'lucide-react';
import { useData } from '../context/DataContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const API_URL = process.env.REACT_APP_API_URL || 'https://grand-3.onrender.com/api' ||'http://localhost:8000/api';

export default function ContactsPage() {
  const { trackPageView, addApplication } = useData();

  /* ---------------- local state ---------------- */
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // success | error | null
  const [openFaq, setOpenFaq] = useState(null);

  /* ---------------- page view analytics ---------------- */
  useEffect(() => {
    trackPageView('Контакты');
  }, [trackPageView]);

  /* ---------------- handlers ---------------- */
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

        const rawData = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim() || undefined,
      message: formData.message.trim(),
      apartmentId: undefined,            // не отправляем, если не нужен
      apartmentNumber: undefined,
      projectName: 'Общий вопрос',
      source: 'Контактная форма'
    };

    // Удаляем undefined поля, чтобы FastAPI не получал null для необязательных
    const applicationData = Object.fromEntries(
      Object.entries(rawData).filter(([, v]) => v !== undefined && v !== '')
    );;

    try {
      const response = await fetch(`${API_URL}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationData)
      });
      if (!response.ok) throw new Error('Ошибка отправки');
      const saved = await response.json();
      addApplication(saved); // мгновенно показываем в админке
      setStatus('success');
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }

    setIsSubmitting(false);
  };

  /* ---------------- FAQ ---------------- */
  const faqItems = [
    {
      question: 'Какие документы нужны для покупки квартиры?',
      answer:
        'Для покупки квартиры потребуется паспорт, справка о доходах и справка об отсутствии задолженностей. Наши специалисты помогут подготовить все необходимые документы.'
    },
    {
      question: 'Возможна ли покупка в рассрочку?',
      answer:
        'Да, мы предлагаем гибкие условия рассрочки. Первоначальный взнос от 30%, срок рассрочки до 24 месяцев без процентов.'
    },
    {
      question: 'Помогаете ли вы с ипотекой?',
      answer:
        'Конечно! Мы сотрудничаем с ведущими банками и поможем оформить ипотеку на выгодных условиях. Наши специалисты сопровождают весь процесс оформления.'
    },
    {
      question: 'Можно ли посмотреть квартиру перед покупкой?',
      answer:
        'Обязательно! Мы организуем показ квартир в удобное для вас время. Также доступны виртуальные туры по нашим объектам.'
    }
  ];

  /* ---------------- render ---------------- */
  return (
    <div className="min-h-screen bg-neutral-light">
      <Navigation />

      {/* Hero */}
      <section className="pt-24 pb-16 luxury-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white animate-fade-in">
            <h1 className="text-4xl lg:text-6xl font-bold font-serif mb-6">Контакты</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Свяжитесь с нами любым удобным способом. Мы всегда готовы ответить на ваши вопросы
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contacts list */}
          <div>
            <h2 className="text-3xl font-bold font-serif text-primary-900 mb-8 animate-slide-in-left">
              Как с нами связаться
            </h2>
            {/* ... (оставляем существующие карточки контактов без изменений) ... */}
          </div>

          {/* Form */}
          <div>
            <h2 className="text-3xl font-bold font-serif text-primary-900 mb-8 animate-slide-in-right">Напишите нам</h2>

            <div className="bg-white rounded-lg shadow-lg p-8 animate-slide-up">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Имя */}
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
                    disabled={isSubmitting}
                  />
                </div>

                {/* Телефон */}
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
                    disabled={isSubmitting}
                  />
                </div>

                {/* Email (необязательно) */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email (необязательно)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent transition-colors"
                    placeholder="example@mail.com"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Сообщение */}
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
                    disabled={isSubmitting}
                  ></textarea>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full border-2 border-[#242f3c] text-[#242f3c] hover:bg-[#242f3c] hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 text-center flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner w-5 h-5 mr-2"></div>
                      Отправляется...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" /> Отправить сообщение
                    </>
                  )}
                </button>

                {/* Status */}
                {status === 'success' && (
                  <p className="text-green-600 text-center">Спасибо! Мы свяжемся с вами в ближайшее время.</p>
                )}
                {status === 'error' && (
                  <p className="text-red-600 text-center">Произошла ошибка. Попробуйте ещё раз.</p>
                )}
              </form>

             
            </div>
          </div>
        </div>

        {/* FAQ, карта и прочие секции остаются без изменений (опустил для краткости) */}
      </div>

      <Footer />
    </div>
  );
}
