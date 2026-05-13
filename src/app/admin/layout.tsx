import Link from "next/link";
import type { ReactNode } from "react";

import LogoutButton from "@/components/admin/logout-button";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/system-design", label: "System Design" },
  { href: "/admin/content", label: "Site Copy" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-950 text-sky-100">
      <div className="border-b border-gray-800 bg-gray-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-sm uppercase text-sky-400">Admin CMS</p>
            <h1 className="text-lg font-semibold">Portfolio Control Center</h1>
          </div>
          <LogoutButton />
        </div>
      </div>
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-8 md:grid-cols-[200px_1fr]">
        <aside className="space-y-2">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md border border-gray-800 px-3 py-2 text-sm text-sky-100/80 transition hover:border-sky-400 hover:text-sky-100"
            >
              {item.label}
            </Link>
          ))}
        </aside>
        <main className="min-h-[70vh] rounded-xl border border-gray-800 bg-gray-900/40 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
