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

  await prisma.contentBlock.createMany({
    data: [
      {
        key: "hero",
        title: "Backend-Focused Software Engineer",
        subtitle: "Backend Systems • SaaS Platforms • Distributed Services",
        description:
          "I build scalable backend systems, SaaS platforms, and distributed applications for startups and production environments.",
        body: "Explore case studies",
      },
      {
        key: "about",
        title: "Backend-Focused Software Engineer",
        subtitle: "Engineering for startups and scale-ups",
        description:
          "I am a backend-focused Software Engineer building production-grade systems across logistics, fintech, SaaS, and marketplace platforms.",
        body:
          "I specialize in designing scalable APIs, distributed architectures, and real-time systems that power real-world applications.\n\nMy work spans multiple live production systems including logistics platforms with geo-based dispatching, fintech-style transaction systems, SaaS products with multi-service architecture, and marketplace systems with complex workflows.",
      },
    ],
  });

  await prisma.project.createMany({
    data: [
      {
        title: "Meudeliver — Real-Time Logistics & Delivery System",
        description:
          "A scalable logistics platform designed for real-time delivery tracking, geo-based dispatching, and order lifecycle management.",
        longDescription:
          "Built to handle distributed delivery workflows with real-time state synchronization across users, vendors, and delivery agents.",
        techStack: [
          "NestJS",
          "PostgreSQL",
          "Redis",
          "WebSockets",
          "Docker",
        ],
        category: ProjectCategory.LOGISTICS,
        liveUrl: "https://meudeliver.vercel.app/",
        githubUrl: null,
        architectureDiagramUrl: null,
        featured: true,
      },
      {
        title: "Accessivo — Fintech & Account Management System",
        description:
          "A backend-driven financial system simulating banking operations including transactions, account management, and secure authentication flows.",
        longDescription:
          "Designed with financial-grade consistency and secure transaction flow principles.",
        techStack: [
          "NestJS",
          "PostgreSQL",
          "JWT",
          "Event-driven workflows",
        ],
        category: ProjectCategory.FINTECH,
        liveUrl: "https://accessivo.vercel.app/",
        githubUrl: null,
        architectureDiagramUrl: null,
        featured: true,
      },
      {
        title: "FashionKet — Marketplace Backend System",
        description:
          "A scalable marketplace system supporting product listings, vendor management, and order workflows.",
        longDescription:
          "Designed to support vendor-product architecture, cart pipelines, and modular APIs for rapid scale.",
        techStack: ["Node.js", "PostgreSQL", "Redis", "Search Index"],
        category: ProjectCategory.MARKETPLACE,
        liveUrl: "https://fashionket.vercel.app/",
        githubUrl: null,
        architectureDiagramUrl: null,
        featured: false,
      },
      {
        title: "TinnieStudio — SaaS Content Platform",
        description:
          "A multi-module SaaS system designed for managing content workflows, users, and administrative operations.",
        longDescription:
          "Built with modular services, admin tooling, and workflow automation for content operations.",
        techStack: ["Next.js", "NestJS", "PostgreSQL", "Queue Workers"],
        category: ProjectCategory.SAAS,
        liveUrl: "https://tinniestudio.vercel.app/",
        githubUrl: null,
        architectureDiagramUrl: null,
        featured: false,
      },
    ],
  });

  await prisma.experience.createMany({
    data: [
      {
        company: "Accessivo",
        role: "Backend Engineer",
        description:
          "Led backend architecture for fintech workflows and secure account systems.",
        achievements: [
          "Designed transaction processing pipeline with audit logging.",
          "Implemented secure auth and role-based access control.",
          "Built monitoring dashboards for operational visibility.",
        ],
        startDate: new Date("2025-08-01"),
      },
      {
        company: "MeuDelivery",
        role: "Backend Developer",
        description:
          "Built logistics APIs for dispatch, tracking, and vendor coordination.",
        achievements: [
          "Developed real-time tracking and delivery coordination services.",
          "Optimized dispatch algorithms for geo-based routing.",
          "Documented APIs and enforced modular architecture.",
        ],
        startDate: new Date("2025-05-01"),
      },
    ],
  });

  await prisma.skill.createMany({
    data: [
      { name: "NestJS", category: SkillCategory.BACKEND, level: 88 },
      { name: "PostgreSQL", category: SkillCategory.BACKEND, level: 85 },
      { name: "Redis", category: SkillCategory.BACKEND, level: 78 },
      { name: "TypeScript", category: SkillCategory.BACKEND, level: 86 },
      { name: "Next.js", category: SkillCategory.FRONTEND, level: 80 },
      { name: "React", category: SkillCategory.FRONTEND, level: 78 },
      { name: "Tailwind CSS", category: SkillCategory.FRONTEND, level: 76 },
      { name: "Docker", category: SkillCategory.DEVOPS, level: 74 },
      { name: "AWS", category: SkillCategory.DEVOPS, level: 70 },
    ],
  });

  await prisma.blog.createMany({
    data: [
      {
        title: "Designing Scalable Backend APIs for Founding Teams",
        slug: "scalable-backend-apis-founding-teams",
        content:
          "In this article, I break down how to design backend APIs that scale with startup growth. We cover modular service design, database evolution, and real-time orchestration patterns.",
        tags: ["Backend", "Architecture", "Startups"],
        published: true,
      },
      {
        title: "System Design Notes: Logistics Dispatching",
        slug: "system-design-logistics-dispatching",
        content:
          "Dispatching systems require careful modeling of geo-coordinates, job queues, and real-time state updates. Here is a breakdown of the approach used in Meudeliver.",
        tags: ["System Design", "Logistics"],
        published: true,
      },
    ],
  });

  await prisma.service.createMany({
    data: [
      {
        title: "Backend Architecture & API Design",
        description:
          "Designing resilient backend systems, REST APIs, and event-driven services for fast-moving teams.",
      },
      {
        title: "SaaS Platform Engineering",
        description:
          "Building multi-tenant SaaS platforms with secure auth, billing-ready data models, and scalable workflows.",
      },
      {
        title: "System Design Consulting",
        description:
          "Architecture reviews, scalability planning, and infrastructure roadmaps for founder-led teams.",
      },
      {
        title: "Infrastructure & DevOps Enablement",
        description:
          "Dockerized environments, CI/CD pipelines, and production monitoring for backend services.",
      },
    ],
  });

  await prisma.systemDesign.createMany({
    data: [
      {
        title: "Meudeliver Architecture Diagram",
        description:
          "Service breakdown for real-time logistics orchestration, dispatching, and delivery tracking.",
        type: SystemDesignType.ARCHITECTURE,
        order: 1,
      },
      {
        title: "Accessivo Transaction Flow",
        description:
          "Ledger-style flow ensuring consistency across account balances, approvals, and audit logs.",
        type: SystemDesignType.FLOW,
        order: 2,
      },
      {
        title: "API Structure & Gateway Design",
        description:
          "API gateway layout, service boundaries, and authentication strategy.",
        type: SystemDesignType.API,
        order: 3,
      },
      {
        title: "Backend Architecture Breakdown",
        description:
          "Infrastructure layout for microservices, data stores, and observability tooling.",
        type: SystemDesignType.ARCHITECTURE,
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
