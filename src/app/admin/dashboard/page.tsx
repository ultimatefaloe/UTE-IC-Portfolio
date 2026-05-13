"use client";

import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sections = [
  { href: "/admin/projects", label: "Projects", desc: "Engineering case studies" },
  { href: "/admin/experience", label: "Experience", desc: "Career timeline" },
  { href: "/admin/skills", label: "Skills", desc: "Skill matrix" },
  { href: "/admin/blog", label: "Blog", desc: "Technical writing" },
  { href: "/admin/services", label: "Services", desc: "Offerings" },
  { href: "/admin/system-design", label: "System Design", desc: "Architecture breakdowns" },
  { href: "/admin/content", label: "Site Copy", desc: "Hero + About copy" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-sky-100">Dashboard</h2>
        <p className="text-sm text-sky-100/60">
          Manage content across the portfolio and keep everything CMS-driven.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {sections.map(section => (
          <Link key={section.href} href={section.href}>
            <Card className="transition hover:border-sky-400">
              <CardHeader>
                <CardTitle>{section.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-sky-100/60">{section.desc}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
