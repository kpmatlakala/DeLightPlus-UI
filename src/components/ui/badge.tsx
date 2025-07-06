import React from 'react';
import { cn } from '../../lib/utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const base =
    'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';
  let variantClass = '';
  switch (variant) {
    case 'secondary':
      variantClass = 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80';
      break;
    case 'destructive':
      variantClass = 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80';
      break;
    case 'outline':
      variantClass = 'text-foreground';
      break;
    default:
      variantClass = 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80';
  }
  return (
    <div className={cn(base, variantClass, className)} {...props} />
  );
}
