"use client";
import React, { useState, useEffect, useRef, RefObject } from "react";
import { Users, CheckCircle, Lightbulb, HandHeart } from "lucide-react";
import { useTheme } from "../_context/ThemeContext";

interface Counter {
  endValue: number;
  duration: number;
  startAnimation: boolean;
}
// Counter animation hook
const useCounterAnimation = (
  endValue: number,
  duration: number = 2000,
  startAnimation: boolean | React.RefObject<boolean> = false
) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * endValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [endValue, duration, startAnimation]);

  return count;
};

// Intersection Observer hook for triggering animations
const useIntersectionObserver = (threshold = 0.1) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isInView] as const;
};

const StatsSection = () => {
  const { theme } = useTheme();
  const [sectionRef, isInView] = useIntersectionObserver(0.3);

  const stats = [
    {
      id: 1,
      icon: Users,
      number: 25,
      label: "Clients & Teams Collaborated With",
      position: "top-left",
    },
    {
      id: 2,
      icon: Lightbulb,
      number: 12,
      label: "Projects Delivered",
      position: "top-right",
    },
    {
      id: 3,
      icon: CheckCircle,
      number: 100,
      label: "Coding Challenges Completed",
      position: "bottom-left",
    },
    {
      id: 4,
      icon: HandHeart,
      number: 5,
      label: "Open Source Contributions",
      position: "bottom-right",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={`relative py-20 lg:py-32 overflow-hidden`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Diamond grid pattern */}
        <div
          className={`absolute inset-0 opacity-10 ${
            theme === "dark" ? "text-red-600" : "text-red-300"
          }`}
        >
          {/* Vertical lines */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`v-${i}`}
              className={`absolute w-px h-full ${
                theme === "dark" ? "bg-red-600/20" : "bg-red-300/30"
              }`}
              style={{
                left: `${12.5 + i * 12.5}%`,
                transform: "rotate(45deg)",
                transformOrigin: "center",
              }}
            />
          ))}
          {/* Horizontal lines */}
          {[...Array(6)].map((_, i) => (
            <div
              key={`h-${i}`}
              className={`absolute w-full h-px ${
                theme === "dark" ? "bg-red-600/20" : "bg-red-300/30"
              }`}
              style={{
                top: `${16.6 + i * 16.6}%`,
                transform: "rotate(45deg)",
                transformOrigin: "center",
              }}
            />
          ))}
        </div>
      </div>

      {/* Stats Container */}
      <div className="container mx-auto max-w-6xl px-6 lg:px-8 relative z-10">
        <div className="relative h-[600px] lg:h-[500px]">
          {/* Diamond Layout Grid */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-8 lg:gap-16 max-w-4xl w-full">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                const animatedNumber = useCounterAnimation(
                  stat.number,
                  2500,
                  isInView
                );

                return (
                  <div
                    key={stat.id}
                    className={`relative group transform transition-all duration-700 ${
                      index % 2 === 0 ? "lg:translate-y-0" : "lg:translate-y-16"
                    }`}
                    style={{
                      animationDelay: `${index * 200}ms`,
                    }}
                  >
                    {/* Diamond Background */}
                    <div
                      className={`relative w-48 h-48 mx-auto transform rotate-45 ${
                        theme === "dark" ? "bg-gray-800" : "bg-white"
                      } shadow-2xl group-hover:shadow-3xl transition-all duration-500 ${
                        theme === "dark"
                          ? "hover:shadow-red-600/20 border border-gray-700 group-hover:border-red-600/50"
                          : "hover:shadow-red-500/20 border border-gray-200 group-hover:border-red-500/50"
                      }`}
                    >
                      {/* Content Container - Counter-rotated */}
                      <div className="absolute inset-0 transform -rotate-45 flex flex-col items-center justify-center p-6">
                        {/* Icon */}
                        <div
                          className={`mb-4 p-4 rounded-full ${
                            theme === "dark"
                              ? "bg-red-600/20 text-red-500 group-hover:bg-red-600/30"
                              : "bg-red-100 text-red-600 group-hover:bg-red-200"
                          } transition-all duration-300`}
                        >
                          <IconComponent className="w-8 h-8" />
                        </div>

                        {/* Number */}
                        <div
                          className={`text-4xl lg:text-5xl font-bold mb-2 ${
                            theme === "dark" ? "text-white" : "text-gray-900"
                          } transition-colors duration-300`}
                        >
                          {isInView ? animatedNumber.toLocaleString() : "0"}
                        </div>

                        {/* Label */}
                        <p
                          className={`text-sm lg:text-base text-center font-medium ${
                            theme === "dark" ? "text-gray-300" : "text-gray-600"
                          } transition-colors duration-300 leading-tight`}
                        >
                          {stat.label}
                        </p>

                        {/* Animated Border */}
                        <div
                          className={`absolute inset-0 rounded-lg border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                            theme === "dark"
                              ? "border-red-600"
                              : "border-red-500"
                          }`}
                          style={{
                            animation: isInView
                              ? "borderPulse 2s infinite"
                              : "none",
                          }}
                        ></div>
                      </div>

                      {/* Glow Effect */}
                      <div
                        className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${
                          theme === "dark" ? "bg-red-600" : "bg-red-500"
                        } blur-xl`}
                      ></div>
                    </div>

                    {/* Floating Particles */}
                    <div className="absolute -top-2 -right-2 w-2 h-2 bg-red-500 rounded-full opacity-60 animate-ping"></div>
                    <div
                      className="absolute -bottom-2 -left-2 w-1 h-1 bg-red-400 rounded-full opacity-40 animate-pulse"
                      style={{ animationDelay: `${index * 500}ms` }}
                    ></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for border animation */}
      <style jsx>{`
        @keyframes borderPulse {
          0%,
          100% {
            border-color: rgba(239, 68, 68, 0.5);
          }
          50% {
            border-color: rgba(239, 68, 68, 1);
          }
        }
      `}</style>
    </section>
  );
};

export default StatsSection;
