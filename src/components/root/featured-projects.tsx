'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import SectionLabel from '@/components/ui/section-label';
import { fadeUp } from '@/lib/animations';

interface Project {
  id: string;
  title: string;
  description: string;
  liveUrl: string;
  techStack: string[];
  category: string;
  featured: boolean;
}

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
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects?featured=true')
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setProjects(data.slice(0, 3)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

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

        {loading ? (
          <div className="space-y-24">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="aspect-video rounded-xl bg-ute-surface-hi border border-ute-border animate-pulse" />
                <div className="space-y-4">
                  <div className="h-4 w-32 rounded bg-ute-surface-hi animate-pulse" />
                  <div className="h-8 w-64 rounded bg-ute-surface-hi animate-pulse" />
                  <div className="h-16 rounded bg-ute-surface-hi animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <p className="text-ute-text-muted">
            No featured projects yet. Mark projects as featured in the admin panel.
          </p>
        ) : (
          <div className="space-y-24">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={fadeUp}
                custom={0}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                <div className="relative aspect-video rounded-xl overflow-hidden border border-ute-border bg-ute-surface-hi">
                  <ProjectIframe url={project.liveUrl} title={project.title} />
                  <div className="absolute inset-0 bg-linear-to-t from-ute-bg/40 to-transparent pointer-events-none" />
                </div>

                <div className="space-y-4">
                  <span className="font-mono text-xs tracking-widest uppercase text-ute-gold">
                    {project.category}
                  </span>
                  <h3 className="font-playfair text-3xl font-bold text-ute-text">{project.title}</h3>
                  <p className="text-ute-text-muted leading-relaxed">{project.description}</p>
                  {(project.techStack ?? []).length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {(project.techStack ?? []).map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[10px] px-2 py-1 rounded border border-ute-border text-ute-text-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
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
        )}

        <div className="mt-12 text-center md:hidden">
          <Link href="/projects" className="text-sm text-ute-text-muted hover:text-ute-gold transition-colors">
            View all projects →
          </Link>
        </div>
      </div>
    </section>
  );
}
