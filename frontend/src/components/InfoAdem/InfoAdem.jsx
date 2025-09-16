import React from 'react';
import styles from './InfoAdem.module.css';

const content = [
  {
    title: 'ЭДЕМ',
    image:
      'https://storage.yandexcloud.net/vizuz/adem-16.webp',
  },
  
];

export default function InfoAdem() {
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
                
                9-этажный кирпичный жилой комплекс комфорт-класса:
1 коммерческий этаж + 8 жилых с просторными квартирами.
              </p>

              {/* ─── Благоустройство ─────────────────────────── */}
              <h3 className={styles.subTitle}>Архитектура и конструкция</h3>
              <ul className={styles.list}>
                <li>Несущие стены — кладочный кирпич (толщина 640 мм)</li>
                <li>Фасады — декоративный керамический кирпич «flash» трёх оттенков</li>
                <li>Металлопластиковые окна, 5-камерный профиль, двухкамерный стеклопакет (3 стекла)</li>
                <li>Лоджии полностью остеклены, создавая светлые, уютные помещения</li>
              </ul>

              {/* ─── Архитектура и отделка ───────────────────── */}
              <h3 className={styles.subTitle}>Благоустройство</h3>
              <ul className={styles.list}>
                <li>Ограждённые детские площадки с современными игровыми комплексами</li>
                <li>Спортивные площадки и тихие зоны отдыха с озеленением</li>
                <li>Чётко разделённые пешеходные маршруты и парковки (гостевые + жилые)</li>
              </ul>

              {/* ─── Коммерческий этаж ───────────────────────── */}
              <h3 className={styles.subTitle}>Коммерческий этаж</h3>
              <ul className={styles.list}>
                <li>Высота помещений — 3,3 м</li>
                <li>Витражное остекление от пола до потолка</li>
                <li>Свободный объём под мини-маркет, офис, медцентр, банкомат-зону и т. д.</li>
              </ul>

              {/* ─── Жилые этажи ─────────────────────────────── */}
              <h3 className={styles.subTitle}>Жилые этажи</h3>
              <ul className={styles.list}>
                <li>Высота потолков — 2,7&nbsp;м; черновая отделка</li>
                <li>Свободные планировки, удобные для объединения комнат</li>
                <li>Выход из&nbsp;кухни‑гостиной на&nbsp;лоджию или балкон</li>
              </ul>

              {/* ─── Двор ─────────────────────────────────────── */}
              <h3 className={styles.subTitle}>Холлы и подъезды</h3>
              <ul className={styles.list}>
                <li>Дизайнерские входные группы с моховыми панно и акцентной подсветкой</li>
                <li>Современные лифты, удобные лестничные клетки</li>
                <li>Современные лифты, удобные лестничные клетки</li>

              
              </ul>
              <h3 className={styles.subTitle}>Расположение</h3>
              <ul className={styles.list}>
                <li>Новый динамичный район Кокшетау</li>
                <li>До школы-гимназии № 17 и лицея им. Аль-Фараби — ≈ 400 м</li>
                <li>Рядом детский сад, спорткомплекс, благоустроенная набережная оз. Копа — всё в шаговой доступности</li>

              
              </ul>

             
            </article>
          </section>
        ))}
      </main>
    </>
  );
}