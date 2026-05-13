'use client';
import { useEffect, useMemo, useState } from 'react';
import { Code2 } from 'lucide-react';
import BouncingCarousel from '../ui/bouncingCarosel';

type Skill = {
  id: string;
  name: string;
  category: string;
  level: number;
};

const SkillList = () => {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const loadSkills = async () => {
      const response = await fetch('/api/skills', { cache: 'no-store' });
      const data = await response.json();
      setSkills(data);
    };

    loadSkills();
  }, []);

  const stacks = useMemo(() => {
    const items = skills.map(skill => ({
      name: skill.name,
      icon: <Code2 className='text-sky-400' />,
    }));
    const midpoint = Math.ceil(items.length / 2);
    return [items.slice(0, midpoint), items.slice(midpoint)];
  }, [skills]);

  return (
    <div className='rounded-2xl shadow-md shadow-gray-400 dark:shadow-gray-800 bg-white dark:bg-sky-950 p-6 md:p-8 space-y-6 transition-colors duration-300'>
      {stacks.map((stack, index) => (
        <BouncingCarousel key={index} stack={stack} />
      ))}
    </div>
  );
};

export default SkillList;
