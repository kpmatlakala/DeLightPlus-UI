// components/Card.tsx
import React from 'react';
import { cn } from '../../lib/utils/cn';
import { Slot } from './slot';


type AsChildProps = { asChild?: boolean };
type Variant = 'default' | 'muted' | 'outline';

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & AsChildProps & { variant?: Variant }
>(({ className, asChild, variant = 'default', ...props }, ref) => {
  const Comp = asChild ? Slot : 'div';
  const variantClass =
    variant === 'muted'
      ? 'bg-muted text-foreground/90 border-border'
      : variant === 'outline'
      ? 'bg-background text-foreground border-border'
      : 'bg-card text-card-foreground border-border';
  return (
    <Comp
      ref={ref}
      className={cn('rounded-lg border shadow-sm', variantClass, className)}
      {...props}
    />
  );
});
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & AsChildProps
>(({ className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  );
});
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & AsChildProps
>(({ className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : 'h3';
  return (
    <Comp
      ref={ref}
      className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  );
});
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & AsChildProps
>(({ className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : 'p';
  return (
    <Comp
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
});
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & AsChildProps
>(({ className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  );
});
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & AsChildProps
>(({ className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      ref={ref}
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  );
});
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
