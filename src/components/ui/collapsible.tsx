"use client";

import React, {
  useState,
  useContext,
  createContext,
  ReactNode,
  useCallback,
  useId,
} from "react";
import { cn } from "src/lib/utils/cn";

interface CollapsibleContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  contentId: string;
}

const CollapsibleContext = createContext<CollapsibleContextProps | undefined>(undefined);

// ----------------------------------------
// Root: Collapsible
// ----------------------------------------
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
  const contentId = useId();

  const setOpen = useCallback(
    (value: boolean) => {
      if (controlledOpen === undefined) setUncontrolledOpen(value);
      onOpenChange?.(value);
    },
    [controlledOpen, onOpenChange]
  );

  return (
    <CollapsibleContext.Provider value={{ open, setOpen, contentId }}>
      <div className={className}>{children}</div>
    </CollapsibleContext.Provider>
  );
};

// ----------------------------------------
// Trigger: CollapsibleTrigger
// ----------------------------------------
interface CollapsibleTriggerProps {
  children: ReactNode;
  className?: string;
}

export const CollapsibleTrigger: React.FC<CollapsibleTriggerProps> = ({
  children,
  className,
}) => {
  const context = useContext(CollapsibleContext);
  if (!context) throw new Error("CollapsibleTrigger must be used within a Collapsible");

  const { open, setOpen, contentId } = context;

  return (
    <button
      type="button"
      aria-expanded={open}
      aria-controls={contentId}
      data-state={open ? "open" : "closed"}
      onClick={() => setOpen(!open)}
      className={className}
    >
      {children}
    </button>
  );
};

// ----------------------------------------
// Content: CollapsibleContent
// ----------------------------------------
interface CollapsibleContentProps {
  children: ReactNode;
  className?: string;
}

export const CollapsibleContent: React.FC<CollapsibleContentProps> = ({
  children,
  className,
}) => {
  const context = useContext(CollapsibleContext);
  if (!context) throw new Error("CollapsibleContent must be used within a Collapsible");

  const { open, contentId } = context;

  return (
    <div
      id={contentId}
      role="region"
      aria-hidden={!open}
      data-state={open ? "open" : "closed"}
      className={cn(
        "transition-all duration-300 ease-in-out overflow-hidden",
        open ? "max-h-screen opacity-100" : "max-h-0 opacity-0",
        className
      )}
    >
      {children}
    </div>
  );
};

// ----------------------------------------
// Usage Example (With Button component)
// ----------------------------------------
/*
<Collapsible>
  <CollapsibleTrigger>
    <Button
      variant="ghost"
      radius="md"
      size="md"
      className="w-full justify-between"
    >
      Toggle
      <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
    </Button>
  </CollapsibleTrigger>

  <CollapsibleContent className="px-4 py-2">
    <p>This is some hidden content revealed when open.</p>
  </CollapsibleContent>
</Collapsible>
*/

