import React from "react";

interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  onClick,
  type = "button",
  style = {},
  disabled
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`cursor-pointer px-4 py-2 rounded-md ${className}`}
      style={style}
    >
      {children}
    </button>
  );
};
