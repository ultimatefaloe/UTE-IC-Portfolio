# Portfolio Premium Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the generic sidebar/sky-blue portfolio with a cinematic dark/gold/electric premium portfolio using Framer Motion and anime.js, keeping all API/Prisma/CMS logic untouched.

**Architecture:** Approach B — design token layer first in `globals.css`, then full component rebuild. Public layout switches from left sidebar to full-page scroll + sticky navbar. Admin gets visual refresh with same design system. All `src/app/api/**`, `src/lib/**`, `src/middleware.ts`, and `prisma/` are never touched.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion, anime.js v3, Playfair Display + DM Sans + JetBrains Mono via `next/font/google`

---

## File Map

**New files created:**
- `src/lib/animations.ts` — shared Framer Motion variants
- `src/components/root/navbar.tsx` — sticky top navbar
- `src/components/root/about-teaser.tsx` — homepage about snippet
- `src/components/root/featured-projects.tsx` — homepage 3 featured projects with iframe
- `src/components/root/experience-section.tsx` — homepage career timeline
- `src/components/root/contact-teaser.tsx` — homepage contact CTA

**Fully rewritten (UI only, no logic change):**
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/app/(public)/layout.tsx`
- `src/components/root/main.tsx`
- `src/components/root/hero-section.tsx`
- `src/components/root/stats-serve.tsx`
- `src/components/root/footer.tsx`
- `src/components/root/service.tsx`
- `src/components/root/skills.tsx`
- `src/components/ui/bouncingCarosel.tsx`
- `src/app/(public)/page.tsx`
- `src/components/about/aboutme.tsx`
- `src/components/blog/blogPage.tsx`
- `src/components/contact/contactPage.tsx`
- `src/components/experience/exp.tsx`
- `src/components/projects/productpage.tsx`
- `src/components/service/servicePage.tsx`
- `src/components/skills/skillList.tsx`
- `src/components/skills/skillType.tsx`
- `src/components/skills/components/circularPercentage.tsx`
- `src/components/system-design/systemDesignPage.tsx`
- `src/app/admin/layout.tsx`
- `src/app/admin/login/page.tsx`
- `src/app/admin/dashboard/page.tsx`
- `src/components/admin/resource-manager.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/button.tsx`
- `src/components/ui/badge.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/textarea.tsx`

**Deleted:**
- `src/components/root/sidebar.tsx`
- `src/components/root/testimonial.tsx`

**Never touched:**
- `src/app/api/**`
- `src/lib/prisma.ts`, `src/lib/admin-auth.ts`, `src/lib/emailjs.ts`, `src/lib/api-utils.ts`
- `src/lib/index.ts`, `src/lib/utils.ts`
- `src/middleware.ts`
- `prisma/`
- `src/app/admin/blog/page.tsx`, `src/app/admin/experience/page.tsx`, `src/app/admin/projects/page.tsx`, `src/app/admin/services/page.tsx`, `src/app/admin/skills/page.tsx`, `src/app/admin/content/page.tsx`, `src/app/admin/system-design/page.tsx` (these all just render `<ResourceManager>` which gets restyled in Task 30)

---

## Phase 1 — Foundation

### Task 1: Install Packages

**Files:** `package.json`

- [ ] **Step 1: Install Framer Motion and anime.js**

```bash
pnpm add framer-motion animejs
```

- [ ] **Step 2: Verify install**

```bash
pnpm list framer-motion animejs
```

Expected: both packages listed with versions (framer-motion 11.x, animejs 3.x)

- [ ] **Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: add framer-motion and animejs"
```

---

### Task 2: Design Tokens — globals.css

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace globals.css entirely**

```css
@import 'tailwindcss';
@import 'tw-animate-css';

@custom-variant dark (&:is(.dark *));

@theme inline {
  /* Brand palette */
  --color-ute-bg:            #0A0A0F;
  --color-ute-surface:       #111118;
  --color-ute-surface-hi:    #1A1A24;
  --color-ute-gold:          #C9A84C;
  --color-ute-gold-muted:    #8B6914;
  --color-ute-electric:      #00D4FF;
  --color-ute-electric-dim:  #0099BB;
  --color-ute-text:          #F0EDE8;
  --color-ute-text-muted:    #8B8B9A;
  --color-ute-border:        #2A2A38;

  /* Legacy aliases (keep for any admin components that still reference these) */
  --color-ute-primary:   #0A0A0F;
  --color-ute-secondary: #111118;
  --color-ute-accent:    #C9A84C;
  --color-ute-neutral:   #F0EDE8;

  --color-background: var(--color-ute-bg);
  --color-foreground: var(--color-ute-text);

  --font-playfair: 'Playfair Display', serif;
  --font-dm-sans:  'DM Sans', sans-serif;
  --font-mono:     'JetBrains Mono', monospace;

  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
}

:root {
  --background: #0A0A0F;
  --foreground: #F0EDE8;
}

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-[#0A0A0F] text-[#F0EDE8] antialiased;
    font-family: var(--font-dm-sans), sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-playfair), serif;
  }

  code, pre, .font-mono {
    font-family: var(--font-mono), monospace;
  }
}

/* Scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #0A0A0F; }
::-webkit-scrollbar-thumb { background: #2A2A38; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #C9A84C; }
```

- [ ] **Step 2: Run dev to ensure no CSS errors**

```bash
pnpm dev
```

Open `http://localhost:3000` — page should be dark background. No console errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add premium dark/gold design tokens to globals.css"
```

---

### Task 3: Root Layout — Fonts

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace root layout with new fonts, remove Main wrapper**

```tsx
import { Metadata } from 'next';
import { Playfair_Display, DM_Sans, JetBrains_Mono } from 'next/font/google';
import { Bounce, ToastContainer } from 'react-toastify';
import './globals.css';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: {
    default: 'Tunmise Falodun — Full-Stack Engineer & Entrepreneur',
    template: '%s | Tunmise Falodun',
  },
  description:
    'Senior full-stack engineer and founder of Ultimate IntelliForge. Building scalable systems across fintech, SaaS, logistics, and streaming.',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body>
        {children}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify fonts load**

```bash
pnpm dev
```

Open DevTools → Elements → `<html>` should have the three font class variables.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: load Playfair Display, DM Sans, JetBrains Mono fonts"
```

---

### Task 4: Animation Presets

**Files:**
- Create: `src/lib/animations.ts`

- [ ] **Step 1: Create shared Framer Motion variants**

```ts
import { Variants } from 'framer-motion';

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay: i * 0.1 },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut', delay: i * 0.1 },
  }),
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
pnpm build 2>&1 | head -30
```

Expected: no errors on this file (or only unrelated pre-existing errors).

- [ ] **Step 3: Commit**

```bash
git add src/lib/animations.ts
git commit -m "feat: add shared Framer Motion animation variants"
```

---

### Task 5: SectionLabel Component

**Files:**
- Create: `src/components/ui/section-label.tsx`

- [ ] **Step 1: Create reusable section label**

```tsx
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/animations';

interface SectionLabelProps {
  label: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionLabel({ label, title, subtitle, center }: SectionLabelProps) {
  return (
    <motion.div
      className={`mb-12 ${center ? 'text-center' : ''}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <motion.span
        variants={fadeUp}
        custom={0}
        className="block font-mono text-xs tracking-[0.25em] uppercase text-[#C9A84C] mb-3"
      >
        // {label}
      </motion.span>
      <motion.h2
        variants={fadeUp}
        custom={1}
        className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-[#F0EDE8]"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          custom={2}
          className="mt-4 text-[#8B8B9A] text-lg max-w-2xl"
          style={center ? { margin: '1rem auto 0' } : {}}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/section-label.tsx
git commit -m "feat: add SectionLabel ui component"
```

---

## Phase 2 — Public Shell

### Task 6: Navbar

**Files:**
- Create: `src/components/root/navbar.tsx`

- [ ] **Step 1: Create sticky navbar with scroll transparency + mobile overlay**

```tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
  { href: '/experiences', label: 'Experience' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0A0A0F]/90 backdrop-blur-md border-b border-[#2A2A38]'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-sm bg-[#C9A84C] flex items-center justify-center">
              <span className="font-playfair font-bold text-[#0A0A0F] text-sm leading-none">TF</span>
            </div>
            <span className="font-dm-sans text-[#F0EDE8] font-medium hidden sm:block">
              Tunmise Falodun
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-dm-sans text-sm text-[#8B8B9A] hover:text-[#F0EDE8] transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C9A84C] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center px-4 py-2 rounded text-sm font-medium border border-[#00D4FF] text-[#00D4FF] hover:bg-[#00D4FF]/10 transition-colors duration-200"
            >
              Hire Me
            </Link>
            <button
              className="lg:hidden text-[#F0EDE8] p-1"
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
            className="fixed inset-0 z-[60] bg-[#0A0A0F] flex flex-col px-8 py-8"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="w-9 h-9 rounded-sm bg-[#C9A84C] flex items-center justify-center">
                <span className="font-playfair font-bold text-[#0A0A0F] text-sm">TF</span>
              </div>
              <button onClick={() => setOpen(false)} className="text-[#F0EDE8]" aria-label="Close menu">
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    href={link.href}
                    className="font-playfair text-3xl font-bold text-[#F0EDE8] hover:text-[#C9A84C] transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto pt-8 border-t border-[#2A2A38]">
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 rounded text-sm font-medium border border-[#00D4FF] text-[#00D4FF]"
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/root/navbar.tsx
git commit -m "feat: add sticky top navbar with mobile overlay"
```

---

### Task 7: Footer

**Files:**
- Modify: `src/components/root/footer.tsx`

- [ ] **Step 1: Rewrite footer**

```tsx
import Link from 'next/link';
import { Twitter, Linkedin, Instagram, Facebook, Github } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
  { href: '/experiences', label: 'Experience' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

const socials = [
  { href: 'https://x.com/faloeUltimate/', icon: Twitter, label: 'Twitter' },
  { href: 'https://www.linkedin.com/in/tunmise-falodun-1894b22a2/', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://www.instagram.com/ultimatefaloe/', icon: Instagram, label: 'Instagram' },
  { href: 'https://web.facebook.com/faloeultimate/', icon: Facebook, label: 'Facebook' },
  { href: 'https://github.com/ultimatefaloe', icon: Github, label: 'GitHub' },
];

export default function Footer() {
  return (
    <footer className="bg-[#111118] border-t border-[#2A2A38] py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-sm bg-[#C9A84C] flex items-center justify-center">
                <span className="font-playfair font-bold text-[#0A0A0F] text-sm">TF</span>
              </div>
              <span className="font-playfair font-bold text-[#F0EDE8]">Tunmise Falodun</span>
            </div>
            <p className="text-[#8B8B9A] text-sm leading-relaxed">
              Building systems that scale. Full-stack engineer and founder of Ultimate IntelliForge.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h5 className="font-mono text-xs tracking-[0.2em] uppercase text-[#C9A84C] mb-4">Navigation</h5>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#8B8B9A] hover:text-[#F0EDE8] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h5 className="font-mono text-xs tracking-[0.2em] uppercase text-[#C9A84C] mb-4">Connect</h5>
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
                    className="w-9 h-9 rounded border border-[#2A2A38] flex items-center justify-center text-[#8B8B9A] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </Link>
                );
              })}
            </div>
            <p className="mt-6 text-sm text-[#8B8B9A]">
              <a href="mailto:ultimatefaloe@gmail.com" className="hover:text-[#C9A84C] transition-colors">
                ultimatefaloe@gmail.com
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-[#2A2A38] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#8B8B9A]">
            &copy; {new Date().getFullYear()} Tunmise Falodun. All rights reserved.
          </p>
          <p className="text-xs text-[#8B8B9A]">
            Built by Tunmise Falodun —{' '}
            <span className="text-[#C9A84C]">Ultimate IntelliForge</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/root/footer.tsx
git commit -m "feat: rewrite footer with premium dark/gold design"
```

---

### Task 8: Public Layout — Remove Sidebar, Add Navbar

**Files:**
- Modify: `src/app/(public)/layout.tsx`
- Modify: `src/components/root/main.tsx`
- Delete: `src/components/root/sidebar.tsx`
- Delete: `src/components/root/testimonial.tsx`

- [ ] **Step 1: Simplify main.tsx**

```tsx
import { ReactNode } from 'react';

export default function Main({ children }: { children: ReactNode }) {
  return <main className="min-h-screen">{children}</main>;
}
```

- [ ] **Step 2: Rewrite public layout**

```tsx
import Navbar from '@/components/root/navbar';
import Footer from '@/components/root/footer';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Delete sidebar and testimonial**

```bash
rm src/components/root/sidebar.tsx
rm src/components/root/testimonial.tsx
```

- [ ] **Step 4: Run dev, verify no import errors**

```bash
pnpm dev
```

Open `http://localhost:3000` — you should see the navbar at the top and footer at the bottom. No console errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/(public)/layout.tsx src/components/root/main.tsx
git rm src/components/root/sidebar.tsx src/components/root/testimonial.tsx
git commit -m "feat: replace sidebar layout with full-page scroll + navbar"
```

---

## Phase 3 — Homepage Sections

### Task 9: Hero Section

**Files:**
- Modify: `src/components/root/hero-section.tsx`

- [ ] **Step 1: Rewrite hero with split layout + text scramble + particles**

```tsx
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

  // Particle field
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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0A0A0F] pt-20">
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Gold radial glow behind photo */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#C9A84C]/5 blur-[80px] pointer-events-none" />

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
              className="inline-block font-mono text-xs tracking-[0.25em] uppercase text-[#C9A84C]"
            >
              Software Engineer · Entrepreneur
            </motion.span>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-[#F0EDE8] leading-tight"
            >
              {name}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="text-[#8B8B9A] text-lg md:text-xl max-w-xl leading-relaxed"
            >
              Building scalable systems across Africa, Canada &amp; the US. Full-stack engineer, system architect, and founder of{' '}
              <span className="text-[#C9A84C]">Ultimate IntelliForge</span>.
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
                className="inline-flex items-center px-6 py-3 rounded bg-[#C9A84C] text-[#0A0A0F] font-medium hover:bg-[#8B6914] transition-colors duration-200"
              >
                View My Work
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 rounded border border-[#00D4FF] text-[#00D4FF] font-medium hover:bg-[#00D4FF]/10 transition-colors duration-200"
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
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-[#C9A84C]" />
              <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-[#C9A84C]" />
              <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-[#C9A84C]" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-[#C9A84C]" />
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
          <span className="font-mono text-[10px] tracking-widest text-[#8B8B9A] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-[#C9A84C] to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Run dev and verify hero renders**

```bash
pnpm dev
```

Navigate to `http://localhost:3000`. Expected: dark hero with name scramble animation, particle field, split layout with photo.

- [ ] **Step 3: Commit**

```bash
git add src/components/root/hero-section.tsx
git commit -m "feat: rewrite hero section with scramble animation, particles, split layout"
```

---

### Task 10: Stats Strip

**Files:**
- Modify: `src/components/root/stats-serve.tsx`

- [ ] **Step 1: Rewrite stats as horizontal strip with counters**

```tsx
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
    let start = 0;
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
    <span className="font-playfair text-5xl md:text-6xl font-bold text-[#C9A84C]">
      {count}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="bg-[#111118] border-y border-[#2A2A38] py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`text-center ${i < stats.length - 1 ? 'md:border-r md:border-[#2A2A38]' : ''}`}
            >
              <Counter value={stat.value} suffix={stat.suffix} inView={inView} />
              <p className="mt-2 text-sm text-[#8B8B9A] font-dm-sans">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/root/stats-serve.tsx
git commit -m "feat: rewrite stats strip with animated counters"
```

---

### Task 11: About Teaser

**Files:**
- Create: `src/components/root/about-teaser.tsx`

- [ ] **Step 1: Create about teaser section**

```tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import SectionLabel from '@/components/ui/section-label';
import { fadeUp, staggerContainer } from '@/lib/animations';

const techLogos = [
  { name: 'Next.js', icon: '▲' },
  { name: 'NestJS', icon: '🦁' },
  { name: 'TypeScript', icon: 'TS' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'Docker', icon: '🐳' },
  { name: 'AWS', icon: '☁️' },
  { name: 'React', icon: '⚛️' },
  { name: 'SpringBoot', icon: '🍃' },
];

export default function AboutTeaser() {
  return (
    <section className="py-24 lg:py-32 bg-[#0A0A0F]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <SectionLabel label="Who I Am" title="Engineer. Architect. Founder." />
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={3}
              className="text-[#8B8B9A] text-lg leading-relaxed mb-8"
            >
              I&apos;m Tunmise Falodun — a full-stack engineer and technology entrepreneur with 4+ years building
              scalable systems across fintech, logistics, e-commerce, and SaaS. Founder of{' '}
              <span className="text-[#C9A84C]">Ultimate IntelliForge</span>.
            </motion.p>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={4}
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-[#C9A84C] hover:gap-4 transition-all duration-200 font-medium"
              >
                Read my full story <span>→</span>
              </Link>
            </motion.div>
          </div>

          {/* Tech grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-4 gap-3"
          >
            {techLogos.map((tech, i) => (
              <motion.div
                key={tech.name}
                variants={fadeUp}
                custom={i}
                className="flex flex-col items-center gap-2 p-4 rounded-lg bg-[#111118] border border-[#2A2A38] hover:border-[#C9A84C]/50 transition-colors group"
              >
                <span className="text-2xl">{tech.icon}</span>
                <span className="font-mono text-[10px] text-[#8B8B9A] group-hover:text-[#C9A84C] transition-colors text-center">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/root/about-teaser.tsx
git commit -m "feat: add about teaser section with tech grid"
```

---

### Task 12: Featured Projects

**Files:**
- Create: `src/components/root/featured-projects.tsx`

- [ ] **Step 1: Create featured projects with iframe/screenshot fallback**

```tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import SectionLabel from '@/components/ui/section-label';
import { fadeUp } from '@/lib/animations';

interface FeaturedProject {
  title: string;
  role: string;
  description: string;
  liveUrl: string;
  screenshotFallback?: string;
  stack: string[];
  country: string;
  year: string;
}

const projects: FeaturedProject[] = [
  {
    title: 'MeuDeliver',
    role: 'Full-Stack Engineer (Contract)',
    description:
      'Multi-role e-commerce platform for Angola supporting users, vendors, and delivery agents with a full admin panel for managing the ecosystem.',
    liveUrl: 'https://meudeliver.com',
    stack: ['Next.js', 'NestJS', 'PostgreSQL', 'Docker', 'AWS S3', 'MapBox'],
    country: '🇦🇴',
    year: '2025–2026',
  },
  {
    title: 'California Notices',
    role: 'Software Engineer (Contract)',
    description:
      'US-based platform simplifying how landlords and agents file legal notices — generates notices in minutes with PDF editing and worker-based processing.',
    liveUrl: 'https://canotices.com',
    stack: ['Next.js', 'NestJS', 'Stripe', 'AWS', 'PostgreSQL', 'Prisma'],
    country: '🇺🇸',
    year: '2025–Present',
  },
  {
    title: 'TinnieStudio',
    role: 'Full-Stack Engineer (Contract)',
    description:
      'Canadian streaming platform with raw video processing pipeline, multi-bucket storage, and SpringBoot backend with Redis caching.',
    liveUrl: 'https://tinniestudio.com',
    stack: ['Next.js', 'SpringBoot', 'PostgreSQL', 'Redis', 'Docker', 'S3'],
    country: '🇨🇦',
    year: '2025–Present',
  },
];

function ProjectIframe({ url, title }: { url: string; title: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#1A1A24]">
        <div className="text-center">
          <div className="text-4xl mb-3">🌐</div>
          <p className="font-mono text-xs text-[#8B8B9A]">{url}</p>
        </div>
      </div>
    );
  }

  return (
    <iframe
      src={url}
      title={title}
      className="w-full h-full border-0 pointer-events-none scale-[0.75] origin-top-left"
      style={{ width: '133.33%', height: '133.33%' }}
      onError={() => setFailed(true)}
      loading="lazy"
    />
  );
}

export default function FeaturedProjects() {
  return (
    <section className="py-24 lg:py-32 bg-[#111118]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-end justify-between mb-16">
          <SectionLabel label="Selected Work" title="Featured Projects" />
          <Link
            href="/projects"
            className="hidden md:inline-flex text-sm text-[#8B8B9A] hover:text-[#C9A84C] transition-colors gap-1 items-center"
          >
            View all projects <span>→</span>
          </Link>
        </div>

        <div className="space-y-24">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
              custom={0}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              {/* iframe preview */}
              <div className="relative aspect-video rounded-xl overflow-hidden border border-[#2A2A38] bg-[#1A1A24]">
                <ProjectIframe url={project.liveUrl} title={project.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F]/40 to-transparent pointer-events-none" />
              </div>

              {/* Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{project.country}</span>
                  <span className="font-mono text-xs text-[#8B8B9A]">{project.year}</span>
                </div>
                <h3 className="font-playfair text-3xl font-bold text-[#F0EDE8]">{project.title}</h3>
                <p className="font-mono text-xs tracking-wide text-[#C9A84C]">{project.role}</p>
                <p className="text-[#8B8B9A] leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] px-2 py-1 rounded border border-[#2A2A38] text-[#8B8B9A]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="pt-2">
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#00D4FF] text-sm hover:gap-4 transition-all duration-200"
                  >
                    Visit live site <span>→</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link href="/projects" className="text-sm text-[#8B8B9A] hover:text-[#C9A84C] transition-colors">
            View all projects →
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/root/featured-projects.tsx
git commit -m "feat: add featured projects section with live iframe previews"
```

---

### Task 13: Skills Section (Homepage)

**Files:**
- Modify: `src/components/root/skills.tsx`
- Modify: `src/components/ui/bouncingCarosel.tsx`

- [ ] **Step 1: Restyle bouncingCarosel.tsx**

```tsx
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
          className="flex flex-col items-center justify-center min-w-[90px] p-4 rounded-lg bg-[#1A1A24] border border-[#2A2A38] hover:border-[#C9A84C]/50 transition-colors group flex-shrink-0"
        >
          <div className="text-3xl mb-2">{tech.icon}</div>
          <span className="font-mono text-[10px] text-[#8B8B9A] group-hover:text-[#C9A84C] transition-colors text-center">
            {tech.name}
          </span>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Restyle skills.tsx**

```tsx
'use client';

import { motion } from 'framer-motion';
import BouncingCarousel from '@/components/ui/bouncingCarosel';
import SectionLabel from '@/components/ui/section-label';
import { fadeUp } from '@/lib/animations';

const stacks = {
  Frontend: [
    { icon: '⚛️', name: 'React' },
    { icon: '▲', name: 'Next.js' },
    { icon: 'TS', name: 'TypeScript' },
    { icon: '🌊', name: 'TailwindCSS' },
    { icon: '📱', name: 'React Native' },
  ],
  Backend: [
    { icon: '🦁', name: 'NestJS' },
    { icon: '🚂', name: 'Express' },
    { icon: '🍃', name: 'SpringBoot' },
    { icon: '🐘', name: 'Laravel' },
    { icon: '🐍', name: 'Django' },
  ],
  DevOps: [
    { icon: '🐳', name: 'Docker' },
    { icon: '☁️', name: 'AWS' },
    { icon: '▲', name: 'Vercel' },
    { icon: '🚀', name: 'Dokploy' },
    { icon: '🏗️', name: 'Terraform' },
  ],
  Database: [
    { icon: '🐘', name: 'PostgreSQL' },
    { icon: '🍃', name: 'MongoDB' },
    { icon: '💾', name: 'MySQL' },
    { icon: '⚡', name: 'Redis' },
  ],
};

const categories = Object.keys(stacks) as (keyof typeof stacks)[];

export default function SkillsSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#0A0A0F] overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-12">
        <SectionLabel label="Expertise" title="Tech Stack" />
      </div>

      <div className="space-y-8">
        {categories.map((cat, i) => (
          <motion.div
            key={cat}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-3">
              <span className="font-mono text-xs tracking-widest text-[#C9A84C] uppercase">{cat}</span>
            </div>
            <BouncingCarousel stack={stacks[cat]} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/root/skills.tsx src/components/ui/bouncingCarosel.tsx
git commit -m "feat: restyle skills section and bouncing carousel"
```

---

### Task 14: Experience Section (Homepage)

**Files:**
- Create: `src/components/root/experience-section.tsx`

- [ ] **Step 1: Create homepage experience timeline**

```tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import SectionLabel from '@/components/ui/section-label';
import { fadeUp } from '@/lib/animations';

interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  techStack: string[];
}

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    fetch('/api/experience')
      .then((r) => r.json())
      .then((data) => setExperiences(data.slice(0, 3)))
      .catch(() => {});
  }, []);

  const fallback: Experience[] = [
    {
      id: '1',
      company: 'TinnieStudio',
      role: 'Full-Stack Engineer',
      period: '2025 – Present',
      location: 'Canada (Remote)',
      description: 'Streaming platform with SpringBoot backend, video processing workers, Redis caching, and multi-bucket S3 storage.',
      techStack: ['Next.js', 'SpringBoot', 'PostgreSQL', 'Redis', 'Docker'],
    },
    {
      id: '2',
      company: 'California Notices',
      role: 'Software Engineer',
      period: '2025 – Present',
      location: 'United States (Remote)',
      description: 'Legal notice generation platform for landlords and agents — PDF editing, document conversion workers, Stripe billing.',
      techStack: ['Next.js', 'NestJS', 'Stripe', 'AWS', 'PostgreSQL'],
    },
    {
      id: '3',
      company: 'MeuDeliver',
      role: 'Full-Stack Engineer',
      period: '2025 – 2026',
      location: 'Angola (Remote)',
      description: 'Multi-role e-commerce platform supporting users, vendors, and delivery agents with MapBox logistics integration.',
      techStack: ['Next.js', 'NestJS', 'PostgreSQL', 'Docker', 'MapBox'],
    },
  ];

  const items = experiences.length > 0 ? experiences : fallback;

  return (
    <section className="py-24 lg:py-32 bg-[#111118]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-end justify-between mb-16">
          <SectionLabel label="Career Timeline" title="Experience" />
          <Link
            href="/experiences"
            className="hidden md:inline-flex text-sm text-[#8B8B9A] hover:text-[#C9A84C] transition-colors gap-1 items-center"
          >
            Full timeline <span>→</span>
          </Link>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#2A2A38]" />

          <div className="space-y-12">
            {items.map((exp, i) => (
              <motion.div
                key={exp.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                custom={i}
                className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 ${
                  i % 2 === 0 ? 'md:pr-8' : 'md:pl-8 md:[&>*]:col-start-2'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 top-4 w-3 h-3 rounded-full bg-[#C9A84C] -translate-x-1/2 ring-4 ring-[#111118]" />

                <div
                  className={`pl-10 md:pl-0 p-6 rounded-xl bg-[#1A1A24] border border-[#2A2A38] hover:border-[#C9A84C]/30 transition-colors ${
                    i % 2 === 1 ? 'md:col-start-2' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-[#C9A84C] tracking-wide">{exp.period}</span>
                    <span className="font-mono text-xs text-[#8B8B9A]">{exp.location}</span>
                  </div>
                  <h3 className="font-playfair text-xl font-bold text-[#F0EDE8] mb-1">{exp.company}</h3>
                  <p className="text-sm text-[#C9A84C] mb-3">{exp.role}</p>
                  <p className="text-sm text-[#8B8B9A] leading-relaxed mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.techStack.map((t) => (
                      <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded border border-[#2A2A38] text-[#8B8B9A]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/root/experience-section.tsx
git commit -m "feat: add homepage experience timeline section"
```

---

### Task 15: Services Section

**Files:**
- Modify: `src/components/root/service.tsx`

- [ ] **Step 1: Rewrite services section**

```tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Code2, Server, Cloud, Users, Smartphone, Zap,
} from 'lucide-react';
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
    <section className="py-24 lg:py-32 bg-[#0A0A0F]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-end justify-between mb-16">
          <SectionLabel label="What I Offer" title="Services" />
          <Link
            href="/services"
            className="hidden md:inline-flex text-sm text-[#8B8B9A] hover:text-[#C9A84C] transition-colors gap-1 items-center"
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
                className="group p-6 rounded-xl bg-[#111118] border border-[#2A2A38] hover:border-[#C9A84C]/40 transition-all duration-300 hover:bg-[#1A1A24]"
              >
                <div className="w-10 h-10 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center mb-4 group-hover:bg-[#C9A84C]/20 transition-colors">
                  <Icon className="w-5 h-5 text-[#C9A84C]" />
                </div>
                <h3 className="font-playfair text-lg font-bold text-[#F0EDE8] mb-2">{service.title}</h3>
                <p className="text-sm text-[#8B8B9A] leading-relaxed">{service.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/root/service.tsx
git commit -m "feat: rewrite services section with gold icon cards"
```

---

### Task 16: Contact Teaser

**Files:**
- Create: `src/components/root/contact-teaser.tsx`

- [ ] **Step 1: Create contact CTA section**

```tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import SectionLabel from '@/components/ui/section-label';
import { fadeUp } from '@/lib/animations';

export default function ContactTeaser() {
  return (
    <section className="py-24 lg:py-32 bg-[#111118] relative overflow-hidden">
      {/* Electric glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] rounded-full bg-[#00D4FF]/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8 text-center">
        <SectionLabel label="Get In Touch" title="Have a project in mind?" center />

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={3}
          className="text-[#8B8B9A] text-lg leading-relaxed mb-10"
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
            className="inline-flex items-center gap-2 px-8 py-4 rounded bg-[#C9A84C] text-[#0A0A0F] font-medium hover:bg-[#8B6914] transition-colors duration-200"
          >
            Send a Message <span>→</span>
          </Link>
          <a
            href="mailto:ultimatefaloe@gmail.com"
            className="text-sm text-[#8B8B9A] hover:text-[#F0EDE8] transition-colors"
          >
            ultimatefaloe@gmail.com
          </a>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/root/contact-teaser.tsx
git commit -m "feat: add contact teaser CTA section"
```

---

### Task 17: Homepage Assembly

**Files:**
- Modify: `src/app/(public)/page.tsx`

- [ ] **Step 1: Assemble all homepage sections in correct order**

```tsx
import { Metadata } from 'next';
import HeroSection from '@/components/root/hero-section';
import StatsSection from '@/components/root/stats-serve';
import AboutTeaser from '@/components/root/about-teaser';
import FeaturedProjects from '@/components/root/featured-projects';
import SkillsSection from '@/components/root/skills';
import ExperienceSection from '@/components/root/experience-section';
import ServicesSection from '@/components/root/service';
import ContactTeaser from '@/components/root/contact-teaser';

export const metadata: Metadata = {
  title: 'Tunmise Falodun — Full-Stack Engineer & Entrepreneur',
  description:
    'Senior full-stack engineer and founder of Ultimate IntelliForge. Building scalable systems across fintech, SaaS, logistics, and streaming.',
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <AboutTeaser />
      <FeaturedProjects />
      <SkillsSection />
      <ExperienceSection />
      <ServicesSection />
      <ContactTeaser />
    </>
  );
}
```

- [ ] **Step 2: Run dev and verify full homepage**

```bash
pnpm dev
```

Navigate to `http://localhost:3000`. Scroll through all sections — Hero → Stats → About → Projects → Skills → Experience → Services → Contact. Verify each section renders correctly.

- [ ] **Step 3: Commit**

```bash
git add src/app/(public)/page.tsx
git commit -m "feat: assemble homepage with all premium sections"
```

---

## Phase 4 — Inner Pages

### Task 18: About Page

**Files:**
- Modify: `src/components/about/aboutme.tsx`

- [ ] **Step 1: Rewrite about page**

```tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import SectionLabel from '@/components/ui/section-label';
import { fadeUp, slideInLeft, slideInRight, staggerContainer } from '@/lib/animations';

const milestones = [
  { year: '2021', label: 'Started Software Engineering', desc: 'Began journey into full-stack development.' },
  { year: '2022', label: '59Minutes — Printing Platform', desc: 'Built a printing delivery service for Abuja with Next.js and Paystack.' },
  { year: '2023', label: 'Watergroove — Investment Platform', desc: 'Full-stack investment platform with Prisma, PostgreSQL, and Neon DB.' },
  { year: '2024', label: 'Founded Ultimate IntelliForge', desc: 'Established my software company focused on scalable digital solutions.' },
  { year: '2025', label: 'Global Contracts', desc: 'Simultaneously shipping MeuDeliver (Angola), CA Notices (US), and TinnieStudio (Canada).' },
];

const personalProjects = [
  { name: 'Fashionket', url: 'https://fashionket.com', desc: 'Fashion marketplace platform (CEO & CTO)' },
  { name: 'Acefre', url: 'https://acefre.com', desc: 'Technology product (CEO & CTO)' },
];

export default function AboutMe() {
  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {/* Hero banner */}
      <section className="relative py-32 bg-[#111118] border-b border-[#2A2A38] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#C9A84C]/5 blur-[80px] rounded-full" />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 pt-8">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-xs tracking-[0.25em] uppercase text-[#C9A84C] block mb-4"
          >
            // About Me
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-playfair text-5xl md:text-6xl font-bold text-[#F0EDE8]"
          >
            Tunmise Falodun
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-xl text-[#C9A84C]"
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
            <div className="lg:col-span-2 space-y-6 text-[#8B8B9A] leading-relaxed">
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <p>
                  I&apos;m a <span className="text-[#F0EDE8]">software engineer, full-stack developer, and technology entrepreneur</span> with a passion
                  for building software that solves real-world problems. Over the past four years, I have worked across multiple industries
                  — fintech, logistics, e-commerce, and SaaS — designing and developing scalable applications that improve business
                  processes and user experiences.
                </p>
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}>
                <p>
                  My strongest expertise lies in backend engineering, where I specialise in building secure, scalable systems using{' '}
                  <span className="text-[#C9A84C]">Node.js, NestJS, Express.js, PHP, Laravel, SpringBoot, PostgreSQL, MySQL, and MongoDB</span>.
                  On the frontend, I work with <span className="text-[#C9A84C]">React, Next.js, TypeScript, and Tailwind CSS</span>, and
                  build cross-platform mobile apps with <span className="text-[#C9A84C]">React Native</span>.
                </p>
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}>
                <p>
                  Beyond engineering, I founded <span className="text-[#F0EDE8]">Ultimate IntelliForge</span> — a software engineering and
                  technology company dedicated to developing innovative digital solutions for startups, businesses, and organisations.
                  My vision is to create an ecosystem that combines software development, technical consulting, developer education, and
                  research.
                </p>
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3}>
                <p>
                  I am also exploring <span className="text-[#C9A84C]">Go, Java, and Rust</span> to broaden my perspective and strengthen
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
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-[#C9A84C]" />
                <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-[#C9A84C]" />
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-[#C9A84C]" />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-[#C9A84C]" />
                <Image src="/images/Profile.jpg" alt="Tunmise Falodun" fill className="object-cover rounded-lg" />
              </div>

              <div className="p-5 rounded-xl bg-[#111118] border border-[#2A2A38] space-y-3">
                {[
                  { label: 'Location', value: 'Nigeria (Remote Worldwide)' },
                  { label: 'Availability', value: 'Open to contracts' },
                  { label: 'Email', value: 'ultimatefaloe@gmail.com' },
                  { label: 'Experience', value: '4+ Years' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <span className="font-mono text-[10px] tracking-widest uppercase text-[#C9A84C]">{label}</span>
                    <span className="text-sm text-[#F0EDE8]">{value}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href="/cv/tunmise-falodun-cv.pdf"
                  download
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded border border-[#C9A84C] text-[#C9A84C] text-sm hover:bg-[#C9A84C]/10 transition-colors"
                >
                  Download CV
                </a>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded bg-[#C9A84C] text-[#0A0A0F] text-sm font-medium hover:bg-[#8B6914] transition-colors"
                >
                  Hire Me
                </Link>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* Journey timeline */}
      <section className="py-24 bg-[#111118]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionLabel label="My Journey" title="Career Milestones" />
          <div className="relative mt-12">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-[#2A2A38]" />
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
                  <div className="absolute left-4 top-2 w-2 h-2 rounded-full bg-[#C9A84C] -translate-x-1/2 ring-2 ring-[#111118]" />
                  <span className="font-mono text-xs text-[#C9A84C]">{m.year}</span>
                  <h4 className="font-playfair text-lg font-bold text-[#F0EDE8] mt-1">{m.label}</h4>
                  <p className="text-sm text-[#8B8B9A] mt-1">{m.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Personal projects */}
      <section className="py-24 bg-[#0A0A0F]">
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
                className="p-6 rounded-xl bg-[#111118] border border-[#2A2A38] hover:border-[#C9A84C]/50 transition-all group"
              >
                <h3 className="font-playfair text-xl font-bold text-[#F0EDE8] group-hover:text-[#C9A84C] transition-colors">{p.name}</h3>
                <p className="text-sm text-[#8B8B9A] mt-2">{p.desc}</p>
                <span className="inline-flex items-center gap-1 text-xs text-[#00D4FF] mt-4">
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
```

- [ ] **Step 2: Verify about page**

```bash
pnpm dev
```

Navigate to `http://localhost:3000/about`. Verify dark layout, photo, bio, timeline, and personal projects render correctly.

- [ ] **Step 3: Commit**

```bash
git add src/components/about/aboutme.tsx
git commit -m "feat: rewrite about page with premium dark layout and timeline"
```

---

### Task 19: Projects Page

**Files:**
- Modify: `src/components/projects/productpage.tsx`

- [ ] **Step 1: Rewrite projects page with filter tabs and modal**

```tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X, ExternalLink } from 'lucide-react';
import SectionLabel from '@/components/ui/section-label';
import { fadeUp, staggerContainer } from '@/lib/animations';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  category: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

const CATEGORIES = ['All', 'Contracts', 'Personal', 'Prototypes'];

const PROTOTYPE_PROJECTS: Project[] = [
  { id: 'p1', title: 'CyberGuard Blog', description: 'Cybersecurity blog platform', techStack: ['Next.js'], category: 'Prototypes', liveUrl: 'https://cyberguard-blog.vercel.app/', featured: false },
  { id: 'p2', title: 'Agrolink', description: 'Agricultural supply chain platform', techStack: ['Next.js'], category: 'Prototypes', liveUrl: 'https://ultimate-agrolinks.vercel.app/', featured: false },
  { id: 'p3', title: 'Flirt UTE', description: 'Social connection app prototype', techStack: ['Next.js'], category: 'Prototypes', liveUrl: 'https://flirt-ute.vercel.app/', featured: false },
  { id: 'p4', title: 'VibeeDev', description: 'Developer community platform', techStack: ['Next.js'], category: 'Prototypes', liveUrl: 'https://vibeedev.vercel.app/', featured: false },
  { id: 'p5', title: 'KiddiesCake', description: 'Custom cakes ordering platform', techStack: ['Next.js'], category: 'Prototypes', liveUrl: 'https://kiddiescake.vercel.app/', featured: false },
  { id: 'p6', title: 'Liduct Hair', description: 'Hair products e-commerce', techStack: ['Next.js'], category: 'Prototypes', liveUrl: 'https://liducthair.vercel.app/', featured: false },
  { id: 'p7', title: 'EventApp', description: 'Events management platform', techStack: ['Next.js'], category: 'Prototypes', liveUrl: 'https://event-app-orpin.vercel.app/', featured: false },
];

export default function ProductPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState('All');
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    fetch('/api/projects')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setProjects([...data, ...PROTOTYPE_PROJECTS]);
      })
      .catch(() => setProjects(PROTOTYPE_PROJECTS));
  }, []);

  const filtered = projects.filter((p) => {
    if (activeTab === 'All') return true;
    return p.category === activeTab.toUpperCase() || p.category === activeTab;
  });

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#111118] border-b border-[#2A2A38]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionLabel label="My Work" title="Projects" subtitle="A collection of contracts, personal ventures, and prototypes." />
        </div>
      </section>

      {/* Filter tabs */}
      <div className="sticky top-16 z-20 bg-[#0A0A0F]/90 backdrop-blur border-b border-[#2A2A38]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-1.5 rounded font-mono text-xs whitespace-nowrap transition-all ${
                  activeTab === cat
                    ? 'bg-[#C9A84C] text-[#0A0A0F] font-medium'
                    : 'text-[#8B8B9A] hover:text-[#F0EDE8]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  variants={fadeUp}
                  custom={i % 6}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group p-6 rounded-xl bg-[#111118] border border-[#2A2A38] hover:border-[#C9A84C]/40 transition-all cursor-pointer"
                  onClick={() => setSelected(project)}
                >
                  {/* iframe preview */}
                  {project.liveUrl && (
                    <div className="relative aspect-video rounded-lg overflow-hidden mb-4 bg-[#1A1A24]">
                      <iframe
                        src={project.liveUrl}
                        className="w-[200%] h-[200%] scale-50 origin-top-left border-0 pointer-events-none"
                        loading="lazy"
                        title={project.title}
                      />
                    </div>
                  )}
                  <h3 className="font-playfair text-lg font-bold text-[#F0EDE8] group-hover:text-[#C9A84C] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#8B8B9A] mt-2 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.techStack.slice(0, 3).map((t) => (
                      <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded border border-[#2A2A38] text-[#8B8B9A]">{t}</span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="font-mono text-[10px] text-[#8B8B9A]">+{project.techStack.length - 3}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0A0A0F]/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#111118] border border-[#2A2A38] rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="font-playfair text-2xl font-bold text-[#F0EDE8]">{selected.title}</h2>
                <button onClick={() => setSelected(null)} className="text-[#8B8B9A] hover:text-[#F0EDE8]">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-[#8B8B9A] leading-relaxed mb-6">
                {selected.longDescription || selected.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {selected.techStack.map((t) => (
                  <span key={t} className="font-mono text-xs px-2 py-1 rounded border border-[#2A2A38] text-[#8B8B9A]">{t}</span>
                ))}
              </div>
              <div className="flex gap-4">
                {selected.liveUrl && (
                  <Link href={selected.liveUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#C9A84C] text-[#0A0A0F] text-sm font-medium">
                    <ExternalLink className="w-4 h-4" /> Live Site
                  </Link>
                )}
                {selected.githubUrl && (
                  <Link href={selected.githubUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded border border-[#2A2A38] text-[#F0EDE8] text-sm">
                    GitHub
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 2: Verify projects page**

```bash
pnpm dev
```

Navigate to `http://localhost:3000/projects`. Test filter tabs, card click to open modal, close modal.

- [ ] **Step 3: Commit**

```bash
git add src/components/projects/productpage.tsx
git commit -m "feat: rewrite projects page with filter tabs, iframe previews, and modal"
```

---

### Task 20: Skills Page

**Files:**
- Modify: `src/components/skills/skillList.tsx`
- Modify: `src/components/skills/skillType.tsx`
- Modify: `src/components/skills/components/circularPercentage.tsx`

- [ ] **Step 1: Restyle circularPercentage.tsx**

```tsx
interface CircularPercentageProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}

export default function CircularPercentage({ percentage, size = 80, strokeWidth = 6 }: CircularPercentageProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#2A2A38" strokeWidth={strokeWidth} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#C9A84C"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-1000"
      />
    </svg>
  );
}
```

- [ ] **Step 2: Restyle skillType.tsx**

```tsx
'use client';

import { motion } from 'framer-motion';
import CircularPercentage from './components/circularPercentage';
import { fadeUp } from '@/lib/animations';

interface Skill {
  id: string;
  name: string;
  proficiency: number;
  category: string;
}

interface SkillTypeProps {
  skills: Skill[];
}

export default function SkillType({ skills }: SkillTypeProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {skills.map((skill, i) => (
        <motion.div
          key={skill.id}
          variants={fadeUp}
          custom={i}
          className="flex flex-col items-center gap-3 p-4 rounded-xl bg-[#111118] border border-[#2A2A38] hover:border-[#C9A84C]/40 transition-colors group"
        >
          <div className="relative">
            <CircularPercentage percentage={skill.proficiency} />
            <span className="absolute inset-0 flex items-center justify-center font-mono text-xs font-bold text-[#C9A84C] rotate-90">
              {skill.proficiency}%
            </span>
          </div>
          <span className="font-mono text-xs text-[#8B8B9A] group-hover:text-[#F0EDE8] transition-colors text-center">
            {skill.name}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Restyle skillList.tsx**

```tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionLabel from '@/components/ui/section-label';
import SkillType from './skillType';
import { staggerContainer } from '@/lib/animations';

interface Skill {
  id: string;
  name: string;
  proficiency: number;
  category: string;
}

const CATEGORIES = ['Frontend', 'Backend', 'DevOps', 'Database', 'Mobile', 'Other'];

export default function SkillList() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [activeCategory, setActiveCategory] = useState('Frontend');

  useEffect(() => {
    fetch('/api/skills')
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setSkills(data))
      .catch(() => {});
  }, []);

  const filtered = skills.filter((s) => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#111118] border-b border-[#2A2A38]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionLabel label="Expertise" title="Skills & Technologies" />
        </div>
      </section>

      {/* Category tabs */}
      <div className="sticky top-16 z-20 bg-[#0A0A0F]/90 backdrop-blur border-b border-[#2A2A38]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded font-mono text-xs whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-[#C9A84C] text-[#0A0A0F] font-medium'
                    : 'text-[#8B8B9A] hover:text-[#F0EDE8]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Skills grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            key={activeCategory}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {filtered.length > 0 ? (
              <SkillType skills={filtered} />
            ) : (
              <p className="text-[#8B8B9A] text-sm">No skills added for this category yet.</p>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/skills/skillList.tsx src/components/skills/skillType.tsx src/components/skills/components/circularPercentage.tsx
git commit -m "feat: restyle skills page with gold circular progress and category tabs"
```

---

### Task 21: Experience Page

**Files:**
- Modify: `src/components/experience/exp.tsx`

- [ ] **Step 1: Rewrite experience page**

```tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionLabel from '@/components/ui/section-label';
import { fadeUp } from '@/lib/animations';

interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  techStack: string[];
}

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    fetch('/api/experience')
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setExperiences(data))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <section className="pt-32 pb-16 bg-[#111118] border-b border-[#2A2A38]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionLabel label="Career Timeline" title="Experience" subtitle="A record of the companies, products, and systems I&apos;ve contributed to." />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-[#2A2A38]" />

            <div className="space-y-12">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  custom={i}
                  className="pl-16 relative"
                >
                  <div className="absolute left-6 top-5 w-3 h-3 rounded-full bg-[#C9A84C] -translate-x-1/2 ring-4 ring-[#0A0A0F]" />

                  <div className="p-6 rounded-xl bg-[#111118] border border-[#2A2A38] hover:border-[#C9A84C]/30 transition-colors">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-xs text-[#C9A84C] tracking-wide">{exp.period}</span>
                      <span className="font-mono text-xs text-[#8B8B9A]">{exp.location}</span>
                    </div>
                    <h3 className="font-playfair text-2xl font-bold text-[#F0EDE8]">{exp.company}</h3>
                    <p className="text-[#C9A84C] text-sm mt-1 mb-4">{exp.role}</p>
                    <p className="text-[#8B8B9A] leading-relaxed mb-5">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.techStack.map((t) => (
                        <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded border border-[#2A2A38] text-[#8B8B9A]">{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}

              {experiences.length === 0 && (
                <p className="text-[#8B8B9A] pl-16">Experience entries will appear here once added via the admin panel.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/experience/exp.tsx
git commit -m "feat: rewrite experience page as full premium timeline"
```

---

### Task 22: Services Page

**Files:**
- Modify: `src/components/service/servicePage.tsx`

- [ ] **Step 1: Rewrite services page**

```tsx
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
    <div className="min-h-screen bg-[#0A0A0F]">
      <section className="pt-32 pb-16 bg-[#111118] border-b border-[#2A2A38]">
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
                  className="group p-8 rounded-xl bg-[#111118] border border-[#2A2A38] hover:border-[#C9A84C]/50 transition-all hover:bg-[#1A1A24]"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center mb-6 group-hover:bg-[#C9A84C]/20 transition-colors">
                    <Icon className="w-6 h-6 text-[#C9A84C]" />
                  </div>
                  <h3 className="font-playfair text-xl font-bold text-[#F0EDE8] mb-3">{service.title}</h3>
                  <p className="text-[#8B8B9A] leading-relaxed mb-6">{service.description}</p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-sm text-[#00D4FF] hover:gap-4 transition-all"
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/service/servicePage.tsx
git commit -m "feat: rewrite services page with premium card layout"
```

---

### Task 23: Blog Page

**Files:**
- Modify: `src/components/blog/blogPage.tsx`

- [ ] **Step 1: Rewrite blog page**

```tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import SectionLabel from '@/components/ui/section-label';
import { fadeUp, staggerContainer } from '@/lib/animations';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  category?: string;
  createdAt: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetch('/api/blog')
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setPosts(data))
      .catch(() => {});
  }, []);

  const categories = ['All', ...Array.from(new Set(posts.map((p) => p.category).filter(Boolean)))];
  const filtered = activeCategory === 'All' ? posts : posts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <section className="pt-32 pb-16 bg-[#111118] border-b border-[#2A2A38]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionLabel label="Writing" title="Blog" subtitle="Technical writing on engineering, architecture, and entrepreneurship." />
        </div>
      </section>

      {categories.length > 1 && (
        <div className="sticky top-16 z-20 bg-[#0A0A0F]/90 backdrop-blur border-b border-[#2A2A38]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex gap-1 py-3 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat as string)}
                  className={`px-4 py-1.5 rounded font-mono text-xs whitespace-nowrap transition-all ${
                    activeCategory === cat
                      ? 'bg-[#C9A84C] text-[#0A0A0F] font-medium'
                      : 'text-[#8B8B9A] hover:text-[#F0EDE8]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {filtered.length === 0 ? (
            <p className="text-[#8B8B9A]">No blog posts yet. Add them via the admin panel.</p>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((post, i) => (
                <motion.article
                  key={post.id}
                  variants={fadeUp}
                  custom={i % 6}
                  className="group p-6 rounded-xl bg-[#111118] border border-[#2A2A38] hover:border-[#C9A84C]/40 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    {post.category && (
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded border border-[#C9A84C]/30 text-[#C9A84C]">
                        {post.category}
                      </span>
                    )}
                    <span className="font-mono text-[10px] text-[#8B8B9A]">
                      {new Date(post.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <h2 className="font-playfair text-xl font-bold text-[#F0EDE8] group-hover:text-[#C9A84C] transition-colors mb-3">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-sm text-[#8B8B9A] leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
                  )}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-xs text-[#00D4FF] hover:gap-4 transition-all"
                  >
                    Read more →
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/blog/blogPage.tsx
git commit -m "feat: rewrite blog page with premium dark card grid"
```

---

### Task 24: System Design Page

**Files:**
- Modify: `src/components/system-design/systemDesignPage.tsx`

- [ ] **Step 1: Restyle system design page**

```tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import SectionLabel from '@/components/ui/section-label';
import { fadeUp, staggerContainer } from '@/lib/animations';

interface SystemDesign {
  id: string;
  title: string;
  description: string;
  diagramUrl?: string;
  tags: string[];
}

export default function SystemDesignPage() {
  const [items, setItems] = useState<SystemDesign[]>([]);

  useEffect(() => {
    fetch('/api/system-design')
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setItems(data))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <section className="pt-32 pb-16 bg-[#111118] border-b border-[#2A2A38]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionLabel label="Architecture" title="System Design" subtitle="Breakdowns of systems, architectures, and engineering decisions." />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {items.length === 0 ? (
            <p className="text-[#8B8B9A]">System design entries will appear here once added via the admin panel.</p>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  variants={fadeUp}
                  custom={i}
                  className="rounded-xl bg-[#111118] border border-[#2A2A38] hover:border-[#C9A84C]/40 transition-all overflow-hidden"
                >
                  {item.diagramUrl && (
                    <div className="relative aspect-video bg-[#1A1A24]">
                      <Image src={item.diagramUrl} alt={item.title} fill className="object-contain p-4" />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-playfair text-xl font-bold text-[#F0EDE8] mb-2">{item.title}</h3>
                    <p className="text-sm text-[#8B8B9A] leading-relaxed mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span key={tag} className="font-mono text-[10px] px-2 py-0.5 rounded border border-[#C9A84C]/30 text-[#C9A84C]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/system-design/systemDesignPage.tsx
git commit -m "feat: restyle system design page"
```

---

### Task 25: Contact Page

**Files:**
- Modify: `src/components/contact/contactPage.tsx`

- [ ] **Step 1: Rewrite contact page (EmailJS logic preserved)**

```tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Twitter, Linkedin, Instagram, Facebook, Github } from 'lucide-react';
import SectionLabel from '@/components/ui/section-label';
import { fadeUp, slideInLeft, slideInRight } from '@/lib/animations';
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
    'w-full px-4 py-3 rounded-lg bg-[#1A1A24] border border-[#2A2A38] text-[#F0EDE8] placeholder-[#8B8B9A] focus:outline-none focus:border-[#C9A84C] transition-colors text-sm font-dm-sans';

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <section className="pt-32 pb-16 bg-[#111118] border-b border-[#2A2A38]">
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
                className="w-full py-4 rounded-lg bg-[#C9A84C] text-[#0A0A0F] font-medium hover:bg-[#8B6914] transition-colors disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              {status === 'sent' && (
                <p className="text-sm text-[#00D4FF] text-center">Message sent! I&apos;ll get back to you shortly.</p>
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
                <h3 className="font-playfair text-xl font-bold text-[#F0EDE8] mb-4">Direct Contact</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Email', value: 'ultimatefaloe@gmail.com', href: 'mailto:ultimatefaloe@gmail.com' },
                    { label: 'Location', value: 'Nigeria (Available Worldwide)' },
                    { label: 'Availability', value: 'Open to contracts & collaborations' },
                  ].map(({ label, value, href }) => (
                    <div key={label} className="flex flex-col gap-0.5">
                      <span className="font-mono text-[10px] tracking-widest uppercase text-[#C9A84C]">{label}</span>
                      {href ? (
                        <a href={href} className="text-sm text-[#F0EDE8] hover:text-[#C9A84C] transition-colors">{value}</a>
                      ) : (
                        <span className="text-sm text-[#F0EDE8]">{value}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-playfair text-xl font-bold text-[#F0EDE8] mb-4">Social</h3>
                <div className="flex flex-col gap-3">
                  {socials.map((s) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={s.href}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-sm text-[#8B8B9A] hover:text-[#C9A84C] transition-colors"
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
```

- [ ] **Step 2: Verify contact page renders, form submits**

```bash
pnpm dev
```

Navigate to `http://localhost:3000/contact`. Verify form renders. Try submitting (check for EmailJS errors in console — may need valid env vars to actually send).

- [ ] **Step 3: Commit**

```bash
git add src/components/contact/contactPage.tsx
git commit -m "feat: rewrite contact page with split layout and styled form"
```

---

## Phase 5 — Admin

### Task 26: Restyle UI Primitives (card, button, badge, input, textarea)

**Files:**
- Modify: `src/components/ui/card.tsx`
- Modify: `src/components/ui/button.tsx`
- Modify: `src/components/ui/badge.tsx`
- Modify: `src/components/ui/input.tsx`
- Modify: `src/components/ui/textarea.tsx`

- [ ] **Step 1: Restyle card.tsx**

```tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('rounded-xl bg-[#111118] border border-[#2A2A38] text-[#F0EDE8] transition-colors', className)}
      {...props}
    />
  )
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('font-playfair text-lg font-bold text-[#F0EDE8]', className)} {...props} />
  )
);
CardTitle.displayName = 'CardTitle';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardContent, CardFooter };
```

- [ ] **Step 2: Restyle button.tsx**

```tsx
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded font-medium text-sm transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-[#C9A84C] text-[#0A0A0F] hover:bg-[#8B6914]',
        secondary: 'bg-[#1A1A24] text-[#F0EDE8] border border-[#2A2A38] hover:border-[#C9A84C]/50 hover:text-[#C9A84C]',
        outline: 'border border-[#2A2A38] text-[#F0EDE8] hover:border-[#C9A84C] hover:text-[#C9A84C]',
        ghost: 'text-[#8B8B9A] hover:text-[#F0EDE8] hover:bg-[#1A1A24]',
        electric: 'border border-[#00D4FF] text-[#00D4FF] hover:bg-[#00D4FF]/10',
        destructive: 'bg-red-600/20 text-red-400 hover:bg-red-600/30 border border-red-600/30',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-11 px-6',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
```

- [ ] **Step 3: Restyle badge.tsx**

```tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded font-mono text-[10px] px-2 py-0.5 border transition-colors',
  {
    variants: {
      variant: {
        default: 'border-[#2A2A38] text-[#8B8B9A]',
        outline: 'border-[#2A2A38] text-[#8B8B9A]',
        gold: 'border-[#C9A84C]/30 text-[#C9A84C]',
        electric: 'border-[#00D4FF]/30 text-[#00D4FF]',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
```

- [ ] **Step 4: Restyle input.tsx**

```tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        'flex h-9 w-full rounded-lg border border-[#2A2A38] bg-[#1A1A24] px-3 py-2 text-sm text-[#F0EDE8] placeholder-[#8B8B9A] transition-colors focus-visible:outline-none focus-visible:border-[#C9A84C] disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = 'Input';

export { Input };
```

- [ ] **Step 5: Restyle textarea.tsx**

```tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn(
        'flex min-h-[80px] w-full rounded-lg border border-[#2A2A38] bg-[#1A1A24] px-3 py-2 text-sm text-[#F0EDE8] placeholder-[#8B8B9A] transition-colors focus-visible:outline-none focus-visible:border-[#C9A84C] disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Textarea.displayName = 'Textarea';

export { Textarea };
```

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/card.tsx src/components/ui/button.tsx src/components/ui/badge.tsx src/components/ui/input.tsx src/components/ui/textarea.tsx
git commit -m "feat: restyle ui primitives with dark/gold design system"
```

---

### Task 27: Admin Layout

**Files:**
- Modify: `src/app/admin/layout.tsx`

- [ ] **Step 1: Rewrite admin layout**

```tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import LogoutButton from '@/components/admin/logout-button';
import {
  LayoutDashboard, FolderOpen, Briefcase, Cpu, BookOpen, Settings, Code, FileText,
} from 'lucide-react';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/projects', label: 'Projects', icon: FolderOpen },
  { href: '/admin/experience', label: 'Experience', icon: Briefcase },
  { href: '/admin/skills', label: 'Skills', icon: Cpu },
  { href: '/admin/blog', label: 'Blog', icon: BookOpen },
  { href: '/admin/services', label: 'Services', icon: Settings },
  { href: '/admin/system-design', label: 'System Design', icon: Code },
  { href: '/admin/content', label: 'Site Copy', icon: FileText },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F0EDE8]">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#111118] border-b border-[#2A2A38] backdrop-blur h-14 flex items-center px-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-[#C9A84C] flex items-center justify-center">
            <span className="font-playfair font-bold text-[#0A0A0F] text-xs">TF</span>
          </div>
          <div>
            <p className="font-mono text-[10px] tracking-widest uppercase text-[#C9A84C]">Admin CMS</p>
            <p className="text-xs text-[#8B8B9A]">Portfolio Control Center</p>
          </div>
        </div>
        <div className="ml-auto">
          <LogoutButton />
        </div>
      </header>

      <div className="flex pt-14">
        {/* Sidebar */}
        <aside className="fixed left-0 top-14 bottom-0 w-52 bg-[#111118] border-r border-[#2A2A38] overflow-y-auto py-6">
          <nav className="px-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                    active
                      ? 'bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/20'
                      : 'text-[#8B8B9A] hover:text-[#F0EDE8] hover:bg-[#1A1A24]'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main */}
        <main className="ml-52 flex-1 min-h-[calc(100vh-3.5rem)] p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Run dev, navigate to `/admin/dashboard`**

```bash
pnpm dev
```

Open `http://localhost:3000/admin/login`. Verify layout renders. Login and check dashboard.

- [ ] **Step 3: Commit**

```bash
git add src/app/admin/layout.tsx
git commit -m "feat: rewrite admin layout with premium dark sidebar"
```

---

### Task 28: Admin Login

**Files:**
- Modify: `src/app/admin/login/page.tsx`

- [ ] **Step 1: Rewrite login page**

```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push('/admin/dashboard');
    } else {
      const data = await res.json();
      setError(data.message || 'Invalid credentials');
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-lg bg-[#1A1A24] border border-[#2A2A38] text-[#F0EDE8] placeholder-[#8B8B9A] focus:outline-none focus:border-[#C9A84C] transition-colors text-sm';

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Branding */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-lg bg-[#C9A84C] flex items-center justify-center mx-auto mb-4">
            <span className="font-playfair font-bold text-[#0A0A0F] text-lg">TF</span>
          </div>
          <h1 className="font-playfair text-2xl font-bold text-[#F0EDE8]">Ultimate IntelliForge</h1>
          <p className="text-sm text-[#8B8B9A] mt-1">Portfolio CMS — Admin Access</p>
        </div>

        {/* Card */}
        <div className="p-8 rounded-2xl bg-[#111118] border border-[#2A2A38] shadow-[0_0_60px_rgba(201,168,76,0.06)]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-mono text-[10px] tracking-widest uppercase text-[#C9A84C] block mb-1.5">
                Email
              </label>
              <input
                type="email"
                placeholder="admin@example.com"
                required
                className={inputClass}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="font-mono text-[10px] tracking-widest uppercase text-[#C9A84C] block mb-1.5">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                required
                className={inputClass}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-red-400 text-xs">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 rounded-lg bg-[#C9A84C] text-[#0A0A0F] font-medium hover:bg-[#8B6914] transition-colors disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/admin/login/page.tsx
git commit -m "feat: rewrite admin login with premium dark card"
```

---

### Task 29: Admin Dashboard

**Files:**
- Modify: `src/app/admin/dashboard/page.tsx`

- [ ] **Step 1: Restyle dashboard**

```tsx
'use client';

import Link from 'next/link';
import {
  FolderOpen, Briefcase, Cpu, BookOpen, Settings, Code, FileText, LayoutDashboard,
} from 'lucide-react';

const sections = [
  { href: '/admin/projects', label: 'Projects', desc: 'Engineering case studies', icon: FolderOpen },
  { href: '/admin/experience', label: 'Experience', desc: 'Career timeline', icon: Briefcase },
  { href: '/admin/skills', label: 'Skills', desc: 'Skill matrix', icon: Cpu },
  { href: '/admin/blog', label: 'Blog', desc: 'Technical writing', icon: BookOpen },
  { href: '/admin/services', label: 'Services', desc: 'Offerings', icon: Settings },
  { href: '/admin/system-design', label: 'System Design', desc: 'Architecture breakdowns', icon: Code },
  { href: '/admin/content', label: 'Site Copy', desc: 'Hero + About copy', icon: FileText },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <LayoutDashboard className="w-4 h-4 text-[#C9A84C]" />
          <span className="font-mono text-xs tracking-widest uppercase text-[#C9A84C]">Overview</span>
        </div>
        <h2 className="font-playfair text-2xl font-bold text-[#F0EDE8]">Dashboard</h2>
        <p className="text-sm text-[#8B8B9A] mt-1">Manage all portfolio content from one place.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.href}
              href={section.href}
              className="group p-5 rounded-xl bg-[#111118] border border-[#2A2A38] hover:border-[#C9A84C]/40 transition-all hover:bg-[#1A1A24]"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center group-hover:bg-[#C9A84C]/20 transition-colors">
                  <Icon className="w-4 h-4 text-[#C9A84C]" />
                </div>
                <h3 className="font-playfair font-bold text-[#F0EDE8] group-hover:text-[#C9A84C] transition-colors">
                  {section.label}
                </h3>
              </div>
              <p className="text-xs text-[#8B8B9A]">{section.desc}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/admin/dashboard/page.tsx
git commit -m "feat: restyle admin dashboard with premium dark cards"
```

---

### Task 30: ResourceManager Restyle

**Files:**
- Modify: `src/components/admin/resource-manager.tsx`

- [ ] **Step 1: Read the existing resource-manager.tsx first, then restyle it keeping all logic**

Read `src/components/admin/resource-manager.tsx` in full before editing.

After reading, replace all Tailwind class strings targeting the old sky/gray palette with the new dark/gold palette:

| Old class | New class |
|---|---|
| `bg-gray-950` | `bg-[#0A0A0F]` |
| `bg-gray-900` | `bg-[#111118]` |
| `bg-gray-800` | `bg-[#1A1A24]` |
| `border-gray-800` | `border-[#2A2A38]` |
| `border-gray-700` | `border-[#2A2A38]` |
| `text-sky-100` | `text-[#F0EDE8]` |
| `text-sky-100/80` | `text-[#8B8B9A]` |
| `text-sky-400` | `text-[#C9A84C]` |
| `hover:border-sky-400` | `hover:border-[#C9A84C]/50` |
| `bg-sky-600` or `bg-sky-500` (buttons) | `bg-[#C9A84C] text-[#0A0A0F]` |
| `hover:bg-sky-700` | `hover:bg-[#8B6914]` |
| `text-red-400` | `text-red-400` (keep) |
| `border-red-800` | `border-red-800/50` |
| Table header `text-sky-400` | `font-mono text-[10px] tracking-widest uppercase text-[#C9A84C]` |
| Table row hover | `hover:bg-[#1A1A24]` |

Also update all heading typography to use `font-playfair` and labels to use `font-mono text-[10px] tracking-widest uppercase text-[#C9A84C]`.

- [ ] **Step 2: Run dev, navigate to all admin resource pages**

```bash
pnpm dev
```

Check: `/admin/projects`, `/admin/blog`, `/admin/skills`, `/admin/experience`, `/admin/services`, `/admin/content`, `/admin/system-design`.

Verify dark layout, gold accents, forms render correctly, table rows display.

- [ ] **Step 3: Commit**

```bash
git add src/components/admin/resource-manager.tsx
git commit -m "feat: restyle ResourceManager with dark/gold admin design"
```

---

## Final Verification

- [ ] **Run full build**

```bash
pnpm build
```

Expected: build succeeds with no TypeScript errors. Fix any type errors before marking complete.

- [ ] **Smoke test all public routes**

Navigate to each page in the browser and verify dark layout renders consistently:
- `/` — all 8 sections visible
- `/about` — bio, timeline, personal projects
- `/projects` — filter tabs work, cards visible, modal opens
- `/skills` — category tabs work, circular progress renders
- `/experiences` — timeline renders
- `/services` — card grid renders
- `/blog` — cards or empty state
- `/system-design` — cards or empty state
- `/contact` — form renders, socials visible

- [ ] **Smoke test admin routes**

Navigate:
- `/admin/login` — styled card visible
- `/admin/dashboard` — grid of section cards
- `/admin/projects` — table renders (after login)

- [ ] **Final commit**

```bash
git add -A
git commit -m "feat: complete premium portfolio redesign — dark/gold/electric design system"
```
