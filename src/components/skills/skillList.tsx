'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionLabel from '@/components/ui/section-label';
import SkillType from './skillType';
import { staggerContainer } from '@/lib/animations';

interface Skill {
  id: string;
  name: string;
  proficiency: number;
  category: string;
}

const CATEGORIES = ['Frontend', 'Backend', 'DevOps', 'Database', 'Mobile', 'Other'];

export default function SkillList() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [activeCategory, setActiveCategory] = useState('Frontend');

  useEffect(() => {
    fetch('/api/skills')
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setSkills(data))
      .catch(() => {});
  }, []);

  const filtered = skills.filter((s) => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-ute-bg">
      <section className="pt-32 pb-16 bg-ute-surface border-b border-ute-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionLabel label="Expertise" title="Skills & Technologies" />
        </div>
      </section>

      <div className="sticky top-16 z-20 bg-ute-bg/90 backdrop-blur border-b border-ute-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded font-mono text-xs whitespace-nowrap transition-all ${
                  activeCategory === cat
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
          <motion.div
            key={activeCategory}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {filtered.length > 0 ? (
              <SkillType skills={filtered} />
            ) : (
              <p className="text-ute-text-muted text-sm">No skills added for this category yet.</p>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
