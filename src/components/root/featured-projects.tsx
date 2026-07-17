'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import SectionLabel from '@/components/ui/section-label';
import { fadeUp } from '@/lib/animations';

interface FeaturedProject {
  title: string;
  role: string;
  description: string;
  liveUrl: string;
  stack: string[];
  country: string;
  year: string;
}

const projects: FeaturedProject[] = [
  {
    title: 'MeuDeliver',
    role: 'Full-Stack Engineer (Contract)',
    description:
      'Multi-role e-commerce platform for Angola supporting users, vendors, and delivery agents with a full admin panel for managing the ecosystem.',
    liveUrl: 'https://meudeliver.com',
    stack: ['Next.js', 'NestJS', 'PostgreSQL', 'Docker', 'AWS S3', 'MapBox'],
    country: '🇦🇴',
    year: '2025–2026',
  },
  {
    title: 'California Notices',
    role: 'Software Engineer (Contract)',
    description:
      'US-based platform simplifying how landlords and agents file legal notices — generates notices in minutes with PDF editing and worker-based processing.',
    liveUrl: 'https://canotices.com',
    stack: ['Next.js', 'NestJS', 'Stripe', 'AWS', 'PostgreSQL', 'Prisma'],
    country: '🇺🇸',
    year: '2025–Present',
  },
  {
    title: 'TinnieStudio',
    role: 'Full-Stack Engineer (Contract)',
    description:
      'Canadian streaming platform with raw video processing pipeline, multi-bucket storage, and SpringBoot backend with Redis caching.',
    liveUrl: 'https://tinniestudio.com',
    stack: ['Next.js', 'SpringBoot', 'PostgreSQL', 'Redis', 'Docker', 'S3'],
    country: '🇨🇦',
    year: '2025–Present',
  },
];

function ProjectIframe({ url, title }: { url: string; title: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-ute-surface-hi">
        <div className="text-center">
          <div className="text-4xl mb-3">🌐</div>
          <p className="font-mono text-xs text-ute-text-muted">{url}</p>
        </div>
      </div>
    );
  }

  return (
    <iframe
      src={url}
      title={title}
      className="w-full h-full border-0 pointer-events-none scale-[0.75] origin-top-left"
      style={{ width: '133.33%', height: '133.33%' }}
      onError={() => setFailed(true)}
      loading="lazy"
    />
  );
}

export default function FeaturedProjects() {
  return (
    <section className="py-24 lg:py-32 bg-ute-surface">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-end justify-between mb-16">
          <SectionLabel label="Selected Work" title="Featured Projects" />
          <Link
            href="/projects"
            className="hidden md:inline-flex text-sm text-ute-text-muted hover:text-ute-gold transition-colors gap-1 items-center"
          >
            View all projects <span>→</span>
          </Link>
        </div>

        <div className="space-y-24">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
              custom={0}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              {/* iframe preview */}
              <div className="relative aspect-video rounded-xl overflow-hidden border border-ute-border bg-ute-surface-hi">
                <ProjectIframe url={project.liveUrl} title={project.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-ute-bg/40 to-transparent pointer-events-none" />
              </div>

              {/* Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{project.country}</span>
                  <span className="font-mono text-xs text-ute-text-muted">{project.year}</span>
                </div>
                <h3 className="font-playfair text-3xl font-bold text-ute-text">{project.title}</h3>
                <p className="font-mono text-xs tracking-wide text-ute-gold">{project.role}</p>
                <p className="text-ute-text-muted leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] px-2 py-1 rounded border border-ute-border text-ute-text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="pt-2">
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-ute-electric text-sm hover:gap-4 transition-all duration-200"
                  >
                    Visit live site <span>→</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link href="/projects" className="text-sm text-ute-text-muted hover:text-ute-gold transition-colors">
            View all projects →
          </Link>
        </div>
      </div>
    </section>
  );
}
