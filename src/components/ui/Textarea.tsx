import React from "react";
import { cn } from '../../lib/utils/cn';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: "outlined" | "filled" | "standard";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
};

const variantMap = {
  outlined: "bg-transparent border border-border focus:outline-none focus:ring-2 focus:ring-[hsl(var(--border))]",
  filled: "bg-secondary border border-transparent focus:outline-none focus:bg-background focus:ring-2 focus:ring-[hsl(var(--border))]",
  standard: "border-0 border-b border-border rounded-none focus:outline-none focus:ring-0",
};

const sizeMap = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({
  className,
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
    'block w-full rounded-md bg-background text-foreground placeholder-muted-foreground transition-colors duration-200',
    variantMap[variant],
    sizeMap[size],
    error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
    fullWidth ? 'w-full' : 'w-auto',
    className
  );

  const fallbackStyle: React.CSSProperties = {
    minHeight: size === "sm" ? "80px" : size === "lg" ? "120px" : "100px",
    resize: "vertical",
  };

  return (
    <div className={cn('flex flex-col gap-1', fullWidth ? 'w-full' : 'w-auto')}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-foreground/80">
          {label}
        </label>
      )}
      <textarea
        id={id}
        ref={ref}
        className={tailwindClass}
        style={fallbackStyle}
        aria-invalid={!!error}
        {...props}
      />
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

Textarea.displayName = "Textarea";