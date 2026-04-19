import React from 'react';
import { colors } from '@/lib/design-tokens/colors';
import { radii } from '@/lib/design-tokens/radii';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error';
  children: React.ReactNode;
}

export const Badge = ({ className = '', variant = 'default', children, ...props }: BadgeProps) => {
  const variants = {
    default: 'bg-[#e9e5dd] text-[#1a2e1a] border border-[#d4cfca]',
    success: 'bg-green-100 text-green-800 border border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    error: 'bg-red-100 text-red-800 border border-red-200',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${radii.full} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};