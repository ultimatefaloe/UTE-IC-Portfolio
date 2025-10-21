"use client";
import { useState, useEffect } from "react";
import { Button } from "./button";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark";
    setDarkMode(isDark);
    if (isDark) document.documentElement.classList.add("dark");
  }, []);

  // Apply or remove dark class dynamically
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const themeToggleHanlder = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Button
      onClick={themeToggleHanlder}
      className={
        "mb-4 flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 shadow-md border bg-gray-200 text-gray-900 hover:bg-gray-300 border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 dark:border-gray-700 "
      }
    >
      {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </Button>
  );
}
