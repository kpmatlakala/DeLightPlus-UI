import React from "react";
import { cn } from '../../lib/utils/cn';

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> & {
  options: SelectOption[];
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

export const Select: React.FC<SelectProps> = ({
  className,
  options,
  label,
  error,
  helperText,
  variant = "outlined",
  size = "md",
  fullWidth = false,
  ...props
}) => {
  const tailwindClass = cn(
    'block rounded-md transition-colors duration-200',
    variantMap[variant],
    sizeMap[size],
    error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
    fullWidth ? 'w-full' : 'w-auto',
    className
  );

  return (
    <div className={cn('flex flex-col gap-1', fullWidth ? 'w-full' : 'w-auto')}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        className={tailwindClass}
        {...props}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      {(error || helperText) && (
        <p className={cn(
          'text-sm',
          error ? 'text-red-500' : 'text-gray-500'
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}; 