import React, { useEffect, useRef } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Trap focus inside modal
  useEffect(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    // Focus first focusable element
    const focusable = dialog.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable.length > 0) {
      (focusable[0] as HTMLElement).focus();
    }

    // Handle Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={dialogRef}
        className="bg-bg rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        tabIndex={-1}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 id="modal-title" className="text-2xl font-bold font-display text-text">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-text-dim hover:text-text focus:outline-none focus:ring-2 focus:ring-accent rounded-full p-1"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>
          <div className="modal-content">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;