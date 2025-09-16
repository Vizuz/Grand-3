/* src/components/Zov/Zov.jsx */
import React, { useEffect, useRef } from 'react';
import styles from './Zov.module.css';

import Splitting from 'splitting';                 //  npm i splitting
import 'splitting/dist/splitting.css';
import { gsap } from 'gsap';                       //  npm i gsap

export default function Zov() {
  const rootRef = useRef(null);

  useEffect(() => {
    /* --- 1. Разбиваем заголовок на <span> по строкам --- */
    const results = Splitting({
      target: rootRef.current?.querySelector('[data-splitting]'),
      by: 'lines'
    });

    if (results && results.length) {
      const { lines } = results[0] || {};
      // `lines` may be an array of arrays; flatten and guard against undefined
      (lines || [])
        .flat()
        .filter((el) => el && el.classList)
        .forEach((el) => el.classList.add(styles.fade));
    }

    /* --- 2. Анимация появления (IntersectionObserver) --- */
    const observer = new IntersectionObserver(
      (entries, self) => {
        let i = 0;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
            tl.set(entry.target, { visibility: 'visible' }).from(entry.target, {
              duration: 1.5,
              y: 200,
              skewY: 40,
              autoAlpha: 0,
              delay: i * 0.1
            });
            i += 1;
            self.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    /* следим за всеми элементами с классом fade */
    rootRef.current
      ?.querySelectorAll(`.${styles.fade}`)
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={rootRef} className={styles.wrapper}>
      <div className={styles.gridContainer}>
        {/* текст */}
        <div className={styles.item1}>
          <h1 className='font-bold' data-splitting="lines">Ваш надёжный застройщик в Кокшетау</h1>
        </div>

        {/* картинка */}
        <div className={styles.item2}>
          <img
            className={styles.fade}
            src="https://storage.yandexcloud.net/vizuz/windows.webp"
            alt="Иллюстрация для эффекта parallax grid"
          />
        </div>
      </div>
    </section>
  );
}