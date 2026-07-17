'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import SectionLabel from '@/components/ui/section-label';
import { fadeUp } from '@/lib/animations';

export default function ContactTeaser() {
  return (
    <section className="py-24 lg:py-32 bg-ute-surface relative overflow-hidden">
      {/* Electric glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] rounded-full bg-ute-electric/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8 text-center">
        <SectionLabel label="Get In Touch" title="Have a project in mind?" center />

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={3}
          className="text-ute-text-muted text-lg leading-relaxed mb-10"
        >
          Whether you need a full-stack application, system architecture advice, or a technical partner — let&apos;s talk about what you&apos;re building.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={4}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded bg-ute-gold text-ute-bg font-medium hover:bg-ute-gold-muted transition-colors duration-200"
          >
            Send a Message <span>→</span>
          </Link>
          <a
            href="mailto:ultimatefaloe@outlook.com"
            className="text-sm text-ute-text-muted hover:text-ute-text transition-colors"
          >
            ultimatefaloe@outlook.com
          </a>
        </motion.div>
      </div>
    </section>
  );
}
