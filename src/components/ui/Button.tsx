// components/Button.tsx
import React from "react";
import { cn } from "../../lib/utils/cn";
import { Slot } from "./Slot";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  radius?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  asChild?: boolean;
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
  icon: "p-2",
};

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  style,
  variant = "primary",
  radius = "md",
  size = "md",
  isLoading = false,
  asChild = false,
  disabled,
  ...props
}) => {
  const isDisabled = disabled || isLoading;

  const tailwindClass = cn(
    "flex items-center justify-center gap-2 transition duration-200",
    variant === "primary" && "bg-black text-white hover:bg-gray-900",
    variant === "secondary" && "bg-white text-black border border-gray-300 hover:bg-gray-100",
    variant === "outline" && "bg-transparent border border-gray-500 text-black hover:bg-gray-100",
    variant === "ghost" && "bg-transparent text-black hover:bg-gray-100",
    isDisabled && "opacity-50 cursor-not-allowed",
    radiusMap[radius],
    sizeMap[size],
    className
  );

  const fallbackStyle: React.CSSProperties = {
    ...style,
  };

  if (asChild) {
    return (
      <Slot
        className={tailwindClass}
        style={fallbackStyle}
        aria-disabled={isDisabled}
        data-disabled={isDisabled ? true : undefined}
        {...props}
      >
        {isLoading ? "Loading..." : children}
      </Slot>
    );
  }

  return (
    <button
      className={tailwindClass}
      style={fallbackStyle}
      disabled={isDisabled}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};
