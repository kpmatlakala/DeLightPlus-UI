// components/Card.tsx
import React from "react";
import { clsx } from "clsx";

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  radius?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  variant?: "solid" | "ghost" | "outline"; // Optional variants
};

const radiusMap = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

export const Card: React.FC<CardProps> = ({
  children,
  className,
  style,
  radius = "xl",
  variant = "solid",
  ...props
}) => {
  const tailwindClass = clsx(
    variant === "solid" && "bg-white shadow",
    variant === "ghost" && "bg-transparent",
    variant === "outline" && "border border-gray-300 bg-white",
    radiusMap[radius],
    className
  );

  // Only apply fallback if the user doesn’t provide padding/bg in className
  const hasPadding = className?.match(/\bp[trblxy]?-?\d/);
  const hasBackground = className?.includes("bg-");

  const fallbackStyle: React.CSSProperties = {
    ...(hasPadding ? {} : { padding: "1rem" }),
    ...(hasBackground ? {} : { backgroundColor: "#ffffff" }),
    boxShadow: variant === "solid" ? "0 4px 10px rgba(0, 0, 0, 0.1)" : undefined,
    borderRadius: radius === "full" ? "9999px" : "0.75rem",
    ...style,
  };

  return (
    <div className={tailwindClass} style={fallbackStyle} {...props}>
      {children}
    </div>
  );
};
