import React from 'react';
import { cn } from '../../lib/utils/cn';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  required?: boolean;
  showCount?: boolean;
  maxLength?: number;
  variant?: "default" | "password" | "otp" | "search";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    variant = "default",
    className, 
    type, 
    label,
    error,
    prefixIcon,
    suffixIcon,
    required,
    showCount,
    maxLength,
    ...props 
  }, ref) => {
    const [value, setValue] = React.useState(props.value || props.defaultValue || '');
    const [showPassword, setShowPassword] = React.useState(false);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      props.onChange?.(e);
    };

    let inputType = type;
    if (variant === "password") {
      inputType = showPassword ? "text" : "password";
    } else if (variant === "search") {
      inputType = "search";
    } else if (variant === "otp") {
      inputType = "text";
    }

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {prefixIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              {prefixIcon}
            </div>
          )}
          <input
            type={inputType}
            className={cn(
              'flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              prefixIcon && 'pl-10',
              suffixIcon && 'pr-10',
              error ? 'border-red-500' : 'border-input',
              className
            )}
            ref={ref}
            onChange={handleChange}
            maxLength={maxLength}
            {...props}
          />
          {variant === "password" && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          )}
          {suffixIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              {suffixIcon}
            </div>
          )}
        </div>
        <div className="flex justify-between mt-1">
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
          {showCount && maxLength && (
            <p className="text-sm text-gray-500">
              {String(value).length}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };