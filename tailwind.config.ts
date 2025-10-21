/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // very important
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'oklch(var(--background) / <alpha-value>)',
        foreground: 'oklch(var(--foreground) / <alpha-value>)',
        ute: {
          primary: 'var(--color-ute-primary)',
          secondary: 'var(--color-ute-secondary)',
          accent: 'var(--color-ute-accent)',
          neutral: 'var(--color-ute-neutral)',
        },
        card: 'oklch(var(--card) / <alpha-value>)',
        border: 'oklch(var(--border) / <alpha-value>)',
        ring: 'oklch(var(--ring) / <alpha-value>)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      fontFamily: {
        inter: 'var(--font-inter)',
        josefin: 'var(--font-josefin)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'), // optional animation plugin
  ],
};
