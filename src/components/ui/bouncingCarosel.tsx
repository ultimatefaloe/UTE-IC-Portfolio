'use client';

import { useEffect, useRef, useState } from 'react';

interface StackItem {
  icon: React.ReactNode;
  name: string;
}

interface Props {
  stack: StackItem[];
}

export default function BouncingCarousel({ stack }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState(1);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    let animId: number;
    const animate = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;
        setPosition((prev) => {
          let next = prev + direction * 1.5;
          if (next <= 0) { setDirection(1); next = 0; }
          else if (next >= maxScroll) { setDirection(-1); next = maxScroll; }
          container.scrollLeft = next;
          return next;
        });
      }
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [direction, position]);

  return (
    <div
      ref={containerRef}
      className="flex gap-4 overflow-x-hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      {[...stack, ...stack].map((tech, i) => (
        <div
          key={i}
          className="flex flex-col items-center justify-center min-w-[90px] p-4 rounded-lg bg-ute-surface-hi border border-ute-border hover:border-ute-gold/50 transition-colors group shrink-0"
        >
          <div className="text-3xl mb-2">{tech.icon}</div>
          <span className="font-mono text-[10px] text-ute-text-muted group-hover:text-ute-gold transition-colors text-center">
            {tech.name}
          </span>
        </div>
      ))}
    </div>
  );
}
