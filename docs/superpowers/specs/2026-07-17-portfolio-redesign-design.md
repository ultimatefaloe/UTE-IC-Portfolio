# Portfolio Redesign — Design Spec

**Date:** 2026-07-17
**Owner:** Tunmise Falodun (ultimatefaloe@gmail.com)
**Scope:** Full redesign of ultimatefaloe.vercel.app — all public pages + admin dashboard

---

## Goal

Replace the current generic sidebar/sky-blue portfolio with a premium, cinematic, dark-themed portfolio that signals a senior full-stack engineer and technology entrepreneur. The design must not read as AI-generated or template-based.

---

## Approach

**Approach B — Design system first, then component rebuild.**

- Build design token layer (colors, fonts, spacing, animation presets) in `globals.css`
- Install Framer Motion + anime.js
- Rebuild every component from scratch using the token system
- All existing data/API routes, Prisma schema, admin CMS logic, and EmailJS integration are preserved untouched

---

## 1. Design System

### Color Palette

| Token | Value | Usage |
|---|---|---|
| Background | `#0A0A0F` | Page base |
| Surface | `#111118` | Cards, panels, stat strip |
| Surface elevated | `#1A1A24` | Hover states, modals, drawers |
| Gold primary | `#C9A84C` | Headings, key accents, active states, borders |
| Gold muted | `#8B6914` | Secondary gold, subtle highlights |
| Electric accent | `#00D4FF` | CTAs, links, glow effects |
| Electric dim | `#0099BB` | Hover on electric elements |
| Text primary | `#F0EDE8` | Body text (warm off-white) |
| Text secondary | `#8B8B9A` | Muted descriptions |
| Border | `#2A2A38` | Subtle separators |

### Typography

| Role | Font | Weight |
|---|---|---|
| Display / H1 | Playfair Display | 700–900 |
| H2–H4 | Playfair Display | 600 |
| Body | DM Sans | 400–500 |
| Mono / stack labels | JetBrains Mono | 400 |

All fonts loaded via `next/font/google`.

### Spacing & Radius

- Section padding: `py-24 lg:py-32`
- Card border radius: `12px`
- Button border radius: `6px`
- Max content width: `1280px`

### Animation Presets

| Preset | Spec |
|---|---|
| Entrance | Fade up + 30px translate, 0.6s ease-out, staggered 0.1s per child (Framer Motion) |
| Card hover | Scale 1.02 |
| Magnetic cursor | Follows pointer within 60px radius on buttons/links (anime.js) |
| Section parallax | 20px vertical offset on scroll (Framer Motion) |
| Hero text scramble | anime.js text scramble/typewriter on name + subtitle on load |
| Particle field | Subtle floating dots in hero background (anime.js) |
| Counter | Numbers animate 0 → value on scroll entry (anime.js) |

### New Packages to Install

```
framer-motion
animejs
@fontsource/playfair-display (or next/font/google)
```

---

## 2. Layout & Navigation

### Public Layout

- Left sidebar **removed**
- Full-width page, `max-w-7xl` container centered
- Sticky top navbar replaces sidebar
- Dark-only design (no light mode toggle)

### Top Navbar

- Starts transparent over hero, transitions to `#0A0A0F/90` + backdrop blur on scroll
- **Left:** "TF" gold monogram + "Tunmise Falodun" in DM Sans (monogram only on mobile)
- **Center:** Nav links — Home, About, Projects, Skills, Experience, Services, Blog, Contact
- **Right:** "Hire Me" CTA button (electric accent, outlined)
- **Mobile:** Hamburger → full-screen overlay menu with staggered Framer Motion link entrances
- **Active link:** Gold sliding underline indicator

### Section Titles (consistent pattern)

```
// SECTION LABEL   ← small gold, JetBrains Mono
Large Heading       ← Playfair Display, text-primary
```

### Alternating Section Backgrounds

Sections alternate between `#0A0A0F` and `#111118` for depth without hard borders.

### Footer

- **Left:** Name + tagline "Building systems that scale."
- **Center:** Repeated nav links
- **Right:** Social icons (Twitter/X, LinkedIn, Instagram, Facebook, GitHub)
- **Bottom bar:** Copyright + "Built by Tunmise Falodun — Ultimate IntelliForge"

---

## 3. Homepage Sections

Order: **Hero → Stats → About → Projects → Skills → Experience → Services → Contact**

### Hero

- Split layout: 55% left (text) / 45% right (photo)
- **Left:** Gold label `SOFTWARE ENGINEER · ENTREPRENEUR` → name in massive Playfair Display with anime.js text scramble on load → subtitle "Building scalable systems across Africa, Canada & the US" → two CTAs: "View My Work" (gold filled) + "Let's Talk" (electric outlined)
- **Right:** Photo with gold corner accents, electric border glow, subtle scroll parallax
- **Background:** `#0A0A0F` + anime.js particle field + faint gold radial gradient behind photo
- **Bottom:** Animated scroll-down chevron

### Stats Strip

- Full-width `#111118` band
- 4 numbers: `4+` Years · `10+` Projects · `5` Countries · `15+` Technologies
- Separated by thin gold vertical dividers
- anime.js counter animation (0 → value) on scroll entry

### About (teaser)

- Two columns: 2–3 sentence bio (links to /about) left + top 6–8 tech logos grid right
- Section label: `// WHO I AM`

### Projects (3 featured)

- Section label: `// SELECTED WORK`
- 3 large cards, full-width stacked, alternating image-left / image-right
- Each card: iframe of live site (skeleton loader) or screenshot fallback, beside project name, role, tech stack badges, year, country flag, "View Project →" link
- Featured: MeuDeliver, California Notices, TinnieStudio

### Skills

- Section label: `// EXPERTISE`
- Restyled `bouncingCarosel.tsx` for tech logos
- Category tabs (Frontend / Backend / DevOps / Database / Mobile / Payments) in gold

### Experience

- Section label: `// CAREER TIMELINE`
- Vertical timeline, gold left line, alternating left/right cards
- Each entry: company, role, period, location, 2–3 bullet points, tech stack chips
- Framer Motion stagger entrance

### Services

- Section label: `// WHAT I OFFER`
- 3-column card grid: Full-Stack Development, System Architecture, DevOps & Cloud, Technical Consulting, Mobile Development, API Integration
- Gold icon, title, description, gold border on hover

### Contact (teaser)

- Section label: `// GET IN TOUCH`
- Centered CTA: heading + subtext + "Send a Message →" button + email link
- Background: faint electric radial glow

---

## 4. Inner Pages

### `/about`
- Hero banner with photo background (dark overlay), name + title centered
- Two-column content: full bio left, quick-facts sidebar right (location, availability, email, download CV)
- "My Journey" career milestone timeline
- Personal projects section: Fashionket, Acefre

### `/projects`
- Full projects grid with filter tabs: All / Contracts / Personal / Prototypes
- Cards: iframe/screenshot, name, role, stack, live + GitHub links
- Card click opens modal with full detail

### `/skills`
- Restyled `skillList.tsx` + `skillType.tsx`
- Category tabs, circular progress indicators in gold/electric

### `/experiences`
- Full expanded timeline (more detail than homepage teaser)

### `/services`
- Hero banner + detailed service cards
- Each card has "Request this service →" CTA → `/contact`

### `/blog`
- Card grid: title, date, reading time, excerpt, category badge
- Gold category filter tabs

### `/system-design`
- Restyled `systemDesignPage.tsx` — dark cards, gold labels

### `/contact`
- Split: contact form left (name, email, subject, message, send) / contact info + socials right
- EmailJS integration preserved

---

## 5. Admin Dashboard

### Layout
- Left sidebar kept (standard dashboard pattern), fully restyled
- Sidebar: `#111118` bg, gold monogram at top, gold active nav state, electric hover
- Main area: `#0A0A0F` bg
- Top bar: breadcrumb + user badge + logout button

### `/admin/dashboard`
- Stats cards: total projects, blog posts, skills, services, experiences
- Quick action buttons: "Add Project", "New Blog Post", "Update Skills"
- Recent activity list

### Resource Pages (blog, projects, skills, experiences, services, system-design, content)
- Dark table rows, gold header text, electric Edit/Delete action buttons
- Add/Edit in sliding drawer or modal — dark bg, gold labels, styled inputs
- All CRUD logic, API routes, Prisma queries untouched

### `/admin/login`
- Centered card on dark bg, subtle gold border glow
- Email + password inputs, "Sign In" gold button
- "Ultimate IntelliForge" branding at top

---

## Content Assets Required

- **CV/Resume PDF** — needed for the "Download CV" button on `/about`. Place at `public/cv/tunmise-falodun-cv.pdf`.
- **Project screenshots** — for any project where an iframe fails to load (CORS/X-Frame-Options). Store in `public/images/projects/`.
- **Profile photo** — already exists at `public/images/Profile.jpg`.
- **GitHub links** — optional per project card; only shown where the repo is public.

---

## Files Preserved (no logic changes)

- All `src/app/api/**` routes
- `src/lib/prisma.ts`, `src/lib/admin-auth.ts`, `src/lib/emailjs.ts`, `src/lib/api-utils.ts`
- `src/middleware.ts`
- `prisma/` schema and seed
- `docker-compose.yml`

---

## Files Rebuilt (UI only)

- `src/app/globals.css` — new design tokens
- `src/app/layout.tsx` — font imports
- `src/app/(public)/layout.tsx` — remove sidebar, add navbar
- All `src/components/root/*` — complete rewrite
- All `src/components/about/*`, `blog/*`, `contact/*`, `experience/*`, `projects/*`, `service/*`, `skills/*`, `system-design/*`
- All `src/app/(public)/*/page.tsx` — layout updates
- All `src/app/admin/**` — restyled, logic untouched
- New component: `src/components/root/navbar.tsx`
- Removed: `src/components/root/sidebar.tsx`
