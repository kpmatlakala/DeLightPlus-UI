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
  outlined: "border border-border bg-background focus:outline-none focus:border-border focus:ring-2 focus:ring-[hsl(var(--border))]",
  filled: "bg-secondary border border-transparent focus:outline-none focus:bg-background focus:border-border focus:ring-2 focus:ring-[hsl(var(--border))]",
  standard: "bg-background border-0 border-b border-border rounded-none focus:outline-none focus:border-border focus:ring-0",
};

const sizeMap = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ 
  className,
  options,
  label,
  error,
  helperText,
  variant = "outlined",
  size = "md",
  fullWidth = false,
  id,
  ...props
}, ref) => {
  const tailwindClass = cn(
    'block rounded-md bg-background text-foreground transition-colors',
    variantMap[variant],
    sizeMap[size],
    error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
    fullWidth ? 'w-full' : 'w-auto',
    className
  );

  return (
    <div className={cn('flex flex-col gap-1', fullWidth ? 'w-full' : 'w-auto')}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-foreground/80">
          {label}
        </label>
      )}
      <select
        id={id}
        ref={ref}
        className={tailwindClass}
        aria-invalid={!!error}
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
          error ? 'text-red-500' : 'text-foreground/60'
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});
Select.displayName = 'Select';