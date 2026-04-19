import React from 'react';
import { colors } from '@/lib/design-tokens/colors';
import { radii } from '@/lib/design-tokens/radii';
import { spacing } from '@/lib/design-tokens/spacing';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  type?: 'text' | 'email' | 'password';
  size?: 'sm' | 'md' | 'lg';
  required?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', type = 'text', size = 'md', required, ...props }, ref) => {
    const baseStyles = `w-full border transition-all duration-200 ease-out focus:ring-2 focus:ring-offset-2 focus:ring-[#e66000] focus:ring-offset-[#faf8f5] bg-white`;
    const sizeStyles = {
      sm: 'py-1 px-3 text-sm',
      md: 'py-2 px-4 text-base',
      lg: 'py-3 px-4 text-lg',
    }[size];

    const errorStyles = error
      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
      : 'border-[#e9e5dd] focus:border-[#e66000]';

    const combinedClass = `${baseStyles} ${sizeStyles} ${errorStyles} rounded-${radii.base} ${className}`;

    return (
      <div className="flex flex-col">
        {label && (
          <label className="text-[#1a2e1a] text-sm font-medium mb-1">
            {label} {required && <span className="text-red-600">*</span>}
          </label>
        )}
        <input
          type={type}
          ref={ref}
          className={combinedClass}
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

Input.displayName = 'Input';