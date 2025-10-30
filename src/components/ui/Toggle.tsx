"use client";

import React from "react";
import { cn } from '../../lib/utils/cn';

export type ToggleProps = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "success" | "danger";
  className?: string;
  style?: React.CSSProperties;
};

const sizeMap = {
  sm: "w-8 h-4",
  md: "w-12 h-6",
  lg: "w-16 h-8",
};

const variantMap = {
  primary: "bg-blue-500",
  secondary: "bg-gray-500",
  success: "bg-green-500",
  danger: "bg-red-500",
};

export const Toggle: React.FC<ToggleProps> = ({
  checked = false,
  onChange,
  disabled = false,
  size = "md",
  variant = "primary",
  className,
  style,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && onChange) {
      onChange(e.target.checked);
    }
  };

  const tailwindClass = cn(
    "relative inline-flex items-center rounded-full transition-colors duration-200 ease-in-out",
    sizeMap[size],
    checked ? variantMap[variant] : "bg-gray-300",
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  const fallbackStyle: React.CSSProperties = {
    cursor: disabled ? "not-allowed" : "pointer",
    ...style,
  };

  return (
    <label className={tailwindClass} style={fallbackStyle}>
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
      />
      <span
        className={cn(
          "absolute left-0.5 top-0.5 bg-white rounded-full transition-transform duration-200 ease-in-out",
          size === "sm" && "w-3 h-3",
          size === "md" && "w-5 h-5",
          size === "lg" && "w-7 h-7",
          checked && "translate-x-full"
        )}
      />
    </label>
  );
}; 