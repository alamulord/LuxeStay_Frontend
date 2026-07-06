import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hoverEffect = true,
}) => {
  return (
    <div
      className={`bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-ambient transition-all duration-500 ${
        hoverEffect ? 'hover:bg-white/10 hover:border-white/20' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
