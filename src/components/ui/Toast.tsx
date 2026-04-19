import React, { useEffect } from 'react';
import { cva } from 'class-variance-authority';
import { radii } from '@/lib/design-tokens/radii';

const toastStyles = cva(
  [
    'flex items-center justify-between p-4 rounded-md shadow-lg max-w-md w-full',
    'transform transition-all duration-300 ease-out',
    'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-50 data-[state=open]:slide-in-from-top-5',
  ],
  {
    variants: {
      variant: {
        success: 'bg-green-50 text-green-800 border border-green-200',
        error: 'bg-red-50 text-red-800 border border-red-200',
        warning: 'bg-yellow-50 text-yellow-800 border border-yellow-200',
        info: 'bg-blue-50 text-blue-800 border border-blue-200',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

export interface ToastProps {
  title: string;
  description?: string;
  variant: 'success' | 'error' | 'warning' | 'info';
  open: boolean;
  onClose: () => void;
  autoDismiss?: boolean;
  duration?: number;
}

export const Toast = ({
  title,
  description,
  variant,
  open,
  onClose,
  autoDismiss = true,
  duration = 4000,
}: ToastProps) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (open && autoDismiss) {
      timer = setTimeout(() => {
        onClose();
      }, duration);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [open, autoDismiss, duration, onClose]);

  if (!open) return null;

  return (
    <div
      className={toastStyles({ variant })}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      data-state={open ? 'open' : 'closed'}
    >
      <div className="flex-1">
        <div className="text-sm font-medium">{title}</div>
        {description && <div className="text-sm opacity-90 mt-1">{description}</div>}
      </div>
      <button
        onClick={onClose}
        className="ml-4 text-gray-500 hover:text-gray-700 focus:outline-none"
        aria-label="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};