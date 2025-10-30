"use client";

import React, { useState, useMemo, useRef, useEffect, createContext, useContext, ReactNode } from "react";
import { Dialog, DialogContent } from "./dialog";
import { SearchIcon } from "../../icons/SearchIcon";
import { cn } from "../../lib/utils/cn";

interface CommandContextProps {
  query: string;
  setQuery: (q: string) => void;
}
const CommandContext = createContext<CommandContextProps | undefined>(undefined);

/** Command root: provides context */
export const Command: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => {
  const [query, setQuery] = useState("");
  return (
    <CommandContext.Provider value={{ query, setQuery }}>
      <div className={cn("flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground", className)}>
        {children}
      </div>
    </CommandContext.Provider>
  );
};

/** CommandDialog: wraps in Dialog */
export const CommandDialog: React.FC<{ open: boolean; onOpenChange: (open: boolean) => void; children: ReactNode }> = ({ children, ...props }) => (
  <Dialog {...props}>
    <DialogContent className="overflow-hidden p-0 shadow-lg">
      <Command>{children}</Command>
    </DialogContent>
  </Dialog>
);

/** CommandInput: search input with icon */
export const CommandInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className, ...props }) => {
  const context = useContext(CommandContext);
  if (!context) throw new Error("CommandInput must be used within Command");
  return (
    <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
      <SearchIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
      <input
        type="text"
        value={context.query}
        onChange={e => context.setQuery(e.target.value)}
        className={cn("flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50", className)}
        {...props}
      />
    </div>
  );
};

/** CommandList: container for items */
export const CommandList: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}>{children}</div>
);

/** CommandEmpty: shown when no results */
export const CommandEmpty: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="py-6 text-center text-sm">{children}</div>
);

/** CommandGroup: groups items */
export const CommandGroup: React.FC<{ children: ReactNode; heading?: ReactNode; className?: string }> = ({ children, heading, className }) => (
  <div className={cn("overflow-hidden p-1 text-foreground", className)}>
    {heading && <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">{heading}</div>}
    {children}
  </div>
);

/** CommandSeparator: visual separator */
export const CommandSeparator: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("-mx-1 h-px bg-border", className)} />
);

/** CommandItem: selectable item */
export const CommandItem: React.FC<{
  children: ReactNode;
  value: string;
  onSelect?: () => void;
  className?: string;
  disabled?: boolean;
}> = ({ children, value, onSelect, className, disabled }) => {
  const context = useContext(CommandContext);
  const ref = useRef<HTMLDivElement>(null);
  const selected = context?.query && value.toLowerCase().includes(context.query.toLowerCase());
  useEffect(() => {
    if (selected && ref.current) ref.current.scrollIntoView({ block: "nearest" });
  }, [selected]);
  return (
    <div
      ref={ref}
      tabIndex={disabled ? -1 : 0}
      role="option"
      aria-selected={!!selected}
      onClick={() => !disabled && onSelect?.()}
      className={cn(
        "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
        selected && "bg-accent text-accent-foreground",
        disabled && "pointer-events-none opacity-50",
        className
      )}
    >
      {children}
    </div>
  );
};

/** CommandShortcut: right-aligned shortcut text */
export const CommandShortcut: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ className, ...props }) => (
  <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />
);
