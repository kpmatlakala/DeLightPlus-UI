"use client"

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/utils/cn';
import { XIcon } from '../../icons';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

/**
 * Dialog: Handles portal, overlay, and open/close logic. Renders children (should be DialogContent).
 */
export const Dialog: React.FC<DialogProps> = ({ open, onClose, children, className }) => {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      {children}
    </div>,
    document.body
  );
};

/**
 * DialogContent: Provides modal styling and close button. Should be used inside Dialog.
 */
export const DialogContent: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
}> = ({ children, className, onClose }) => (
  <div className={cn("relative bg-white dark:bg-black rounded-lg shadow-lg p-6 w-full max-w-lg", className)}>
    {onClose && (
      <button
        onClick={onClose}
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-label="Close"
      >
        <XIcon className="h-5 w-5" />
      </button>
    )}
    {children}
  </div>
);
