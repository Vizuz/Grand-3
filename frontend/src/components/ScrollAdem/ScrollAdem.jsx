// src/components/HorizontalImages/HorizontalImages.jsx
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ScrollAdem.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAdem() {
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
        ease: 'none',
        scrollTrigger: {
          trigger: sectionPin,
          start: 'top top',
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
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.container} id="edem-info">
      <section
        className={styles.section}
        style={{ '--bgcolor': '#d38e3b', '--textcolor': '#032f35' }}
      >
        <div>
          <h1>
            <span>ЭДЕМ</span>
            {/* <span>section</span> */}
          </h1>
          <p>
            Grand Komfort Stroy представляет новый проект ЭДЕМ — девятиэтажный жилой дом комфорт-класса с закрытой территорией и благоустроенным двором.
          </p>
        </div>
      </section>

      <section id={styles.sectionPin} ref={sectionPinRef}>
        <div className={styles.pinWrap} ref={pinWrapRef}>
          <h2 className="whitespace-pre-wrap">
            <div className="font-bold mb-6 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
              «ЭДЕМ: функция и эстетика»
            </div>
            <div className="max-w-3xl text-sm sm:text-base md:text-lg lg:text-xl leading-snug">
              9-этажный кирпичный комплекс с коммерческим первым этажом, свободными планировками и благоустроённым двором в новом районе Кокшетау.
            </div>
          </h2>
          <img
            src="https://storage.yandexcloud.net/vizuz/adem-16.webp"
            alt=""
            className={styles.image}
          />
          <img
            src="https://storage.yandexcloud.net/vizuz/adem-10.webp"
            alt=""
            className={styles.image}
          />
           <img
            src="https://storage.yandexcloud.net/vizuz/adem-4.webp"
            alt=""
            className={styles.image}
          />
          <img
            src="https://storage.yandexcloud.net/vizuz/adem-8.webp"
            alt=""
            className={styles.image}
          />
          <img
            src="https://storage.yandexcloud.net/vizuz/adem-9.webp"
            alt=""
            className={styles.image}
          />
           <img
            src="https://storage.yandexcloud.net/vizuz/adem-13.webp"
            alt=""
            className={`${styles.image}`}
          />
           <img
            src="https://storage.yandexcloud.net/vizuz/adem-12.webp"
            alt=""
            className={styles.image}
          />
          


          <img
            src="https://storage.yandexcloud.net/vizuz/adem-15.webp"
            alt=""
            className={styles.image}
          />
         
          
         
          <img
            src="https://storage.yandexcloud.net/vizuz/adem-14.webp"
            alt=""
            className={styles.image}
          />
          
          <img
            src="https://storage.yandexcloud.net/vizuz/adem-11.webp"
            alt=""
            className={styles.image}
          />
          <img
            src="https://storage.yandexcloud.net/vizuz/adem-map.webp"
            alt=""
            className={styles.image}
          />
          
          
        </div>
        
      </section>

      
    </div>
  );
}
