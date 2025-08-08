import React from "react";
import { cn } from '../../lib/utils/cn';

interface SeparatorProps extends React.HTMLAttributes<HTMLHRElement | HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

const Separator = React.forwardRef<
  HTMLHRElement | HTMLDivElement,
  SeparatorProps
>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => {
  if (orientation === "vertical") {
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        role={decorative ? "presentation" : "separator"}
        aria-orientation="vertical"
        className={cn("shrink-0 bg-border h-full w-[1px]", className)}
        {...props}
      />
    );
  }
  return (
    <hr
      ref={ref as React.Ref<HTMLHRElement>}
      role={decorative ? "presentation" : "separator"}
      aria-orientation="horizontal"
      className={cn("shrink-0 bg-border h-[1px] w-full", className)}
      {...props}
    />
  );
});
Separator.displayName = "Separator";

export { Separator };
