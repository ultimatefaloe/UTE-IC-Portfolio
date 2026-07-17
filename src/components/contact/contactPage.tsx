'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Twitter, Linkedin, Instagram, Facebook, Github } from 'lucide-react';
import SectionLabel from '@/components/ui/section-label';
import { slideInLeft, slideInRight } from '@/lib/animations';
import { emailSend } from '@/lib/emailjs';

const socials = [
  { href: 'https://x.com/faloeUltimate/', icon: Twitter, label: 'Twitter / X' },
  { href: 'https://www.linkedin.com/in/tunmise-falodun-1894b22a2/', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://www.instagram.com/ultimatefaloe/', icon: Instagram, label: 'Instagram' },
  { href: 'https://web.facebook.com/faloeultimate/', icon: Facebook, label: 'Facebook' },
  { href: 'https://github.com/ultimatefaloe', icon: Github, label: 'GitHub' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    const result = await emailSend(form);
    if (result.success) {
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
    } else {
      setStatus('error');
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-lg bg-ute-surface-hi border border-ute-border text-ute-text placeholder-ute-text-muted focus:outline-none focus:border-ute-gold transition-colors text-sm font-dm-sans';

  return (
    <div className="min-h-screen bg-ute-bg">
      <section className="pt-32 pb-16 bg-ute-surface border-b border-ute-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionLabel label="Get In Touch" title="Contact" subtitle="Have a project or opportunity? Let&apos;s talk." />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.form
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className={inputClass}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  className={inputClass}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                required
                className={inputClass}
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
              />
              <textarea
                placeholder="Your Message"
                required
                rows={7}
                className={inputClass}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-4 rounded-lg bg-ute-gold text-ute-bg font-medium hover:bg-ute-gold-muted transition-colors disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              {status === 'sent' && (
                <p className="text-sm text-ute-electric text-center">Message sent! I&apos;ll get back to you shortly.</p>
              )}
              {status === 'error' && (
                <p className="text-sm text-red-400 text-center">Something went wrong. Please try again.</p>
              )}
            </motion.form>

            {/* Info */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="font-playfair text-xl font-bold text-ute-text mb-4">Direct Contact</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Email', value: 'ultimatefaloe@gmail.com', href: 'mailto:ultimatefaloe@gmail.com' },
                    { label: 'Location', value: 'Nigeria (Available Worldwide)' },
                    { label: 'Availability', value: 'Open to contracts & collaborations' },
                  ].map(({ label, value, href }) => (
                    <div key={label} className="flex flex-col gap-0.5">
                      <span className="font-mono text-[10px] tracking-widest uppercase text-ute-gold">{label}</span>
                      {href ? (
                        <a href={href} className="text-sm text-ute-text hover:text-ute-gold transition-colors">{value}</a>
                      ) : (
                        <span className="text-sm text-ute-text">{value}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-playfair text-xl font-bold text-ute-text mb-4">Social</h3>
                <div className="flex flex-col gap-3">
                  {socials.map((s) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={s.href}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-sm text-ute-text-muted hover:text-ute-gold transition-colors"
                      >
                        <Icon className="w-4 h-4" />
                        {s.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
