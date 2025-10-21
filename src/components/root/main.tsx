"use client";
import { ReactNode } from "react";

type MainProps = {
  children: ReactNode;
};

const Main = ({ children }: MainProps) => {

  return <div className="min-h-screen rounded-xs bg-ute-primary text-ute-neutral dark:bg-ute-secondary dark:text-ute-accent">{children}</div>;
};

export default Main;