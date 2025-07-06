"use client"

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/utils/cn';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  side?: 'left' | 'right' | 'bottom';
}

export const Drawer: React.FC<DrawerProps> = ({ open, onClose, children, className, side = 'left' }) => {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  let positionClass = '';
  if (side === 'left') positionClass = 'left-0 top-0 h-full w-80';
  else if (side === 'right') positionClass = 'right-0 top-0 h-full w-80';
  else if (side === 'bottom') positionClass = 'left-0 bottom-0 w-full h-80';

  return createPortal(
    <div className="fixed inset-0 z-50 flex bg-black/60">
      <div
        className={cn(
          'fixed bg-white dark:bg-black shadow-lg transition-transform duration-300',
          positionClass,
          className
        )}
      >
        {children}
      </div>
      <div className="flex-1" onClick={onClose} />
    </div>,
    document.body
  );
};
