"use client";
import { useEffect, useRef, useState } from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaNodeJs,
  FaReact,
  FaDocker,
  FaAws,
} from "react-icons/fa";
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
} from "react-icons/si";

const techStack = [
  { name: "HTML5", icon: <FaHtml5 className="text-orange-500" /> },
  { name: "CSS3", icon: <FaCss3Alt className="text-blue-500" /> },
  { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-blue-600" /> },
  { name: "PHP", icon: <SiPhp className="text-indigo-600" /> },
  { name: "Python", icon: <SiPython className="text-yellow-300" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-green-600" /> },
  { name: "React", icon: <FaReact className="text-cyan-400" /> },
  {
    name: "Next.js",
    icon: <SiNextdotjs className="text-gray-900 dark:text-white" />,
  },
  {
    name: "Express.js",
    icon: <SiExpress className="text-gray-600 dark:text-gray-200" />,
  },
  { name: "Nest.js", icon: <SiNestjs className="text-red-600" /> },
  { name: "Laravel", icon: <SiLaravel className="text-red-500" /> },
];

const devops = [
  { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
  { name: "Postgres", icon: <SiPostgresql className="text-blue-500" /> },
  { name: "MySQL", icon: <SiMysql className="text-sky-600" /> },
  { name: "Docker", icon: <FaDocker className="text-blue-400" /> },
  { name: "AWS", icon: <FaAws className="text-orange-400" /> },
  { name: "ECS", icon: <FaAws className="text-orange-400" /> },
  { name: "Render", icon: <SiRender className="text-purple-500" /> },
  { name: "Hostinger", icon: <SiHostinger className="text-purple-700" /> },
  { name: "Vercel", icon: <SiVercel className="text-black dark:text-white" /> },
];

export default function BouncingCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left
  const [position, setPosition] = useState(0);

  useEffect(() => {
    let animationFrame: number;

    const animate = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;

        setPosition((prev) => {
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
      <div className="relative flex justify-center w-full py-4 overflow-hidden">
        <div
          ref={containerRef}
          className="flex gap-6 px-6 overflow-x-hidden scrollbar-hide"
        >
          {techStack.map((tech, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center min-w-[80px] p-4 rounded-lg shadow-md bg-sky-900 dark:bg-sky-100"
            >
              <div className="text-4xl mb-2">{tech.icon}</div>
              <span className="text-sm text-gray-100 dark:text-gray-900">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="relative flex justify-center w-full py-4 overflow-hidden">
        <div
          ref={containerRef}
          className="flex gap-6 px-6 overflow-x-hidden scrollbar-hide"
        >
          {devops.map((tech, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center min-w-[80px] p-4 rounded-lg shadow-md bg-sky-900 dark:bg-sky-100"
            >
              <div className="text-4xl mb-2">{tech.icon}</div>
              <span className={`text-sm text-gray-100 dark:text-gray-900`}>
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
