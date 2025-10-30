"use client";

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/utils/cn';
import { Button } from './button';

export interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  actionLabel?: string;
  cancelLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  onClose,
  title,
  description,
  actionLabel = 'OK',
  cancelLabel = 'Cancel',
  onAction,
  className,
}) => {
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
      <div className={cn("relative bg-white dark:bg-black rounded-lg shadow-lg p-6 w-full max-w-md", className)}>
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        {description && <p className="text-sm text-muted-foreground mb-4">{description}</p>}
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="secondary" onClick={onClose}>{cancelLabel}</Button>
          <Button onClick={() => { onAction?.(); onClose(); }}>{actionLabel}</Button>
        </div>
      </div>
    </div>,
    document.body
  );
};
