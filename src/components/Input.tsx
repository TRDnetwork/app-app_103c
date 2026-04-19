import React from 'react';

export type InputType = 'text' | 'email' | 'password' | 'tel' | 'url';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: InputType;
  error?: string;
  helpText?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({ label, type = 'text', id, error, helpText, required = false, ...props }) => {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
  const hasError = !!error;

  return (
    <div className="space-y-1">
      <label htmlFor={inputId} className="block text-text-dim font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={inputId}
        className={`
          w-full p-3 border rounded focus:outline-none transition-all-cubic
          ${hasError ? 'border-red-500' : 'border-surface focus:ring-2 focus:ring-accent focus:ring-offset-1'}
        `}
        aria-invalid={hasError}
        aria-describedby={
          [hasError ? `${inputId}-error` : '', helpText ? `${inputId}-help` : ''].filter(Boolean).join(' ') || undefined
        }
        required={required}
        {...props}
      />
      {helpText && (
        <p id={`${inputId}-help`} className="text-sm text-text-dim">
          {helpText}
        </p>
      )}
      {hasError && (
        <p id={`${inputId}-error`} className="text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;