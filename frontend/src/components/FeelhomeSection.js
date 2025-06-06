import React, { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * FeelHomeSection – готовая секция «Дом — это не место…».
 * ──────────────────────────────────────────────────────────
 * ✦ Никаких пропсов передавать **не обязательно** – можно просто
 *   <FeelHomeSection /> и секция отрисуется с дефолтным контентом.
 * ✦ При необходимости любой из элементов (title, image, paragraphs и т.д.)
 *   можно переопределить пропсами.
 *
 *  ↓ Мини‑пример полной кастомизации ↓
 *    <FeelHomeSection
 *        title="Свой заголовок"
 *        subtitle="Свой подзаголовок"
 *        image={myImg}
 *        paragraphs={[pLeft, pRight]}
 *        videoLink="https://youtu.be/..." />
 */

// 🔹 ДЕФОЛТНЫЕ ДАННЫЕ ---------------------------------------------------------
const defaultTitle = 'Дом — это не место, а ощущение';
const defaultSubtitle = 'В SOUL живут искренними чувствами и яркими впечатлениями.';
// Картинку можно заменить на свою; пока просто плейсхолдер (data‑uri)
const defaultImage =
  'img/family.jpg';
const defaultParagraphs = [
  'Здесь взрослые вновь становятся собой, а дети даже не перестают ими быть. Здесь время с семьёй проводят, а не изыскывают. Считают объятия важной формой диалога.',
  'SOUL не загадывает на завтра и черпает вдохновение в каждой минуте. Ведь даже в сегодняшнем дне достаточно причин для счастья.',
];
const defaultVideoLink = 'https://youtu.be/xyz';

// 🔹 КОМПОНЕНТ ----------------------------------------------------------------
const FeelHomeSection = ({
  title = defaultTitle,
  subtitle = defaultSubtitle,
  image = defaultImage,
  paragraphs = defaultParagraphs,
  videoLink = defaultVideoLink,
  bg = 'bg-[#F2E8E0]',
}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  // IntersectionObserver — триггер появления
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.35 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const tBase = 'transition-all duration-700 ease-out';
  const fadeStart = 'opacity-0 translate-y-10';
  const fadeEnd = 'opacity-100 translate-y-0';

  return (
    <section ref={ref} className={`${bg} py-16 px-4 sm:px-6 lg:px-8`}>
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 ${tBase} ${visible ? fadeEnd : fadeStart}`}>{title}</h2>
        {subtitle && (
          <p className={`text-lg sm:text-xl text-gray-600 ${tBase} delay-150 ${visible ? fadeEnd : fadeStart}`}>{subtitle}</p>
        )}
      </div>

      {/* Image + button overlay + curtain */}
      <div className="max-w-5xl mx-auto relative overflow-hidden rounded-lg shadow-xl mb-10 group">
        <img src={image} alt="feel-home" className="w-full object-cover select-none" draggable={false} />

        {/* video button */}
        {videoLink && (
          <Link
            to={videoLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`absolute bottom-4 right-4 inline-flex items-center gap-2 ${bg} backdrop-blur-sm px-5 py-3 rounded-md text-[#242f3c] hover:bg-[#242f3c] hover:text-white transition-opacity opacity-0 group-hover:opacity-100 md:opacity-100`}
          >
            <Play className="w-5 h-5" />
            Смотреть видео о проекте
          </Link>
        )}

        {/* curtain: раскрытие сверху-вниз */}
        <div
          className={`absolute inset-0 ${bg} transform ${tBase} duration-[1200ms] ${visible ? '-translate-y-full' : 'translate-y-0'}`}
          style={{ pointerEvents: 'none' }}
        />
      </div>

      {/* Paragraphs (если есть) */}
      {paragraphs.length > 0 && (
        <div className={`max-w-5xl mx-auto grid md:grid-cols-2 gap-8 ${tBase} delay-300 ${visible ? fadeEnd : fadeStart}`}>
          {paragraphs[0] && <p className="leading-relaxed text-gray-700 md:pr-6">{paragraphs[0]}</p>}
          {paragraphs[1] && <p className="leading-relaxed text-gray-700">{paragraphs[1]}</p>}
        </div>
      )}
    </section>
  );
};

export default FeelHomeSection;
