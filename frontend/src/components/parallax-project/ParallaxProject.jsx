/* ParallaxGallery.jsx */
import React, { useRef, useState, useEffect } from "react";
import styles from "./ParallaxProject.module.css";
import { Link } from "react-router-dom";
// Пример данных для галереи
const items = [
  {
    title: "AQBIDAI 4",
    content:
      "Пятиэтажный П-образный многоквартирный дом: 115 квартир, ул. Кенжетаева 24",
    image: "https://storage.yandexcloud.net/vizuz/aqbidai-house.webp",
    sectionId: "aqbidai-info",
  },
  {
    title: "ЭДЕМ",
    content:
      "Девятиэтажный многоквартирный дом: 80 квартир, ул. Васильковский 18/1",
    image: "https://storage.yandexcloud.net/vizuz/adem-16.webp",
    sectionId: "edem-info",
  },
];

export default function ParallaxProject() {
  return (
    <div className="pt-32">
      <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 transition-all duration-700 ease-out opacity-100 translate-y-0">
        Строящиеся ЖК Grand Komfort Stroy
      </h2>

      <div className={styles.container}>
        {items.map((item, i) => (
          <Card
            key={i}
            title={item.title}
            content={item.content}
            image={item.image}
            sectionId={item.sectionId}
          />
        ))}
      </div>
    </div>
  );
}

function Card({ title, content, image, sectionId }) {
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

          <div className={styles.buttonGroup}>
            <button
              className={styles.btnMore}
              onClick={() => {
                const el = document.getElementById(sectionId);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Узнать больше
            </button>

            <Link to="/apartments">
              <button className={styles.btnCatalog}>Каталог квартир</button>
            </Link>
          </div>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
}
