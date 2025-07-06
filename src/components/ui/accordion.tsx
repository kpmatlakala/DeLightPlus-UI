import React, { useState } from 'react';
import { cn } from '../../lib/utils/cn';
import { ChevronDownIcon } from '../../icons';

export interface AccordionItemProps {
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  defaultOpen?: boolean;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, className, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={cn('border-b', className)}>
      <button
        className={cn('flex w-full items-center justify-between py-4 font-medium transition-all hover:underline', open && 'text-primary')}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {title}
        <ChevronDownIcon className={cn('h-4 w-4 transition-transform duration-200', open && 'rotate-180')} />
      </button>
      <div className={cn('overflow-hidden transition-all', open ? 'max-h-96' : 'max-h-0')}
        style={{ transition: 'max-height 0.3s ease' }}
        aria-hidden={!open}
      >
        <div className="pb-4 pt-0">{children}</div>
      </div>
    </div>
  );
};

export interface AccordionProps {
  children: React.ReactNode;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ children, className }) => (
  <div className={cn('divide-y', className)}>{children}</div>
);
