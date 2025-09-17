import React, { useEffect, useRef } from "react";
import styles from "./WhiteBlack.module.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WhiteBlack() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const boxes = "[data-box]"; // селектор остаётся чистым, без хэша из CSS-modules

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            scrub: 0.5,
            pin: true,
            start: "top top",
            end: "+=150%",
          },
        })
        .to(boxes, {
          force3D: true,
          duration: 1,
          xPercent: 100,
          ease: "power1.inOut",
          stagger: { amount: 1 },
        })
        .to(boxes, { ease: "power1.out", duration: 1, rotation: "45deg" }, 0)
        .to(boxes, { ease: "power1.in", duration: 1, rotation: "0deg" }, 1);
    }, sectionRef);

    return () => ctx.revert(); // убираем анимации при размонтировании
  }, []);

  return (
    <section ref={sectionRef} className={styles.trigger}>
      <span className={`${styles.label} ${styles.down}`}>
        Scroll
        <br />
        Down
      </span>
      <span className={`${styles.label} ${styles.up}`}>
        Scroll
        <br />
        Up
      </span>

      {Array.from({ length: 100 }).map((_, i) => (
        <div key={i} className={styles.box} data-box />
      ))}
    </section>
  );
}
