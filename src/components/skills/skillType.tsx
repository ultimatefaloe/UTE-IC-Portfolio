'use client';

import CircularProgress from './components/circularPercentage';
import SkillList from './skillList';

// 🧩 Technical Skills
const technicalSkills = [
  { name: 'JavaScript (ES6+)', percentage: 90 },
  { name: 'TypeScript', percentage: 88 },
  { name: 'Node.js', percentage: 86 },
  { name: 'NestJS', percentage: 85 },
  { name: 'Express.js', percentage: 83 },
  { name: 'React.js', percentage: 82 },
  { name: 'Next.js', percentage: 84 },
  { name: 'PostgreSQL', percentage: 80 },
  { name: 'MongoDB', percentage: 78 },
  { name: 'MySQL', percentage: 75 },
  { name: 'Prisma ORM', percentage: 76 },
  { name: 'Docker', percentage: 72 },
  { name: 'AWS (EC2, S3, Lambda)', percentage: 68 },
  { name: 'Firebase', percentage: 70 },
  { name: 'Redis (Upstash)', percentage: 65 },
  { name: 'Tailwind CSS', percentage: 82 },
  { name: 'Radix UI', percentage: 72 },
  { name: 'Zustand', percentage: 70 },
  { name: 'RESTful API Development', percentage: 90 },
  { name: 'CI/CD Pipelines', percentage: 68 },
  { name: 'Python', percentage: 55 },
  { name: 'PHP', percentage: 45 },
  { name: 'Laravel', percentage: 43 },
  { name: 'Git & GitHub', percentage: 87 },
  { name: 'Testing (Jest, Postman, Swagger)', percentage: 75 },
  { name: 'Nginx & Server Management', percentage: 60 },
  { name: 'System Design & Architecture', percentage: 77 },
];

const professionalSkills = [
  { name: 'Leadership & Team Management', percentage: 95 },
  { name: 'Communication', percentage: 90 },
  { name: 'Problem Solving', percentage: 88 },
  { name: 'Project Management (Agile/Scrum)', percentage: 85 },
  { name: 'Collaboration & Mentorship', percentage: 83 },
  { name: 'Adaptability & Continuous Learning', percentage: 80 },
  { name: 'Creativity & Innovation', percentage: 78 },
  { name: 'Time Management', percentage: 82 },
  { name: 'Critical Thinking', percentage: 84 },
];

const SkillType = () => {
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

        {/* Professional Skills */}
        <div className=' my-8'>
          <h2 className='text-3xl mt-4 font-bold mb-12 text-sky-900 dark:text-sky-100'>
            Professional Skills
          </h2>
          <div className='grid grid-cols-3 gap-4 sm:grid-cols-4 sm:gap-2'>
            {professionalSkills.map((skill, index) => (
              <CircularProgress
                key={index}
                percentage={skill.percentage}
                label={skill.name}
              />
            ))}
          </div>
        </div>

        <SkillList />

        {/* Technical Skills */}
        <div className='mt-8'>
          <h2 className='text-3xl font-bold mb-12 text-sky-900 dark:text-sky-100'>
            Technical Skills
          </h2>
          <div className='space-y-8'>
            {technicalSkills.map((skill, index) => (
              <div key={index}>
                <div className='flex justify-between mb-2'>
                  <span className='text-sky-900 dark:text-sky-100 font-medium'>
                    {skill.name}
                  </span>
                  <span className='text-sky-900 dark:text-sky-100'>
                    {skill.percentage}%
                  </span>
                </div>
                <div className='w-full h-2 bg-gray-700 rounded-full overflow-hidden'>
                  <div
                    className='h-full bg-sky-400 rounded-full transition-all duration-1000 ease-out'
                    style={{ width: `${skill.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillType;
