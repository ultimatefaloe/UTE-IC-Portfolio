import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/animations';

interface SectionLabelProps {
  label: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionLabel({ label, title, subtitle, center }: SectionLabelProps) {
  return (
    <motion.div
      className={`mb-12 ${center ? 'text-center' : ''}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <motion.span
        variants={fadeUp}
        custom={0}
        className="block font-mono text-xs tracking-[0.25em] uppercase text-[#C9A84C] mb-3"
      >
        // {label}
      </motion.span>
      <motion.h2
        variants={fadeUp}
        custom={1}
        className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-[#F0EDE8]"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          custom={2}
          className="mt-4 text-[#8B8B9A] text-lg max-w-2xl"
          style={center ? { margin: '1rem auto 0' } : {}}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
