import React, { useState, useEffect, useRef } from "react";
import { useData } from "../context/DataContext";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://grand-3.onrender.com/api" ||
  "http://localhost:8000/api";

export default function ContactHome() {
  const { trackPageView, addApplication } = useData();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [isVisible, setIsVisible] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const node = formRef.current;
    if (!node) return;
    // If user prefers reduced motion — show immediately
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // run once
          }
        });
      },
      {
        root: null,
        threshold: 0, // 0% of block visible
        rootMargin: "0px 0px  40% 0px",
      },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

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
    <section
      className="relative bg-cover bg-center h-[560px] lg:h-[920px] my-[600px]"
      style={{
        backgroundImage: `url('https://storage.yandexcloud.net/vizuz/women-dog.webp')`,
      }}
    >
      {/* затемнение фона */}
      <div className="absolute inset-0 "></div>

      <div className="relative container mx-auto px-6 py-16 lg:py-32 text-white">
        {/* Заголовок */}
        <h2 className="break-words mx-auto text-3xl lg:text-6xl font-bold leading-snug lg:leading-relaxed lg:tracking-wider text-center pb-20 lg:max-w-5xl">
          «Подходящего времени» нет. Есть просто время. И вы решаете, что с ним
          делать.
        </h2>
      </div>

      {/* Форма на фоне #1a3d76 */}
      <div
        ref={formRef}
        className={`relative transform-gpu will-change-transform will-change-opacity transition-transform transition-opacity duration-700 ease-out
      ${isVisible ? "translate-y-0 opacity-100" : "translate-y-[60vh] opacity-0"}
      motion-reduce:transform-none motion-reduce:opacity-100`}
      >
        <div className="mx-auto bg-[#1a3d76] w-full max-w-[95%] max-w-[580px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[1400px] px-4 sm:px-8 md:px-12 lg:px-24 py-16 lg:py-24 flex flex-col lg:flex-row items-stretch gap-12 relative -mt-24 lg:-mt-32">
          {/* Левый блок: текст + форма */}
          <div className="flex-2 relative flex flex-col pr-8 pt-8 pb-[10px] text-gray-100">
            <h1 className="mb-8 text-lg sm:text-xl md:text-2xl">
              Заполните форму, и наши специалисты перезвонят, чтобы ответить на
              все вопросы.
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  placeholder="Имя"
                  className="peer w-full bg-transparent border-b border-white/60 text-white placeholder-white/60
                             focus:placeholder-transparent valid:placeholder-transparent
                             focus:outline-none focus:border-white/60 py-2"
                />
                <label
                  htmlFor="name"
                  className="absolute left-0 top-2 opacity-0 text-base text-white/60 cursor-pointer hover:text-white transition-all duration-200
                             peer-focus:-top-5 peer-focus:text-sm peer-focus:opacity-100
                             peer-valid:-top-5 peer-valid:text-sm peer-valid:opacity-100"
                >
                  Имя
                </label>
              </div>
              <div className="relative">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  placeholder="Телефон"
                  className="peer w-full bg-transparent border-b border-white/60 text-white placeholder-white/60
                             focus:placeholder-transparent valid:placeholder-transparent
                             focus:outline-none focus:border-white/60 py-2"
                />
                <label
                  htmlFor="phone"
                  className="absolute left-0 top-2 opacity-0 text-base text-white/60 cursor-pointer hover:text-white transition-all duration-200
                             peer-focus:-top-5 peer-focus:text-sm peer-focus:opacity-100
                             peer-valid:-top-5 peer-valid:text-sm peer-valid:opacity-100"
                >
                  Телефон
                </label>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 w-full sm:w-auto lg:w-1/3 border-2 border-white text-white hover:bg-white hover:text-[#1a3d76] px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg transition-all duration-300 inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner w-5 h-5 mr-2"></div>
                    Отправляется...
                  </>
                ) : (
                  <>Отправить</>
                )}
              </button>
            </form>
          </div>
          {/* Watermark letter */}
          <div className="flex-2 hidden lg:flex justify-end items-end pointer-events-none">
            <span className="text-white/10 text-[280px] font-bold leading-none select-none">
              <img
                src={
                  process.env.PUBLIC_URL +
                  "https://storage.yandexcloud.net/vizuz/logo.webp"
                }
                alt="GRAND Logo"
              />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
