import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: React.ReactNode;
}

const variantClasses = {
  primary: 'bg-accent text-white hover:bg-accent-alt focus:ring-accent',
  secondary: 'bg-neutral-700 text-white hover:bg-neutral-600 focus:ring-neutral-500',
  outline: 'bg-transparent border border-text hover:bg-surface focus:ring-accent',
  ghost: 'bg-transparent hover:bg-surface focus:ring-accent',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
};

const sizeClasses = {
  sm: 'text-sm px-3 py-1.5',
  md: 'text-base px-4 py-2',
  lg: 'text-lg px-6 py-3',
};

const loadingClasses = {
  sm: 'pl-8',
  md: 'pl-10',
  lg: 'pl-12',
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  children,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`
        inline-flex items-center font-medium rounded transition-colors duration-300
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${isLoading ? loadingClasses[size] : ''}
        ${disabled || isLoading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className={`
            absolute animate-spin -ml-6
            ${sizeClasses[size].includes('text-sm') ? 'w-4 h-4' : ''}
            ${sizeClasses[size].includes('text-base') ? 'w-5 h-5' : ''}
            ${sizeClasses[size].includes('text-lg') ? 'w-6 h-6' : ''}
          `}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;