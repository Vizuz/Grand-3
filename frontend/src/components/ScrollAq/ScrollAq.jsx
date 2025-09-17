// src/components/HorizontalImages/HorizontalImages.jsx
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ScrollAq.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAq() {
  const containerRef = useRef(null);
  const pinWrapRef = useRef(null);
  const sectionPinRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const pinWrap = pinWrapRef.current;
    const sectionPin = sectionPinRef.current;

    // 3) вычисляем длину горизонтального скролла и создаём контекст для GSAP
    const wrapWidth = pinWrap.scrollWidth;
    const scrollLength = wrapWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(pinWrap, {
        x: -scrollLength,
        ease: "none",
        scrollTrigger: {
          trigger: sectionPin,
          start: "top top",
          // Use a dynamic end value equal to the horizontal distance we need to scroll
          end: () => "+=" + scrollLength,
          anticipatePin: 1,
          pin: true,
          scrub: true,
          markers: false, // можно убрать после отладки
        },
      });
    }, container);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.container} id="aqbidai-info">
      <section
        className={styles.section}
        style={{ "--bgcolor": "#d38e3b", "--textcolor": "#032f35" }}
      >
        <div>
          <h1>
            <span>AQBIDAI</span> <span>IV</span> {/* <span>section</span> */}
          </h1>
          <p>
            Grand Komfort Stroy представляет новый проект AQBIDAI IV —
            пятиэтажный жилой дом комфорт-класса с закрытой территорией и
            благоустроенным двором.
          </p>
        </div>
      </section>

      <section id={styles.sectionPin} ref={sectionPinRef}>
        <div className={styles.pinWrap} ref={pinWrapRef}>
          <h2 className="whitespace-pre-wrap">
            <div className="font-bold mb-6 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
              «Низкая этажность&nbsp;—  высокий&nbsp;стандарт»
            </div>

            <div className="max-w-3xl text-sm sm:text-base md:text-lg lg:text-xl leading-snug">
              Пятиэтажный AQBIDAI&nbsp;IV предлагает 110 современных квартир,
              закрытую территорию с&nbsp;ландшафтным озеленением и&nbsp;удобный
              доступ ко&nbsp;всем городским сервисам.
            </div>
          </h2>
          <img
            src="https://storage.yandexcloud.net/vizuz/aqbidai-house.webp"
            alt=""
            className={`${styles.image} w-200px h-300px`}
          />
          <img
            src="https://storage.yandexcloud.net/vizuz/aqbidai-dvor.webp"
            alt=""
            className={styles.image}
          />
          <img
            src="https://storage.yandexcloud.net/vizuz/aqbidai-kids.webp"
            alt=""
            className={styles.image}
          />
          <img
            src="https://storage.yandexcloud.net/vizuz/aqbidai-dioganal.webp"
            alt=""
            className={styles.image}
          />
          <img
            src="https://storage.yandexcloud.net/vizuz/up.webp"
            alt=""
            className={styles.image}
          />

          <img
            src="https://storage.yandexcloud.net/vizuz/aqbidai-enter-group.webp"
            alt=""
            className={styles.image}
          />
          <img
            src="https://storage.yandexcloud.net/vizuz/aqbidai-doors.webp"
            alt=""
            className={styles.image}
          />

          <img
            src="https://storage.yandexcloud.net/vizuz/aqbidai-map.webp"
            alt=""
            className={styles.image}
          />
        </div>
      </section>
    </div>
  );
}
