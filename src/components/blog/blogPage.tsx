"use client";

import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  Search,
  TrendingUp,
  BookOpen,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '../UI/button';
import Image from 'next/image';

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const postsPerPage = 6;

  const blogPosts = [
    {
      id: 1,
      title: "Building Scalable APIs with NestJS: A Practical Guide",
      excerpt: "Learn how to structure your NestJS application for maximum scalability and maintainability. This guide covers modules, services, and best practices.",
      content: "Detailed walkthrough of building production-ready APIs...",
      author: "Tunmise Falodun",
      date: "2025-10-15",
      readTime: "8 min read",
      category: "Backend",
      tags: ["NestJS", "TypeScript", "API Design"],
      featured: true,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"
    },
    {
      id: 2,
      title: "React Performance Optimization: Tips from the Trenches",
      excerpt: "Real-world strategies for optimizing React applications. From memo to useMemo, learn when and how to use each technique effectively.",
      content: "Performance optimization techniques...",
      author: "Tunmise Falodun",
      date: "2025-10-10",
      readTime: "6 min read",
      category: "Frontend",
      tags: ["React", "Performance", "JavaScript"],
      featured: true,
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80"
    },
    {
      id: 3,
      title: "Database Design Patterns for Modern Applications",
      excerpt: "Exploring PostgreSQL optimization techniques and schema design patterns that scale with your application's growth.",
      content: "Database design best practices...",
      author: "Tunmise Falodun",
      date: "2025-10-05",
      readTime: "10 min read",
      category: "Backend",
      tags: ["PostgreSQL", "Database", "Architecture"],
      featured: false,
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80"
    },
    {
      id: 4,
      title: "Leading a Remote Development Team: Lessons Learned",
      excerpt: "Insights from leading distributed teams across time zones. Communication strategies, tools, and maintaining team culture remotely.",
      content: "Remote team leadership insights...",
      author: "Tunmise Falodun",
      date: "2025-09-28",
      readTime: "7 min read",
      category: "Leadership",
      tags: ["Team Management", "Remote Work", "Leadership"],
      featured: false,
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
    },
    {
      id: 5,
      title: "Docker and CI/CD: Streamlining Your Deployment Pipeline",
      excerpt: "Step-by-step guide to containerizing your applications and setting up automated deployment pipelines with GitHub Actions.",
      content: "DevOps automation guide...",
      author: "Tunmise Falodun",
      date: "2025-09-20",
      readTime: "12 min read",
      category: "DevOps",
      tags: ["Docker", "CI/CD", "Automation"],
      featured: true,
      image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=80"
    },
    {
      id: 6,
      title: "TypeScript: Beyond the Basics",
      excerpt: "Advanced TypeScript patterns and techniques for building type-safe applications. Generics, utility types, and more.",
      content: "Advanced TypeScript techniques...",
      author: "Tunmise Falodun",
      date: "2025-09-15",
      readTime: "9 min read",
      category: "Frontend",
      tags: ["TypeScript", "JavaScript", "Web Development"],
      featured: false,
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80"
    },
    {
      id: 7,
      title: "Building Real-Time Features with WebSockets",
      excerpt: "Implementing real-time notifications and live updates in your web applications using WebSockets and Socket.io.",
      content: "Real-time application development...",
      author: "Tunmise Falodun",
      date: "2025-09-08",
      readTime: "11 min read",
      category: "Backend",
      tags: ["WebSockets", "Real-time", "Node.js"],
      featured: false,
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80"
    },
    {
      id: 8,
      title: "Mentoring Junior Developers: A Guide for Team Leads",
      excerpt: "Practical advice on mentoring junior developers, from code reviews to career guidance. Building the next generation of engineers.",
      content: "Developer mentorship strategies...",
      author: "Tunmise Falodun",
      date: "2025-09-01",
      readTime: "8 min read",
      category: "Leadership",
      tags: ["Mentorship", "Career Development", "Team Building"],
      featured: false,
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80"
    }
  ];

  const categories = ['All', 'Backend', 'Frontend', 'DevOps', 'Leadership'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

  const featuredPost = blogPosts.find(post => post.featured);

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
                  <Image 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-sky-400 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full">
                      {featuredPost.category}
                    </span>
                    <div className="flex items-center gap-4 text-sm text-sky-900/70 dark:text-sky-100/70">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-sky-900 dark:text-sky-100 mb-4 group-hover:text-sky-400 transition-colors">
                    {featuredPost.title}
                  </h3>
                  <p className="text-sky-900/80 dark:text-sky-100/80 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
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

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentPosts.map((post) => (
            <div
              key={post.id}
              className="bg-linear-to-br from-gray-300/50 to-gray-350/50 dark:from-gray-800/50 dark:to-gray-850/50 rounded-xl overflow-hidden border border-gray-700 hover:border-sky-400 transition-all duration-300 group hover:shadow-lg hover:shadow-sky-400/10"
            >
              <div className="aspect-video overflow-hidden">
                <Image 
                  src={post.image} 
                  alt={post.title}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs bg-sky-400/10 text-sky-400 px-2 py-1 rounded border border-sky-400/20">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-sky-900/70 dark:text-sky-100/70">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-sky-900 dark:text-sky-100 mb-3 group-hover:text-sky-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-sky-900/80 dark:text-sky-100/80 mb-4 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div className="flex items-center gap-1 text-xs text-sky-900/70 dark:text-sky-100/70">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                  <Button className="text-sm text-sky-400 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
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