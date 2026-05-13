"use client";

import { useEffect, useRef, useState } from "react";

interface StackList {
  icon: React.ReactNode;
  name: string
}

interface Props {
  stack: StackList[];
}

const BouncingCarousel: React.FC<Props> = ({ stack }) => {
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
    <div className="flex justify-center align-middle bg-transparent">
      <div className='relative flex justify-center sm:w-3xl py-4 overflow-hidden bg-transparent'>
        <div
          ref={containerRef}
          className='flex gap-6 px-6 overflow-x-hidden scrollbar-hide'
        >
          {stack.map((tech, i) => (
            <div
              key={i}
              className='flex flex-col items-center justify-center min-w-[80px] p-4 rounded-lg shadow-md bg-sky-900 dark:bg-sky-100'
            >
              <div className='text-4xl mb-2'>{tech.icon}</div>
              <span className='text-sm text-gray-100 dark:text-gray-900'>
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      </div>
  );
}

export default BouncingCarousel