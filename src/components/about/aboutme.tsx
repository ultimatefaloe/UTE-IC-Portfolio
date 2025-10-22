'use client';

import React from 'react';
import {
  Download,
  Code2,
  Rocket,
  Users,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import LinkButton from '../UI/LinkButton';

export default function AboutMe() {
  const highlights = [
    {
      icon: <Code2 className='w-6 h-6' />,
      title: 'Full Stack Development',
      description: 'Building end-to-end solutions from database to deployment',
    },
    {
      icon: <Rocket className='w-6 h-6' />,
      title: 'Performance Optimization',
      description:
        'Crafting efficient, scalable systems that handle real-world demands',
    },
    {
      icon: <Users className='w-6 h-6' />,
      title: 'Team Leadership',
      description: 'Mentoring developers and driving collaborative innovation',
    },
    {
      icon: <BookOpen className='w-6 h-6' />,
      title: 'Knowledge Sharing',
      description: 'Contributing to open-source and writing technical content',
    },
  ];

  const values = [
    'Clean, maintainable code',
    'User-centric design',
    'Continuous learning',
    'Collaborative problem-solving',
  ];

  return (
    <div className='min-h-screen py-20 px-6'>
      <div className='max-w-6xl mx-auto'>
        {/* Hero Section */}
        <div className='grid lg:grid-cols-2 gap-12 items-center mb-24'>
          <div className='space-y-6'>
            <div className='inline-block'>
              <span className='text-sky-400 font-semibold text-sm uppercase tracking-wider'>
                Full Stack Software Engineer
              </span>
            </div>
            <h1 className='text-5xl lg:text-6xl font-bold text-sky-900 dark:text-sky-100 leading-tight'>
              {"Hi, I'm"} <span className='text-sky-400'>Tunmise Falodun</span>
            </h1>
            <p className='text-lg text-sky-900/80 dark:text-sky-100/80 leading-relaxed'>
              Building scalable systems and beautiful digital experiences that
              make a difference.
            </p>
            <div className='flex gap-4 pt-4'>
              <LinkButton
                href='https://drive.google.com/file/d/1pPAbOx9n_bOimH9VzQxBDx6i7rprzwJV/view?usp=drive_link'
                download
                className='flex bg-sky-400 hover:bg-sky-500'
              >
                <Download className='w-5 h-5' />
                Download Resume
              </LinkButton>
              <LinkButton href='/projects' className='flex'>
                View Projects
              </LinkButton>
            </div>
          </div>

          {/* Profile Image Placeholder */}
          <div className='relative'>
            <div className='relative w-full aspect-square max-w-md mx-auto'>
              <div className='absolute inset-0 bg-linear-to-br from-sky-400/20 to-cyan-500/20 rounded-2xl transform rotate-6'></div>
              <div className='relative bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center'>
                <div className='w-full h-full bg-linear-to-br from-sky-400/10 to-cyan-500/10 flex items-center justify-center'>
                  <Code2 className='w-32 h-32 text-sky-400/30' />
                </div>
              </div>
              <div className='absolute -bottom-4 -right-4 w-24 h-24 bg-sky-400 rounded-full blur-3xl opacity-30'></div>
              <div className='absolute -top-4 -left-4 w-32 h-32 bg-cyan-500 rounded-full blur-3xl opacity-20'></div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className='mb-24'>
          <h2 className='text-3xl font-bold text-sky-900 dark:text-sky-100 mb-8 flex items-center gap-3'>
            <Sparkles className='w-8 h-8 text-sky-400' />
            About Me
          </h2>
          <div className='space-y-6 text-lg text-sky-900/90 dark:text-sky-100/90 leading-relaxed'>
            <p>
            {`  I'm Tunmise Falodun, a Full Stack Software Engineer passionate
              about building scalable systems and beautiful digital experiences.
              Over the years, I've worked across backend, frontend, and
              infrastructure development, leading projects from concept to
              deployment.`}
            </p>
            <p>
              {`I'm deeply driven by solving real problems through technology,
              whether it's optimizing backend performance, crafting intuitive
              UIs, or automating workflows for efficiency. Every line of code I
              write is aimed at creating solutions that are not just functional,
              but elegant and maintainable.`}
            </p>
            <p>
            {`  Beyond coding, I'm an advocate for continuous learning and
              collaboration. I enjoy mentoring junior developers, contributing
              to open-source, and sharing lessons from my journey through
              articles and tutorials. I believe the best solutions come from
              diverse perspectives and open dialogue.`}
            </p>
            <p>
              {`My long-term goal is to build tools and platforms that empower
              people and businesses, while continuously refining my craft as a
              developer and team leader. I'm always exploring emerging
              technologies and methodologies to stay at the forefront of
              innovation.`}
            </p>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className='mb-24'>
          <h2 className='text-3xl font-bold text-sky-900 dark:text-sky-100 mb-12 text-center'>
            What I Bring to the Table
          </h2>
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {highlights.map((item, index) => (
              <div
                key={index}
                className='group p-6 rounded-xl border border-gray-700 hover:border-sky-400 transition-all duration-300 hover:shadow-lg hover:shadow-sky-400/10 hover:transform hover:scale-105'
              >
                <div className='w-12 h-12 bg-sky-400/10 rounded-lg flex items-center justify-center text-sky-400 mb-4 group-hover:bg-sky-400/20 transition-colors'>
                  {item.icon}
                </div>
                <h3 className='text-lg font-semibold text-sky-900 dark:text-sky-100 mb-2'>
                  {item.title}
                </h3>
                <p className='text-sm text-sky-900/70 dark:text-sky-100/70'>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div className='mb-24'>
          <h2 className='text-3xl font-bold text-sky-900 dark:text-sky-100 mb-8'>
            Core Values
          </h2>
          <div className='grid md:grid-cols-2 gap-4'>
            {values.map((value, index) => (
              <div
                key={index}
                className='flex items-center gap-3 p-4 rounded-lg bg-linear-to-r from-sky-400/5 to-transparent border-l-4 border-sky-400'
              >
                <div className='w-2 h-2 bg-sky-400 rounded-full'></div>
                <span className='text-lg text-sky-900 dark:text-sky-100 font-medium'>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className='text-center py-16 px-6 rounded-2xl bg-linear-to-br from-gray-400/10 to-cyan-500/10 border border-gray-400/20'>
          <h2 className='text-3xl font-bold text-sky-900 dark:text-sky-100 mb-4'>
            {"Let's Build Something Amazing Together"}
          </h2>
          <p className='text-lg text-sky-900/80 dark:text-sky-100/80 mb-8 max-w-2xl mx-auto'>
            {`Whether you're looking to collaborate on a project, need technical
            consultation, or just want to connect. I'm always open to new
            opportunities.`}
          </p>
          <div className='flex gap-4 justify-center flex-wrap'>
            <LinkButton
              href='/contact'
              prefetch='auto'
              className='flex bg-sky-400 hover:bg-sky-500'
            >
              Get In Touch
            </LinkButton>
            <LinkButton
              className='flex'
              href='https://drive.google.com/file/d/1pPAbOx9n_bOimH9VzQxBDx6i7rprzwJV/view?usp=drive_link'
              download
            >
              <Download className='w-5 h-5' />
              Resume
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}
