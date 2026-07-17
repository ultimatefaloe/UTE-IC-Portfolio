import "dotenv/config";

import { PrismaClient, ProjectCategory, SkillCategory, SystemDesignType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.systemDesign.deleteMany();
  await prisma.blog.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.project.deleteMany();
  await prisma.service.deleteMany();
  await prisma.contentBlock.deleteMany();

  // ── Content blocks ────────────────────────────────────────────────────────────
  await prisma.contentBlock.createMany({
    data: [
      {
        key: "hero",
        title: "Full-Stack Engineer & Technology Entrepreneur",
        subtitle: "Backend Systems · SaaS Platforms · Distributed Services",
        description:
          "I build scalable full-stack systems, SaaS platforms, and distributed applications for startups and production environments across Africa and beyond.",
        body: "Explore my work",
      },
      {
        key: "about",
        title: "Full-Stack Engineer & Technology Entrepreneur",
        subtitle: "Engineering for startups and scale-ups",
        description:
          "I am a full-stack software engineer and technology entrepreneur building production-grade systems across logistics, fintech, SaaS, and marketplace platforms.",
        body:
          "I specialize in designing scalable APIs, distributed architectures, and real-time systems that power real-world applications.\n\nMy work spans multiple live production systems including media streaming platforms, logistics platforms with geo-based dispatching, fintech-style transaction systems, SaaS products with multi-service architecture, and marketplace systems with complex workflows.",
      },
    ],
  });

  // ── Projects ──────────────────────────────────────────────────────────────────
  await prisma.project.createMany({
    data: [
      {
        title: "TinnieStudio — Media Streaming Platform",
        description:
          "Scalable media streaming platform with adaptive video delivery, creator management, and HLS streaming pipeline.",
        longDescription:
          "Architected and developed backend infrastructure for a scalable media streaming platform. Built an asynchronous media processing pipeline using RabbitMQ, FFmpeg, and cloud object storage for automated transcoding and HLS streaming. Implemented secure direct-to-cloud upload workflows with presigned URLs and CDN-based streaming delivery.",
        techStack: ["Next.js", "SpringBoot", "PostgreSQL", "Redis", "RabbitMQ", "FFmpeg", "AWS S3", "Docker"],
        category: ProjectCategory.STREAMING,
        liveUrl: "https://tinniestudio.com",
        githubUrl: null,
        featured: true,
      },
      {
        title: "MeuDelivery — Multi-Role Logistics Platform",
        description:
          "Multi-role e-commerce and logistics platform supporting clients, vendors, delivery agents, and admins with real-time order tracking.",
        longDescription:
          "Designed and developed scalable REST APIs for clients, vendors, delivery agents, and admins using NestJS and PostgreSQL. Implemented authentication, role-based access control, order tracking, and in-app notification systems. Built modular services for cart management, product browsing, and multi-party order flows.",
        techStack: ["Next.js", "NestJS", "PostgreSQL", "Prisma", "Docker", "MapBox", "AWS S3"],
        category: ProjectCategory.LOGISTICS,
        liveUrl: "https://meudeliver.com",
        githubUrl: null,
        featured: true,
      },
      {
        title: "California Notices — Legal Notice Platform",
        description:
          "US-based platform enabling landlords and agents to file legal notices with PDF generation, document conversion, and Stripe billing.",
        longDescription:
          "Built a fintech-adjacent legal notice generation platform for the California market. Handled PDF editing, document conversion workers, Stripe billing integration, and role-based access for agents and landlords.",
        techStack: ["Next.js", "NestJS", "Stripe", "AWS", "PostgreSQL", "Prisma"],
        category: ProjectCategory.CONTRACTS,
        liveUrl: "https://canotices.com",
        githubUrl: null,
        featured: true,
      },
      {
        title: "FashionKet — Multi-Vendor Fashion Marketplace",
        description:
          "Multi-vendor e-commerce platform for emerging fashion brands and SMEs with vendor management, catalogue, and payment integration.",
        longDescription:
          "Founded and led development of FashionKet. Designed platform architecture including vendor management, product catalogue, order processing, and payment integration. Built and maintained scalable backend services, REST APIs, cloud databases, and infrastructure.",
        techStack: ["Next.js", "NestJS", "PostgreSQL", "Redis", "Stripe", "Docker"],
        category: ProjectCategory.MARKETPLACE,
        liveUrl: "https://fashionket.com",
        githubUrl: null,
        featured: false,
      },
      {
        title: "Acefre — Trust-Based Service Marketplace",
        description:
          "Service marketplace connecting users with verified runners for everyday task fulfilment, with escrow payments and trust mechanisms.",
        longDescription:
          "Led end-to-end development of Acefre. Implemented task creation, runner assignment, escrow payments, dispute resolution, wallet systems, and user trust mechanisms. Integrated PWA capabilities, SEO, analytics, and performance optimisation.",
        techStack: ["Next.js", "React", "TypeScript", "NestJS", "PostgreSQL", "PWA"],
        category: ProjectCategory.PERSONAL,
        liveUrl: "https://acefre.com",
        githubUrl: null,
        featured: false,
      },
      {
        title: "Water Groove — Fintech Investment Platform",
        description:
          "Fintech-grade investment platform with tier-based investments, ROI automation, ledger transactions, and admin-controlled financial workflows.",
        longDescription:
          "Designed a fintech-grade investment platform using Next.js and Prisma ORM. Architected a ledger-based transaction system reducing schema complexity and cutting runtime aggregation queries by ~60%. Built cron-driven ROI automation with database locking and idempotency.",
        techStack: ["Next.js", "Prisma", "PostgreSQL", "Auth0", "NestJS"],
        category: ProjectCategory.FINTECH,
        liveUrl: "https://watergroove.com",
        githubUrl: null,
        featured: false,
      },
      {
        title: "59Minutes Print — On-Demand Printing Platform",
        description:
          "On-demand printing and delivery service for Abuja with REST APIs, Firebase Auth, vendor management, and real-time order tracking.",
        longDescription:
          "Built and maintained REST APIs for authentication, products, orders, and vendors using Node.js, Express, and MongoDB. Integrated Firebase Auth, secure file uploads, and vendor-based product logic. Designed cart and order systems with real-time pricing and status tracking.",
        techStack: ["Node.js", "Express", "MongoDB", "Firebase Auth", "Next.js"],
        category: ProjectCategory.SAAS,
        liveUrl: "https://59minutesprint.com",
        githubUrl: null,
        featured: false,
      },
      // ── Prototypes ───────────────────────────────────────────────────────────────
      {
        title: "CyberGuard Blog",
        description: "Cybersecurity blog platform covering threat intelligence, secure coding, and industry news.",
        longDescription: "A cybersecurity-focused blog platform built as a Next.js prototype, featuring articles on threat intelligence, secure coding practices, and industry news.",
        techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
        category: ProjectCategory.PROTOTYPES,
        liveUrl: "https://cyberguard-blog.vercel.app/",
        githubUrl: null,
        featured: false,
      },
      {
        title: "Agrolink",
        description: "Agricultural supply chain platform connecting farmers, distributors, and buyers.",
        longDescription: "A Next.js prototype for digitising Nigeria's agricultural supply chain — linking farmers with distributors and buyers for transparent, traceable produce sourcing.",
        techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
        category: ProjectCategory.PROTOTYPES,
        liveUrl: "https://ultimate-agrolinks.vercel.app/",
        githubUrl: null,
        featured: false,
      },
      {
        title: "Flirt UTE",
        description: "Social connection app prototype for meaningful meet-ups and interactions.",
        longDescription: "A prototype social connection app built with Next.js, exploring UI patterns for profile discovery, match flows, and real-time chat interactions.",
        techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
        category: ProjectCategory.PROTOTYPES,
        liveUrl: "https://flirt-ute.vercel.app/",
        githubUrl: null,
        featured: false,
      },
      {
        title: "VibeeDev",
        description: "Developer community platform for sharing projects, getting feedback, and collaboration.",
        longDescription: "A developer community hub prototype where engineers can post projects, leave reviews, and connect with other builders across the ecosystem.",
        techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
        category: ProjectCategory.PROTOTYPES,
        liveUrl: "https://vibeedev.vercel.app/",
        githubUrl: null,
        featured: false,
      },
      {
        title: "KiddiesCake",
        description: "Custom cakes ordering platform for bespoke children's birthday and celebration cakes.",
        longDescription: "An e-commerce prototype for a custom cake bakery — allowing customers to browse cake designs, customise orders, and book for events.",
        techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
        category: ProjectCategory.PROTOTYPES,
        liveUrl: "https://kiddiescake.vercel.app/",
        githubUrl: null,
        featured: false,
      },
      {
        title: "Liduct Hair",
        description: "Hair products e-commerce store for natural and styled hair care products.",
        longDescription: "A product catalogue and e-commerce prototype for a hair care brand, featuring product listings, cart flows, and checkout UI.",
        techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
        category: ProjectCategory.PROTOTYPES,
        liveUrl: "https://liducthair.vercel.app/",
        githubUrl: null,
        featured: false,
      },
      {
        title: "EventApp",
        description: "Events management and ticketing platform for discovering and booking local events.",
        longDescription: "An event discovery and ticketing prototype built with Next.js — covering event listing, category filtering, seat selection, and booking confirmation flows.",
        techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
        category: ProjectCategory.PROTOTYPES,
        liveUrl: "https://event-app-orpin.vercel.app/",
        githubUrl: null,
        featured: false,
      },
    ],
  });

  // ── Experience ────────────────────────────────────────────────────────────────
  await prisma.experience.createMany({
    data: [
      {
        company: "TinnieStudio",
        role: "Full Stack Engineer",
        period: "Mar 2026 – Present",
        location: "Ontario, Canada (Remote)",
        description:
          "Architected and developed backend infrastructure for a scalable media streaming platform with adaptive video delivery and creator management.",
        achievements: [
          "Built an asynchronous media processing pipeline using RabbitMQ, FFmpeg, and cloud object storage for automated transcoding and HLS streaming.",
          "Implemented secure direct-to-cloud upload workflows with presigned URLs and CDN-based streaming delivery.",
          "Designed modular backend systems for authentication, subscriptions, content management, playback tracking, analytics, and admin moderation.",
          "Applied Clean Architecture and event-driven design principles to ensure scalability, maintainability, and production readiness.",
        ],
        techStack: ["SpringBoot", "Next.js", "PostgreSQL", "Redis", "RabbitMQ", "FFmpeg", "AWS S3", "Docker"],
        startDate: new Date("2026-03-01"),
      },
      {
        company: "Acefre – Ultimate IntelliForge",
        role: "Full Stack Engineer (Founder)",
        period: "Mar 2026 – Present",
        location: "Minna, Nigeria",
        description:
          "Led end-to-end development of Acefre, a trust-based service marketplace connecting users with verified runners for everyday task fulfilment.",
        achievements: [
          "Defined product architecture, technical strategy, and engineering roadmap across frontend and backend systems.",
          "Built frontend architecture using Next.js, React, TypeScript with reusable DAL layers, BFF architecture, and scalable state management.",
          "Implemented task creation, runner assignment, escrow payments, dispute resolution, wallet systems, and user trust mechanisms.",
          "Integrated PWA capabilities, SEO, analytics, and performance optimisation across web and mobile form factors.",
        ],
        techStack: ["Next.js", "React", "TypeScript", "NestJS", "PostgreSQL", "Prisma", "PWA"],
        startDate: new Date("2026-03-01"),
      },
      {
        company: "FashionKet – Ultimate IntelliForge",
        role: "Full Stack Engineer (Founder)",
        period: "Oct 2025 – Present",
        location: "Abuja, Nigeria",
        description:
          "Founded and led development of FashionKet, a multi-vendor e-commerce platform for emerging fashion brands and SMEs.",
        achievements: [
          "Designed platform architecture including vendor management, product catalogue, order processing, and payment integration.",
          "Built and maintained scalable backend services, REST APIs, cloud databases, and infrastructure.",
          "Developed data-driven analytics and performance monitoring solutions for marketplace operations.",
          "Managed platform security, performance optimisation, vendor onboarding tools, and deployment processes.",
        ],
        techStack: ["Next.js", "NestJS", "PostgreSQL", "Redis", "Stripe", "Docker", "Prisma"],
        startDate: new Date("2025-10-01"),
      },
      {
        company: "Accessivo",
        role: "Front-End Team Lead",
        period: "Aug 2025 – Present",
        location: "Ilorin, Nigeria",
        description:
          "Bridged communication between the frontend engineering team and product stakeholders, ensuring aligned delivery goals.",
        achievements: [
          "Assigned and managed tasks, monitored progress, and ensured timely delivery of high-quality frontend features.",
          "Championed continuous learning, best practices, and code quality standards across the team.",
        ],
        techStack: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
        startDate: new Date("2025-08-01"),
      },
      {
        company: "MeuDelivery",
        role: "Full Stack Engineer",
        period: "May 2025 – Present",
        location: "Angola (Remote)",
        description:
          "Designed and developed scalable REST APIs for clients, vendors, delivery agents, and admins using NestJS and PostgreSQL.",
        achievements: [
          "Implemented authentication, role-based access control, order tracking, and in-app notification systems.",
          "Built modular services for cart management, product browsing, and multi-party order flows using Prisma ORM.",
          "Integrated Swagger for API documentation and maintained clean architecture standards.",
        ],
        techStack: ["NestJS", "PostgreSQL", "Prisma", "Docker", "MapBox", "Swagger"],
        startDate: new Date("2025-05-01"),
      },
      {
        company: "Water Groove",
        role: "Full Stack Engineer",
        period: "Dec 2025 – Feb 2026",
        location: "Abuja, Nigeria",
        description:
          "Designed a fintech-grade investment platform using Next.js and Prisma ORM, supporting tier-based investments, ROI automation, and admin-controlled financial workflows.",
        achievements: [
          "Architected a ledger-based transaction system with enum-driven models, reducing schema complexity and cutting runtime aggregation queries by ~60%.",
          "Built cron-driven ROI automation with database locking and idempotency, ensuring 100% consistency in monthly payout calculations.",
          "Introduced balance snapshot models to optimise financial queries, improving dashboard load times by ~40% under concurrent usage.",
          "Integrated Auth0 for secure role-based authentication and collaborated on admin tooling for transaction approvals, monitoring, and compliance reporting.",
        ],
        techStack: ["Next.js", "Prisma", "PostgreSQL", "Auth0", "NestJS"],
        startDate: new Date("2025-12-01"),
        endDate: new Date("2026-02-28"),
      },
      {
        company: "59Minutes Print",
        role: "Full Stack Engineer",
        period: "Jul 2024 – Mar 2026",
        location: "Abuja, Nigeria",
        description:
          "Built and maintained REST APIs for authentication, products, orders, and vendors using Node.js, Express, and MongoDB.",
        achievements: [
          "Integrated Firebase Auth, secure file uploads, and vendor-based product logic.",
          "Designed cart and order systems with real-time pricing and status tracking.",
          "Implemented admin tools for managing users, orders, and product listings with role-based access control.",
        ],
        techStack: ["Node.js", "Express", "MongoDB", "Firebase Auth", "Next.js"],
        startDate: new Date("2024-07-01"),
        endDate: new Date("2026-03-31"),
      },
      {
        company: "University of Ilorin",
        role: "Software Engineer (Backend)",
        period: "Jul 2024 – Jul 2025",
        location: "Abuja, Nigeria",
        description:
          "Contributed backend development to the University of Ilorin Recruitment Portal, responsible for server-side logic, API development, and database management.",
        achievements: [
          "Developed server-side logic and REST APIs for the recruitment portal.",
          "Ensured system performance, security, and scalability throughout the recruitment portal lifecycle.",
        ],
        techStack: ["Node.js", "PostgreSQL", "REST APIs"],
        startDate: new Date("2024-07-01"),
        endDate: new Date("2025-07-31"),
      },
    ],
  });

  // ── Skills ─────────────────────────────────────────────────────────────────────
  await prisma.skill.createMany({
    data: [
      // Frontend
      { name: "Next.js", category: SkillCategory.FRONTEND, level: 90 },
      { name: "React", category: SkillCategory.FRONTEND, level: 88 },
      { name: "TypeScript", category: SkillCategory.FRONTEND, level: 87 },
      { name: "Tailwind CSS", category: SkillCategory.FRONTEND, level: 85 },
      { name: "Framer Motion", category: SkillCategory.FRONTEND, level: 75 },
      // Backend
      { name: "NestJS", category: SkillCategory.BACKEND, level: 90 },
      { name: "Node.js", category: SkillCategory.BACKEND, level: 88 },
      { name: "Express.js", category: SkillCategory.BACKEND, level: 85 },
      { name: "SpringBoot", category: SkillCategory.BACKEND, level: 72 },
      { name: "Prisma ORM", category: SkillCategory.BACKEND, level: 88 },
      { name: "REST APIs", category: SkillCategory.BACKEND, level: 92 },
      // Database
      { name: "PostgreSQL", category: SkillCategory.DATABASE, level: 87 },
      { name: "MongoDB", category: SkillCategory.DATABASE, level: 80 },
      { name: "Redis", category: SkillCategory.DATABASE, level: 78 },
      { name: "MySQL", category: SkillCategory.DATABASE, level: 75 },
      // DevOps
      { name: "Docker", category: SkillCategory.DEVOPS, level: 78 },
      { name: "AWS", category: SkillCategory.DEVOPS, level: 72 },
      { name: "CI/CD", category: SkillCategory.DEVOPS, level: 70 },
      { name: "Linux", category: SkillCategory.DEVOPS, level: 74 },
      // Mobile
      { name: "React Native", category: SkillCategory.MOBILE, level: 70 },
      // Other
      { name: "Git", category: SkillCategory.OTHER, level: 90 },
      { name: "RabbitMQ", category: SkillCategory.OTHER, level: 68 },
      { name: "GraphQL", category: SkillCategory.OTHER, level: 65 },
    ],
  });

  // ── Blog posts ────────────────────────────────────────────────────────────────
  await prisma.blog.createMany({
    data: [
      {
        title: "Designing Scalable Backend APIs for Founding Teams",
        slug: "scalable-backend-apis-founding-teams",
        excerpt: "How to architect REST APIs that grow with your startup — from MVP to production scale.",
        category: "Architecture",
        content:
          "In this article, I break down how to design backend APIs that scale with startup growth. We cover modular service design, database schema evolution, caching strategies, and real-time orchestration patterns. The key insight: design for the next 10x, not the next 100x.",
        tags: ["Backend", "Architecture", "Startups", "APIs"],
        published: true,
      },
      {
        title: "Event-Driven Architecture with RabbitMQ and NestJS",
        slug: "event-driven-rabbitmq-nestjs",
        excerpt: "Building reliable asynchronous workflows with message queues in a NestJS monorepo.",
        category: "Backend",
        content:
          "Event-driven design decouples services and improves resilience. In this post, I walk through how I implemented RabbitMQ-based message queues in the TinnieStudio media pipeline — handling video transcoding jobs, retry logic, dead-letter queues, and consumer scalability.",
        tags: ["RabbitMQ", "NestJS", "Backend", "Event-Driven"],
        published: true,
      },
      {
        title: "Building a Fintech Ledger with Prisma and PostgreSQL",
        slug: "fintech-ledger-prisma-postgresql",
        excerpt: "A practical guide to designing immutable transaction ledgers with Prisma ORM and PostgreSQL.",
        category: "Fintech",
        content:
          "Fintech systems require strict data integrity. I share patterns from building the Water Groove investment platform: enum-driven transaction types, idempotency keys, database locking for ROI automation, and balance snapshot models that improved dashboard load times by ~40%.",
        tags: ["Fintech", "PostgreSQL", "Prisma", "Database"],
        published: true,
      },
      {
        title: "From Code to Company: Lessons from Building FashionKet and Acefre",
        slug: "building-fashionket-acefre-founder-lessons",
        excerpt: "What I learned founding two software products while working full-time as a contractor.",
        category: "Entrepreneurship",
        content:
          "Running two startups while shipping contracts across Angola, the US, and Canada taught me a lot about prioritisation, architecture decisions under pressure, and building teams. This is a candid look at what worked, what didn't, and how I balance execution with vision.",
        tags: ["Entrepreneurship", "Startups", "Founder", "Africa"],
        published: true,
      },
    ],
  });

  // ── Services ──────────────────────────────────────────────────────────────────
  await prisma.service.createMany({
    data: [
      {
        title: "Full-Stack Web Development",
        description:
          "End-to-end web applications from pixel-perfect UI to production-grade API and database — built to scale from day one.",
      },
      {
        title: "Backend Architecture & API Design",
        description:
          "Designing resilient backend systems, REST APIs, and event-driven services using NestJS, Node.js, and PostgreSQL.",
      },
      {
        title: "SaaS Platform Engineering",
        description:
          "Building multi-tenant SaaS platforms with secure authentication, billing-ready data models, and scalable module architecture.",
      },
      {
        title: "System Design Consulting",
        description:
          "Architecture reviews, scalability planning, and infrastructure roadmaps tailored for founder-led and early-stage engineering teams.",
      },
      {
        title: "DevOps & Cloud Infrastructure",
        description:
          "Dockerized environments, CI/CD pipelines, AWS deployments, and production monitoring for backend services.",
      },
      {
        title: "Mobile App Development",
        description:
          "Cross-platform mobile applications with React Native — PWA-first for web, native builds for iOS and Android.",
      },
    ],
  });

  // ── System Design ─────────────────────────────────────────────────────────────
  await prisma.systemDesign.createMany({
    data: [
      {
        title: "Media Streaming Pipeline — TinnieStudio",
        description:
          "Asynchronous video transcoding pipeline: upload → S3 presigned URL → RabbitMQ job → FFmpeg worker → HLS segments → CDN delivery.",
        tags: ["Streaming", "RabbitMQ", "FFmpeg", "AWS S3", "HLS"],
        type: SystemDesignType.ARCHITECTURE,
        order: 1,
      },
      {
        title: "Multi-Role Logistics System — MeuDelivery",
        description:
          "Service breakdown for multi-role order lifecycle management across clients, vendors, delivery agents, and admin.",
        tags: ["Logistics", "NestJS", "Real-Time", "MapBox"],
        type: SystemDesignType.FLOW,
        order: 2,
      },
      {
        title: "Fintech Ledger & ROI Automation — Water Groove",
        description:
          "Ledger-style transaction flow ensuring consistency across account balances, tier investments, cron-based ROI payouts, and audit logs.",
        tags: ["Fintech", "PostgreSQL", "Cron Jobs", "Auth0"],
        type: SystemDesignType.FLOW,
        order: 3,
      },
      {
        title: "API Gateway & Service Boundaries",
        description:
          "API gateway layout, service boundary design, authentication strategy, and RBAC enforcement across microservices.",
        tags: ["API Design", "NestJS", "Auth", "RBAC"],
        type: SystemDesignType.API,
        order: 4,
      },
    ],
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
