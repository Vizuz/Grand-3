import React from 'react';
import styles from './InfoAq.module.css';

const content = [
  {
    title: 'AQBIDAI IV',
    image:
      'https://storage.yandexcloud.net/vizuz/aqbidai-house.webp',
  },
  
];

export default function InfoAq() {
  return (
    <>

      <main className={styles.main}>
        {content.map((item, idx) => (
          <section className={styles.section} key={idx}>
            <figure className={styles.imageContainer}>
              <img src={item.image} alt="" />
            </figure>

            <article className={styles.content}>
              <h2 className={styles.sectionTitle}>{item.title}</h2>

              {/* ─── Дом ─────────────────────────────────────── */}
              <h3 className={styles.subTitle}>Дом</h3>
              <p>
                <strong>110&nbsp;квартир в&nbsp;5&nbsp;секциях.</strong>{' '}
                П‑образный, пятиэтажный жилой дом комфорт‑класса.
              </p>

              {/* ─── Благоустройство ─────────────────────────── */}
              <h3 className={styles.subTitle}>Благоустройство</h3>
              <ul className={styles.list}>
                <li>Игровые и&nbsp;спортивные площадки</li>
                <li>Тихие зоны отдыха с&nbsp;озеленением</li>
                <li>Разделённые парковка и&nbsp;пешеходные маршруты</li>
              </ul>

              {/* ─── Архитектура и отделка ───────────────────── */}
              <h3 className={styles.subTitle}>Архитектура и&nbsp;отделка</h3>
              <ul className={styles.list}>
                <li>Фасады — кирпич трёх оттенков</li>
                <li>Коммерческий этаж — «рваный» камень</li>
                <li>Металлопластиковые окна и витражи</li>
              </ul>

              {/* ─── Коммерческий этаж ───────────────────────── */}
              <h3 className={styles.subTitle}>Коммерческий этаж</h3>
              <ul className={styles.list}>
                <li>Высота помещений — 2,7&nbsp;м</li>
                <li>Свободная планировка для офиса или ритейла</li>
              </ul>

              {/* ─── Жилые этажи ─────────────────────────────── */}
              <h3 className={styles.subTitle}>Жилые этажи</h3>
              <ul className={styles.list}>
                <li>Высота потолков — 2,7&nbsp;м; черновая отделка</li>
                <li>Выход из&nbsp;кухни‑гостиной на&nbsp;лоджию или балкон</li>
              </ul>

              {/* ─── Двор ─────────────────────────────────────── */}
              <h3 className={styles.subTitle}>Двор</h3>
              <ul className={styles.list}>
                <li>Современные игровые комплексы и&nbsp;зоны отдыха</li>
                <li>Уютные дворы с&nbsp;озеленением</li>
                <li>Ограждённые детские площадки для безопасности</li>
              </ul>

              {/* ─── CTA ───────────────────────────────────────
              <footer className={styles.cta}>
                <a
                  href="/files/aqbidai-plan.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.ctaLink}
                >
                  Скачать планировки (PDF)
                </a>
              </footer> */}
            </article>
          </section>
        ))}
      </main>
    </>
  );
}