import React from 'react';
import { colors } from '@/lib/design-tokens/colors';
import { radii } from '@/lib/design-tokens/radii';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', required, ...props }, ref) => {
    return (
      <div className="flex flex-col">
        {label && (
          <label className="text-[#1a2e1a] text-sm font-medium mb-1">
            {label} {required && <span className="text-red-600">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          className={`
            w-full border border-[#e9e5dd] rounded-${radii.base}
            transition-all duration-200 ease-out
            focus:ring-2 focus:ring-[#e66000] focus:ring-offset-2 focus:ring-offset-[#faf8f5] focus:border-[#e66000]
            bg-white resize-none
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
          aria-invalid={!!error}
          aria-describedby={error ? `${props.id}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${props.id}-error`} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';