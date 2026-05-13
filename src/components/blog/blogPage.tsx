"use client";

import React, { useEffect, useMemo, useState } from 'react';
import {
  Calendar,
  Clock,
  ArrowRight,
  Search,
  TrendingUp,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '../ui/button';

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  tags: string[];
  published: boolean;
  createdAt: string;
};

const createExcerpt = (content: string) => {
  const words = content.split(' ').slice(0, 28).join(' ');
  return `${words}${content.split(' ').length > 28 ? '…' : ''}`;
};

const estimateReadTime = (content: string) => {
  const words = content.split(' ').filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
};

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const postsPerPage = 6;

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const response = await fetch('/api/blog', { cache: 'no-store' });
      const data = await response.json();
      setBlogPosts(data);
      setLoading(false);
    };

    loadPosts();
  }, []);

  const categories = useMemo(() => {
    const tagSet = new Set<string>();
    blogPosts.forEach(post => post.tags.forEach(tag => tagSet.add(tag)));
    return ['All', ...Array.from(tagSet)];
  }, [blogPosts]);

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory =
      selectedCategory === 'All' || post.tags.includes(selectedCategory);
    const excerpt = createExcerpt(post.content);
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const featuredPost = blogPosts[0];

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-sky-400 font-semibold text-sm uppercase tracking-wider">
              Articles & Insights
            </span>
          </div>
          <h1 className="text-5xl font-bold text-sky-900 dark:text-sky-100 mb-6">
            Blog
          </h1>
          <p className="text-lg text-sky-900/80 dark:text-sky-100/80 max-w-3xl mx-auto leading-relaxed mb-4">
            Welcome to my blog, where I share tutorials, project breakdowns, and personal insights about software development, teamwork, and tech trends.
          </p>
          <p className="text-sky-900/80 dark:text-sky-100/80 max-w-3xl mx-auto leading-relaxed">
            Expect deep dives into real-world coding challenges, guides on building scalable systems, and reflections on growth as a developer. My aim is to simplify complex concepts and make software engineering more approachable, one post at a time.
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-sky-400" />
              <h2 className="text-2xl font-bold text-sky-900 dark:text-sky-100">Featured Article</h2>
            </div>
            <div className="bg-linear-to-br from-gray-300/50 to-gray-350/50 dark:from-gray-800/50 dark:to-gray-850/50 rounded-2xl overflow-hidden border border-gray-700 hover:border-sky-400 transition-all duration-300 group">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="aspect-video md:aspect-auto overflow-hidden">
                  <div className="h-full w-full bg-linear-to-br from-sky-400/20 via-transparent to-transparent" />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-sky-400 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full">
                      {featuredPost.tags[0] ?? 'Engineering'}
                    </span>
                    <div className="flex items-center gap-4 text-sm text-sky-900/70 dark:text-sky-100/70">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(featuredPost.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{estimateReadTime(featuredPost.content)}</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-sky-900 dark:text-sky-100 mb-4 group-hover:text-sky-400 transition-colors">
                    {featuredPost.title}
                  </h3>
                  <p className="text-sky-900/80 dark:text-sky-100/80 mb-6 leading-relaxed">
                    {createExcerpt(featuredPost.content)}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredPost.tags.map((tag, index) => (
                      <span key={index} className="text-xs bg-sky-400/10 text-sky-400 px-3 py-1 rounded-full border border-sky-400/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button className="inline-flex items-center gap-2 text-sky-400 font-semibold hover:gap-3 transition-all">
                    <span>Read Article</span>
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-900/50 dark:text-sky-100/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-sky-900 dark:text-sky-100 placeholder-sky-900/50 dark:placeholder-sky-100/50 focus:outline-none focus:border-sky-400 transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-sky-400 text-gray-900'
                    : 'bg-gray-100 dark:bg-gray-800 text-sky-900 dark:text-sky-100 border border-gray-700 hover:border-sky-400'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {loading ? (
            <div className="col-span-full text-center text-sky-100/70">
              Loading posts...
            </div>
          ) : currentPosts.length === 0 ? (
            <div className="col-span-full text-center text-sky-100/70">
              No posts found.
            </div>
          ) : (
            currentPosts.map((post) => (
              <article key={post.id} className="group">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-sky-400 transition-all duration-300">
                  <div className="aspect-video overflow-hidden bg-linear-to-br from-sky-400/20 via-transparent to-transparent" />
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-sky-400/10 text-sky-400 text-xs font-semibold px-2 py-1 rounded-full">
                        {post.tags[0] ?? 'Engineering'}
                      </span>
                      <span className="text-xs text-sky-900/60 dark:text-sky-100/60">
                        <Clock className="w-3 h-3 inline mr-1" />
                        {estimateReadTime(post.content)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-sky-900 dark:text-sky-100 mb-3 group-hover:text-sky-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sky-900/80 dark:text-sky-100/80 mb-4 leading-relaxed">
                      {createExcerpt(post.content)}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-gray-200 dark:bg-gray-700 text-sky-900 dark:text-sky-100 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-sky-900/60 dark:text-sky-100/60">
                        <Calendar className="w-3 h-3 inline mr-1" />
                        <span>
                          {new Date(post.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </span>
                      <Button className="text-sky-400 font-semibold text-sm hover:text-sky-500 transition-colors inline-flex items-center gap-1">
                        Read More <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-700 text-sky-900 dark:text-sky-100 hover:border-sky-400 hover:text-sky-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {[...Array(totalPages)].map((_, index) => (
              <Button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                  currentPage === index + 1
                    ? 'bg-sky-400 text-gray-900'
                    : 'border border-gray-700 text-sky-900 dark:text-sky-100 hover:border-sky-400 hover:text-sky-400'
                }`}
              >
                {index + 1}
              </Button>
            ))}

            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-700 text-sky-900 dark:text-sky-100 hover:border-sky-400 hover:text-sky-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-20">
          <div className="bg-linear-to-r from-sky-400/10 to-cyan-500/10 rounded-2xl p-10 border border-sky-400/20 text-center">
            <BookOpen className="w-12 h-12 text-sky-400 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-sky-900 dark:text-sky-100 mb-4">
              Never Miss a Post
            </h3>
            <p className="text-sky-900/80 dark:text-sky-100/80 mb-8 max-w-2xl mx-auto">
              Subscribe to get notified when I publish new articles about software development, architecture, and tech leadership.
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-gray-100 dark:bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sky-900 dark:text-sky-100 placeholder-sky-900/50 dark:placeholder-sky-100/50 focus:outline-none focus:border-sky-400 transition-colors"
              />
              <Button className="bg-sky-400 hover:bg-sky-500 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-all duration-300 whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}