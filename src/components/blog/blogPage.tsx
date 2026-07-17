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

  const categories = ['All', ...Array.from(new Set(posts.map((p) => p.category).filter(Boolean))) as string[]];
  const filtered = activeCategory === 'All' ? posts : posts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-ute-bg">
      <section className="pt-32 pb-16 bg-ute-surface border-b border-ute-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionLabel label="Writing" title="Blog" subtitle="Technical writing on engineering, architecture, and entrepreneurship." />
        </div>
      </section>

      {categories.length > 1 && (
        <div className="sticky top-16 z-20 bg-ute-bg/90 backdrop-blur border-b border-ute-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex gap-1 py-3 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded font-mono text-xs whitespace-nowrap transition-all ${
                    activeCategory === cat
                      ? 'bg-ute-gold text-ute-bg font-medium'
                      : 'text-ute-text-muted hover:text-ute-text'
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
            <p className="text-ute-text-muted">No blog posts yet. Add them via the admin panel.</p>
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
                  className="group p-6 rounded-xl bg-ute-surface border border-ute-border hover:border-ute-gold/40 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    {post.category && (
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded border border-ute-gold/30 text-ute-gold">
                        {post.category}
                      </span>
                    )}
                    <span className="font-mono text-[10px] text-ute-text-muted">
                      {new Date(post.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <h2 className="font-playfair text-xl font-bold text-ute-text group-hover:text-ute-gold transition-colors mb-3">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-sm text-ute-text-muted leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
                  )}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-xs text-ute-electric hover:gap-4 transition-all"
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
