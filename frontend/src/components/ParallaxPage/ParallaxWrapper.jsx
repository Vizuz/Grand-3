// src/components/ParallaxWrapper.jsx
import React, { useEffect, useRef } from 'react';
import styles from './ParallaxPage.module.css';

export function ParallaxWrapper({ children }) {
  const mainRef = useRef();
  const wrapperRef = useRef();
  const footerRef = useRef();

  useEffect(() => {
    const updateSizes = () => {
      const winH = window.innerHeight;
      const footerH = footerRef.current.offsetHeight;
      const contentH = wrapperRef.current.offsetHeight - winH - footerH;
      const docH = winH + contentH + footerH - 20;

      document.getElementById('scroll-animate').style.height = `${docH}px`;
      mainRef.current.style.height = `${docH}px`;
      mainRef.current.style.top = '0px';
      wrapperRef.current.style.marginTop = `${winH}px`;
      const scrollY = window.scrollY;
      footerRef.current.style.bottom = scrollY >= footerH ? '0px' : `-${footerH}px`;
    };
    updateSizes();
    window.addEventListener('resize', updateSizes);

    const onScroll = () => {
      const scrollY = window.scrollY;
      const footerH = footerRef.current.offsetHeight;
      const docH = mainRef.current.offsetHeight;

      mainRef.current.style.top = `-${scrollY}px`;
      footerRef.current.style.bottom = scrollY >= footerH ? '0px' : `-${footerH}px`;
    };
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('resize', updateSizes);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div id="scroll-animate" className={styles.scrollAnimate}>
      <div id="scroll-animate-main" className={styles.scrollAnimateMain} ref={mainRef}>
        <div className={styles.wrapperParallax} ref={wrapperRef}>
          {children}
          <footer ref={footerRef} className={styles.footer}>
            {/* можно сюда прокидывать свой футер через пропсы */}
          </footer>
        </div>
      </div>
    </div>
  );
}