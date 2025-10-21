import { Metadata } from "next";

import HeroSection from "@/components/root/hero-section";
import ServicesSection from "@/components/root/service";
import BouncingCarousel from "@/components/root/skills";
import StatsSection from "@/components/root/stats-serve";
import TestimonialsSection from "@/components/root/testimonial";

export const metadata: Metadata = {
  title: "Falodun Tunmise's Portfolio",
  description: "Founder of Ultimate IntelliForge",
};

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
