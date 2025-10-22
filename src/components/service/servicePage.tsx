'use client';

import React, { useState } from 'react';
import {
  Code2,
  Server,
  Layout,
  Cloud,
  Users,
  CheckCircle2,
  ArrowRight,
  Zap,
  Shield,
  Layers,
} from 'lucide-react';
import { Button } from '../UI/button';

export default function ServicesPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const services = [
    {
      icon: <Layers className='w-8 h-8' />,
      title: 'Full Stack Web Development',
      description:
        'End-to-end web app development using modern frameworks and tools.',
      details: [
        'Complete MERN/PERN stack applications',
        'Database design and optimization',
        'RESTful and GraphQL API integration',
        'Real-time features with WebSockets',
        'Authentication and authorization systems',
      ],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'MongoDB', 'TypeScript'],
      deliverables: 'Fully functional, tested, and deployed web application',
      timeline: '4-12 weeks',
    },
    {
      icon: <Server className='w-8 h-8' />,
      title: 'Backend Architecture',
      description:
        'Building secure, scalable, and high-performance APIs with NestJS or Express.',
      details: [
        'Microservices architecture design',
        'Scalable API development',
        'Database schema design and migrations',
        'Rate limiting and security implementations',
        'API documentation with Swagger/OpenAPI',
      ],
      technologies: ['NestJS', 'Express', 'PostgreSQL', 'Redis', 'Docker'],
      deliverables: 'Production-ready backend with comprehensive documentation',
      timeline: '3-8 weeks',
    },
    {
      icon: <Layout className='w-8 h-8' />,
      title: 'Frontend Development',
      description:
        'Creating responsive, accessible interfaces with React and Next.js.',
      details: [
        'Modern, responsive UI/UX implementation',
        'Component-driven architecture',
        'State management (Redux, Zustand, Context)',
        'Performance optimization and code splitting',
        'Accessibility (WCAG) compliance',
      ],
      technologies: ['React', 'Next.js', 'TailwindCSS', 'TypeScript', 'Redux'],
      deliverables: 'Pixel-perfect, responsive frontend application',
      timeline: '2-6 weeks',
    },
    {
      icon: <Cloud className='w-8 h-8' />,
      title: 'DevOps & Deployment',
      description:
        'Dockerized environments, CI/CD pipelines, and cloud-based deployment setups.',
      details: [
        'Docker containerization',
        'CI/CD pipeline setup (GitHub Actions, GitLab CI)',
        'Cloud deployment (AWS, DigitalOcean, Vercel)',
        'Monitoring and logging setup',
        'Infrastructure as Code (Terraform)',
      ],
      technologies: ['Docker', 'GitHub Actions', 'AWS', 'Nginx', 'Linux'],
      deliverables: 'Automated deployment pipeline with monitoring',
      timeline: '1-3 weeks',
    },
    {
      icon: <Users className='w-8 h-8' />,
      title: 'Technical Mentorship',
      description:
        'Guiding junior developers and teams through best practices and system design.',
      details: [
        'Code review and feedback sessions',
        'Architecture and design pattern guidance',
        'Best practices in testing and documentation',
        'Career development and technical roadmaps',
        'Team workflow optimization',
      ],
      technologies: ['Agile', 'Git', 'System Design', 'Clean Code', 'Testing'],
      deliverables: 'Structured learning plan with regular progress reviews',
      timeline: 'Ongoing',
    },
  ];

  const approach = [
    {
      icon: <Code2 className='w-6 h-6' />,
      title: 'Clean Code',
      description:
        'Maintainable, well-documented code that scales with your business',
    },
    {
      icon: <Zap className='w-6 h-6' />,
      title: 'Clear Communication',
      description:
        'Regular updates, transparent timelines, and collaborative decision-making',
    },
    {
      icon: <Shield className='w-6 h-6' />,
      title: 'Consistent Results',
      description:
        'Reliable delivery with attention to quality, security, and performance',
    },
  ];

  const phases = [
    {
      step: '01',
      title: 'Discovery',
      desc: 'Understanding your needs and project requirements',
    },
    {
      step: '02',
      title: 'Planning',
      desc: 'Creating roadmap, timeline, and technical specifications',
    },
    {
      step: '03',
      title: 'Development',
      desc: 'Building your solution with regular progress updates',
    },
    {
      step: '04',
      title: 'Delivery',
      desc: 'Deployment, testing, and ongoing support',
    },
  ];
  console.log(hoveredIndex)
  return (
    <div className='min-h-screen py-20 px-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-16'>
          <div className='inline-block mb-4'>
            <span className='text-sky-400 font-semibold text-sm uppercase tracking-wider'>
              What I Offer
            </span>
          </div>
          <h1 className='text-5xl font-bold text-sky-900 dark:text-sky-100 mb-6'>
            Services
          </h1>
          <p className='text-lg text-sky-900/80 dark:text-sky-100/80 max-w-3xl mx-auto leading-relaxed'>
            As a software engineer and creative technologist, I help teams and
            individuals turn ideas into fully functional digital products.
          </p>
        </div>

        {/* Services Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20'>
          {services.map((service, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className='group relative overflow-hidden rounded-2xl border border-gray-700 bg-linear-to-br from-gray-300 to-gray-350 p-8 shadow-md transition-all duration-500 hover:border-sky-400 hover:shadow-2xl hover:shadow-sky-400/10 dark:from-gray-900 dark:to-gray-950'
            >
              {/* Glow effect on hover */}
              <div className='absolute inset-0 opacity-0 group-hover:opacity-100 bg-linear-to-br from-sky-400/10 via-transparent to-transparent transition-opacity duration-500 pointer-events-none' />

              {/* Icon & Title */}
              <div className='flex items-start gap-4 mb-8 relative z-10'>
                <div className='p-4 bg-sky-400/10 rounded-xl text-sky-400 group-hover:bg-sky-400 group-hover:text-gray-900 transition-all duration-300 shadow-inner'>
                  {service.icon}
                </div>
                <div className='flex-1'>
                  <h3 className='text-2xl font-extrabold text-sky-900 dark:text-sky-100 mb-2 group-hover:text-sky-400 transition-colors'>
                    {service.title}
                  </h3>
                  <p className='text-sky-900/80 dark:text-sky-100/80 leading-relaxed'>
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className='mb-6 relative z-10'>
                <h4 className='text-sm font-semibold text-sky-900 dark:text-sky-100 mb-3 uppercase tracking-wider'>
                  {"What's Included"}
                </h4>
                <ul className='space-y-2'>
                  {service.details.map((detail, detailIndex) => (
                    <li
                      key={detailIndex}
                      className='flex items-start gap-2 text-sm text-sky-900/90 dark:text-sky-100/90'
                    >
                      <CheckCircle2 className='w-4 h-4 text-sky-400 shrink-0 mt-0.5' />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className='mb-8 relative z-10'>
                <h4 className='text-sm font-semibold text-sky-900 dark:text-sky-100 mb-3 uppercase tracking-wider'>
                  Technologies
                </h4>
                <div className='flex flex-wrap gap-2'>
                  {service.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className='text-xs bg-sky-400/10 text-sky-400 px-3 py-1.5 rounded-full border border-sky-400/20 hover:bg-sky-400/20 transition-colors'
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Meta Info */}
              <div className='pt-6 border-t border-gray-700 relative z-10 space-y-3'>
                <div className='flex justify-between text-sm'>
                  <span className='text-sky-900/70 dark:text-sky-100/70'>
                    Deliverable:
                  </span>
                  <span className='text-sky-900 dark:text-sky-100 font-medium'>
                    {service.deliverables}
                  </span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-sky-900/70 dark:text-sky-100/70'>
                    Timeline:
                  </span>
                  <span className='text-sky-400 font-semibold'>
                    {service.timeline}
                  </span>
                </div>
              </div>

              {/* CTA */}
              <Button className='w-full mt-8 flex items-center justify-center gap-2 bg-sky-400/10 hover:bg-sky-400 text-sky-400 hover:text-gray-900 font-semibold py-3 rounded-xl transition-all duration-300 group-hover:shadow-lg group-hover:shadow-sky-400/20'>
                <span>Learn More</span>
                <ArrowRight className='w-4 h-4 transform group-hover:translate-x-1 transition-transform' />
              </Button>
            </div>
          ))}
        </div>

        {/* Approach Section */}
        <div className='mb-20'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-sky-900 dark:text-sky-100 mb-4'>
              My Approach
            </h2>
            <p className='text-lg text-sky-900/80 dark:text-sky-100/80'>
              Simple principles that drive exceptional results
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {approach.map((item, index) => (
              <div
                key={index}
                className='bg-linear-to-br from-sky-400/10 to-cyan-500/10 rounded-xl p-6 border border-sky-400/20 text-center transform hover:scale-105 transition-all duration-300'
              >
                <div className='inline-flex items-center justify-center w-14 h-14 bg-sky-400/20 rounded-full text-sky-400 mb-4'>
                  {item.icon}
                </div>
                <h3 className='text-xl font-bold text-sky-900 dark:text-sky-100 mb-2'>
                  {item.title}
                </h3>
                <p className='text-sm text-sky-900/80 dark:text-sky-100/80'>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Process Timeline */}
        <div className='mb-20'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-sky-900 dark:text-sky-100 mb-4'>
              {"How We'll Work Together"}
            </h2>
            <p className='text-lg text-sky-900/80 dark:text-sky-100/80'>
              A streamlined process from concept to launch
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
            {phases.map((phase, index) => (
              <div key={index} className='relative'>
                <div className='text-center'>
                  <div className='text-5xl font-bold text-sky-400/20 mb-2'>
                    {phase.step}
                  </div>
                  <h4 className='text-lg font-bold text-sky-900 dark:text-sky-100 mb-2'>
                    {phase.title}
                  </h4>
                  <p className='text-sm text-sky-900/70 dark:text-sky-100/70'>
                    {phase.desc}
                  </p>
                </div>
                {index < 3 && (
                  <div className='hidden md:block absolute top-8 left-full w-full h-0.5 bg-linear-to-r from-sky-400 to-transparent -z-10'></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className='text-center'>
          <div className='inline-block bg-linear-to-r from-sky-400/10 to-cyan-500/10 rounded-2xl p-10 border border-sky-400/20'>
            <h3 className='text-3xl font-bold text-sky-900 dark:text-sky-100 mb-4'>
              Ready to Start Your Project?
            </h3>
            <p className='text-sky-900/80 dark:text-sky-100/80 mb-8 max-w-2xl mx-auto'>
              {"Let's discuss how I can help bring your vision to life with modern technology and proven development practices."}
            </p>
            <div className='flex gap-4 justify-center flex-wrap'>
              <Button className='bg-sky-400 hover:bg-sky-500 text-gray-900 font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2'>
                <span>Schedule a Call</span>
                <ArrowRight className='w-5 h-5' />
              </Button>
              <Button className='border-2 border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-gray-900 font-semibold px-8 py-4 rounded-lg transition-all duration-300'>
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
