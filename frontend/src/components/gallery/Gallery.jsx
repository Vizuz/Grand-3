// Gallery.jsx
import React, { useEffect, useRef } from 'react';
// import inView from 'in-view';  // removed in favor of IntersectionObserver
import styles from './gallery.module.css';  // <- импорт модуля

const images = [
  'https://storage.yandexcloud.net/vizuz/1-sec.webp',
  // ...
];

export default function Gallery() {
  const containerRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.active);
          } else {
            entry.target.classList.remove(styles.active);
          }
        });
      },
      { threshold: 0.25 }
    );

    containerRefs.current.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {images.map((src, i) => (
        <section className={styles.row} key={i}>
          <div
            className={styles.container}
            ref={el => (containerRefs.current[i] = el)}
          >
            <img src={src} alt="" className={styles.image} />
          </div>
        </section>
      ))}

      
    </>
  );
}