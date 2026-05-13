"use client";

import React, { useEffect, useState } from "react";
import LinkButton from "../ui/LinkButton";

type ContentBlock = {
  title: string;
  subtitle?: string | null;
  description?: string | null;
  body?: string | null;
  imageUrl?: string | null; // we'll use this as background image
};

const HeroSection = () => {
  const [hero, setHero] = useState<ContentBlock | null>(null);

  useEffect(() => {
    const loadHero = async () => {
      const response = await fetch("/api/content/hero", {
        cache: "no-store",
      });

      if (!response.ok) return;

      const data = await response.json();
      setHero(data);
    };

    loadHero();
  }, []);

  return (
    <section
      className="hero relative h-[80vh] overflow-hidden bg-center bg-cover"
      style={
        hero?.imageUrl
          ? {
              backgroundImage: `url(${hero.imageUrl})`,
            }
          : undefined
      }
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-linear-to-br from-sky-900/60 via-sky-950/50 to-gray-950"
        aria-hidden
      />

      <div className="container relative h-full flex items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="row w-full">
          <div className="col-lg-7 w-full lg:w-7/12">
            <div className="hero__text text-white space-y-6">
              <span className="inline-block text-sm md:text-base font-medium tracking-widest uppercase">
                {hero?.subtitle ?? "Loading..."}
              </span>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight uppercase">
                {hero?.title ?? ""}
              </h2>

              <p className="text-base md:text-lg text-sky-100/80 max-w-2xl">
                {hero?.description ?? ""}
              </p>

              <LinkButton
                href="/projects"
                className="flex bg-sky-400 hover:bg-sky-500"
              >
                {hero?.body ?? "View projects"}
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;