import React, { useEffect, useRef } from 'react';
import { clsx } from 'clsx';

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
};

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  className,
  overlayClassName,
  closeOnOverlayClick = true,
  showCloseButton = true,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  // Focus trap
  useEffect(() => {
    if (open && modalRef.current) {
      modalRef.current.focus();
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className={clsx(
        'fixed inset-0 z-50 flex items-center justify-center',
        overlayClassName
      )}
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
      onClick={closeOnOverlayClick ? onClose : undefined}
    >
      <div
        className={clsx(
          'bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-lg w-full mx-4 relative animate-fade-in',
          className
        )}
        ref={modalRef}
        tabIndex={0}
        onClick={e => e.stopPropagation()}
      >
        {showCloseButton && (
          <button
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white focus:outline-none"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
        {title && <h2 className="text-lg font-semibold px-6 pt-6 pb-2">{title}</h2>}
        {description && <p className="text-gray-500 px-6 pb-2">{description}</p>}
        <div className="px-6 py-4">{children}</div>
        {footer && <div className="px-6 py-3 border-t bg-gray-50 dark:bg-gray-800 rounded-b-lg">{footer}</div>}
      </div>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm -z-10" />
    </div>
  );
}; 