You are a Senior Fullstack Engineer specializing in Next.js (App Router), Prisma, PostgreSQL, and production-grade CMS architecture.

Your task is to upgrade an existing Next.js portfolio codebase into a dynamic CMS-powered portfolio system.

The goal is to transform a static portfolio into a scalable content-driven system suitable for a backend-focused Software Engineer targeting:
- Startup founding engineer roles
- Remote US/EU engineering roles

---

# 🧠 CORE OBJECTIVE

Refactor the portfolio so that ALL content is dynamically managed via a CMS layer:

- Projects
- Experience
- Skills
- Blog articles
- Services

No hardcoded content should remain in UI components.

---

# 🏗️ TECH STACK REQUIREMENTS

Use:

- Next.js App Router (existing project structure)
- TypeScript
- Prisma ORM
- PostgreSQL
- shadcn/ui components
- Tailwind CSS
- Next.js API routes (or server actions if appropriate)
- Cloud image support (use simple URL-based storage initially)

Authentication:
- Simple admin auth (email/password OR hardcoded admin for MVP phase)

---

# 📦 NEW ARCHITECTURE REQUIREMENTS

Introduce a CMS architecture:

## 1. Database Layer (Prisma + PostgreSQL)

Create Prisma models:

### Project
- id (uuid)
- title
- description
- longDescription (rich content)
- techStack (string[])
- category (SaaS, Fintech, Logistics, Marketplace)
- liveUrl
- githubUrl
- architectureDiagramUrl (string optional)
- featured (boolean)
- createdAt
- updatedAt

### Experience
- id
- company
- role
- description
- achievements (string[])
- startDate
- endDate

### Skill
- id
- name
- category (Backend / Frontend / DevOps)
- level (0–100)

### Blog
- id
- title
- slug
- content (markdown or rich text string)
- tags (string[])
- published (boolean)
- createdAt

### Service
- id
- title
- description

---

## 2. API LAYER

Create REST endpoints:

### Projects
- GET /api/projects
- POST /api/projects (admin only)
- PUT /api/projects/:id
- DELETE /api/projects/:id

### Experience
- CRUD endpoints

### Skills
- CRUD endpoints

### Blog
- CRUD endpoints
- GET /api/blog/:slug

---

## 3. ADMIN CMS DASHBOARD (/admin)

Create a simple admin panel using shadcn/ui:

Pages:

- /admin/login
- /admin/dashboard
- /admin/projects
- /admin/experience
- /admin/skills
- /admin/blog
- /admin/services

UI Requirements:
- Tables for listing content
- Modal forms for create/edit
- Clean minimal UI (no heavy design system)
- Mobile responsive

Use shadcn/ui components:
- Button
- Dialog
- Table
- Input
- Textarea
- Select
- Badge
- Card

---

## 4. PUBLIC PORTFOLIO REFACTOR

Replace ALL static data usage in:

- /components/projects
- /components/experience
- /components/skills
- /components/blog
- /components/services

Instead:

- Fetch from API using server components or fetch()
- Render dynamic CMS data
- Add loading states where needed

---

# 🧠 CONTENT STRATEGY (IMPORTANT)

Replace existing portfolio copywriting with improved engineering positioning:

---

## HERO SECTION COPY (REPLACE EXISTING)

Title:
Backend-Focused Software Engineer

Subtitle:
I build scalable backend systems, SaaS platforms, and distributed applications for startups and production environments.

Description:
Specializing in NestJS, Spring Boot, PostgreSQL, and system architecture design for logistics, fintech, and marketplace platforms.

---

## ABOUT SECTION COPY

Replace with:

I am a backend-focused Software Engineer building production-grade systems across logistics, fintech, SaaS, and marketplace platforms.

I specialize in designing scalable APIs, distributed architectures, and real-time systems that power real-world applications.

My work spans multiple live production systems including:
- logistics platforms with geo-based dispatching
- fintech-style transaction systems
- SaaS products with multi-service architecture
- marketplace systems with complex workflows

---

## PROJECT WRITEUPS (IMPORTANT)

Rewrite all project descriptions into engineering case studies:

---

### Example: Meudeliver

Title:
Meudeliver — Real-Time Logistics & Delivery System

Description:
A scalable logistics platform designed for real-time delivery tracking, geo-based dispatching, and order lifecycle management.

Key Features:
- Geo-based delivery assignment system
- WebSocket real-time tracking
- Payment workflow integration
- Worker-based background job processing
- Scalable API architecture

Engineering Focus:
Built to handle distributed delivery workflows with real-time state synchronization across users, vendors, and delivery agents.

---

### Example: Accessivo

Title:
Accessivo — Fintech & Account Management System

Description:
A backend-driven financial system simulating banking operations including transactions, account management, and secure authentication flows.

Key Features:
- Secure authentication system
- Transaction processing pipeline
- Ledger-style data structure design
- Audit logging system

Engineering Focus:
Designed with financial-grade consistency and secure transaction flow principles.

---

### Example: FashionKet

Title:
FashionKet — Marketplace Backend System

Description:
A scalable marketplace system supporting product listings, vendor management, and order workflows.

Key Features:
- Vendor-product architecture
- Cart and order pipeline system
- Search and filtering engine
- Modular API structure

---

### Example: TinnieStudio

Title:
TinnieStudio — SaaS Content Platform

Description:
A multi-module SaaS system designed for managing content workflows, users, and administrative operations.

Key Features:
- Multi-module architecture
- Admin dashboard system
- Content processing pipeline
- User management system

---

# 📊 SYSTEM DESIGN ADDITION (IMPORTANT FEATURE)

Create a new section in portfolio:

/system-design

Include:
- Meudeliver architecture diagram section
- Accessivo transaction flow
- API structure explanation
- Backend architecture breakdown

Store diagrams as images or markdown cards.

---

# 🎨 UI REQUIREMENTS

- Clean corporate aesthetic
- shadcn/ui components only
- Tailwind styling
- Light + Dark mode support
- Minimal animations
- Focus on readability and structure

---

# ⚙️ PERFORMANCE REQUIREMENTS

- Use server components where possible
- Optimize API fetching
- Avoid client-heavy rendering
- Use caching for CMS data

---

# 🔐 ADMIN SECURITY (MVP LEVEL)

- Protect /admin routes
- Simple auth guard middleware
- Prevent unauthorized access

---

# 📌 FINAL GOAL

After completion, the portfolio should behave like:

- A live CMS-driven engineering portfolio
- A backend system showcasing real architectural thinking
- A startup-ready founding engineer profile
- A dynamic system instead of static pages

---

# 🚀 IMPORTANT

Ensure:
- No hardcoded portfolio data remains
- Everything is CMS-driven
- Code is modular and scalable
- Architecture is clean and production-grade