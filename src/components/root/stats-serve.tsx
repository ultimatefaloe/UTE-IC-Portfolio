'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: 4, suffix: '+', label: 'Years Experience' },
  { value: 10, suffix: '+', label: 'Projects Shipped' },
  { value: 5, suffix: '', label: 'Countries Served' },
  { value: 15, suffix: '+', label: 'Technologies Mastered' },
];

function Counter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span className="font-playfair text-5xl md:text-6xl font-bold text-ute-gold">
      {count}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="bg-ute-surface border-y border-ute-border py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`text-center ${i < stats.length - 1 ? 'md:border-r md:border-ute-border' : ''}`}
            >
              <Counter value={stat.value} suffix={stat.suffix} inView={inView} />
              <p className="mt-2 text-sm text-ute-text-muted font-dm-sans">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
