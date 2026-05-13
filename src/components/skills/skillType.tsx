'use client';

import { useEffect, useMemo, useState } from 'react';
import CircularProgress from './components/circularPercentage';
import SkillList from './skillList';

type Skill = {
  id: string;
  name: string;
  category: string;
  level: number;
};

const SkillType = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSkills = async () => {
      setLoading(true);
      const response = await fetch('/api/skills', { cache: 'no-store' });
      const data = await response.json();
      setSkills(data);
      setLoading(false);
    };

    loadSkills();
  }, []);

  const highlightedSkills = useMemo(
    () => [...skills].sort((a, b) => b.level - a.level).slice(0, 9),
    [skills]
  );

  const groupedSkills = useMemo(() => {
    return skills.reduce<Record<string, Skill[]>>((acc, skill) => {
      const key = skill.category || 'OTHER';
      acc[key] = acc[key] ? [...acc[key], skill] : [skill];
      return acc;
    }, {});
  }, [skills]);
  return (
    <div className='p-8'>
      <div className='max-w-7xl mx-auto'>

        <div className='text-center py-16 px-6 rounded-2xl bg-linear-to-br from-gray-400/10 to-cyan-500/10 border border-gray-400/20'>
          <h1 className='text-3xl md:text-4xl font-bold mb-4 text-sky-700 dark:text-sky-400'>
            My Skill Set
          </h1>
          <p className='max-w-2xl mx-auto text-gray-600 dark:text-gray-300 leading-relaxed'>
            Over time, I’ve developed a versatile technical stack that allows me
            to build full-scale applications — from server logic to the final
            pixel on the screen.
          </p>
        </div>

        <div className=' my-8'>
          <h2 className='text-3xl mt-4 font-bold mb-12 text-sky-900 dark:text-sky-100'>
            Highlighted Skills
          </h2>
          {loading ? (
            <p className='text-sky-900/70 dark:text-sky-100/70'>Loading skills...</p>
          ) : (
            <div className='grid grid-cols-3 gap-4 sm:grid-cols-4 sm:gap-2'>
              {highlightedSkills.map(skill => (
                <CircularProgress
                  key={skill.id}
                  percentage={skill.level}
                  label={skill.name}
                />
              ))}
            </div>
          )}
        </div>

        <SkillList />

        <div className='mt-8 space-y-12'>
          {Object.entries(groupedSkills).map(([category, items]) => (
            <div key={category}>
              <h2 className='text-3xl font-bold mb-6 text-sky-900 dark:text-sky-100'>
                {category.charAt(0) + category.slice(1).toLowerCase()} Skills
              </h2>
              <div className='space-y-6'>
                {items.map(skill => (
                  <div key={skill.id}>
                    <div className='flex justify-between mb-2'>
                      <span className='text-sky-900 dark:text-sky-100 font-medium'>
                        {skill.name}
                      </span>
                      <span className='text-sky-900 dark:text-sky-100'>
                        {skill.level}%
                      </span>
                    </div>
                    <div className='w-full h-2 bg-gray-700 rounded-full overflow-hidden'>
                      <div
                        className='h-full bg-sky-400 rounded-full transition-all duration-1000 ease-out'
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillType;
