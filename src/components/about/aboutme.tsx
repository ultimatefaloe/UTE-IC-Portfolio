'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import SectionLabel from '@/components/ui/section-label';
import { fadeUp, slideInRight } from '@/lib/animations';

const milestones = [
  {
    year: 'Jul 2024',
    label: 'Joined Industry',
    desc: 'Started first two engineering roles simultaneously: backend developer at the University of Ilorin Recruitment Portal and full-stack engineer at 59Minutes Print, Abuja.',
  },
  {
    year: 'May 2025',
    label: 'International Contracts Begin',
    desc: 'Shipped scalable REST APIs for MeuDelivery (Angola, Remote) — authentication, order tracking, multi-party flows, and Swagger-documented clean architecture.',
  },
  {
    year: 'Aug 2025',
    label: 'Front-End Team Lead — Accessivo',
    desc: 'Promoted to team lead at Accessivo (Ilorin), bridging product and engineering: assigning tasks, mentoring the team, and championing code quality across frontend delivery.',
  },
  {
    year: 'Oct 2025',
    label: 'Founded FashionKet',
    desc: 'Launched FashionKet under Ultimate IntelliForge — a multi-vendor e-commerce platform for emerging fashion brands and SMEs across Nigeria.',
  },
  {
    year: 'Dec 2025',
    label: 'Water Groove — Fintech Platform',
    desc: 'Architected a fintech investment platform with ledger-based transactions, cron-driven ROI automation, Auth0 integration, and balance snapshots reducing query load by ~40%.',
  },
  {
    year: 'Mar 2026',
    label: 'TinnieStudio & Acefre',
    desc: 'Joined TinnieStudio (Ontario, Canada) to build media streaming infrastructure with RabbitMQ, FFmpeg, and HLS delivery; co-founded Acefre — a trust-based task marketplace.',
  },
];

const personalProjects = [
  { name: 'Fashionket', url: 'https://fashionket.com', desc: 'Fashion marketplace platform (CEO & CTO)' },
  { name: 'Acefre', url: 'https://acefre.com', desc: 'Technology product (CEO & CTO)' },
];

export default function AboutMe() {
  return (
    <div className="min-h-screen bg-ute-bg">
      {/* Hero banner */}
      <section className="relative py-32 bg-ute-surface border-b border-ute-border overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-0 w-96 h-96 bg-ute-gold/5 blur-[80px] rounded-full" />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 pt-8">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-xs tracking-[0.25em] uppercase text-ute-gold block mb-4"
          >
            {'// About Me'}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-playfair text-5xl md:text-6xl font-bold text-ute-text"
          >
            Tunmise Falodun
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-xl text-ute-gold"
          >
            Software Engineer · Full-Stack Developer · Technology Entrepreneur
          </motion.p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Bio */}
            <div className="lg:col-span-2 space-y-6 text-ute-text-muted leading-relaxed">
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <p>
                  I&apos;m a <span className="text-ute-text">software engineer, full-stack developer, and technology entrepreneur</span> with a passion
                  for building software that solves real-world problems. Over the past four years, I have worked across multiple industries
                  — fintech, logistics, e-commerce, and SaaS — designing and developing scalable applications that improve business
                  processes and user experiences.
                </p>
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}>
                <p>
                  My strongest expertise lies in backend engineering, where I specialise in building secure, scalable systems using{' '}
                  <span className="text-ute-gold">Node.js, NestJS, Express.js, PHP, Laravel, SpringBoot, PostgreSQL, MySQL, and MongoDB</span>.
                  On the frontend, I work with <span className="text-ute-gold">React, Next.js, TypeScript, and Tailwind CSS</span>, and
                  build cross-platform mobile apps with <span className="text-ute-gold">React Native</span>.
                </p>
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}>
                <p>
                  Beyond engineering, I founded <span className="text-ute-text">Ultimate IntelliForge</span> — a software engineering and
                  technology company dedicated to developing innovative digital solutions for startups, businesses, and organisations.
                  My vision is to create an ecosystem that combines software development, technical consulting, developer education, and
                  research.
                </p>
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3}>
                <p>
                  I am also exploring <span className="text-ute-gold">Go, Java, and Rust</span> to broaden my perspective and strengthen
                  my ability to build high-performance systems. My goal is to become a globally recognised software engineer,
                  technology leader, and entrepreneur — contributing to the growth of the African technology ecosystem.
                </p>
              </motion.div>
            </div>

            {/* Sidebar */}
            <motion.aside
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="relative w-48 h-48 mx-auto mb-6">
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-ute-gold" />
                <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-ute-gold" />
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-ute-gold" />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-ute-gold" />
                <Image src="/images/Profile.jpg" alt="Tunmise Falodun" fill className="object-cover rounded-lg" />
              </div>

              <div className="p-5 rounded-xl bg-ute-surface border border-ute-border space-y-3">
                {[
                  { label: 'Location', value: 'Nigeria (Remote Worldwide)' },
                  { label: 'Availability', value: 'Open to contracts' },
                  { label: 'Email', value: 'ultimatefaloe@outlook.com' },
                  { label: 'Experience', value: '4+ Years' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <span className="font-mono text-[10px] tracking-widest uppercase text-ute-gold">{label}</span>
                    <span className="text-sm text-ute-text">{value}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href="https://drive.google.com/file/d/14jTgXihW3nFfo0VaBxctXApYr_ua2-zs/view?usp=sharing"
                  download
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded border border-ute-gold text-ute-gold text-sm hover:bg-ute-gold/10 transition-colors"
                >
                  Download CV
                </a>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded bg-ute-gold text-ute-bg text-sm font-medium hover:bg-ute-gold-muted transition-colors"
                >
                  Hire Me
                </Link>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* Journey timeline */}
      <section className="py-24 bg-ute-surface">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionLabel label="My Journey" title="Career Milestones" />
          <div className="relative mt-12">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-ute-border" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="pl-12 relative"
                >
                  <div className="absolute left-4 top-2 w-2 h-2 rounded-full bg-ute-gold -translate-x-1/2 ring-2 ring-ute-surface" />
                  <span className="font-mono text-xs text-ute-gold">{m.year}</span>
                  <h4 className="font-playfair text-lg font-bold text-ute-text mt-1">{m.label}</h4>
                  <p className="text-sm text-ute-text-muted mt-1">{m.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Personal projects */}
      <section className="py-24 bg-ute-bg">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionLabel label="Founder Work" title="Personal Ventures" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {personalProjects.map((p, i) => (
              <motion.a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="p-6 rounded-xl bg-ute-surface border border-ute-border hover:border-ute-gold/50 transition-all group"
              >
                <h3 className="font-playfair text-xl font-bold text-ute-text group-hover:text-ute-gold transition-colors">{p.name}</h3>
                <p className="text-sm text-ute-text-muted mt-2">{p.desc}</p>
                <span className="inline-flex items-center gap-1 text-xs text-ute-electric mt-4">
                  Visit site →
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
