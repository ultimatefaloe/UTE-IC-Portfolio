'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Code2, Server, Cloud, Users, Smartphone, Zap } from 'lucide-react';
import SectionLabel from '@/components/ui/section-label';
import { fadeUp, staggerContainer } from '@/lib/animations';

const defaultServices = [
  { icon: Code2, title: 'Full-Stack Development', desc: 'End-to-end web applications from UI to API to database, built to scale.' },
  { icon: Server, title: 'System Architecture', desc: 'Designing systems that are secure, maintainable, and built for growth.' },
  { icon: Cloud, title: 'DevOps & Cloud', desc: 'CI/CD pipelines, containerisation, AWS deployments, and infrastructure as code.' },
  { icon: Users, title: 'Technical Consulting', desc: 'Engineering strategy, code reviews, and technical leadership for your team.' },
  { icon: Smartphone, title: 'Mobile Development', desc: 'Cross-platform mobile apps with React Native for iOS and Android.' },
  { icon: Zap, title: 'API Integration', desc: 'Payment gateways, maps, storage, third-party services — wired together cleanly.' },
];

interface Service { id: string; title: string; description: string; }

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch('/api/services')
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setServices(data))
      .catch(() => {});
  }, []);

  return (
    <section className="py-24 lg:py-32 bg-ute-bg">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-end justify-between mb-16">
          <SectionLabel label="What I Offer" title="Services" />
          <Link
            href="/services"
            className="hidden md:inline-flex text-sm text-ute-text-muted hover:text-ute-gold transition-colors gap-1 items-center"
          >
            View all <span>→</span>
          </Link>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {(services.length > 0
            ? services.slice(0, 6).map((s, i) => ({
                icon: defaultServices[i % defaultServices.length].icon,
                title: s.title,
                desc: s.description,
              }))
            : defaultServices
          ).map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={fadeUp}
                custom={i}
                className="group p-6 rounded-xl bg-ute-surface border border-ute-border hover:border-ute-gold/40 transition-all duration-300 hover:bg-ute-surface-hi"
              >
                <div className="w-10 h-10 rounded-lg bg-ute-gold/10 flex items-center justify-center mb-4 group-hover:bg-ute-gold/20 transition-colors">
                  <Icon className="w-5 h-5 text-ute-gold" />
                </div>
                <h3 className="font-playfair text-lg font-bold text-ute-text mb-2">{service.title}</h3>
                <p className="text-sm text-ute-text-muted leading-relaxed">{service.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
