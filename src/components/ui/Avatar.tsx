import React from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Avatar = ({ src, alt, className = '', size = 'md', ...props }: AvatarProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
  }[size];

  return (
    <div
      className={`inline-flex items-center justify-center rounded-full bg-[#e9e5dd] overflow-hidden ${sizeClasses} ${className}`}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="text-[#1a2e1a] font-medium">
          {alt.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
};