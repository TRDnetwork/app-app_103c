import React from 'react';
import { shadows } from '@/lib/design-tokens/shadows';
import { radii } from '@/lib/design-tokens/radii';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'elevated';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = '', variant = 'default', ...props }, ref) => {
    const baseStyles = `bg-[#e9e5dd] border border-transparent rounded-${radii.lg} overflow-hidden`;
    const variantStyles = {
      default: `shadow-[${shadows.base}]`,
      elevated: `shadow-[${shadows.md}] hover:shadow-[${shadows.cardHover}] transform transition-all duration-300 ease-out hover:-translate-y-1`,
    }[variant];

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variantStyles} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';