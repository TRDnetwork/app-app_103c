import React, { useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  message: string;
  type: ToastType;
  isVisible: boolean;
  onClose: () => void;
}

const typeClasses = {
  success: 'bg-green-600',
  error: 'bg-red-600',
  warning: 'bg-yellow-500',
  info: 'bg-blue-600',
};

const Toast: React.FC<ToastProps> = ({ message, type, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 bg-opacity-95 backdrop-blur-sm text-white px-6 py-3 rounded-lg shadow-lg z-50 min-w-[300px] text-center animate-in fade-in slide-in-from-bottom-4 ${typeClasses[type]}`}
      role="alert"
      aria-live="assertive"
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-white hover:text-opacity-80"
        aria-label="Dismiss message"
      >
        ×
      </button>
    </div>
  );
};

export default Toast;