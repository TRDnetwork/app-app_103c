import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { colors } from '@/lib/design-tokens/colors';
import { radii } from '@/lib/design-tokens/radii';
import { spacing } from '@/lib/design-tokens/spacing';

const buttonStyles = cva(
  [
    'inline-flex items-center justify-center font-medium transition-all duration-200 ease-out',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-60 disabled:cursor-not-allowed',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-[#e66000] text-white hover:bg-[#ff8c42] border-transparent',
          'focus:ring-[#e66000] focus:ring-offset-[#faf8f5]',
        ],
        secondary: [
          'bg-[#1a2e1a] text-white hover:bg-[#2d462d] border-transparent',
          'focus:ring-[#1a2e1a] focus:ring-offset-[#faf8f5]',
        ],
        outline: [
          'border border-[#1a2e1a] text-[#1a2e1a] bg-transparent hover:bg-[#e9e5dd]',
          'focus:ring-[#1a2e1a] focus:ring-offset-[#faf8f5]',
        ],
        ghost: [
          'text-[#1a2e1a] bg-transparent hover:bg-[#e9e5dd] border-transparent',
          'focus:ring-[#1a2e1a] focus:ring-offset-[#faf8f5]',
        ],
        danger: [
          'bg-red-600 text-white hover:bg-red-700 border-transparent',
          'focus:ring-red-500 focus:ring-offset-[#faf8f5]',
        ],
      },
      size: {
        sm: ['text-sm py-1 px-3', `rounded-${radii.sm}`],
        md: ['text-base py-2 px-4', `rounded-${radii.base}`],
        lg: ['text-lg py-3 px-6', `rounded-${radii.md}`],
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonStyles({ variant, size, className })}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';