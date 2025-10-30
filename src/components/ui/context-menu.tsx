"use client";

import React, { useRef, useState, useEffect } from 'react';
import { cn } from '../../lib/utils/cn';
import { CheckIcon, ArrowIcon, CircleIcon } from '../../icons';

// ContextMenu primitives
export const ContextMenu = ({ children }: { children: React.ReactNode }) => <>{children}</>;

export const ContextMenuTrigger = ({ children, onContextMenu }: { children: React.ReactNode; onContextMenu?: (e: React.MouseEvent) => void }) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={triggerRef} onContextMenu={onContextMenu} style={{ display: 'inline-block' }}>
      {children}
    </div>
  );
};

export const ContextMenuContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, style, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'z-50 min-w-[8rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md absolute',
        className
      )}
      style={style}
      tabIndex={-1}
      {...props}
    >
      {children}
    </div>
  )
);
ContextMenuContent.displayName = 'ContextMenuContent';

export const ContextMenuItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { inset?: boolean; disabled?: boolean }>(
  ({ className, inset, disabled, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
        'focus:bg-accent focus:text-accent-foreground',
        disabled && 'pointer-events-none opacity-50',
        inset && 'pl-8',
        className
      )}
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      {...props}
    />
  )
);
ContextMenuItem.displayName = 'ContextMenuItem';

export const ContextMenuCheckboxItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { checked?: boolean; disabled?: boolean }>(
  ({ className, children, checked, disabled, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none',
        'focus:bg-accent focus:text-accent-foreground',
        disabled && 'pointer-events-none opacity-50',
        className
      )}
      tabIndex={disabled ? -1 : 0}
      aria-checked={checked}
      aria-disabled={disabled}
      role="menuitemcheckbox"
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {checked ? <CheckIcon size={16} /> : null}
      </span>
      {children}
    </div>
  )
);
ContextMenuCheckboxItem.displayName = 'ContextMenuCheckboxItem';

export const ContextMenuRadioItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { checked?: boolean; disabled?: boolean }>(
  ({ className, children, checked, disabled, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none',
        'focus:bg-accent focus:text-accent-foreground',
        disabled && 'pointer-events-none opacity-50',
        className
      )}
      tabIndex={disabled ? -1 : 0}
      aria-checked={checked}
      aria-disabled={disabled}
      role="menuitemradio"
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {checked ? <CircleIcon size={12} /> : null}
      </span>
      {children}
    </div>
  )
);
ContextMenuRadioItem.displayName = 'ContextMenuRadioItem';

export const ContextMenuLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }>(
  ({ className, inset, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-2 py-1.5 text-sm font-semibold text-foreground', inset && 'pl-8', className)}
      {...props}
    />
  )
);
ContextMenuLabel.displayName = 'ContextMenuLabel';

export const ContextMenuSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('-mx-1 my-1 h-px bg-border', className)} role="separator" {...props} />
  )
);
ContextMenuSeparator.displayName = 'ContextMenuSeparator';

export const ContextMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)} {...props} />
);
ContextMenuShortcut.displayName = 'ContextMenuShortcut';

// Submenu primitives (simple example, can be expanded for full keyboard support)
export const ContextMenuSub = ({ children }: { children: React.ReactNode }) => <>{children}</>;

export const ContextMenuSubTrigger = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }>(
  ({ className, inset, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
        'focus:bg-accent focus:text-accent-foreground',
        inset && 'pl-8',
        className
      )}
      tabIndex={0}
      {...props}
    >
      {children}
      <ArrowIcon variant='chevron' direction='right' className="ml-auto w-4 h-4" />
    </div>
  )
);
ContextMenuSubTrigger.displayName = 'ContextMenuSubTrigger';

export const ContextMenuSubContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, style, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'z-50 min-w-[8rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md absolute',
        className
      )}
      style={style}
      tabIndex={-1}
      {...props}
    >
      {children}
    </div>
  )
);
ContextMenuSubContent.displayName = 'ContextMenuSubContent';

// Group and Portal are just fragments for compatibility
export const ContextMenuGroup = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const ContextMenuPortal = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const ContextMenuRadioGroup = ({ children }: { children: React.ReactNode }) => <>{children}</>;
