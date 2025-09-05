"use client";

import HeroSection from "./_components/hero-section";
import ServicesSection from "./_components/service";
import BouncingCarousel from "./_components/skills";
import StatsSection from "./_components/stats-serve";
import TestimonialsSection from "./_components/testimonial";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <BouncingCarousel />
      <ServicesSection />
      <StatsSection />
      <TestimonialsSection />
    </div>
  );
}
