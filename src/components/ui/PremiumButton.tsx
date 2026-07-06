import React from 'react';

interface PremiumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass' | 'admin';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const PremiumButton: React.FC<PremiumButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyle =
    'inline-flex items-center justify-center font-headline font-semibold rounded-xl transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizeStyles = {
    sm: 'py-2 px-4 text-xs',
    md: 'py-3 px-6 text-sm',
    lg: 'py-4 px-8 text-base',
  };

  const variantStyles = {
    primary:
      'btn-primary-gradient text-white shadow-ambient hover:scale-[1.02] hover:shadow-ambient-md',
    secondary:
      'border border-outline-variant/30 text-on-surface bg-surface-container-lowest hover:bg-surface-container-low hover:scale-[1.02]',
    glass:
      'bg-white/10 border border-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:scale-[1.02]',
    admin:
      'btn-admin-gradient text-white shadow-ambient hover:scale-[1.02] hover:shadow-ambient-md',
  };

  return (
    <button
      className={`${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
