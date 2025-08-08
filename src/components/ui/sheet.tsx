"use client"

import React, { useState, useContext, createContext, useRef } from "react";
import { cn } from '../../lib/utils/cn';

// Context for Sheet open/close state
const SheetContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
} | null>(null);

interface SheetProps {
  children: React.ReactNode;
}
const Sheet = ({ children }: SheetProps) => {
  const [open, setOpen] = useState(false);
  return (
    <SheetContext.Provider value={{ open, setOpen }}>{children}</SheetContext.Provider>
  );
};

interface SheetTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
const SheetTrigger = ({ children, ...props }: SheetTriggerProps) => {
  const ctx = useContext(SheetContext);
  if (!ctx) throw new Error("SheetTrigger must be used within Sheet");
  return (
    <button type="button" onClick={() => ctx.setOpen(true)} {...props}>
      {children}
    </button>
  );
};

interface SheetCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}
const SheetClose = ({ children, ...props }: SheetCloseProps) => {
  const ctx = useContext(SheetContext);
  if (!ctx) throw new Error("SheetClose must be used within Sheet");
  return (
    <button type="button" onClick={() => ctx.setOpen(false)} {...props}>
      {children}
    </button>
  );
};

interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "right" | "left" | "top" | "bottom";
  children: React.ReactNode;
}
const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({ side = "right", className, children, ...props }, ref) => {
    const ctx = useContext(SheetContext);
    if (!ctx) throw new Error("SheetContent must be used within Sheet");
    if (!ctx.open) return null;
    // Side positioning
    const sideClasses = {
      right: "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
      left: "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
      top: "inset-x-0 top-0 border-b",
      bottom: "inset-x-0 bottom-0 border-t",
    };
    return (
      <>
        <div
          className="fixed inset-0 z-50 bg-black/80 animate-fade-in"
          onClick={() => ctx.setOpen(false)}
          aria-label="Close sheet overlay"
        />
        <div
          ref={ref}
          className={cn(
            "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out animate-slide-in flex flex-col",
            sideClasses[side],
            className
          )}
          {...props}
        >
          {children}
          <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <span className="sr-only">Close</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="4" y1="4" x2="12" y2="12" stroke="currentColor" strokeWidth="2"/><line x1="12" y1="4" x2="4" y2="12" stroke="currentColor" strokeWidth="2"/></svg>
          </SheetClose>
        </div>
      </>
    );
  }
);
SheetContent.displayName = "SheetContent";

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} className={cn("text-lg font-semibold text-foreground", className)} {...props} />
  )
);
SheetTitle.displayName = "SheetTitle";

const SheetDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
);
SheetDescription.displayName = "SheetDescription";

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
