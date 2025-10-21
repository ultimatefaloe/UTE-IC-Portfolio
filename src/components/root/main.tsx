"use client";
import { useTheme } from "@/_context/themeContext";
import { ReactNode } from "react";

type MainProps = {
  children: ReactNode;
};

const Main = ({ children }: MainProps) => {
  const { theme } = useTheme();

  return <div className={`min-h-screen rounded-xs ${theme === "light"
          ? "bg-gray-100 text-gray-900"
          : "bg-gray-900 text-gray-100"
      }`}>{children}</div>;
};

export default Main;
