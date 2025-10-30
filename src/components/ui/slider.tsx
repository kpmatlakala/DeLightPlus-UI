"use client";

import React from "react";
import { cn } from '../../lib/utils/cn';

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, value, min = 0, max = 100, step = 1, onChange, ...props }, ref) => (
    <input
      ref={ref}
      type="range"
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={onChange}
      className={cn(
        "relative w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer transition-all",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        className
      )}
      style={{
        background: `linear-gradient(to right, var(--tw-bg-primary, #3b82f6) 0%, var(--tw-bg-primary, #3b82f6) ${(value ?? min) / (max - min) * 100}%, var(--tw-bg-secondary, #e5e7eb) ${(value ?? min) / (max - min) * 100}%, var(--tw-bg-secondary, #e5e7eb) 100%)`,
      }}
      {...props}
    />
  )
);
Slider.displayName = "Slider";

export { Slider };
