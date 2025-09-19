import React, { useState, useEffect } from "react";
import { useData } from "../context/DataContext";
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import ProjectsCarousel from "../components/ProjectsCarousel";
import AboutSection from "../components/AboutSection";
import Footer from "../components/Footer";
import ShowcaseCarousel from "../components/ShowcaseCarousel";
import FeelHomeSection from "../components/FeelhomeSection/FeelhomeSection";
import GrandFeature from "../components/GrandFeature";
import UnusualLayouts from "../components/UnusualLayouts";
import InfrastructureSection from "../components/InfrastructureSection";
import ContactHome from "../components/ContactHome";
import UnusualLayouts2 from "../components/UnusualLayouts2";
import Gallery from "../components/gallery/Gallery";
import ParallaxGallery from "../components/parallax-gallery/ParallaxGallery";
import TourCard from "../components/TourCard";
import ParallaxProject from "../components/parallax-project/ParallaxProject";
import ParallaxPage from "../components/ParallaxPage/ParallaxPage";
import { ParallaxWrapper } from "../components/ParallaxPage/ParallaxWrapper";
import { ParallaxHeader } from "../components/ParallaxPage/ParallaxHeader";
import ScrollAq from "../components/ScrollAq/ScrollAq";
import WhiteBlack from "../components/WhiteBlack/WhiteBlack";
import InfoAq from "../components/InfoAq/InfoAq";
import ScrollAdem from "../components/ScrollAdem/ScrollAdem";
import InfoAdem from "../components/InfoAdem/InfoAdem";
import Zov from "../components/Zov/Zov";
const pictures = [
  "https://storage.yandexcloud.net/vizuz/nota-2.webp",
  "https://storage.yandexcloud.net/vizuz/aqbidai-house.webp",
  "https://storage.yandexcloud.net/vizuz/nota-3.webp",
];
const p1 = `Здесь взрослые вновь становятся собой, а дети даже не перестают ими быть. Здесь время с семьей проводят, а не изыскивают. Считают объятия важной формой диалога. Обретают новых друзей, научаясь видеть душу, а не статус.`;
const p2 = `GRAND не загадывает на завтра и черпает вдохновение в каждой минуте. Ведь даже в сегодняшнем дне достаточно причин для счастья.`;

export default function HomePage() {
  const { trackPageView } = useData();

  useEffect(() => {
    trackPageView("Главная страница");
  }, [trackPageView]);

  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Zov />
      <ParallaxProject />
      <ParallaxGallery />
      <InfrastructureSection />
      <ScrollAdem />
      <InfoAdem />
      {/* <ShowcaseCarousel images={pictures} /> */}

      {/* <UnusualLayouts 
              headerTitle="Благоустройство"
              headerText="Grand Komfort Stroy развивает и формирует новый облик района - с уважением к историческому контексту и со стремлением сделать жизнь москвичей современнее и интереснее."
              headerBar="5 нетипичных планировок квартир"
            /> */}
      <ScrollAq />
      <InfoAq />
      <UnusualLayouts2
        headerTitle="Следите за строительством ЖК AQBIDAI IV"
        headerText={`Новый жилой комплекс «Акбидай 4» находится в процессе строительства. 
Следить за ходом работ можно на этой странице и в Instagram, где мы публикуем фотографии и сторис со стройплощадки.`}
      />
      
      
      
      <GrandFeature />
      

      <ContactHome />
      <Footer />
      {/* <ParallaxPage /> */}
    </main>
  );
}
