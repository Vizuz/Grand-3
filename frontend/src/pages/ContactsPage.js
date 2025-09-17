import React, { useState, useEffect } from "react";
import { Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { useData } from "../context/DataContext";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ContactsMap from "../components/ContactsMap";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://grand-3.onrender.com/api" ||
  "http://localhost:8000/api";

const image = "https://storage.yandexcloud.net/vizuz/grand-office.webp";
export default function ContactsPage() {
  const { trackPageView, addApplication } = useData();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  useEffect(() => {
    trackPageView("Контакты");
  }, [trackPageView]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const applicationData = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      projectName: "Общий вопрос",
      source: "Контактная форма",
      ...(formData.message.trim() && { message: formData.message.trim() }),
    };

    try {
      const response = await fetch(`${API_URL}/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicationData),
      });
      if (!response.ok) throw new Error("Ошибка отправки");
      const saved = await response.json();
      addApplication(saved);
      setStatus("success");
      setFormData({ name: "", phone: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-light">
      <Navigation />

      <main className="pt-32">
        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="grid lg:grid-cols-2 gap-12 pb-20">
            {/* Contacts list */}
            <div className="animate-slide-in-left">
              <h2 className="text-3xl font-bold font-serif text-primary-900 mb-8">
                Как с нами связаться
              </h2>
              <ul className="divide-y divide-gray-300">
                <li className="py-6 flex items-start">
                  <MapPin className="w-6 h-6 text-primary-600 flex-shrink-0 mr-4 mt-1" />
                  <div>
                    <p className="font-medium">Отдел продаж:</p>
                    <p>г. Кокшетау, ул. Акбидай, 13Б</p>
                  </div>
                </li>
                <li className="py-6 flex items-start">
                  <Phone className="w-6 h-6 text-primary-600 flex-shrink-0 mr-4 mt-1" />
                  <div>
                    <p className="font-medium">Телефон:</p>
                    <p>+7 700 651 23 73</p>
                    <div className="flex items-center mt-1">
                      <Clock className="w-5 h-5 mr-2 text-gray-500" />
                      <span>Пн–Пт: 9:00–18:00</span>
                    </div>
                  </div>
                </li>
                <li className="py-6 flex items-start">
                  <MessageCircle className="w-6 h-6 text-primary-600 flex-shrink-0 mr-4 mt-1" />
                  <div>
                    <p className="font-medium">WhatsApp:</p>
                    <a
                      href="https://wa.me/77006512373"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-primary-800"
                    >
                      Написать в WhatsApp
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold font-serif text-primary-900 mb-8 animate-slide-in-right">
                Напишите нам
              </h2>

              <div className="bg-white -lg shadow-lg p-8 animate-slide-up">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Имя */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Ваше имя *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      placeholder="Введите ваше имя"
                      className="w-full px-4 py-3 border border-gray-300 -lg focus:ring-accent focus:border-accent transition-colors"
                    />
                  </div>

                  {/* Телефон */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Телефон *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      placeholder="+7 (___) ___-__-__"
                      className="w-full px-4 py-3 border border-gray-300 -lg focus:ring-accent focus:border-accent transition-colors"
                    />
                  </div>

                  {/* Сообщение */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Сообщение (необязательно)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="5"
                      disabled={isSubmitting}
                      placeholder="Расскажите, что вас интересует..."
                      className="w-full px-4 py-3 border border-gray-300  focus:ring-accent focus:border-accent transition-colors resize-none"
                    />
                  </div>

                  {/* Кнопка */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full border-2 border-[#1a3d76] text-[#1a3d76] hover:bg-[#1a3d76] hover:text-white px-8 py-4  text-lg transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
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

                  {/* Статус */}
                  {status === "success" && (
                    <p className="text-[#242f3c] text-center">
                      Спасибо! Мы свяжемся с вами в ближайшее время.
                    </p>
                  )}
                  {status === "error" && (
                    <p className="text-red-600 text-center">
                      Произошла ошибка. Попробуйте ещё раз.
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row h-screen pb-20">
          {/* Левая часть: на мобильных full‑width, на десктопе — 1/2 */}
          <div className="w-full md:w-1/2 h-1/2 md:h-full overflow-hidden">
            <img
              src={image}
              alt="logo"
              className="w-full h-full object-cover select-none"
              draggable={false}
            />
          </div>

          {/* Правая часть: карта */}
          <div className="w-full md:w-1/2 h-1/2 md:h-full">
            <ContactsMap className="w-full h-full" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
