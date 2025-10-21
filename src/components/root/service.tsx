"use client";
import React from "react";
import { Layers, Database, Cloud, Code } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../UI/button";

const ServicesSection = () => {
  const router = useRouter()

  const serviceHandler = () =>{
    router.push("/services")
  }

 const services = [
  {
    id: 1,
    icon: Code,
    title: "Full-Stack Development",
    description:
      "Building responsive, scalable applications with Node.js, PHP, and React. From backend APIs to frontend UI, I deliver end-to-end solutions tailosky to business needs.",
  },
  {
    id: 2,
    icon: Layers,
    title: "UI/UX Implementation",
    description:
      "Turning designs into clean, functional interfaces using Next.js and Tailwind CSS. Focused on performance, accessibility, and smooth user experiences.",
  },
  {
    id: 3,
    icon: Database,
    title: "Database & API Integration",
    description:
      "Designing and optimizing databases (PostgreSQL, MySQL, MongoDB) and integrating RESTful APIs to power secure and reliable applications.",
  },
  {
    id: 4,
    icon: Cloud,
    title: "DevOps & Deployment",
    description:
      "Deploying apps with CI/CD pipelines and cloud platforms like AWS and Vercel. Implementing monitoring, rate-limiting, and abuse detection to ensure reliability.",
  },
];


  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden">
     
      <div className="container mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left Column - Services Title */}
          <div className="lg:col-span-1">
            <div className="services__title">
              <div className="section-title mb-8">
                <span
                  className="inline-block text-sm font-medium tracking-widest uppercase mb-4 text-gray-500 dark:text-gray-300"
                >
                SERVICES
                </span>

                <h2
                  className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-gray-900 dark:text-white"
                >
                  WHAT I DO?
                </h2>

                {/* Cyan accent line */}
                <div className={`w-16 h-1 mb-8 bg-sky-600`}></div>
              </div>

              <p
                className="text-lg leading-relaxed mb-12 text-gray-600 dark:text-gray-300"
              >
                If you work with me, you’ll get a developer who not only writes clean code but also ensures your product is deployed, secure, and user-ready end to end
              </p>

              {/* Styled button with corner brackets */}
              <div className="relative inline-block">
                <Button
                  className="relative cursor-pointer px-8 py-4 font-semibold text-sm tracking-wider uppercase transition-all duration-300 hover:text-sky-600 hover:bg-sky-600/10 text-gray-900 dark:text-white"
                onClick={serviceHandler}
                >
                  VIEW ALL SERVICES
                  {/* Corner brackets */}
                  <div
                    className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 transition-colors duration-300 border-gray-900 dark:border-white"
                  ></div>
                  <div
                    className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 transition-colors duration-300 border-gray-900 dark:border-white"
                  ></div>
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Services Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={service.id}
                    className="services__item group transition-all duration-500 hover:transform hover:-translate-y-1"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    {/* Icon with border */}
                    <div
                      className={`services__item__icon mb-8 inline-flex items-center justify-center w-20 h-20 border-2 border-sky-600 transition-all duration-300 hover:bg-sky-600/10`}
                    >
                      <IconComponent className="w-8 h-8" />
                    </div>

                    <h4
                      className="text-2xl font-bold mb-6 transition-colors duration-300 text-gray-900 group-hover:text-sky-600 dark:text-white dark:group-hover:text-sky-600"
                    >
                      {service.title}
                    </h4>

                    <p
                      className="text-base leading-relaxed text-gray-600 dark:text-gray-300"
                    >
                      {service.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
