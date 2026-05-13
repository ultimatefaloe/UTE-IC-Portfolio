'use client';
import { ArrowRightIcon, Code2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import LinkButton from '../ui/LinkButton';
import BouncingCarousel from '../ui/bouncingCarosel';

type Skill = {
  id: string;
  name: string;
  category: string;
  level: number;
};

export default function SkillCarosel() {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const loadSkills = async () => {
      const response = await fetch('/api/skills', { cache: 'no-store' });
      const data = await response.json();
      setSkills(data);
    };

    loadSkills();
  }, []);

  const techStack = useMemo(
    () =>
      skills.map(skill => ({
        name: skill.name,
        icon: <Code2 className='text-sky-400' />,
      })),
    [skills]
  );

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
