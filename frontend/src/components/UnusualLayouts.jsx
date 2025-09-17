import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const initialPlans = [
  {
    title: "Ванные с окном",
    image: "https://storage.yandexcloud.net/vizuz/ванная.webp",
    caption: "Наблюдение за городом из тёплой ванной",
  },
  {
    title: "Кухни‑гостиные с 3 и 4 окнами",
    image: "https://storage.yandexcloud.net/vizuz/кухня.webp",
    caption: "Для встреч семьи и приёма гостей",
  },
  {
    title: "Мастер‑спальни с 2 окнами",
    image: "https://storage.yandexcloud.net/vizuz/спальня.webp",
    caption: "Захватывающие виды на ночной город",
  },
  {
    title: "Студии с островом",
    image: "https://storage.yandexcloud.net/vizuz/пентхаус.webp",
    caption: "Максимум пространства для жизни и творчества",
  },
  {
    title: "Двухуровневые лофты",
    image: "https://storage.yandexcloud.net/vizuz/детская.webp",
    caption: "Свобода планировки и высокий потолок",
  },
];

export default function UnusualLayouts({ headerTitle, headerText, headerBar }) {
  const [plans, setPlans] = useState(initialPlans);
  const [offset, setOffset] = useState(0);
  const [isAnimating, setAnim] = useState(false);
  const [index, setIndex] = useState(0);
  const [visibleCount, setVC] = useState(3);
  const timerRef = useRef(null);

  // Меняем число видимых слайдов в зависимости от ширины окна
  useEffect(() => {
    const updateVC = () => {
      const w = window.innerWidth;
      if (w < 1000) setVC(1);
      else if (w < 1500) setVC(2);
      else setVC(3);
    };
    updateVC();
    window.addEventListener("resize", updateVC);
    return () => window.removeEventListener("resize", updateVC);
  }, []);

  const total = initialPlans.length;
  const slidePct = 100 / visibleCount;

  // Автопрокрутка
  useEffect(() => {
    clearInterval(timerRef.current);
    timerRef.current = window.setInterval(handleNext, 5000);
    return () => clearInterval(timerRef.current);
  }, [plans, visibleCount]);

  function handleNext() {
    if (isAnimating) return;
    setIndex((i) => (i + 1) % total);
    setAnim(true);
    setOffset(-slidePct);
  }

  function handlePrev() {
    if (isAnimating) return;
    clearInterval(timerRef.current);
    setPlans((p) => {
      const last = p[p.length - 1];
      return [last, ...p.slice(0, -1)];
    });
    setOffset(-slidePct);
    requestAnimationFrame(() => {
      setAnim(true);
      setOffset(0);
    });
    timerRef.current = window.setInterval(handleNext, 5000);
  }

  const onTransitionEnd = () => {
    if (offset === -slidePct) {
      setPlans((p) => {
        const [first, ...rest] = p;
        return [...rest, first];
      });
    }
    setAnim(false);
    setOffset(0);
  };

  // Для прогресс‑бара
  const miniWidth = `${100 / total}%`;
  const miniOffset = `${index * 100}%`;

  return (
    <section className="relative bg-white w-full overflow-hidden py-32">
      <div className="flex flex-col lg:flex-row justify-between items-start py-[50px] lg:py-[150px]">
        {/* Левый заголовок */}
        <h2 className="pl-8 text-3xl lg:text-5xl font-bold mb-8">
          {headerTitle}
        </h2>
        {/* Правый текст (на маленьких — под заголовком) */}
        <p className="pl-8 pr-8 text-md font-medium mb-8 max-w-md">
          {headerText}
        </p>
      </div>
      <div>
        <h2 className=" px-8 text-md font-bold mb-8">{headerBar}</h2>
      </div>
      {/* прогресс‑бар */}
      <div className="h-[2px] bg-gray-200 w-full mb-6">
        <div
          className="h-full bg-[#ce9270] transition-transform duration-500 ease-out"
          style={{ width: miniWidth, transform: `translateX(${miniOffset})` }}
        />
      </div>

      {/* слайды */}
      <div className="relative w-full overflow-hidden">
        <div
          onTransitionEnd={onTransitionEnd}
          className={`flex ${isAnimating ? "transition-transform duration-500 ease-out" : ""}`}
          style={{ transform: `translateX(${offset}%)` }}
        >
          {plans.slice(0, visibleCount + 1).map((plan, i) => (
            <div
              key={i}
              className="flex-none px-4 md:px-8"
              style={{ width: `${100 / visibleCount}%` }}
            >
              <div className="bg-gray-100 flex flex-col items-center space-y-6 h-full px-8 md:px-32 py-10 md:py-20">
                <h3 className="text-xl font-semibold text-center min-h-[3rem]">
                  {plan.title}
                </h3>
                <div className="relative w-full h-80 overflow-hidden mb-2 group">
                  <img
                    src={plan.image}
                    alt={plan.title}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0 -translate-y-full group-hover:translate-y-full transition-transform duration-0 group-hover:duration-[1500ms] ease-out"
                    style={{
                      backgroundImage: `repeating-linear-gradient(
                        0deg,
                        rgba(255,255,255,1) 2px,
                        rgba(255,255,255,0) 8px,
                        transparent 200px,
                        transparent 40px
                      )`,
                      backgroundSize: "100% 12px",
                    }}
                  />
                </div>
                <p className="text-center text-gray-700">{plan.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* стрелки */}
      <div className="flex justify-end mt-8 px-4 md:px-20 space-x-8">
        <button
          onClick={handlePrev}
          className="text-xl md:text-2xl font-bold text-gray-800 hover:text-[#ce9270] transition-colors"
        >
          |←
        </button>
        <button
          onClick={handleNext}
          className="text-xl md:text-2xl font-bold text-gray-800 hover:text-[#ce9270] transition-colors"
        >
          →|
        </button>
      </div>
    </section>
  );
}
