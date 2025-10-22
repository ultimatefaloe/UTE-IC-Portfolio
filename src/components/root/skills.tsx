'use client';
import { ArrowRightIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import {
  FaNodeJs,
  FaReact,
  FaDocker,
  FaAws,
} from 'react-icons/fa';
import {
  SiTypescript,
  SiNextdotjs,
  SiNestjs,
  SiPostgresql,
} from 'react-icons/si';
import LinkButton from '../UI/LinkButton';
import BouncingCarousel from '../UI/bouncingCarosel';

const techStack = [
   { name: 'Next.js', icon: <SiNextdotjs className='dark:text-gray-900 text-white' /> },
  { name: 'NestJS', icon: <SiNestjs className='text-red-600' /> },
  { name: 'TypeScript', icon: <SiTypescript className='text-blue-600' /> },
  { name: 'Node.js', icon: <FaNodeJs className='text-green-600' /> },
  { name: 'React', icon: <FaReact className='text-cyan-400' /> },
  { name: 'PostgreSQL', icon: <SiPostgresql className='text-blue-500' /> },
  { name: 'Docker', icon: <FaDocker className='text-blue-400' /> },
  { name: 'AWS', icon: <FaAws className='text-orange-400' /> },
];

export default function SkillCarosel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left
  const [position, setPosition] = useState(0);

  useEffect(() => {
    let animationFrame: number;

    const animate = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;

        setPosition(prev => {
          let next = prev + direction * 2; // speed = 2px
          if (next <= 0) {
            setDirection(1); // bounce right
            next = 0;
          } else if (next >= maxScroll) {
            setDirection(-1); // bounce left
            next = maxScroll;
          }
          container.scrollLeft = next;
          return next;
        });
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [direction, position]);

  return (
    <>
      <BouncingCarousel stack={techStack} />

      <div className='flex justify-center align-middle w-full'>
        <LinkButton
          className='flex  bg-sky-400 hover:bg-sky-500'
          href='/skills'
          prefetch='auto'
        >
          View all Skills <ArrowRightIcon />
        </LinkButton>
       
      </div>
    </>
  );
}
