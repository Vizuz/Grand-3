import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { SplitText } from "gsap/SplitText";
import cs from "./ContinuousSec.module.css";

gsap.registerPlugin(Observer, SplitText);

export function ContinuousSec() {
  const observerRef = useRef(null);

  useEffect(() => {
    const sections = gsap.utils.toArray(`.${cs.section}`);
    const images = gsap.utils.toArray(`.${cs.bg}`);
    const outerWrappers = gsap.utils.toArray(`.${cs.outer}`);
    const innerWrappers = gsap.utils.toArray(`.${cs.inner}`);

    // Безопасно сплитим только те слайды, где есть заголовок
    const splitHeadings = sections.map((sec) => {
      const h = sec.querySelector(`.${cs.heading}`);
      return h
        ? new SplitText(h, {
            type: "chars,words,lines",
            linesClass: "clip-text",
          })
        : null;
    });

    let currentIndex = -1;
    const wrap = gsap.utils.wrap(0, sections.length);
    let animating = false;

    gsap.set(outerWrappers, { yPercent: 100 });
    gsap.set(innerWrappers, { yPercent: -100 });

    function gotoSection(index, direction) {
      index = wrap(index);
      animating = true;
      const fromTop = direction === -1;
      const dFactor = fromTop ? -1 : 1;

      const tl = gsap.timeline({
        defaults: { duration: 1.25, ease: "power1.inOut" },
        onComplete: () => (animating = false),
      });

      // скрываем предыдущий контент
      if (currentIndex >= 0) {
        const prevSection = sections[currentIndex];
        const prevBox = prevSection.querySelector(`.${cs.contentBox}`);
        gsap.set(sections[currentIndex], { zIndex: 0 });
        if (prevBox) tl.to(prevBox, { autoAlpha: 0, duration: 0.3 }, 0);
        tl.to(images[currentIndex], { yPercent: -15 * dFactor }).set(
          sections[currentIndex],
          { autoAlpha: 0 },
        );
      }

      // показываем текущий
      const nextSection = sections[index];
      const nextBox = nextSection.querySelector(`.${cs.contentBox}`);
      gsap.set(nextSection, { autoAlpha: 1, zIndex: 1 });

      tl.fromTo(
        [outerWrappers[index], innerWrappers[index]],
        { yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) },
        { yPercent: 0 },
        0,
      ).fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0);

      if (splitHeadings[index]) {
        tl.fromTo(
          splitHeadings[index].chars,
          { autoAlpha: 0, yPercent: 150 * dFactor },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 1,
            ease: "power2",
            stagger: { each: 0.02, from: "random" },
          },
          0.2,
        );
      }

      // плавный въезд инфо-блока, если он есть
      if (nextBox) {
        tl.fromTo(
          nextBox,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2" },
          0.35,
        );
      }

      currentIndex = index;
    }

    observerRef.current = Observer.create({
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onDown: () => !animating && gotoSection(currentIndex - 1, -1),
      onUp: () => !animating && gotoSection(currentIndex + 1, 1),
      tolerance: 10,
      preventDefault: true,
    });

    gotoSection(0, 1);

    return () => {
      splitHeadings.forEach((s) => s && s.revert && s.revert());
      if (observerRef.current) observerRef.current.kill();
      gsap.globalTimeline.clear();
    };
  }, []);

  // Данные слайдов
  const slideData = [
    // {
    //   id: 'second',
    //   heading: '',
    //   img: 'https://storage.yandexcloud.net/vizuz/grand.webp',
    //   content: {
    //     title: 'Наследие Grand Komfort Stroy',
    //     blocks: [
    //       {
    //         subtitle: '30 лет доверия',
    //         lines: [
    //           'С 1995 года работаем в Кокшетау: мельница Гранд производит муку высшего сорта. Надёжность, дисциплина поставок и уважение к клиенту — база, на которой мы строим всё остальное.',
    //         ],
    //       },
    //     ],
    //   },
    // },
    {
      id: "first",
      heading: "",
      img: "https://storage.yandexcloud.net/vizuz/1-sec.webp",
      content: {
        title: "Строительство с 2020",
        blocks: [
          {
            subtitle: "",
            lines: [
              "Строительная компания Grand Komfort Stroy основана в 2020 году с единственной целью — создавать комфортное и качественное жильё.",
              "",
            ],
          },
        ],
      },
    },
    {
      id: "third",
      heading: "",
      img: "https://storage.yandexcloud.net/vizuz/2-sec.webp",
      content: {
        title: "Сделано: 4 ЖК в срок",
        blocks: [
          {
            subtitle: "4 из 4 — сданы вовремя",
            lines: [
              "В 2022 году были построены и сданы в эксплуатацию жилые комплексы «Акбидай-1» и «Гармония». Уже в 2023 году своих первых жителей принял ЖК «Акбидай-2», а в 2024 году успешно реализован пятиэтажный дом «Акбидай-3».",
              "Все первые четыре жилых комплекса мы ввели точно в заявленные сроки. Для нас это не «подвиг», а стандарт.",
            ],
          },
        ],
      },
    },
    {
      id: "fourth",
      heading: "",
      img: "https://storage.yandexcloud.net/vizuz/forabout-1.webp",
      content: {
        title: "Подход к качеству",
        blocks: [
          {
            subtitle: "Качество — в деталях",
            lines: [
              "Мы строим кирпичные дома с продуманными планировками и современным благоустройством.",
              "Главные приоритеты компании — сфокусированность на результате, ответственное выполнение обязательств, безупречная репутация и довольство наших клиентов.",
            ],
          },
        ],
      },
    },
    {
      id: "fifth",
      heading: "",
      img: "https://storage.yandexcloud.net/vizuz/forabout-2.webp",
      content: {
        title: "Дальше: ещё 2 проекта",
        blocks: [
          {
            subtitle: "",
            lines: [
              "В настоящее время ведётся строительство девятиэтажного жилого дома «Эдем» — трёхподъездного комплекса, расположенного в спокойном районе микрорайона Васильковский.",
              "Также в стадии строительства находится новый жилой комплекс «Акбидай-4», который будет построен в районе Акбидай.",
            ],
          },
        ],
      },
    },
  ];

  return (
    <div className={cs.wrapper}>
      {slideData.map((slide) => (
        <section key={slide.id} className={`${cs.section} ${cs[slide.id]}`}>
          <div className={cs.outer}>
            <div className={cs.inner}>
              <div
                className={cs.bg}
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,.6) 0%, rgba(0,0,0,.1) 100%), url(${slide.img})`,
                }}
              >
                {/* Контентный блок — рендерим только если он есть */}
                {slide.content && (
                  <article className={cs.contentBox}>
                    <h1 className={cs.contentTitle}>{slide.content.title}</h1>

                    {slide.content.blocks.map((b, i) => (
                      <div className={cs.contentBlock} key={i}>
                        <h3 className={cs.contentSubtitle}>{b.subtitle}</h3>
                        <ul className={cs.contentList}>
                          {b.lines.map((ln, j) => (
                            <p key={j}>{ln}</p>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </article>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
