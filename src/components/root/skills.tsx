'use client';

import { motion } from 'framer-motion';
import BouncingCarousel from '@/components/ui/bouncingCarosel';
import SectionLabel from '@/components/ui/section-label';

const stacks = {
  Frontend: [
    { icon: '⚛️', name: 'React' },
    { icon: '▲', name: 'Next.js' },
    { icon: 'TS', name: 'TypeScript' },
    { icon: '🌊', name: 'TailwindCSS' },
    { icon: '📱', name: 'React Native' },
  ],
  Backend: [
    { icon: '🦁', name: 'NestJS' },
    { icon: '🚂', name: 'Express' },
    { icon: '🍃', name: 'SpringBoot' },
    { icon: '🐘', name: 'Laravel' },
    { icon: '🐍', name: 'Django' },
  ],
  DevOps: [
    { icon: '🐳', name: 'Docker' },
    { icon: '☁️', name: 'AWS' },
    { icon: '▲', name: 'Vercel' },
    { icon: '🚀', name: 'Dokploy' },
    { icon: '🏗️', name: 'Terraform' },
  ],
  Database: [
    { icon: '🐘', name: 'PostgreSQL' },
    { icon: '🍃', name: 'MongoDB' },
    { icon: '💾', name: 'MySQL' },
    { icon: '⚡', name: 'Redis' },
  ],
};

const categories = Object.keys(stacks) as (keyof typeof stacks)[];

export default function SkillsSection() {
  return (
    <section className="py-24 lg:py-32 bg-ute-bg overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-12">
        <SectionLabel label="Expertise" title="Tech Stack" />
      </div>

      <div className="space-y-8">
        {categories.map((cat, i) => (
          <motion.div
            key={cat}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-3">
              <span className="font-mono text-xs tracking-widest text-ute-gold uppercase">{cat}</span>
            </div>
            <BouncingCarousel stack={stacks[cat]} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
