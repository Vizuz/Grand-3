import React, { useState, useEffect, useRef } from 'react';

/**
 * ShowcaseCarousel v5
 * ────────────────────────────────────────
 * • Секция целиком = 100 vh, разбита на заголовок + карусель.
 * • Заголовок занимает фиксированное место, карусель — flex‑grow.
 * • Карточки фиксированной ширины, симметричные отступы.
 */
const ShowcaseCarousel = ({ images = [], interval = 5000 }) => {
  /* ─── STATE ─── */
  const [center, setCenter]   = useState(0);
  const [isMobile, setMobile] = useState(() => window.innerWidth < 640);
  const sectionRef = useRef(null);
  const [titleVisible, setTitleVisible] = useState(false);

  /* ─── EFFECTS ─── */
  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => setCenter((i) => (i + 1) % images.length), interval);
    return () => clearInterval(id);
  }, [images.length, interval]);

  useEffect(() => {
    const handleResize = () => setMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* ─── CALC ─── */
  const left  = (center - 1 + images.length) % images.length;
  const right = (center + 1) % images.length;

  const visible = [
    { index: left,  offset: -1 },
    { index: center, offset: 0 },
    { index: right, offset: 1 },
  ];

  const cardW        = isMobile ? 350 : 500;      // px
  const cardH        = isMobile ? 500 : 600;      // px
  const scaleCenter  = isMobile ? 1.1 : 1.2;
  const scaleSide    = isMobile ? 0.8 : 0.85;
  const gap          = 32;                        // px
  const baseShift    = cardW * ((scaleCenter + scaleSide) / 2) + gap;

  const styleFor = (off) => ({
    transform: `translateX(${off * baseShift}px) scale(${off === 0 ? scaleCenter : scaleSide})`,
    transition: 'transform 0.5s ease',
    zIndex: off === 0 ? 3 : 2,
    width:  `${cardW}px`,
    height: `${cardH}px`,
  });

  /* ─── RENDER ─── */
  return (
    <section ref={sectionRef} className="bg-[#bcb8ad] overflow-x-hidden h-screen flex flex-col">
      {/* Заголовок: только паддинг сверху 16 px (pt‑4) */}
      <div className="max-w-5xl mx-auto text-center pt-16">
        <h2
          className={`text-3xl sm:text-4xl lg:text-5xl font-bold transition-all duration-700 ease-out 
    ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          Настройтесь на ноту GRAND
        </h2>
      </div>

      {/* Карусель заполняет оставшуюся высоту */}
      <div
        className="relative flex justify-center items-center flex-grow overflow-hidden select-none pointer-events-none"
        style={{ perspective: 1400 }}
      >
        {visible.map(({ index, offset }) => (
          <img
            key={index}
            src={images[index]}
            alt={`slide-${index}`}
            className="absolute shadow-xl object-cover"
            style={styleFor(offset)}
          />
        ))}
      </div>
    </section>
  );
};

export default ShowcaseCarousel;
