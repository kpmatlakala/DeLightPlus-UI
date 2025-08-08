"use client"

import React, { useState, useRef, useEffect } from "react";
import { cn } from '../../lib/utils/cn';

// Menubar root
const Menubar = ({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) => (
  <nav
    className={cn("flex h-10 items-center space-x-1 rounded-md border bg-background p-1", className)}
    {...props}
  >
    {children}
  </nav>
);

// Context for open menu
const MenubarContext = React.createContext<{
  openIndex: number | null;
  setOpenIndex: (idx: number | null) => void;
} | null>(null);

// MenubarMenu: wraps each menu group
const MenubarMenu = ({ children }: { children: React.ReactNode }) => <>{children}</>;

// MenubarTrigger: button that opens menu
const MenubarTrigger = ({
  children,
  className,
  menuIndex,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { menuIndex: number }) => {
  const ctx = React.useContext(MenubarContext);
  const isOpen = ctx?.openIndex === menuIndex;
  return (
    <button
      className={cn(
        "flex cursor-pointer select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground",
        isOpen && "bg-accent text-accent-foreground",
        className
      )}
      aria-haspopup="menu"
      aria-expanded={isOpen}
      onClick={() => ctx?.setOpenIndex(isOpen ? null : menuIndex)}
      onBlur={() => setTimeout(() => ctx?.setOpenIndex(null), 100)}
      {...props}
    >
      {children}
    </button>
  );
};

// MenubarContent: dropdown menu
const MenubarContent = ({
  children,
  className,
  menuIndex,
  ...props
}: React.HTMLAttributes<HTMLUListElement> & { menuIndex: number }) => {
  const ctx = React.useContext(MenubarContext);
  const isOpen = ctx?.openIndex === menuIndex;
  return isOpen ? (
    <ul
      className={cn(
        "absolute mt-2 min-w-[12rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md z-50",
        className
      )}
      role="menu"
      tabIndex={-1}
      {...props}
    >
      {children}
    </ul>
  ) : null;
};

// MenubarItem: menu item
const MenubarItem = ({
  children,
  className,
  onClick,
  ...props
}: React.LiHTMLAttributes<HTMLLIElement>) => (
  <li
    className={cn(
      "flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
      className
    )}
    role="menuitem"
    tabIndex={-1}
    onClick={onClick}
    {...props}
  >
    {children}
  </li>
);

// MenubarSeparator
const MenubarSeparator = ({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) => (
  <hr className={cn("my-1 h-px bg-muted border-0", className)} {...props} />
);

// MenubarLabel
const MenubarLabel = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("px-2 py-1.5 text-sm font-semibold", className)} {...props}>
    {children}
  </div>
);

// MenubarShortcut
const MenubarShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />
);

// Wrapper to provide context and manage openIndex
const MenubarProvider = ({ children }: { children: React.ReactNode }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <MenubarContext.Provider value={{ openIndex, setOpenIndex }}>
      <div className="relative flex items-center">{children}</div>
    </MenubarContext.Provider>
  );
};

// Usage: Wrap Menubar with MenubarProvider, then for each menu:
// <MenubarMenu>
//   <MenubarTrigger menuIndex={0}>File</MenubarTrigger>
//   <MenubarContent menuIndex={0}>...</MenubarContent>
// </MenubarMenu>

export {
  MenubarProvider as Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarShortcut,
}
