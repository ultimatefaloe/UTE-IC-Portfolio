import { Metadata } from 'next';
import HeroSection from '@/components/root/hero-section';
import StatsSection from '@/components/root/stats-serve';
import AboutTeaser from '@/components/root/about-teaser';
import FeaturedProjects from '@/components/root/featured-projects';
import SkillsSection from '@/components/root/skills';
import ExperienceSection from '@/components/root/experience-section';
import ServicesSection from '@/components/root/service';
import ContactTeaser from '@/components/root/contact-teaser';

export const metadata: Metadata = {
  title: 'Tunmise Falodun — Full-Stack Engineer & Entrepreneur',
  description:
    'Senior full-stack engineer and founder of Ultimate IntelliForge. Building scalable systems across fintech, SaaS, logistics, and streaming.',
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <AboutTeaser />
      <FeaturedProjects />
      <SkillsSection />
      <ExperienceSection />
      <ServicesSection />
      <ContactTeaser />
    </>
  );
}
