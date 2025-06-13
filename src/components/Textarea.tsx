import React from "react";
import { clsx } from "clsx";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: "outlined" | "filled" | "standard";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
};

const variantMap = {
  outlined: "border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
  filled: "bg-gray-100 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
  standard: "border-b border-gray-300 focus:border-blue-500 focus:ring-0",
};

const sizeMap = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

export const Textarea: React.FC<TextareaProps> = ({
  className,
  label,
  error,
  helperText,
  variant = "outlined",
  size = "md",
  fullWidth = false,
  ...props
}) => {
  const tailwindClass = clsx(
    "block w-full rounded-md transition-colors duration-200",
    variantMap[variant],
    sizeMap[size],
    error && "border-red-500 focus:border-red-500 focus:ring-red-500",
    fullWidth ? "w-full" : "w-auto",
    className
  );

  const fallbackStyle: React.CSSProperties = {
    minHeight: size === "sm" ? "80px" : size === "lg" ? "120px" : "100px",
    resize: "vertical",
  };

  return (
    <div className={clsx("flex flex-col gap-1", fullWidth ? "w-full" : "w-auto")}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        className={tailwindClass}
        style={fallbackStyle}
        {...props}
      />
      {(error || helperText) && (
        <p className={clsx(
          "text-sm",
          error ? "text-red-500" : "text-gray-500"
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}; 