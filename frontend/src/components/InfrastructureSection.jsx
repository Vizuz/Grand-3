import React, { useRef, useEffect } from "react";
import {
  Archive,
  Baby,
  MapPin,
  ShoppingCart,
  TreeDeciduous,
} from "lucide-react";

const cards = [
  {
    Icon: TreeDeciduous,
    title: "Озеленённая зона",
    text: "Больше зелени во дворе для свежего воздуха и отдыха",
  },
  {
    Icon: Baby,
    title: "Детская и спортивная площадка",
    text: "В наших ЖК предусмотрены детские и спортивные площадки для активного отдыха",
  },
  {
    Icon: MapPin,
    title: "Паркинг",
    text: "Удобная парковка для жителей и гостей комплекса",
  },
  {
    Icon: ShoppingCart,
    title: "Супермаркет, кафе и сервисы",
    text: "Расположены на первых этажах домов для удобства жителей",
  },
];

export default function InfrastructureSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const y = window.scrollY;
        sectionRef.current.style.backgroundPosition = `center ${-y}px`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-cover bg-center py-32"
      style={{
        backgroundImage:
          "url('https://storage.yandexcloud.net/vizuz/a9q.webp')",
          // "url('./img/a9.png')",
      }}
    >
      {/* заголовок */}
      <h2 className="text-4xl lg:text-6xl font-semibold text-white text-center mb-24">
        Внутренняя инфраструктура
      </h2>

      {/* полный по ширине контейнер */}
      <div className="w-full px-4 sm:px-8">
        {/* сетка: 1 колонка → 2 на планшете → 4 на десктопе */}
        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-2 xl:grid-cols-4 gap-8 justify-items-stretch ">
          {cards.map(({ Icon, title, text }, idx) => (
            <div
              key={idx}
              className="w-full bg-white p-16 xl:p-8 flex flex-col break-words"
            >
              <Icon className="w-16 h-16 text-gray-800 mb-6 flex-shrink-0" />
              <h3 className="text-3xl font-medium text-gray-900 mb-4">
                {title}
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
