"use client";

import React from 'react';
import { cn } from '../../lib/utils/cn'; 
import { CheckIcon } from '../../icons';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, checked, ...props }, ref) => (
    <label className={cn("inline-flex items-center cursor-pointer relative", className)}>
      <input
        type="checkbox"
        ref={ref}
        checked={checked}
        className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        {...props}
      />
      <span className="pointer-events-none absolute flex h-4 w-4 items-center justify-center">
        {/* Show check icon if checked */}
        {checked && <CheckIcon className="h-4 w-4 text-primary" />}
      </span>
      {label && <span className="ml-2">{label}</span>}
    </label>
  )
);

Checkbox.displayName = 'Checkbox';
