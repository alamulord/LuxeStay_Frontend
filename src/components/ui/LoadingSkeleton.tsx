import React from 'react';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'card' | 'text' | 'image';
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className = '',
  variant = 'card',
}) => {
  const baseStyle = 'animate-pulse bg-surface-container-high rounded-xl';
  
  const variantStyles = {
    card: 'h-64 w-full',
    text: 'h-4 w-3/4 my-2',
    image: 'h-48 w-full',
  };

  return (
    <div className={`${baseStyle} ${variantStyles[variant]} ${className}`} />
  );
};
