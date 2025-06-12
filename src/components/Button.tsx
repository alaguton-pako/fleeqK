// src/components/Button.tsx
import React from "react";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  text?: string; 
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  text,
  className = "",
  variant = "primary",
  fullWidth = false,
  ...props
}) => {
  const baseClasses =
    "px-4 py-1 rounded-md font-medium text-white transition-colors hover:cursor-pointer";

  const variantClasses =
    variant === "primary"
      ? "bg-[#FF5859] hover:bg-[#E04B4B]"
      : "bg-gray-500 hover:bg-gray-600";

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${widthClass} ${className}`}
      {...props}
    >
      {text || children}
    </button>
  );
};

export default Button;
