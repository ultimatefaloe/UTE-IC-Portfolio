'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X, ExternalLink } from 'lucide-react';
import SectionLabel from '@/components/ui/section-label';
import { fadeUp, staggerContainer } from '@/lib/animations';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  category: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

function toDisplayCategory(raw: string): string {
  return raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
}

export default function ProductPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    fetch('/api/projects')
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setProjects(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', ...Array.from(new Set(projects.map((p) => toDisplayCategory(p.category))))];

  const filtered = projects.filter((p) => {
    if (activeTab === 'All') return true;
    return toDisplayCategory(p.category) === activeTab;
  });

  return (
    <div className="min-h-screen bg-ute-bg">
      <section className="pt-32 pb-16 bg-ute-surface border-b border-ute-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionLabel label="My Work" title="Projects" subtitle="A collection of contracts, personal ventures, and prototypes." />
        </div>
      </section>

      <div className="sticky top-16 z-20 bg-ute-bg/90 backdrop-blur border-b border-ute-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-1.5 rounded font-mono text-xs whitespace-nowrap transition-all ${
                  activeTab === cat
                    ? 'bg-ute-gold text-ute-bg font-medium'
                    : 'text-ute-text-muted hover:text-ute-text'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 rounded-xl bg-ute-surface border border-ute-border animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-ute-text-muted">No projects in this category yet.</p>
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((project, i) => (
                  <motion.div
                    key={project.id}
                    layout
                    variants={fadeUp}
                    custom={i % 6}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="group p-6 rounded-xl bg-ute-surface border border-ute-border hover:border-ute-gold/40 transition-all cursor-pointer"
                    onClick={() => setSelected(project)}
                  >
                    {project.liveUrl && (
                      <div className="relative aspect-video rounded-lg overflow-hidden mb-4 bg-ute-surface-hi">
                        <iframe
                          src={project.liveUrl}
                          className="w-[200%] h-[200%] scale-50 origin-top-left border-0 pointer-events-none"
                          loading="lazy"
                          title={project.title}
                        />
                      </div>
                    )}
                    <h3 className="font-playfair text-lg font-bold text-ute-text group-hover:text-ute-gold transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-ute-text-muted mt-2 line-clamp-2">{project.description}</p>
                    {(project.techStack ?? []).length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {(project.techStack ?? []).slice(0, 3).map((t) => (
                          <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded border border-ute-border text-ute-text-muted">{t}</span>
                        ))}
                        {(project.techStack ?? []).length > 3 && (
                          <span className="font-mono text-[10px] text-ute-text-muted">+{(project.techStack ?? []).length - 3}</span>
                        )}
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ute-bg/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-ute-surface border border-ute-border rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="font-playfair text-2xl font-bold text-ute-text">{selected.title}</h2>
                <button onClick={() => setSelected(null)} className="text-ute-text-muted hover:text-ute-text">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-ute-text-muted leading-relaxed mb-6">
                {selected.longDescription || selected.description}
              </p>
              {(selected.techStack ?? []).length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {(selected.techStack ?? []).map((t) => (
                    <span key={t} className="font-mono text-xs px-2 py-1 rounded border border-ute-border text-ute-text-muted">{t}</span>
                  ))}
                </div>
              )}
              <div className="flex gap-4">
                {selected.liveUrl && (
                  <Link href={selected.liveUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded bg-ute-gold text-ute-bg text-sm font-medium">
                    <ExternalLink className="w-4 h-4" /> Live Site
                  </Link>
                )}
                {selected.githubUrl && (
                  <Link href={selected.githubUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded border border-ute-border text-ute-text text-sm">
                    GitHub
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
