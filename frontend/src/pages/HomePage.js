import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import ProjectsCarousel from '../components/ProjectsCarousel';
import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <ProjectsCarousel />
      <AboutSection />
      <Footer />
    </main>
  );
}