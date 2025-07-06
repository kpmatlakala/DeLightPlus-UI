"use client"

import React, { useState, useContext, createContext, ReactNode, useCallback } from "react";

/**
 * Context for Collapsible state
 */
interface CollapsibleContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CollapsibleContext = createContext<CollapsibleContextProps | undefined>(undefined);

/**
 * Collapsible root component. Controls open state and provides context.
 */
interface CollapsibleProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
  className?: string;
}

export const Collapsible: React.FC<CollapsibleProps> = ({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
  className,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;

  const setOpen = useCallback((value: boolean) => {
    if (controlledOpen === undefined) setUncontrolledOpen(value);
    onOpenChange?.(value);
  }, [controlledOpen, onOpenChange]);

  return (
    <CollapsibleContext.Provider value={{ open, setOpen }}>
      <div className={className}>{children}</div>
    </CollapsibleContext.Provider>
  );
};

/**
 * Collapsible trigger button. Toggles the open state.
 */
interface CollapsibleTriggerProps {
  children: ReactNode;
  className?: string;
}

export const CollapsibleTrigger: React.FC<CollapsibleTriggerProps> = ({ children, className }) => {
  const context = useContext(CollapsibleContext);
  if (!context) throw new Error("CollapsibleTrigger must be used within a Collapsible");
  return (
    <button
      type="button"
      aria-expanded={context.open}
      aria-controls="collapsible-content"
      onClick={() => context.setOpen(!context.open)}
      className={className}
    >
      {children}
    </button>
  );
};

/**
 * Collapsible content. Shows or hides children based on open state.
 */
interface CollapsibleContentProps {
  children: ReactNode;
  className?: string;
}

export const CollapsibleContent: React.FC<CollapsibleContentProps> = ({ children, className }) => {
  const context = useContext(CollapsibleContext);
  if (!context) throw new Error("CollapsibleContent must be used within a Collapsible");
  return (
    <div
      id="collapsible-content"
      className={[
        "transition-all duration-300 ease-in-out overflow-hidden",
        context.open ? "max-h-screen opacity-100" : "max-h-0 opacity-0",
        className ?? ""
      ].join(" ")}
      aria-hidden={!context.open}
    >
      {children}
    </div>
  );
};
