"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "../UI/button";
const testimonials = [
  {
    id: 1,
    name: "David Johnson",
    role: "Startup Founder",
    content:
      "Working with Tunmise was a game-changer. He built a scalable backend with Node.js and PostgreSQL that helped us onboard vendors 2x faster than before.",
    avatar: "/api/placeholder/80/80",
  },
  {
    id: 2,
    name: "Amaka Obi",
    role: "Product Designer",
    content:
      "Tunmise’s frontend work with React and Tailwind brought my designs to life. The user experience was smooth and engaging—clients loved it!",
    avatar: "/api/placeholder/80/80",
  },
  {
    id: 3,
    name: "Samuel Adeyemi",
    role: "Tech Lead",
    content:
      "His attention to detail on APIs and authentication impressed the whole team. Security and performance improved by over 40% after his contributions.",
    avatar: "/api/placeholder/80/80",
  },
  {
    id: 4,
    name: "Sophia Martinez",
    role: "Project Manager",
    content:
      "Tunmise is a true team player. As a frontend team lead, he motivated developers, coordinated tasks, and delivesky milestones ahead of schedule.",
    avatar: "/api/placeholder/80/80",
  },
  {
    id: 5,
    name: "Henry Okafor",
    role: "Client",
    content:
      "I needed a custom marketplace solution, and Tunmise delivesky beyond expectations. The platform is reliable, user-friendly, and ready to scale.",
    avatar: "/api/placeholder/80/80",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [visibleTestimonials, setVisibleTestimonials] = useState(3);

  const visibleTestimonials = 3;

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + visibleTestimonials >= testimonials.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0
        ? Math.max(0, testimonials.length - visibleTestimonials)
        : prev - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < visibleTestimonials; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push(testimonials[index]);
    }
    return visible;
  };

  const totalSlides = Math.ceil(testimonials.length / visibleTestimonials);

  return (
    <div className={`min-h-screen transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Testimonials
          </h2>
          <div className="w-16 h-1 bg-sky-600 mx-auto mb-6"></div>
          <p className="text-lg max-w-2xl mx-auto  text-gray-600 dark:text-gray-300">
            Here’s what collaborators, clients, and teammates have to say about
            my work and leadership. Their words reflect my focus on building
            scalable systems, leading teams, and delivering user-friendly
            experiences.
          </p>
        </div>

        {/* Navigation Arrows */}
        <div className="relative">
          <Button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full shadow-lg transition-all hover:scale-110 text-sky-900 dark:text-sky-200 dark:hover:text-white"
          >
            <ChevronLeft size={24} />
          </Button>

          <Button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full shadow-lg transition-all hover:scale-110 text-sky-900 dark:text-sky-200 dark:hover:text-white"
          >
            <ChevronRight size={24} />
          </Button>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8 px-16">
            {getVisibleTestimonials().map((testimonial) => (
              <div
                key={`${testimonial.id}-${currentIndex}`}
                className="relative p-8 rounded-2xl shadow-xl transition-all duration-500 hover:scale-105 bg-gray-100 hover:bg-gray-500 dark:bg-gray-700 dark:hover:bg-gray-800"
              >
                {/* Quote Icon */}
                <div className="absolute top-6 left-6">
                  <Quote className="w-8 h-8 text-sky-600 opacity-30" />
                </div>

                {/* Content */}
                <div className="pt-6">
                  <p className="text-sm leading-relaxed italic mb-8  text-gray-800 dark:text-gray-200">
                    {`${testimonial.content}`}
                  </p>

                  {/* Avatar and Info */}
                  <div className="flex items-center">
                    <div className="w-16 h-16 rounded-full bg-linear-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white font-bold text-lg mr-4 shadow-lg">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-sky-900 dark:text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-800 dark:text-gray-200">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Decorative Quote */}
                <div className="absolute bottom-6 right-6">
                  <Quote className="w-6 h-6 text-sky-600 opacity-20 rotate-180" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-12 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <Button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300
                  ${
                    Math.floor(currentIndex / visibleTestimonials) === index
                      ? "bg-sky-600 scale-125"
                      : "bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
                  }
                `}
            />
          ))}
        </div>

        {/* Additional Features */}
        <div className="mt-16 text-center">
          <div className="flex justify-center space-x-8 mb-8">
            <div className="px-6 py-3 rounded-full bg-gray-100 dark:bg-gray-800">
              <span className="text-2xl font-bold text-sky-600">500+</span>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Happy Clients
              </p>
            </div>
            <div className="px-6 py-3 rounded-full bg-gray-100 dark:bg-gray-800">
              <span className="text-2xl font-bold text-sky-600">4.9</span>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Average Rating
              </p>
            </div>
            <div className="px-6 py-3 rounded-full bg-gray-100 dark:bg-gray-800">
              <span className="text-2xl font-bold text-sky-600">99%</span>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Satisfaction
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
