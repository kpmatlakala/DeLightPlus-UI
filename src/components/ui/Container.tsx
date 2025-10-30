"use client";

// components/container.tsx
import React from "react";
import { cn } from "../../lib/utils/cn";

export type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  width?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padded?: boolean;
};

const widthMap: Record<NonNullable<ContainerProps["width"]>, string> = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  full: "min-w-full max-w-full",
};

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className, style, width = "lg", padded = true, ...props }, ref) => {
    const tailwindClass = cn(
      "mx-auto w-full",
      widthMap[width],
      padded && "px-4 md:px-6",
      className
    );

    const fallbackStyle: React.CSSProperties = {
      maxWidth: "100vw",
      margin: "0 auto",
      ...style,
    };

    return (
      <div ref={ref} className={tailwindClass} style={fallbackStyle} {...props}>
        {children}
      </div>
    );
  }
);
Container.displayName = "Container";
