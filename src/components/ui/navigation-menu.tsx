"use client";

import React, { useState, useRef, useContext, createContext } from "react";
import { cn } from '../../lib/utils/cn';

// Context for open menu
const NavigationMenuContext = createContext<{
  openIndex: number | null;
  setOpenIndex: (idx: number | null) => void;
} | null>(null);

// Root navigation menu
const NavigationMenu = ({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <NavigationMenuContext.Provider value={{ openIndex, setOpenIndex }}>
      <nav className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)} {...props}>
        {children}
      </nav>
    </NavigationMenuContext.Provider>
  );
};

// List of navigation items
const NavigationMenuList = ({ className, children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
  <ul className={cn("group flex flex-1 list-none items-center justify-center space-x-1", className)} {...props}>
    {children}
  </ul>
);

// Single navigation item (wrapper)
const NavigationMenuItem = ({ children, ...props }: React.LiHTMLAttributes<HTMLLIElement>) => (
  <li className="relative" {...props}>{children}</li>
);

// Trigger for dropdown
const NavigationMenuTrigger = ({
  children,
  className,
  menuIndex,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { menuIndex: number }) => {
  const ctx = useContext(NavigationMenuContext);
  const isOpen = ctx?.openIndex === menuIndex;
  return (
    <button
      className={cn(
        "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
        isOpen && "text-accent-foreground bg-accent/50",
        className
      )}
      aria-haspopup="menu"
      aria-expanded={isOpen}
      onClick={() => ctx?.setOpenIndex(isOpen ? null : menuIndex)}
      onBlur={() => setTimeout(() => ctx?.setOpenIndex(null), 100)}
      {...props}
    >
      {children}
      <span className={cn("ml-1 transition-transform duration-200", isOpen && "rotate-180")}
        aria-hidden="true"
      >▼</span>
    </button>
  );
};

// Dropdown content
const NavigationMenuContent = ({
  children,
  className,
  menuIndex,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { menuIndex: number }) => {
  const ctx = useContext(NavigationMenuContext);
  const isOpen = ctx?.openIndex === menuIndex;
  return isOpen ? (
    <div
      className={cn(
        "absolute left-0 top-full w-full md:w-auto mt-1.5 rounded-md border bg-popover text-popover-foreground shadow-lg z-50",
        className
      )}
      role="menu"
      tabIndex={-1}
      {...props}
    >
      {children}
    </div>
  ) : null;
};

// Navigation link
const NavigationMenuLink = ({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a className={cn("block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded", className)} {...props} />
);

// Indicator (simple triangle)
const NavigationMenuIndicator = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("absolute left-1/2 -translate-x-1/2 top-full z-[1] flex h-1.5 items-end justify-center", className)} {...props}>
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </div>
);

// Viewport (for animation, optional)
const NavigationMenuViewport = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("absolute left-0 top-full flex justify-center", className)} {...props} />
);

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
}
