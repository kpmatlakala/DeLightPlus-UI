// components/Button.tsx
import React from "react";
import { clsx } from "clsx";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "custom";
  radius?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
};

const radiusMap = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

const sizeMap = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  style,
  variant = "primary",
  radius = "md",
  size = "md",
  isLoading = false,
  ...props
}) => {
  const tailwindClass = clsx(
    "transition duration-200",
    variant === "primary" && "bg-blue-500 text-white hover:bg-blue-600",
    variant === "secondary" && "bg-gray-200 text-gray-900 hover:bg-gray-300",
    variant === "custom" && "",
    radiusMap[radius],
    sizeMap[size],
    className
  );

  const fallbackStyle: React.CSSProperties = {
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "1rem",
    borderRadius: radius === "full" ? "9999px" : undefined,
    padding: size === "sm" ? "0.25rem 0.5rem" : size === "lg" ? "0.75rem 1.5rem" : "0.5rem 1rem",
    backgroundColor: variant === "primary" ? "#3b82f6" : variant === "secondary" ? "#e5e7eb" : undefined,
    color: variant === "primary" ? "#ffffff" : variant === "secondary" ? "#111827" : undefined,
    ...style,
  };

  return (
    <button 
      className={tailwindClass} 
      style={fallbackStyle}
      disabled={isLoading} 
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};
