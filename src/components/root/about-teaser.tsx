'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import SectionLabel from '@/components/ui/section-label';
import { fadeUp, staggerContainer } from '@/lib/animations';

const techLogos = [
  { name: 'Next.js', icon: '▲' },
  { name: 'NestJS', icon: '🦁' },
  { name: 'TypeScript', icon: 'TS' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'Docker', icon: '🐳' },
  { name: 'AWS', icon: '☁️' },
  { name: 'React', icon: '⚛️' },
  { name: 'SpringBoot', icon: '🍃' },
];

export default function AboutTeaser() {
  return (
    <section className="py-24 lg:py-32 bg-ute-bg">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <SectionLabel label="Who I Am" title="Engineer. Architect. Founder." />
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={3}
              className="text-ute-text-muted text-lg leading-relaxed mb-8"
            >
              I&apos;m Tunmise Falodun — a full-stack engineer and technology entrepreneur with 4+ years building
              scalable systems across fintech, logistics, e-commerce, and SaaS. Founder of{' '}
              <span className="text-ute-gold">Ultimate IntelliForge</span>.
            </motion.p>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={4}
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-ute-gold hover:gap-4 transition-all duration-200 font-medium"
              >
                Read my full story <span>→</span>
              </Link>
            </motion.div>
          </div>

          {/* Tech grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-4 gap-3"
          >
            {techLogos.map((tech, i) => (
              <motion.div
                key={tech.name}
                variants={fadeUp}
                custom={i}
                className="flex flex-col items-center gap-2 p-4 rounded-lg bg-ute-surface border border-ute-border hover:border-ute-gold/50 transition-colors group"
              >
                <span className="text-2xl">{tech.icon}</span>
                <span className="font-mono text-[10px] text-ute-text-muted group-hover:text-ute-gold transition-colors text-center">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
