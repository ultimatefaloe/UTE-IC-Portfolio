'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import {
  LayoutDashboard,
  FolderOpen,
  Briefcase,
  Zap,
  BookOpen,
  Settings,
  Layers,
  FileText,
  Menu,
  X,
} from 'lucide-react';

import LogoutButton from '@/components/admin/logout-button';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/projects', label: 'Projects', icon: FolderOpen },
  { href: '/admin/experience', label: 'Experience', icon: Briefcase },
  { href: '/admin/skills', label: 'Skills', icon: Zap },
  { href: '/admin/blog', label: 'Blog', icon: BookOpen },
  { href: '/admin/services', label: 'Services', icon: Settings },
  { href: '/admin/system-design', label: 'System Design', icon: Layers },
  { href: '/admin/content', label: 'Site Copy', icon: FileText },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const NavLinks = ({ onNavigate }: { onNavigate?: () => void }) => (
    <>
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || pathname.startsWith(href + '/');
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
              active
                ? 'bg-ute-gold/10 text-ute-gold border border-ute-gold/20'
                : 'text-ute-text-muted hover:text-ute-text hover:bg-ute-surface-hi'
            }`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            {label}
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="min-h-screen bg-ute-bg text-ute-text">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-ute-border bg-ute-bg/90 backdrop-blur flex items-center px-4 md:px-6 gap-3">
        {/* Mobile hamburger */}
        <button
          className="md:hidden p-1.5 rounded text-ute-text-muted hover:text-ute-text"
          onClick={() => setSidebarOpen((v) => !v)}
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className="flex flex-1 items-center gap-3">
          <span className="font-mono text-[10px] tracking-widest uppercase text-ute-gold">UTE Admin</span>
          <span className="text-ute-border hidden sm:inline">|</span>
          <span className="text-sm text-ute-text-muted hidden sm:inline">Portfolio Control Center</span>
        </div>
        <LogoutButton />
      </header>

      <div className="flex pt-14 min-h-screen">
        {/* Desktop sidebar */}
        <aside className="hidden md:block w-52 shrink-0 border-r border-ute-border bg-ute-surface min-h-[calc(100vh-3.5rem)] p-4 space-y-1">
          <NavLinks />
        </aside>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-ute-bg/60 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Mobile sidebar drawer */}
        <aside
          className={`fixed top-14 left-0 bottom-0 z-40 w-64 border-r border-ute-border bg-ute-surface p-4 space-y-1 transition-transform duration-200 md:hidden ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <NavLinks onNavigate={() => setSidebarOpen(false)} />
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 min-h-[calc(100vh-3.5rem)] bg-ute-bg overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
