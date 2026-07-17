'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Code2, Server, Cloud, Users, Smartphone, Zap } from 'lucide-react';
import SectionLabel from '@/components/ui/section-label';
import { fadeUp, staggerContainer } from '@/lib/animations';

const icons = [Code2, Server, Cloud, Users, Smartphone, Zap];

interface Service {
  id: string;
  title: string;
  description: string;
}

export default function ServicePage() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch('/api/services')
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setServices(data))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-ute-bg">
      <section className="pt-32 pb-16 bg-ute-surface border-b border-ute-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionLabel label="What I Offer" title="Services" subtitle="Engineering services tailored to startups, businesses, and technology teams." />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service, i) => {
              const Icon = icons[i % icons.length];
              return (
                <motion.div
                  key={service.id}
                  variants={fadeUp}
                  custom={i}
                  className="group p-8 rounded-xl bg-ute-surface border border-ute-border hover:border-ute-gold/50 transition-all hover:bg-ute-surface-hi"
                >
                  <div className="w-12 h-12 rounded-xl bg-ute-gold/10 flex items-center justify-center mb-6 group-hover:bg-ute-gold/20 transition-colors">
                    <Icon className="w-6 h-6 text-ute-gold" />
                  </div>
                  <h3 className="font-playfair text-xl font-bold text-ute-text mb-3">{service.title}</h3>
                  <p className="text-ute-text-muted leading-relaxed mb-6">{service.description}</p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-sm text-ute-electric hover:gap-4 transition-all"
                  >
                    Request this service →
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
