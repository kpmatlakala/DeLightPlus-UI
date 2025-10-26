// components/Button.tsx
import React from "react";
import { cn } from "../../lib/utils/cn";
import { Slot } from "./slot";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "icon" | "bordered" | "glass";
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

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
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
}, ref) => {
  const isDisabled = disabled || isLoading;

  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-primary text-primary-foreground hover:bg-primary/90";
      case "secondary":
        return "bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80";
      case "outline":
        return "bg-transparent border border-border text-foreground hover:bg-secondary";
      case "ghost":
        return "bg-transparent text-foreground hover:bg-secondary";
      case "icon":
        return "bg-transparent text-foreground hover:bg-secondary rounded-full border border-border hover:border-border/80";
      case "bordered":
        return "bg-transparent border-2 border-border text-foreground hover:bg-secondary hover:border-border/80";
      case "glass":
        return "bg-background/80 backdrop-blur-md border border-border text-foreground hover:bg-secondary/80 shadow-lg";
      default:
        return "";
    }
  };

  const tailwindClass = cn(
    "flex items-center justify-center gap-2 transition duration-200 font-medium",
    getVariantClasses(),
    // Only apply radius if not already set by variant (like icon variant)
    variant !== "icon" && radiusMap[radius],
    sizeMap[size],
    isDisabled && "opacity-50 cursor-not-allowed",
    className
  );

  const fallbackStyle: React.CSSProperties = {
    ...style,
  };

  if (asChild) {
    return (
      <Slot
        ref={ref}
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
      ref={ref}
      className={tailwindClass}
      style={fallbackStyle}
      disabled={isDisabled}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
});

Button.displayName = "Button";
