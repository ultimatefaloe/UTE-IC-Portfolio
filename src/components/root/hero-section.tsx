"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "./images/full_stack.jpeg",
      span: "Building scalable apps & APIs",
      title: "Full-Stack Developer",
      buttonText: "Explore my work",
    },
    {
      id: 2,
      image: "./images/encentric.jpeg",
      span: "Frontend ✦ Backend ✦ DevOps",
      title: "Crafting User-Centric Solutions",
      buttonText: "View projects",
    },
    {
      id: 3,
      image: "./images/devops.jpeg",
      span: "From idea to deployment",
      title: "Code. Deploy. Scale.",
      buttonText: "Let’s connect",
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="hero relative h-screen overflow-hidden">
      {/* Slider Container */}
      <div className="hero__slider relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero__item absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `linear-gradient(to top right, #02264b63, #02264b63), url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Overlay */}
            {/* <div className="absolute inset-0 bg-black bg-opacity-40"></div> */}

            {/* Content */}
            <div className="container relative h-full flex items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="row w-full">
                <div className="col-lg-6 w-full lg:w-1/2">
                  <div className="hero__text text-white">
                    <span
                      className={`inline-block text-sm md:text-base font-medium tracking-widest uppercase mb-4 md:mb-6 transform transition-all duration-300 ${
                        index === currentSlide
                          ? "translate-y-0 opacity-100"
                          : "translate-y-8 opacity-0"
                      }`}
                      style={{
                        transitionDelay: index === currentSlide ? "0.1s" : "0s",
                      }}
                    >
                      {slide.span}
                    </span>

                    <h2
                      className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight uppercase mb-6 md:mb-10 transform transition-all duration-500 ${
                        index === currentSlide
                          ? "translate-y-0 opacity-100"
                          : "translate-y-8 opacity-0"
                      }`}
                      style={{
                        transitionDelay: index === currentSlide ? "0.3s" : "0s",
                      }}
                    >
                      {slide.title}
                    </h2>

                    <Link
                      href="#"
                      className={`primary-btn inline-block bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-8 rounded-sm uppercase tracking-wide transition-all duration-300 transform hover:scale-105 ${
                        index === currentSlide
                          ? "translate-y-0 opacity-100"
                          : "translate-y-8 opacity-0"
                      }`}
                      style={{
                        transitionDelay: index === currentSlide ? "0.5s" : "0s",
                      }}
                    >
                      {slide.buttonText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="hero__dots absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-4 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative text-lg font-medium transition-colors duration-300 ${
              index === currentSlide ? "text-white" : "text-gray-400"
            } hover:text-white`}
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            0{index + 1}
            <span
              className={`absolute left-0 -bottom-1.5 w-full transition-all duration-300 ${
                index === currentSlide
                  ? "h-0.5 bg-white"
                  : "h-px bg-white bg-opacity-30"
              }`}
            ></span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
