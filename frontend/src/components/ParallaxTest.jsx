import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Simple test component to visualize GSAP ScrollTrigger markers
export default function ParallaxTest() {
  useLayoutEffect(() => {
    
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(boxRef.current, {
        yPercent: 50,
        ease: "none",
        scrollTrigger: {
          trigger: boxRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          markers: true,
        },
      });
    }, boxRef);
    return () => ctx.revert();
  }, []);
  const boxRef = useRef(null);

  useLayoutEffect(() => {
    // Ensure ScrollTrigger is registered
    gsap.registerPlugin(ScrollTrigger);

    // Create context for cleanup
    const ctx = gsap.context(() => {
      gsap.to(boxRef.current, {
        yPercent: 50,
        ease: "none",
        scrollTrigger: {
          trigger: boxRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          markers: true, // Show start/end markers for debugging
        },
      });
    }, boxRef);

    return () => ctx.revert();
  }, []);

  return (
    <div style={{ height: "200vh", padding: "100px 0" }}>
      <div
        ref={boxRef}
        style={{
          width: "200px",
          height: "200px",
          margin: "0 auto",
          backgroundColor: "#4F46E5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#FFF",
          fontSize: "1.25rem",
        }}
      >
        Scroll Me
      </div>
    </div>
  );
}
