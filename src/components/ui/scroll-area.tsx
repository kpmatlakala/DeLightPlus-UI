"use client";

import React from "react";
import { cn } from '../../lib/utils/cn';

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, children, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative overflow-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-border scrollbar-track-transparent",
        className
      )}
      style={style}
      {...props}
    >
      {children}
    </div>
  )
);
ScrollArea.displayName = "ScrollArea";

// Optionally, a ScrollBar component for custom placement (not needed for most use cases)
const ScrollBar = () => null;

export { ScrollArea, ScrollBar };
