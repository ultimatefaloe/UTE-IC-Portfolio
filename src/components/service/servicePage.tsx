'use client';

import React, { useEffect, useState } from 'react';
import { Layers } from 'lucide-react';
import { Button } from '../ui/button';

type Service = {
  id: string;
  title: string;
  description: string;
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      setLoading(true);
      const response = await fetch('/api/services', { cache: 'no-store' });
      const data = await response.json();
      setServices(data);
      setLoading(false);
    };

    loadServices();
  }, []);

  return (
    <div className='min-h-screen py-20 px-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-16'>
          <div className='inline-block mb-4'>
            <span className='text-sky-400 font-semibold text-sm uppercase tracking-wider'>
              What I Offer
            </span>
          </div>
          <h1 className='text-5xl font-bold text-sky-900 dark:text-sky-100 mb-6'>
            Services
          </h1>
          <p className='text-lg text-sky-900/80 dark:text-sky-100/80 max-w-3xl mx-auto leading-relaxed'>
            Product-focused engineering support for startups, scale-ups, and founding teams.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {loading ? (
            <div className='col-span-full text-center text-sky-100/70'>
              Loading services...
            </div>
          ) : (
            services.map(service => (
              <div
                key={service.id}
                className='group relative overflow-hidden rounded-2xl border border-gray-700 bg-linear-to-br from-gray-300 to-gray-350 p-8 shadow-md transition-all duration-500 hover:border-sky-400 hover:shadow-2xl hover:shadow-sky-400/10 dark:from-gray-900 dark:to-gray-950'
              >
                <div className='flex items-start gap-4 mb-6'>
                  <div className='p-4 bg-sky-400/10 rounded-xl text-sky-400 group-hover:bg-sky-400 group-hover:text-gray-900 transition-all duration-300 shadow-inner'>
                    <Layers className='w-8 h-8' />
                  </div>
                  <div className='flex-1'>
                    <h3 className='text-2xl font-extrabold text-sky-900 dark:text-sky-100 mb-2 group-hover:text-sky-400 transition-colors'>
                      {service.title}
                    </h3>
                    <p className='text-sky-900/80 dark:text-sky-100/80 leading-relaxed'>
                      {service.description}
                    </p>
                  </div>
                </div>
                <Button className='w-full bg-sky-400/10 hover:bg-sky-400 text-sky-400 hover:text-gray-900 font-semibold py-3 rounded-xl transition-all duration-300'>
                  Start a Conversation
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
