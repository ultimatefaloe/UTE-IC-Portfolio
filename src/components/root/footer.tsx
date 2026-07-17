import Link from 'next/link';
import { Twitter, Linkedin, Instagram, Facebook, Github } from 'lucide-react';
import { navLinks } from '@/config/nav';

const socials = [
  { href: 'https://x.com/faloeUltimate/', icon: Twitter, label: 'Twitter' },
  { href: 'https://www.linkedin.com/in/tunmise-falodun-1894b22a2/', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://www.instagram.com/ultimatefaloe/', icon: Instagram, label: 'Instagram' },
  { href: 'https://web.facebook.com/faloeultimate/', icon: Facebook, label: 'Facebook' },
  { href: 'https://github.com/ultimatefaloe', icon: Github, label: 'GitHub' },
];

export default function Footer() {
  return (
    <footer className="bg-ute-surface border-t border-ute-border py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-sm bg-ute-gold flex items-center justify-center">
                <span className="font-playfair font-bold text-ute-bg text-sm">TF</span>
              </div>
              <span className="font-playfair font-bold text-ute-text">Tunmise Falodun</span>
            </div>
            <p className="text-ute-text-muted text-sm leading-relaxed">
              Building systems that scale. Full-stack engineer and founder of Ultimate IntelliForge.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h5 className="font-mono text-xs tracking-[0.2em] uppercase text-ute-gold mb-4">Navigation</h5>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-ute-text-muted hover:text-ute-text transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h5 className="font-mono text-xs tracking-[0.2em] uppercase text-ute-gold mb-4">Connect</h5>
            <div className="flex gap-3 flex-wrap">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <Link
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 rounded border border-ute-border flex items-center justify-center text-ute-text-muted hover:border-ute-gold hover:text-ute-gold transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </Link>
                );
              })}
            </div>
            <p className="mt-6 text-sm text-ute-text-muted">
              <a href="mailto:ultimatefaloe@outlook.com" className="hover:text-ute-gold transition-colors">
                ultimatefaloe@outlook.com
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-ute-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-ute-text-muted">
            &copy; {new Date().getFullYear()} Tunmise Falodun. All rights reserved.
          </p>
          <p className="text-xs text-ute-text-muted">
            Built by Tunmise Falodun —{' '}
            <span className="text-ute-gold">Ultimate IntelliForge</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
