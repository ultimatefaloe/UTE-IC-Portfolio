'use client';

import { motion } from 'framer-motion';
import CircularPercentage from './components/circularPercentage';
import { fadeUp } from '@/lib/animations';

interface Skill {
  id: string;
  name: string;
  proficiency: number;
  category: string;
}

interface SkillTypeProps {
  skills: Skill[];
}

export default function SkillType({ skills }: SkillTypeProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {skills.map((skill, i) => (
        <motion.div
          key={skill.id}
          variants={fadeUp}
          custom={i}
          className="flex flex-col items-center gap-3 p-4 rounded-xl bg-ute-surface border border-ute-border hover:border-ute-gold/40 transition-colors group"
        >
          <div className="relative">
            <CircularPercentage percentage={skill.proficiency} />
            <span className="absolute inset-0 flex items-center justify-center font-mono text-xs font-bold text-ute-gold rotate-90">
              {skill.proficiency}%
            </span>
          </div>
          <span className="font-mono text-xs text-ute-text-muted group-hover:text-ute-text transition-colors text-center">
            {skill.name}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
