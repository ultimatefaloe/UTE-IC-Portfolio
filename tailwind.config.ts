// tailwind.config.js
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        intelli: {
          primary: "#6C63FF",   // violet-indigo
          secondary: "#FF6F61", // coral red
          accent: "#20C997",    // mint-teal
          dark: "#0F172A",      // deep slate navy
          light: "#F8FAFC",     // off-white
        },
      },
    },
  },
  plugins: [],
}
