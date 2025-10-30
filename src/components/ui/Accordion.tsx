"use client";

import * as React from "react";
import { cn } from "../../lib/utils/cn";
import { ArrowIcon } from "../../icons/ArrowIcon";

type AccordionContextType = {
  openIndex: number | null;
  setOpenIndex: (i: number | null) => void;
};

const AccordionContext = React.createContext<AccordionContextType | undefined>(undefined);

export interface AccordionProps {
  children: React.ReactNode;
  className?: string;
}
export const Accordion: React.FC<AccordionProps> = ({ children, className }) => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  return (
    <AccordionContext.Provider value={{ openIndex, setOpenIndex }}>
      <div className={cn("divide-y", className)}>
        {React.Children.map(children, (child, i) =>
          React.isValidElement(child)
            ? React.cloneElement(child, { index: i })
            : child
        )}
      </div>
    </AccordionContext.Provider>
  );
};

export interface AccordionItemProps {
  index?: number;
  className?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}
export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ index, className, children, defaultOpen = false }, ref) => {
    const ctx = React.useContext(AccordionContext);

    // Set initial openIndex if defaultOpen is true
    React.useEffect(() => {
      if (defaultOpen && ctx?.openIndex === null) {
        ctx?.setOpenIndex(index ?? null);
      }
    }, [defaultOpen, ctx, index]);

    const open = ctx?.openIndex === index;
    return (
      <div ref={ref} className={cn("border-b", className)} data-state={open ? "open" : "closed"}>
        {React.Children.map(children, child =>
          React.isValidElement(child)
            ? React.cloneElement(child, { open, toggle: () => ctx?.setOpenIndex(open ? null : index ?? null) })
            : child
        )}
      </div>
    );
  }
);
AccordionItem.displayName = "AccordionItem";

export interface AccordionTriggerProps {
  open?: boolean;
  toggle?: () => void;
  className?: string;
  children: React.ReactNode;
}
export const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ open, toggle, className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "flex w-full items-center justify-between py-4 font-medium transition-all hover:underline",
        open && "text-primary",
        className
      )}
      onClick={toggle}
      aria-expanded={open}
      data-state={open ? "open" : "closed"}
      {...props}
    >
      {children}
      <ArrowIcon
        direction="down"
        variant="chevron"
        className={cn("h-4 w-4 transition-transform duration-200", open && "rotate-180")}
      />
    </button>
  )
);
AccordionTrigger.displayName = "AccordionTrigger";

export interface AccordionContentProps {
  open?: boolean;
  className?: string;
  children: React.ReactNode;
}
export const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ open, className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "overflow-hidden transition-all",
        open ? "max-h-96" : "max-h-0",
        className
      )}
      style={{ transition: "max-height 0.3s ease" }}
      aria-hidden={!open}
      data-state={open ? "open" : "closed"}
      {...props}
    >
      <div className="pb-4 pt-0">{children}</div>
    </div>
  )
);
AccordionContent.displayName = "AccordionContent";