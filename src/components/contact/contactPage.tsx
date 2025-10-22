'use client';

import React, { useState } from 'react';
import {
  Mail,
  Linkedin,
  Github,
  Send,
  User,
  MessageSquare,
  MapPin,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { Button } from '../UI/button';
import Link from 'next/link';
import { emailSend } from '@/api/emailjs';
import { toast } from 'react-toastify';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: <Mail className='w-6 h-6' />,
      label: 'Email',
      value: 'ultimatefaloe@outlook.com',
      link: 'mailto:ultimatefaloe@outlook.com',
    },
    {
      icon: <Linkedin className='w-6 h-6' />,
      label: 'LinkedIn',
      value: 'linkedin.com/in/tunmise-falodun',
      link: 'https://linkedin.com/in/tunmise-falodun',
    },
    {
      icon: <Github className='w-6 h-6' />,
      label: 'GitHub',
      value: 'github.com/ultimatefaloe',
      link: 'https://github.com/ultimatefaloe',
    },
    {
      icon: <MapPin className='w-6 h-6' />,
      label: 'Location',
      value: 'Ibadan, Nigeria',
      link: null,
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    if (
      formData.name !== '' ||
      formData.email !== '' ||
      formData.subject !== '' ||
      formData.message !== ''
    ) {
      console.log(formData);
      const { success, message } = await emailSend(formData);

      if (!success) {
        setIsSubmitting(false);
        toast.error(message);
      } else {
        setIsSubmitting(false);
        toast.success(message);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } else {
      toast.error('Message form not complete');
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen py-20 px-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-16'>
          <div className='inline-block mb-4'>
            <span className='text-sky-400 font-semibold text-sm uppercase tracking-wider'>
              Get In Touch type='submit'
            </span>
          </div>
          <h1 className='text-5xl font-bold text-sky-900 dark:text-sky-100 mb-6'>
            {`Let's Connect`}
          </h1>
          <p className='text-lg text-sky-900/80 dark:text-sky-100/80 max-w-3xl mx-auto leading-relaxed'>
            {`I'm always open to discussing new opportunities, collaborations, or
            sharing ideas. Whether it's about a project, internship, or
            partnership, feel free to reach out.`}
          </p>
        </div>

        <div className='grid lg:grid-cols-2 gap-12 mb-16'>
          <div className='order-2 lg:order-1'>
            <div className='bg-linear-to-br grat-sky-300/60 to-gray-350/80 dark:from-gray-800/80 dark:to-gray-900/90 backdrop-blur-xl rounded-2xl p-10 border border-sky-400/10 hover:border-sky-400/30 shadow-lg hover:shadow-sky-400/10 transition-all duration-500'>
              <h2 className='text-3xl font-extrabold text-sky-900 dark:text-sky-100 mb-8 tracking-tight'>
                Send Me a Message
              </h2>

              <div className='space-y-6'>
                {/* Name Field */}
                <div>
                  <label
                    htmlFor='name'
                    className='block text-sm font-semibold text-sky-900 dark:text-sky-100 mb-2'
                  >
                    Your Name *
                  </label>
                  <div className='relative'>
                    <User className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-900/50 dark:text-sky-100/50' />
                    <input
                      type='text'
                      id='name'
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                      className='w-full bg-sky-350/40 dark:bg-gray-800/70 border border-sky-400/10 rounded-lg pl-11 pr-4 py-3 text-sky-900 dark:text-sky-100 placeholder-sky-900/50 dark:placeholder-sky-100/40 focus:outline-none focus:ring-2 focus:ring-sky-400/50 transition-all'
                      placeholder='John Doe'
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-semibold text-sky-900 dark:text-sky-100 mb-2'
                  >
                    Email Address *
                  </label>
                  <div className='relative'>
                    <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-900/50 dark:text-sky-100/50' />
                    <input
                      type='email'
                      id='email'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      className='w-full bg-sky-350/40 dark:bg-gray-800/70 border border-sky-400/10 rounded-lg pl-11 pr-4 py-3 text-sky-900 dark:text-sky-100 placeholder-sky-900/50 dark:placeholder-sky-100/40 focus:outline-none focus:ring-2 focus:ring-sky-400/50 transition-all'
                      placeholder='john@example.com'
                    />
                  </div>
                </div>

                {/* Subject Field */}
                <div>
                  <label
                    htmlFor='subject'
                    className='block text-sm font-semibold text-sky-900 dark:text-sky-100 mb-2'
                  >
                    Subject *
                  </label>
                  <div className='relative'>
                    <MessageSquare className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-900/50 dark:text-sky-100/50' />
                    <input
                      type='text'
                      id='subject'
                      name='subject'
                      value={formData.subject}
                      onChange={handleChange}
                      className='w-full bg-sky-350/40 dark:bg-gray-800/70 border border-sky-400/10 rounded-lg pl-11 pr-4 py-3 text-sky-900 dark:text-sky-100 placeholder-sky-900/50 dark:placeholder-sky-100/40 focus:outline-none focus:ring-2 focus:ring-sky-400/50 transition-all'
                      placeholder='Project Inquiry'
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor='message'
                    className='block text-sm font-semibold text-sky-900 dark:text-sky-100 mb-2'
                  >
                    Message *
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className='w-full bg-sky-350/40 dark:bg-gray-800/70 border border-sky-400/10 rounded-lg px-4 py-3 text-sky-900 dark:text-sky-100 placeholder-sky-900/50 dark:placeholder-sky-100/40 focus:outline-none focus:ring-2 focus:ring-sky-400/50 transition-all resize-none'
                    placeholder='Tell me about your project or idea...'
                  />
                </div>

                {/* Submit Button */}
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className='w-full bg-sky-400 hover:bg-sky-500 disabled:bg-sky-400/50 text-gray-900 font-semibold py-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-sky-400/30'
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className='w-5 h-5 animate-spin' />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className='w-5 h-5' />
                      <span>Send Message</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          <div className='order-1 lg:order-2 space-y-6'>
            <div className='space-y-4'>
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className='bg-linear-to-br from-sky-400/10 to-sky-450/30 rounded-xl p-6 border border-gray-700 hover:border-sky-400 transition-all duration-300 group'
                >
                  <div className='flex items-center gap-4'>
                    <div className='p-3 bg-sky-400/10 rounded-lg text-sky-400 group-hover:bg-sky-400 group-hover:text-gray-900 transition-all duration-300'>
                      {info.icon}
                    </div>
                    <div className='flex-1'>
                      <p className='text-sm text-sky-900/70 dark:text-sky-100/70 mb-1'>
                        {info.label}
                      </p>
                      {info.link ? (
                        <Link
                          href={info.link}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-sky-900 dark:text-sky-100 font-medium hover:text-sky-400 transition-colors break-all'
                        >
                          {info.value}
                        </Link>
                      ) : (
                        <p className='text-sky-900 dark:text-sky-100 font-medium'>
                          {info.value}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className='bg-linear-to-br from-sky-400/10 to-cyan-500/10 rounded-xl p-8 border border-sky-400/20'>
              <h3 className='text-2xl font-bold text-sky-900 dark:text-sky-100 mb-4'>
                {` Let's Build Something Amazing Together`}
              </h3>
              <p className='text-sky-900/80 dark:text-sky-100/80 mb-6'>
                {`Whether you have a clear vision or just an idea, I'm here to
                help turn it into reality with clean code and thoughtful design.`}
              </p>
              <div className='space-y-3'>
                <div className='flex items-center gap-2 text-sm text-sky-900/80 dark:text-sky-100/80'>
                  <CheckCircle2 className='w-4 h-4 text-sky-400' />
                  <span>Response within 24 hours</span>
                </div>
                <div className='flex items-center gap-2 text-sm text-sky-900/80 dark:text-sky-100/80'>
                  <CheckCircle2 className='w-4 h-4 text-sky-400' />
                  <span>Free initial consultation</span>
                </div>
                <div className='flex items-center gap-2 text-sm text-sky-900/80 dark:text-sky-100/80'>
                  <CheckCircle2 className='w-4 h-4 text-sky-400' />
                  <span>Flexible engagement models</span>
                </div>
              </div>
            </div>

            <div className='bg-linear-to-br  from-sky-400/10 to-cyan-500/10 rounded-xl p-6 border border-gray-700'>
              <h3 className='text-lg font-bold text-sky-900 dark:text-sky-100 mb-4'>
                Connect on Social Media
              </h3>
              <div className='flex gap-3'>
                <Link
                  href='https://linkedin.com/in/tunmise-falodun'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='p-3 bg-sky-400/10 rounded-lg text-sky-400 hover:bg-sky-400 hover:text-gray-900 transition-all duration-300 transform hover:scale-110'
                >
                  <Linkedin className='w-6 h-6' />
                </Link>
                <Link
                  href='https://github.com/ultimatefaloe'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='p-3 bg-sky-400/10 rounded-lg text-sky-400 hover:bg-sky-400 hover:text-gray-900 transition-all duration-300 transform hover:scale-110'
                >
                  <Github className='w-6 h-6' />
                </Link>
                <Link
                  href='mailto:ultimatefaloe@outlook.com'
                  className='p-3 bg-sky-400/10 rounded-lg text-sky-400 hover:bg-sky-400 hover:text-gray-900 transition-all duration-300 transform hover:scale-110'
                >
                  <Mail className='w-6 h-6' />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
