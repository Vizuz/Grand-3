import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import ProjectsCarousel from '../components/ProjectsCarousel';
import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';
import ShowcaseCarousel from '../components/ShowcaseCarousel';
import FeelHomeSection from '../components/FeelhomeSection';

const pictures = [
  "/img/1g.webp",
  '/img/2g.webp',
  '/img/3g.webp',
];
const p1 = `Здесь взрослые вновь становятся собой, а дети даже не перестают ими быть. Здесь время с семьей проводят, а не изыскивают. Считают объятия важной формой диалога. Обретают новых друзей, научаясь видеть душу, а не статус.`;
const p2 = `GRAND не загадывает на завтра и черпает вдохновение в каждой минуте. Ведь даже в сегодняшнем дне достаточно причин для счастья.`;

export default function HomePage() {
  const { trackPageView } = useData();

  useEffect(() => {
    trackPageView('Главная страница');
  }, [trackPageView]);

  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <FeelHomeSection/>
      <ShowcaseCarousel images={pictures} interval={5000} />
      <ProjectsCarousel />
      <AboutSection />
      <Footer />
    </main>
  );
}