"use client";

import React from 'react';
import { Briefcase, Calendar, MapPin, ChevronRight, Award, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function Experience() {
  const experiences = [
    {
      company: "Accessivo",
      location: "Remote",
      position: "Frontend Team Lead",
      period: "Aug 2025 – Present",
      current: true,
      type: "Leadership",
      achievements: [
        "Serve as the bridge between stakeholders and the frontend team, ensuring clear communication and delivery alignment.",
        "Assign and track tasks, fostering accountability and timely feature releases.",
        "Motivate and support team members through technical and operational challenges.",
        "Report progress and maintain departmental alignment with company milestones."
      ],
      technologies: ["React", "TypeScript", "Team Management", "Agile"]
    },
    {
      company: "MeuDelivery",
      location: "Remote (Angola)",
      position: "Backend Developer",
      period: "May 2025 – Present",
      current: true,
      type: "Backend",
      achievements: [
        "Designed and developed scalable NestJS + PostgreSQL APIs supporting clients, vendors, delivery agents, and admins.",
        "Implemented authentication, rate limiting, and in-app notifications, reducing system errors by 30%.",
        "Integrated Swagger API documentation and enforced modular clean architecture.",
        "Improved delivery tracking and order coordination systems, enhancing vendor satisfaction."
      ],
      technologies: ["NestJS", "PostgreSQL", "Swagger", "Authentication"]
    },
    {
      company: "59Minutes Print",
      location: "Abuja, Nigeria",
      position: "Full Stack Engineer",
      period: "Jul 2024 – Present",
      current: true,
      type: "Full Stack",
      achievements: [
        "Developed REST APIs for authentication, vendors, and order management using Node.js & MongoDB.",
        "Integrated Firebase authentication and secure file uploads for product listings.",
        "Built a real-time cart and order system with dynamic pricing and vendor verification.",
        "Created admin management dashboards, optimizing service efficiency by 25%."
      ],
      technologies: ["Node.js", "MongoDB", "Firebase", "REST API"]
    }
  ];

  const stats = [
    { label: "Years of Experience", value: "3+", icon: <Award className="w-5 h-5" /> },
    { label: "Projects Delivered", value: "15+", icon: <TrendingUp className="w-5 h-5" /> },
    { label: "Companies Served", value: "3", icon: <Briefcase className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-sky-400 font-semibold text-sm uppercase tracking-wider">
              Professional Journey
            </span>
          </div>
          <h1 className="text-5xl font-bold text-sky-900 dark:text-sky-100 mb-4">
            Work Experience
          </h1>
          <p className="text-lg text-sky-900/80 dark:text-sky-100/80 max-w-2xl mx-auto">
            Building impactful solutions across multiple organizations, from startups to established companies.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-linear-to-br from-sky-400/10 to-cyan-500/10 rounded-xl p-6 border border-sky-400/20 text-center transform hover:scale-105 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-sky-400/20 rounded-full text-sky-400 mb-3">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-sky-900 dark:text-sky-100 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-sky-900/70 dark:text-sky-100/70">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-linear-to-b from-sky-400 to-transparent"></div>

          {/* Experience Cards */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-sky-400 rounded-full border-4 border-gray-900 z-10">
                  {exp.current && (
                    <span className="absolute inset-0 rounded-full bg-sky-400 animate-ping opacity-75"></span>
                  )}
                </div>

                {/* Content Card */}
                <div className="md:w-[calc(50%-2rem)] group">
                  <div className="relative dark:bg-gray-800 bg-gray-100 rounded-xl p-6 border border-gray-700 hover:border-sky-400 transition-all duration-300 hover:shadow-lg hover:shadow-sky-400/10">
                    {/* Current Badge */}
                    {exp.current && (
                      <div className="absolute -top-3 -right-3">
                        <span className="inline-flex items-center gap-1 bg-sky-400 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full">
                          <span className="w-2 h-2 bg-gray-900 rounded-full animate-pulse"></span>
                          Current
                        </span>
                      </div>
                    )}

                    {/* Company & Position */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-2xl font-bold text-sky-900 dark:text-sky-100 group-hover:text-sky-400 transition-colors">
                            {exp.company}
                          </h3>
                          <p className="text-lg text-sky-400 font-semibold mt-1">
                            {exp.position}
                          </p>
                        </div>
                        <span className="text-xs bg-sky-400/10 text-sky-400 px-3 py-1 rounded-full font-medium">
                          {exp.type}
                        </span>
                      </div>
                      
                      {/* Meta Info */}
                      <div className="flex flex-wrap gap-4 text-sm text-sky-900/70 dark:text-sky-100/70 mt-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="mb-4">
                      <ul className="space-y-3">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li 
                            key={achIndex}
                            className="flex items-start gap-2 text-sky-900/90 dark:text-sky-100/90"
                          >
                            <ChevronRight className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                            <span className="text-sm leading-relaxed">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-700">
                      {exp.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="text-xs dark:bg-gray-700 bg-gray-200 text-sky-900 dark:text-sky-100 px-3 py-1 rounded-full border border-gray-600 hover:border-sky-400 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Spacer for timeline */}
                <div className="hidden md:block md:w-[calc(50%-2rem)]"></div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="inline-block bg-linear-to-r from-sky-400/10 to-cyan-500/10 rounded-2xl p-8 border border-sky-400/20">
            <Briefcase className="w-12 h-12 text-sky-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-sky-900 dark:text-sky-100 mb-3">
              Interested in Working Together?
            </h3>
            <p className="text-sky-900/80 dark:text-sky-100/80 mb-6 max-w-md mx-auto">
              {`I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.`}
            </p>

            {/*direct to contact page on epx.tsx for experience  */}
            <Link href="/contact" prefetch="auto" className="bg-sky-400 hover:bg-sky-500 text-gray-900 font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
              {`Let's Connect`}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}