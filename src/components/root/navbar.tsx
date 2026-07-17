'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks } from '@/config/nav';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-ute-bg/90 backdrop-blur-md border-b border-ute-border'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-sm bg-ute-gold flex items-center justify-center">
              <span className="font-playfair font-bold text-ute-bg text-sm leading-none">TF</span>
            </div>
            <span className="font-dm-sans text-ute-text font-medium hidden sm:block">
              Tunmise Falodun
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-dm-sans text-sm transition-colors duration-200 relative group ${
                    active ? 'text-ute-text' : 'text-ute-text-muted hover:text-ute-text'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-ute-gold transition-all duration-300 ${
                      active ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center px-4 py-2 rounded text-sm font-medium border border-ute-electric text-ute-electric hover:bg-ute-electric/10 transition-colors duration-200"
            >
              Hire Me
            </Link>
            <button
              className="lg:hidden text-ute-text p-1"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ute-bg flex flex-col px-8 py-8"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="w-9 h-9 rounded-sm bg-ute-gold flex items-center justify-center">
                <span className="font-playfair font-bold text-ute-bg text-sm">TF</span>
              </div>
              <button onClick={() => setOpen(false)} className="text-ute-text" aria-label="Close menu">
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    href={link.href}
                    className="font-playfair text-3xl font-bold text-ute-text hover:text-ute-gold transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto pt-8 border-t border-ute-border">
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 rounded text-sm font-medium border border-ute-electric text-ute-electric hover:bg-ute-electric/10 transition-colors duration-200"
                onClick={() => setOpen(false)}
              >
                Hire Me
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
