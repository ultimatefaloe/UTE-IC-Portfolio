'use client';

import Link from 'next/link';
import { FolderOpen, Briefcase, Zap, BookOpen, Settings, Layers, FileText } from 'lucide-react';

const sections = [
  { href: '/admin/projects', label: 'Projects', desc: 'Engineering case studies', icon: FolderOpen },
  { href: '/admin/experience', label: 'Experience', desc: 'Career timeline', icon: Briefcase },
  { href: '/admin/skills', label: 'Skills', desc: 'Skill matrix', icon: Zap },
  { href: '/admin/blog', label: 'Blog', desc: 'Technical writing', icon: BookOpen },
  { href: '/admin/services', label: 'Services', desc: 'Offerings', icon: Settings },
  { href: '/admin/system-design', label: 'System Design', desc: 'Architecture breakdowns', icon: Layers },
  { href: '/admin/content', label: 'Site Copy', desc: 'Hero + About copy', icon: FileText },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-playfair text-2xl font-bold text-ute-text">Dashboard</h2>
        <p className="mt-1 text-sm text-ute-text-muted">
          Manage content across the portfolio — every section is CMS-driven.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sections.map(({ href, label, desc, icon: Icon }) => (
          <Link key={href} href={href} className="group block">
            <div className="rounded-xl border border-ute-border bg-ute-surface p-6 transition-all hover:border-ute-gold/40 hover:bg-ute-surface-hi">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-ute-gold/10 group-hover:bg-ute-gold/20 transition-colors">
                <Icon className="h-5 w-5 text-ute-gold" />
              </div>
              <h3 className="font-semibold text-ute-text group-hover:text-ute-gold transition-colors">
                {label}
              </h3>
              <p className="mt-1 text-sm text-ute-text-muted">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
