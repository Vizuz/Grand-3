// src/components/ParallaxHeader.jsx
import React, { useRef, useEffect } from "react";
import styles from "./ParallaxPage.module.css";

export function ParallaxHeader({ backgroundImage, children }) {
  const headerRef = useRef();

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docH = document.getElementById("scroll-animate-main").offsetHeight;
      headerRef.current.style.backgroundImage = `url(${backgroundImage})`;
      headerRef.current.style.height = `${window.innerHeight}px`;
      headerRef.current.style.backgroundPositionY = `${50 - (scrollY * 100) / docH}%`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [backgroundImage]);

  return (
    <header ref={headerRef} className={styles.header}>
      {children}
    </header>
  );
}
