import React from 'react';

export interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  fallback?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
};

const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 'md', fallback }) => {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-full bg-surface overflow-hidden ${sizeClasses[size]}`}
      aria-label={alt}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="text-text font-medium">
          {fallback || alt.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
};

export default Avatar;