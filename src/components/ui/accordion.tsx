import * as React from "react";
import { cn } from "../../lib/utils/cn";
import { ArrowIcon } from "src/icons/ArrowIcon";

type AccordionContextType = {
  open: boolean;
  toggle: () => void;
};

const AccordionItemContext = React.createContext<AccordionContextType | undefined>(undefined);

export interface AccordionProps {
  children: React.ReactNode;
  className?: string;
}
export const Accordion: React.FC<AccordionProps> = ({ children, className }) => (
  <div className={cn("divide-y", className)}>{children}</div>
);

export interface AccordionItemProps {
  defaultOpen?: boolean;
  className?: string;
  children: React.ReactNode;
}
export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ defaultOpen = false, className, children }, ref) => {
    const [open, setOpen] = React.useState(defaultOpen);
    const contextValue = React.useMemo(() => ({ open, toggle: () => setOpen((o) => !o) }), [open]);
    return (
      <AccordionItemContext.Provider value={contextValue}>
        <div ref={ref} className={cn("border-b", className)} data-state={open ? "open" : "closed"}>
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  }
);
AccordionItem.displayName = "AccordionItem";

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}
export const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ children, className, ...props }, ref) => {
    const ctx = React.useContext(AccordionItemContext);
    if (!ctx) throw new Error("AccordionTrigger must be used within AccordionItem");
    return (
      <button
        ref={ref}
        className={cn(
          "flex w-full items-center justify-between py-4 font-medium transition-all hover:underline",
          ctx.open && "text-primary",
          className
        )}
        onClick={ctx.toggle}
        aria-expanded={ctx.open}
        data-state={ctx.open ? "open" : "closed"}
        {...props}
      >
        {children}
        <ArrowIcon
          direction="down"
          variant="chevron"
          className={cn("h-4 w-4 transition-transform duration-200", ctx.open && "rotate-180")}
        />
      </button>
    );
  }
);
AccordionTrigger.displayName = "AccordionTrigger";

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}
export const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ children, className, ...props }, ref) => {
    const ctx = React.useContext(AccordionItemContext);
    if (!ctx) throw new Error("AccordionContent must be used within AccordionItem");
    return (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden transition-all",
          ctx.open ? "max-h-96" : "max-h-0",
          className
        )}
        style={{ transition: "max-height 0.3s ease" }}
        aria-hidden={!ctx.open}
        data-state={ctx.open ? "open" : "closed"}
        {...props}
      >
        <div className="pb-4 pt-0">{children}</div>
      </div>
    );
  }
);
AccordionContent.displayName = "AccordionContent";


/*Usage Example:
<Accordion>
  <AccordionItem defaultOpen>
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>
      Content for section 1
    </AccordionContent>
  </AccordionItem>
  <AccordionItem>
    <AccordionTrigger>Section 2</AccordionTrigger>
    <AccordionContent>
      Content for section 2
    </AccordionContent>
  </AccordionItem>
</Accordion>*/