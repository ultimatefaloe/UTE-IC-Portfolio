'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    fetch('/api/experience')
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setExperiences(data))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-ute-bg">
      <section className="pt-32 pb-16 bg-ute-surface border-b border-ute-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionLabel label="Career Timeline" title="Experience" subtitle="A record of the companies, products, and systems I&apos;ve contributed to." />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-ute-border" />

            <div className="space-y-12">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  custom={i}
                  className="pl-16 relative"
                >
                  <div className="absolute left-6 top-5 w-3 h-3 rounded-full bg-ute-gold -translate-x-1/2 ring-4 ring-ute-bg" />

                  <div className="p-6 rounded-xl bg-ute-surface border border-ute-border hover:border-ute-gold/30 transition-colors">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-xs text-ute-gold tracking-wide">{exp.period}</span>
                      <span className="font-mono text-xs text-ute-text-muted">{exp.location}</span>
                    </div>
                    <h3 className="font-playfair text-2xl font-bold text-ute-text">{exp.company}</h3>
                    <p className="text-ute-gold text-sm mt-1 mb-4">{exp.role}</p>
                    <p className="text-ute-text-muted leading-relaxed mb-5">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.techStack.map((t) => (
                        <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded border border-ute-border text-ute-text-muted">{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}

              {experiences.length === 0 && (
                <p className="text-ute-text-muted pl-16">Experience entries will appear here once added via the admin panel.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
