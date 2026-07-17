'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import SectionLabel from '@/components/ui/section-label';
import { fadeUp } from '@/lib/animations';

interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  techStack: string[];
}

const fallback: Experience[] = [
  {
    id: '1',
    company: 'TinnieStudio',
    role: 'Full-Stack Engineer',
    period: '2025 – Present',
    location: 'Canada (Remote)',
    description: 'Streaming platform with SpringBoot backend, video processing workers, Redis caching, and multi-bucket S3 storage.',
    techStack: ['Next.js', 'SpringBoot', 'PostgreSQL', 'Redis', 'Docker'],
  },
  {
    id: '2',
    company: 'California Notices',
    role: 'Software Engineer',
    period: '2025 – Present',
    location: 'United States (Remote)',
    description: 'Legal notice generation platform for landlords and agents — PDF editing, document conversion workers, Stripe billing.',
    techStack: ['Next.js', 'NestJS', 'Stripe', 'AWS', 'PostgreSQL'],
  },
  {
    id: '3',
    company: 'MeuDeliver',
    role: 'Full-Stack Engineer',
    period: '2025 – 2026',
    location: 'Angola (Remote)',
    description: 'Multi-role e-commerce platform supporting users, vendors, and delivery agents with MapBox logistics integration.',
    techStack: ['Next.js', 'NestJS', 'PostgreSQL', 'Docker', 'MapBox'],
  },
];

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    fetch('/api/experience')
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setExperiences(data.slice(0, 3)))
      .catch(() => {});
  }, []);

  const items = experiences.length > 0 ? experiences : fallback;

  return (
    <section className="py-24 lg:py-32 bg-ute-surface">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-end justify-between mb-16">
          <SectionLabel label="Career Timeline" title="Experience" />
          <Link
            href="/experiences"
            className="hidden md:inline-flex text-sm text-ute-text-muted hover:text-ute-gold transition-colors gap-1 items-center"
          >
            Full timeline <span>→</span>
          </Link>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-ute-border" />

          <div className="space-y-12">
            {items.map((exp, i) => (
              <motion.div
                key={exp.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                custom={i}
                className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 ${
                  i % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 top-4 w-3 h-3 rounded-full bg-ute-gold -translate-x-1/2 ring-4 ring-ute-surface" />

                <div
                  className={`pl-10 md:pl-0 p-6 rounded-xl bg-ute-surface-hi border border-ute-border hover:border-ute-gold/30 transition-colors ${
                    i % 2 === 1 ? 'md:col-start-2' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-ute-gold tracking-wide">{exp.period}</span>
                    <span className="font-mono text-xs text-ute-text-muted">{exp.location}</span>
                  </div>
                  <h3 className="font-playfair text-xl font-bold text-ute-text mb-1">{exp.company}</h3>
                  <p className="text-sm text-ute-gold mb-3">{exp.role}</p>
                  <p className="text-sm text-ute-text-muted leading-relaxed mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.techStack.map((t) => (
                      <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded border border-ute-border text-ute-text-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
