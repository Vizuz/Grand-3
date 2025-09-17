import React, { useEffect, useRef } from "react";
import styles from "./ParallaxPage.module.css";

// компоненты
import Hero from "./../../components/Hero";
import Footer from "./../../components/Footer";
import Zov from "./../../components/Zov/Zov";
import ParallaxProject from "./../../components/parallax-project/ParallaxProject";
import ParallaxGallery from "./../../components/parallax-gallery/ParallaxGallery";
import UnusualLayouts from "./../../components/UnusualLayouts";
import ScrollAq from "./../../components/ScrollAq/ScrollAq";
import InfoAq from "./../../components/InfoAq/InfoAq";
import ScrollAdem from "./../../components/ScrollAdem/ScrollAdem";
import InfoAdem from "./../../components/InfoAdem/InfoAdem";
import UnusualLayouts2 from "./../../components/UnusualLayouts2";
import InfrastructureSection from "./../../components/InfrastructureSection";
import ContactHome from "./../../components/ContactHome";
import ShowcaseCarousel from "./../../components/ShowcaseCarousel";

// gsap
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ВАЖНО: вызов после всех import'ов
gsap.registerPlugin(ScrollTrigger);

export default function ParallaxPage() {
  const mainRef = useRef(null);
  const headerRef = useRef(null);
  const footerRef = useRef(null);
  const contentRef = useRef(null);
  const wrapperRef = useRef(null);
  const measureRaf = useRef(0);
  const scrollRaf = useRef(0);

  const pictures = ["/img/nota-2.png", "/img/house.png", "/img/nota-3.png"];

  useEffect(() => {
    const outer = document.getElementById("scroll-animate");

    const measure = () => {
      if (
        !outer ||
        !mainRef.current ||
        !headerRef.current ||
        !footerRef.current ||
        !contentRef.current
      )
        return;

      const winH = window.innerHeight;
      const footerH = footerRef.current.offsetHeight || 0;
      const contentH = contentRef.current.offsetHeight || 0;

      // header — во весь экран, контент ниже через padding-top
      headerRef.current.style.height = `${winH}px`;
      wrapperRef.current.style.paddingTop = `${winH}px`;

      // «виртуальная» высота страницы для настоящего скроллбара
      const docH = winH + contentH + footerH;
      outer.style.height = `${docH}px`;

      // фикс-сцена, которую двигаем transform'ом
      mainRef.current.style.height = `${docH}px`;

      ScrollTrigger.refresh();
    };

    const onResize = () => {
      cancelAnimationFrame(measureRaf.current);
      measureRaf.current = requestAnimationFrame(measure);
    };

    let lastY = 0;
    let ticking = false;
    const onScroll = () => {
      lastY = window.scrollY || window.pageYOffset || 0;
      if (ticking) return;
      ticking = true;
      scrollRaf.current = requestAnimationFrame(() => {
        // основной «параллакс»: двигаем всю сцену
        if (mainRef.current) {
          mainRef.current.style.transform = `translate3d(0, ${-lastY}px, 0)`;
        }
        // лёгкий встречный сдвиг хедера для глубины
        if (headerRef.current) {
          headerRef.current.style.transform = `translate3d(0, ${lastY * 0.2}px, 0)`;
        }
        ticking = false;
      });
    };

    // интеграция с ScrollTrigger — scrollerProxy + defaults
    const scrollerEl = document.getElementById("scroll-animate-main");
    if (scrollerEl) {
      ScrollTrigger.scrollerProxy(scrollerEl, {
        scrollTop(value) {
          if (arguments.length) window.scrollTo(0, value);
          return window.pageYOffset || document.documentElement.scrollTop || 0;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: "transform",
      });
      ScrollTrigger.defaults({ scroller: scrollerEl });
    }

    // первичный расчёт
    onResize();

    // слушатели
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("load", onResize, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    // пересчёт при изменении контента
    const ro = new ResizeObserver(() => onResize());
    if (contentRef.current) ro.observe(contentRef.current);

    ScrollTrigger.addEventListener("refreshInit", onResize);
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
      cancelAnimationFrame(measureRaf.current);
      cancelAnimationFrame(scrollRaf.current);
      ScrollTrigger.removeEventListener("refreshInit", onResize);
    };
  }, []);

  return (
    <div id="scroll-animate" className={styles.scrollAnimate}>
      {/* фиксированная сцена, которую двигаем transform'ом */}
      <div
        id="scroll-animate-main"
        className={styles.scrollAnimateMain}
        ref={mainRef}
      >
        <div className={styles.wrapperParallax} ref={wrapperRef}>
          {/* header абсолютный внутри сцены */}
          <header ref={headerRef} className={styles.header}>
            <Hero />
          </header>

          {/* можно спокойно добавлять много секций */}
          <section className={styles.content} ref={contentRef}>
            <Zov />
            <ShowcaseCarousel images={pictures} />
            <ParallaxProject />
            <ParallaxGallery />
            <UnusualLayouts
              headerTitle="Сделайте свой дом маленьким раем"
              headerText="Для этого у SOUL есть несколько секретных ингредиентов: разнообразные планировки от студий до больших квартир с тремя спальнями и редкие опции, например, сразу четыре окна в кухне-гостиной."
              headerBar="5 нетипичных планировок квартир"
            />
            <ScrollAq />
            <InfoAq />
            <ScrollAdem />
            <InfoAdem />
            <InfrastructureSection />
            <UnusualLayouts2
              headerTitle="Благоустройство"
              headerText={`Для этого у SOUL есть несколько секретных ингредиентов: разнообразные планировки
от студий до больших квартир с тремя спальнями и редкие опции, например,
сразу четыре окна в кухне-гостиной.`}
            />
            <ContactHome />
          </section>

          {/* обычный футер — естественно появляется внизу */}
          <footer ref={footerRef} className={styles.footer}>
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  );
}
