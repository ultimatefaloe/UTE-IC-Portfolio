'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { fadeUp, slideInLeft, slideInRight } from '@/lib/animations';

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

function useTextScramble(text: string, trigger: boolean) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!trigger) return;
    let frame = 0;
    const totalFrames = 20;
    const interval = setInterval(() => {
      if (frame >= totalFrames) {
        setDisplay(text);
        clearInterval(interval);
        return;
      }
      setDisplay(
        text
          .split('')
          .map((char, i) =>
            i < Math.floor((frame / totalFrames) * text.length)
              ? char
              : char === ' '
              ? ' '
              : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
          )
          .join('')
      );
      frame++;
    }, 60);
    return () => clearInterval(interval);
  }, [text, trigger]);

  return display;
}

export default function HeroSection() {
  const [started, setStarted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const name = useTextScramble('Tunmise Falodun', started);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${p.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-ute-bg -mt-16 md:-mt-20 pt-16 md:pt-20">
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Gold radial glow behind photo */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-ute-gold/5 blur-[80px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Text */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.span
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-block font-mono text-xs tracking-[0.25em] uppercase text-ute-gold"
            >
              Software Engineer · Entrepreneur
            </motion.span>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-ute-text leading-tight"
            >
              {name}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="text-ute-text-muted text-lg md:text-xl max-w-xl leading-relaxed"
            >
              Building scalable systems across Africa, Canada &amp; the US. Full-stack engineer, system architect, and founder of{' '}
              <span className="text-ute-gold">Ultimate IntelliForge</span>.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="flex flex-wrap gap-4 pt-2"
            >
              <Link
                href="/projects"
                className="inline-flex items-center px-6 py-3 rounded bg-ute-gold text-ute-bg font-medium hover:bg-ute-gold-muted transition-colors duration-200"
              >
                View My Work
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 rounded border border-ute-electric text-ute-electric font-medium hover:bg-ute-electric/10 transition-colors duration-200"
              >
                Let&apos;s Talk
              </Link>
            </motion.div>
          </motion.div>

          {/* Photo */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              {/* Gold corner accents */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-ute-gold" />
              <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-ute-gold" />
              <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-ute-gold" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-ute-gold" />
              {/* Electric glow */}
              <div className="absolute inset-0 rounded-lg shadow-[0_0_60px_rgba(0,212,255,0.15)]" />
              <Image
                src="/images/Profile.jpg"
                alt="Tunmise Falodun"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] tracking-widest text-ute-text-muted uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-ute-gold to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
