'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import SectionLabel from '@/components/ui/section-label';
import { fadeUp, staggerContainer } from '@/lib/animations';

interface SystemDesign {
  id: string;
  title: string;
  description: string;
  diagramUrl?: string;
  tags: string[];
}

export default function SystemDesignPage() {
  const [items, setItems] = useState<SystemDesign[]>([]);

  useEffect(() => {
    fetch('/api/system-design')
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setItems(data))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-ute-bg">
      <section className="pt-32 pb-16 bg-ute-surface border-b border-ute-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionLabel label="Architecture" title="System Design" subtitle="Breakdowns of systems, architectures, and engineering decisions." />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {items.length === 0 ? (
            <p className="text-ute-text-muted">System design entries will appear here once added via the admin panel.</p>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  variants={fadeUp}
                  custom={i}
                  className="rounded-xl bg-ute-surface border border-ute-border hover:border-ute-gold/40 transition-all overflow-hidden"
                >
                  {item.diagramUrl && (
                    <div className="relative aspect-video bg-ute-surface-hi">
                      <Image src={item.diagramUrl} alt={item.title} fill className="object-contain p-4" />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-playfair text-xl font-bold text-ute-text mb-2">{item.title}</h3>
                    <p className="text-sm text-ute-text-muted leading-relaxed mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span key={tag} className="font-mono text-[10px] px-2 py-0.5 rounded border border-ute-gold/30 text-ute-gold">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
