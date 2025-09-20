// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ParallaxProvider } from "react-scroll-parallax";
// 📌 Импортируешь GSAP и плагин
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";

// 📌 Регистрируешь плагин один раз сразу после импорта
gsap.registerPlugin(ScrollTrigger);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
    <ParallaxProvider>
      <App />
    </ParallaxProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
