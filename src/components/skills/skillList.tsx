'use client';
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaNodeJs,
  FaReact,
  FaDocker,
  FaAws,
} from 'react-icons/fa';
import {
  SiTypescript,
  SiPhp,
  SiPython,
  SiNextdotjs,
  SiExpress,
  SiNestjs,
  SiLaravel,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiRender,
  SiHostinger,
  SiVercel,
} from 'react-icons/si';
import BouncingCarousel from '../UI/bouncingCarosel';

const stack1 = [
  { name: 'HTML5', icon: <FaHtml5 className='text-orange-500' /> },
  { name: 'CSS3', icon: <FaCss3Alt className='text-blue-500' /> },
  { name: 'JavaScript', icon: <FaJs className='text-yellow-400' /> },
  { name: 'TypeScript', icon: <SiTypescript className='text-blue-600' /> },
  { name: 'PHP', icon: <SiPhp className='text-indigo-600' /> },
  { name: 'Python', icon: <SiPython className='text-yellow-300' /> },
  { name: 'Node.js', icon: <FaNodeJs className='text-green-600' /> },
  { name: 'React', icon: <FaReact className='text-cyan-400' /> },
  {
    name: 'Next.js',
    icon: <SiNextdotjs className='text-gray-900 dark:text-white' />,
  },
];
const stack2 = [
  {
    name: 'Express.js',
    icon: <SiExpress className='text-gray-600 dark:text-gray-200' />,
  },
  { name: 'Nest.js', icon: <SiNestjs className='text-red-600' /> },
  { name: 'Laravel', icon: <SiLaravel className='text-red-500' /> },
  { name: 'MongoDB', icon: <SiMongodb className='text-green-500' /> },
  { name: 'Postgres', icon: <SiPostgresql className='text-blue-500' /> },
  { name: 'MySQL', icon: <SiMysql className='text-sky-600' /> },
  { name: 'Docker', icon: <FaDocker className='text-blue-400' /> },
  { name: 'AWS', icon: <FaAws className='text-orange-400' /> },
  { name: 'ECS', icon: <FaAws className='text-orange-400' /> },
  { name: 'Render', icon: <SiRender className='text-purple-500' /> },
  { name: 'Hostinger', icon: <SiHostinger className='text-purple-700' /> },
  { name: 'Vercel', icon: <SiVercel className='text-black dark:text-white' /> },
];

const SkillList = () => {
  return (
    <div className='rounded-2xl shadow-md shadow-gray-400 dark:shadow-gray-800 bg-white dark:bg-sky-950 p-6 md:p-8 space-y-6 transition-colors duration-300'>
      <BouncingCarousel stack={stack1} />
      <BouncingCarousel stack={stack2} />
    </div>
  );
};

export default SkillList;
