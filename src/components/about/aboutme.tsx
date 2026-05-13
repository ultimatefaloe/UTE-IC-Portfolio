'use client';

import React, { useEffect, useState } from 'react';
import { Download, Code2, Sparkles } from 'lucide-react';
import LinkButton from '../ui/LinkButton';

type ContentBlock = {
  title: string;
  subtitle?: string | null;
  description?: string | null;
  body?: string | null;
};

export default function AboutMe() {
  const [about, setAbout] = useState<ContentBlock | null>(null);

  useEffect(() => {
    const loadAbout = async () => {
      const response = await fetch('/api/content/about', { cache: 'no-store' });
      if (!response.ok) return;
      const data = await response.json();
      setAbout(data);
    };

    loadAbout();
  }, []);

  const cv_link: string =
    process.env.NEXT_PUBLIC_CV_LINK ??
    'https://drive.google.com/file/d/1ZA3nVpSSHsCdS9rc4xL6XMoJPiNEkztX/view?usp=drive_link';

  return (
    <div className='min-h-screen py-20 px-6'>
      <div className='max-w-6xl mx-auto'>
        {/* Hero Section */}
        <div className='grid lg:grid-cols-2 gap-12 items-center mb-24'>
          <div className='space-y-6'>
            <div className='inline-block'>
              <span className='text-sky-400 font-semibold text-sm uppercase tracking-wider'>
                {about?.subtitle ?? 'Backend-focused Engineer'}
              </span>
            </div>
            <h1 className='text-5xl lg:text-6xl font-bold text-sky-900 dark:text-sky-100 leading-tight'>
              {about?.title ?? "Backend-focused Software Engineer"}
            </h1>
            <p className='text-lg text-sky-900/80 dark:text-sky-100/80 leading-relaxed'>
              {about?.description ?? ''}
            </p>
            <div className='flex gap-4 pt-4'>
              <LinkButton
                href={cv_link}
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
            {(about?.body ?? '').split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
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
              href={cv_link}
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
