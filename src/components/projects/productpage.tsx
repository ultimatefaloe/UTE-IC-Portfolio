'use client';

import React, { useState } from 'react';
import {
  ExternalLink,
  Github,
  Calendar,
  Tag,
  ChevronLeft,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { Button } from '../UI/button';
import Link from 'next/link';

export default function ProjectPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 8;

  const projects = [
    {
      title: 'MeuDeliver',
      description:
        'A full delivery and logistics platform built with NestJS and React — featuring client, vendor, delivery, and admin systems. Includes real-time order tracking and a dynamic notification system.',
      technologies: [
        'NestJS',
        'React',
        'PostgreSQL',
        'Socket.io',
        'TypeScript',
      ],
      liveUrl: 'https://example.com/meudeliver',
      githubUrl: 'https://github.com/username/meudeliver',
      date: '2025',
      category: 'Full Stack',
      featured: true,
    },
    {
      title: '59Minutes Print',
      description:
        'A modern printing service MVP with Firebase authentication and backend integration for orders, products, and vendors.',
      technologies: ['Node.js', 'Firebase', 'MongoDB', 'React', 'Express'],
      liveUrl: 'https://example.com/59minutes',
      githubUrl: 'https://github.com/username/59minutes',
      date: '2024',
      category: 'Full Stack',
      featured: true,
    },
    {
      title: 'Ultimate AgroLinks',
      description:
        'A digital agriculture marketplace connecting farmers and vendors, featuring product listing, vendor analytics, and secure payment modules.',
      technologies: ['React', 'Node.js', 'Stripe', 'MongoDB', 'Redux'],
      liveUrl: 'https://example.com/agrolinks',
      githubUrl: 'https://github.com/username/agrolinks',
      date: '2024',
      category: 'E-Commerce',
      featured: true,
    },
    {
      title: 'Accessivo Web Project',
      description:
        'A team-led initiative at Accessivo — improving internal communication and productivity through a scalable, modular frontend architecture.',
      technologies: ['React', 'TypeScript', 'TailwindCSS', 'REST API'],
      liveUrl: 'https://example.com/accessivo',
      githubUrl: 'https://github.com/username/accessivo',
      date: '2025',
      category: 'Frontend',
      featured: true,
    },
    {
      title: 'E-Commerce Dashboard',
      description:
        'Admin dashboard for managing products, orders, and customer data with real-time analytics and reporting features.',
      technologies: ['React', 'Chart.js', 'Node.js', 'PostgreSQL'],
      liveUrl: 'https://example.com/dashboard',
      githubUrl: 'https://github.com/username/dashboard',
      date: '2024',
      category: 'Dashboard',
    },
    {
      title: 'Task Management System',
      description:
        'Collaborative task management tool with team workspaces, real-time updates, and project tracking capabilities.',
      technologies: ['Vue.js', 'Firebase', 'Vuex', 'TailwindCSS'],
      liveUrl: 'https://example.com/taskmanager',
      githubUrl: 'https://github.com/username/taskmanager',
      date: '2023',
      category: 'Web App',
    },
    {
      title: 'Weather Forecast App',
      description:
        'Real-time weather application with location-based forecasts, weather maps, and detailed meteorological data.',
      technologies: ['React', 'OpenWeather API', 'Leaflet', 'Redux'],
      liveUrl: 'https://example.com/weather',
      githubUrl: 'https://github.com/username/weather',
      date: '2023',
      category: 'Frontend',
    },
    {
      title: 'Social Media Analytics',
      description:
        'Analytics platform for tracking social media metrics, engagement rates, and audience insights across multiple platforms.',
      technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'D3.js'],
      liveUrl: 'https://example.com/analytics',
      githubUrl: 'https://github.com/username/analytics',
      date: '2024',
      category: 'Dashboard',
    },
    {
      title: 'Recipe Sharing Platform',
      description:
        'Community-driven recipe platform where users can share, rate, and discover culinary creations from around the world.',
      technologies: ['React', 'MongoDB', 'Express', 'Cloudinary'],
      liveUrl: 'https://example.com/recipes',
      githubUrl: 'https://github.com/username/recipes',
      date: '2023',
      category: 'Web App',
    },
  ];

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='min-h-screen py-20 px-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-16'>
          <div className='inline-block mb-4'>
            <span className='text-sky-400 font-semibold text-sm uppercase tracking-wider'>
              Portfolio
            </span>
          </div>
          <h1 className='text-5xl font-bold text-sky-900 dark:text-sky-100 mb-4'>
            Featured Projects
          </h1>
          <p className='text-lg text-sky-900/80 dark:text-sky-100/80 max-w-3xl mx-auto leading-relaxed'>
            {`A few of the projects I've worked on that showcase my technical
            versatility and problem-solving mindset. Each project reflects a mix
            of functionality, reliability, and clean user experience — built
            with maintainability and performance in mind.`}
          </p>
        </div>

        {/* Stats */}
        <div className='flex justify-center gap-8 mb-16 flex-wrap'>
          <div className='text-center'>
            <div className='text-4xl font-bold text-sky-400 mb-1'>
              {projects.length}
            </div>
            <div className='text-sm text-sky-900/70 dark:text-sky-100/70'>
              Total Projects
            </div>
          </div>
          <div className='text-center'>
            <div className='text-4xl font-bold text-sky-400 mb-1'>
              {projects.filter(p => p.featured).length}
            </div>
            <div className='text-sm text-sky-900/70 dark:text-sky-100/70'>
              Featured Work
            </div>
          </div>
          <div className='text-center'>
            <div className='text-4xl font-bold text-sky-400 mb-1'>
              {new Set(projects.map(p => p.category)).size}
            </div>
            <div className='text-sm text-sky-900/70 dark:text-sky-100/70'>
              Categories
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
          {currentProjects.map((project, index) => (
            <div
              key={index}
              className='group relative bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-950/40 dark:to-gray-900/60 
  rounded-2xl border border-sky-200 dark:border-sky-800 
  hover:border-sky-500 transition-all duration-500 overflow-hidden 
  hover:shadow-xl hover:shadow-sky-400/10 backdrop-blur-sm'
            >
              {/* Project Preview */}
              <div className='relative aspect-video bg-sky-900/80 overflow-hidden'>
                <iframe
                  src={project.liveUrl}
                  className='w-full h-full pointer-events-none scale-50 origin-top-left'
                  style={{ width: '200%', height: '200%' }}
                  title={project.title}
                  loading='lazy'
                />
                <div className='absolute inset-0 bg-linear-to-t from-sky-950/80 via-sky-900/40 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500'></div>

                {/* Featured Badge */}
                {project.featured && (
                  <div className='absolute top-3 left-3'>
                    <span className='bg-sky-400 text-gray-900 text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 shadow-md'>
                      <Layers className='w-3 h-3' />
                      Featured
                    </span>
                  </div>
                )}

                {/* Hover Links */}
                <div className='absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300'>
                  <Link
                    href={project.liveUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='bg-sky-400 text-gray-900 p-2 rounded-lg hover:bg-sky-500 transition-transform transform hover:scale-110 shadow-sm'
                    onClick={e => e.stopPropagation()}
                  >
                    <ExternalLink className='w-5 h-5' />
                  </Link>
                  {project.githubUrl && (
                    <Link
                      href={project.githubUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='bg-gray-800 text-sky-100 p-2 rounded-lg hover:bg-gray-700 transition-transform transform hover:scale-110 shadow-sm'
                      onClick={e => e.stopPropagation()}
                    >
                      <Github className='w-5 h-5' />
                    </Link>
                  )}
                </div>
              </div>

              {/* Project Info */}
              <div className='p-6 space-y-4'>
                <h3 className='text-lg font-bold text-sky-900 dark:text-sky-100 group-hover:text-sky-400 transition-colors'>
                  {project.title}
                </h3>

                <p className='text-sm text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-3'>
                  {project.description}
                </p>

                {/* Meta */}
                <div className='flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400'>
                  <div className='flex items-center gap-1'>
                    <Calendar className='w-3 h-3' />
                    <span>{project.date}</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <Tag className='w-3 h-3' />
                    <span>{project.category}</span>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className='flex flex-wrap gap-1.5'>
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className='text-xs bg-sky-400/10 text-sky-500 px-2 py-1 rounded border border-sky-400/20'
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className='text-xs text-gray-600 dark:text-gray-400 px-2 py-1'>
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className='flex items-center justify-center gap-2'>
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className='p-2 rounded-lg border border-gray-700 text-sky-900 dark:text-sky-100 hover:border-sky-400 hover:text-sky-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all'
            >
              <ChevronLeft className='w-5 h-5' />
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
              className='p-2 rounded-lg border border-gray-700 text-sky-900 dark:text-sky-100 hover:border-sky-400 hover:text-sky-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all'
            >
              <ChevronRight className='w-5 h-5' />
            </Button>
          </div>
        )}

        {/* CTA */}
        <div className='mt-20 text-center'>
          <div className='inline-block bg-linear-to-r from-sky-400/10 to-cyan-500/10 rounded-2xl p-8 border border-sky-400/20'>
            <h3 className='text-2xl font-bold text-sky-900 dark:text-sky-100 mb-3'>
              Have a Project in Mind?
            </h3>
            <p className='text-sky-900/80 dark:text-sky-100/80 mb-6 max-w-md mx-auto'>
              {`Let's collaborate and bring your ideas to life with clean code and
              thoughtful design.`}
            </p>
            <Button className='bg-sky-400 hover:bg-sky-500 text-gray-900 font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105'>
              Start a Conversation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
