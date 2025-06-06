import React, { useState, useEffect } from 'react';

/**
 * ShowcaseCarousel v3 (mobile‑friendly)
 * ────────────────────────────────────────
 * • Всегда показывает 3 слайда на desktop (левый‑центр‑правый).
 * • На мобильных (< 640px) центр остаётся крупным, боковые уменьшаются и чуть
 *   смещаются, чтобы не выходить за экран.
 * • Автопрокрутка каждые `interval` мс: right → center → left.
 */
const ShowcaseCarousel = ({ images = [], interval = 5000 }) => {
  /* ─────────── STATE ─────────── */
  const [center, setCenter] = useState(0);          // индекс центрального слайда
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);

  /* ─────────── EFFECTS ─────────── */
  // автопереключение центра
  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => setCenter((i) => (i + 1) % images.length), interval);
    return () => clearInterval(id);
  }, [images.length, interval]);

  // отслеживаем ресайз для mobile / desktop
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* ─────────── CALC ─────────── */
  const leftIndex  = (center - 1 + images.length) % images.length;
  const rightIndex = (center + 1) % images.length;

  const visible = [
    { index: leftIndex,  offset: -1 },
    { index: center,     offset:  0 },
    { index: rightIndex, offset:  1 },
  ];

  // параметры для разных брейкпоинтов
  const baseShift   = isMobile ? 180 : 320;  // px
  const scaleCenter = isMobile ? 1.1 : 1.2;
  const scaleSide   = isMobile ? 0.8 : 0.85;
  const cardClass   = isMobile ? 'w-52 h-[300px]' : 'w-72 h-[420px]';
  const containerH  = isMobile ? 'h-[340px]' : 'h-[450px]';

  const styleFor = (offset) => ({
    transform: `translateX(${offset * baseShift}px) scale(${offset === 0 ? scaleCenter : scaleSide})`,
    transition: 'transform 0.0s ease',
    zIndex: offset === 0 ? 3 : 2,
  });

  /* ─────────── RENDER ─────────── */
  return (
    <section className="py-20 bg-[#F2E8E0]">
    <div
      className={`relative flex justify-center items-center w-full ${containerH} overflow-visible select-none pointer-events-none`}
      style={{ perspective: 1400 }}
    >
      {visible.map(({ index, offset }) => (
        <img
          key={index}
          src={images[index]}
          alt={`slide-${index}`}
          className={`absolute rounded-lg shadow-xl object-cover ${cardClass}`}
          style={styleFor(offset)}
        />
      ))}
    </div>
    </section>
  );
};

export default ShowcaseCarousel;
