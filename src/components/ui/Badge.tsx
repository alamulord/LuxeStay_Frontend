import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'ai';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  className = '',
}) => {
  const baseStyle =
    'inline-flex items-center px-3 py-1 rounded-full text-xs font-headline font-semibold uppercase tracking-wider transition-all duration-300';
  
  const variantStyles = {
    success: 'bg-tertiary/10 text-tertiary',
    warning: 'bg-amber-500/10 text-amber-600',
    error: 'bg-error/10 text-error',
    info: 'bg-secondary/10 text-secondary',
    neutral: 'bg-surface-container-high text-on-surface-variant',
    ai: 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_12px_rgba(186,0,54,0.08)]',
  };

  return (
    <span className={`${baseStyle} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};
