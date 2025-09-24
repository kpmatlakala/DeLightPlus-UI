// components/Button.tsx
import React from "react";
import { cn } from "../../lib/utils/cn";
import { Slot } from "./Slot";
 

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "custom";
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
  ...props
}) => {
  const tailwindClass = cn(
    "flex items-center justify-center gap-2 transition duration-200",
    variant === "primary" && "bg-blue-500 text-white hover:bg-blue-600",
    variant === "secondary" && "bg-gray-200 text-gray-900 hover:bg-gray-300",
    variant === "outline" && "border border-gray-300 text-gray-900 hover:bg-gray-100",
    variant === "ghost" && "bg-transparent hover:bg-gray-100",
    variant === "custom" && "",
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
        disabled={isLoading}
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
      disabled={isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};


/* Usage Examples:
<Button variant="primary" onClick={() => alert('Clicked!')}>Primary Button</Button>
<Button variant="secondary" radius="lg" size="lg">Secondary Large Button</Button>

You use the asChild prop when you want your Button to render a different element (like an <a>, a custom router <Link>, etc.) instead of a native <button>, but still apply all the button styles and props.

Typical use cases:

Navigation links:
Next.js/React Router links:
Any custom element:
Summary:
Use asChild when you want to style and behave like a button, but render a different element.
*/