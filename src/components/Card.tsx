import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ header, footer, children, className = '', ...props }) => {
  return (
    <div
      className={`bg-surface p-6 rounded-lg shadow-sm border border-transparent hover:border-accent transition-all-cubic ${className}`}
      {...props}
    >
      {header && <div className="card-header mb-4">{header}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer mt-4 pt-4 border-t border-surface">{footer}</div>}
    </div>
  );
};

export default Card;