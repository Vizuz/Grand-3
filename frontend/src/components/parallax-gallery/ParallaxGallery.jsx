/* ParallaxGallery.jsx */
import React, { useRef, useState, useEffect } from "react";
import styles from "./ParallaxGallery.module.css";

// Пример данных для галереи
const items = [
  {
    title: "AQBIDAI 1",
    content: "Пятиэтажный многоквартирный дом: 40 квартир, ул. Акбидай 11А",
    image: "https://storage.yandexcloud.net/vizuz/aqbidai-1.webp",
  },
  {
    title: "AQBIDAI 2",
    content: "Пятиэтажный многоквартирный дом: 40 квартир, ул. Акбидай 13Б",
    image: "https://storage.yandexcloud.net/vizuz/aqbidai-2.webp",
  },
  {
    title: "AQBIDAI 3",
    content: "Пятиэтажный многоквартирный дом: 40 квартир, ул. Кенжетаева 18",
    image: "https://storage.yandexcloud.net/vizuz/aqbidai-3.webp",
  },
  {
    title: "ГАРМОНИЯ",
    content:
      "Девятиэтажный многоквартирный дом:80 квартир, ул. Васильковский 18/2",
    image: "https://storage.yandexcloud.net/vizuz/garmonia-1.webp",
  },
];

export default function ParallaxGallery() {
  return (
    <div className="py-32">
      <h2 className="text-center text-2xl sm:text-3xl lg:text-4-xl font-bold mb-6 transition-all duration-700 ease-out opacity-100 translate-y-0">
        Сданные ЖК Grand Komfort Stroy
      </h2>
      <div className={styles.container}>
        {items.map((item, i) => (
          <Card
            key={i}
            title={item.title}
            content={item.content}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
}

function Card({ title, content, image }) {
  const cardRef = useRef(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  let leaveTimeout;

  useEffect(() => {
    const el = cardRef.current;
    if (el) {
      setDims({ w: el.offsetWidth, h: el.offsetHeight });
    }
    return () => clearTimeout(leaveTimeout);
  }, []);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left - dims.w / 2;
    const my = e.clientY - rect.top - dims.h / 2;
    setMouse({ x: mx, y: my });
  };
  const handleMouseLeave = () => {
    leaveTimeout = setTimeout(() => setMouse({ x: 0, y: 0 }), 500);
  };

  const px = mouse.x / dims.w;
  const py = mouse.y / dims.h;
  const rY = px * 30;
  const rX = py * -30;
  const tX = px * -40;
  const tY = py * -40;

  return (
    <div
      className={styles.cardWrap}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={styles.card}
        style={{ transform: `rotateY(${rY}deg) rotateX(${rX}deg)` }}
      >
        <div
          className={styles.cardBg}
          style={{
            backgroundImage: `url(${image})`,
            transform: `translateX(${tX}px) translateY(${tY}px)`,
          }}
        />
        <div className={styles.cardInfo}>
          <h1>{title}</h1>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
}
