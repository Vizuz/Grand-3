import React, { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./FeelhomeSection.module.css";

// 🔹 ДЕФОЛТНЫЕ ДАННЫЕ ---------------------------------------------------------
const defaultTitle = "Ваш надёжный застройщик в Кокшетау";
const defaultSubtitle =
  "Качество Grand Komfort Stroy — ваша гарантия спокойствия.";
const defaultImage =
  "https://storage.yandexcloud.net/vizuz/процесс стройки.webp";
const defaultParagraphs = [
  "В Grand Komfort Stroy знают каждый уголок Кокшетау и строят под него: от фундамента до ключей. Прозрачные сроки, материалы местного производства — ваш комфорт под нашей ответственностью.",
  "В Grand Komfort Stroy мы чётко планируем каждый этап строительства и отвечаем за качество до последнего шурупа. Благодаря прозрачности сроков и честной коммуникации вы всегда знаете, на какой стадии находится ваш дом — без сюрпризов и пустых обещаний.",
];
const defaultVideoLink = "https://youtu.be/xyz";

// 🔹 КОМПОНЕНТ ----------------------------------------------------------------
const FeelHomeSection = ({
  title = defaultTitle,
  subtitle = defaultSubtitle,
  image = defaultImage,
  paragraphs = defaultParagraphs,
  videoLink = defaultVideoLink,
  bg = "bg-white",
}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.35 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const tBase = "transition-all duration-700 ease-out";
  const fadeStart = "opacity-0 -translate-y-10";
  const fadeEnd = "opacity-100 translate-y-0";

  return (
    <section ref={ref} className={`${bg} py-16 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h2
          className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 ${tBase} ${visible ? fadeEnd : fadeStart}`}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={`text-lg sm:text-xl text-gray-600 ${tBase} delay-150 ${visible ? fadeEnd : fadeStart}`}
          >
            {subtitle}
          </p>
        )}
      </div>

      <div className="max-w-5xl mx-auto relative overflow-hidden shadow-xl mb-10 group">
        {/* Используем object-bottom и адаптивную высоту */}
        <img
          src={image}
          alt="Стройплощадка Grand Komfort Stroy"
          className={`w-full object-cover object-bottom h-64 sm:h-96 lg:h-[700px] select-none `}
          draggable={false}
        />
        {/* Кнопка воспроизведения видео */}
      </div>

      {paragraphs.length > 0 && (
        <div
          className={`max-w-5xl mx-auto grid md:grid-cols-2 gap-8 ${tBase} delay-300 ${visible ? fadeEnd : fadeStart}`}
        >
          <p className="leading-relaxed text-gray-700 md:pr-6">
            {paragraphs[0]}
          </p>
          <p className="leading-relaxed text-gray-700">{paragraphs[1]}</p>
        </div>
      )}
    </section>
  );
};

export default FeelHomeSection;
