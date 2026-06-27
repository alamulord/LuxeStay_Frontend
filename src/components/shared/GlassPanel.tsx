import React from 'react';
import { cn } from '../../lib/utils';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassPanel({ children, className }: GlassPanelProps) {
  return (
    <div className={cn(
      "bg-surface-container-lowest/80 backdrop-blur-[20px] rounded-lg shadow-lg",
      className
    )}>
      {children}
    </div>
  );
}