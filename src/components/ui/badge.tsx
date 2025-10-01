import React from 'react';
import { cn } from '../../lib/utils/cn';
import { Slot } from './Slot';

export interface BadgeProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  asChild?: boolean;
}

export const Badge = React.forwardRef<HTMLElement, BadgeProps>(
  ({ className, variant = 'default', asChild = false, ...props }, ref) => {
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

    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn(base, variantClass, className)}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';


/*
Explanation:
- The component uses React.forwardRef to forward refs.
- asChild controls whether to render a Slot (which clones children) or a normal div.
- cn merges base styles, variant classes, and any additional classes.
- The ref is forwarded to either the Slot or the div properly.
- Existing usage without asChild continues working exactly the same.

Usage examples:
Normal div badge (default):
<Badge variant="secondary">Hello</Badge>

Badge rendering a link with styles applied:
<Badge asChild variant="outline">
  <a href="/profile">Profile Link</a>
</Badge>

*/