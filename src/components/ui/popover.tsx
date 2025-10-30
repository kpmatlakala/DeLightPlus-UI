"use client";

import React, { useState, useRef, useEffect, createContext, useContext } from "react";
import { cn } from '../../lib/utils/cn';

const PopoverContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
} | null>(null);

const Popover = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  return (
    <PopoverContext.Provider value={{ open, setOpen, triggerRef }}>
      <div className="relative inline-block">{children}</div>
    </PopoverContext.Provider>
  );
};

const PopoverTrigger = ({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const ctx = useContext(PopoverContext);
  if (!ctx) throw new Error('PopoverTrigger must be used within Popover');
  return (
    <button
      ref={ctx.triggerRef}
      className={cn("focus:outline-none", className)}
      aria-haspopup="dialog"
      aria-expanded={ctx.open}
      onClick={() => ctx.setOpen(!ctx.open)}
      {...props}
    >
      {children}
    </button>
  );
};

const PopoverContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, style, children, ...props }, ref) => {
    const ctx = useContext(PopoverContext);
    const contentRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      if (!ctx || !ctx.open) return;
      function handleClick(e: MouseEvent) {
        if (
          contentRef.current &&
          !contentRef.current.contains(e.target as Node) &&
          ctx.triggerRef.current &&
          !ctx.triggerRef.current.contains(e.target as Node)
        ) {
          ctx.setOpen(false);
        }
      }
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }, [ctx?.open]);
    if (!ctx || !ctx.open) return null;
    // Use a callback ref to assign both to contentRef and the forwarded ref
    const setRefs = (node: HTMLDivElement | null) => {
      contentRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref && typeof ref === 'object') (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    };
    return (
      <div
        ref={setRefs}
        className={cn(
          "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md absolute mt-2 left-1/2 -translate-x-1/2 outline-none",
          className
        )}
        style={style}
        tabIndex={-1}
        {...props}
      >
        {children}
      </div>
    );
  }
);
PopoverContent.displayName = "PopoverContent";

export { Popover, PopoverTrigger, PopoverContent };
