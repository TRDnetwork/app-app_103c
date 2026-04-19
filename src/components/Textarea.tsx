import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helpText?: string;
  required?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({ label, id, error, helpText, required = false, ...props }) => {
  const textareaId = id || label.toLowerCase().replace(/\s+/g, '-');
  const hasError = !!error;

  return (
    <div className="space-y-1">
      <label htmlFor={textareaId} className="block text-text-dim font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={textareaId}
        className={`
          w-full p-3 border rounded focus:outline-none transition-all-cubic
          ${hasError ? 'border-red-500' : 'border-surface focus:ring-2 focus:ring-accent focus:ring-offset-1'}
        `}
        aria-invalid={hasError}
        aria-describedby={
          [hasError ? `${textareaId}-error` : '', helpText ? `${textareaId}-help` : ''].filter(Boolean).join(' ') || undefined
        }
        required={required}
        {...props}
      />
      {helpText && (
        <p id={`${textareaId}-help`} className="text-sm text-text-dim">
          {helpText}
        </p>
      )}
      {hasError && (
        <p id={`${textareaId}-error`} className="text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default Textarea;