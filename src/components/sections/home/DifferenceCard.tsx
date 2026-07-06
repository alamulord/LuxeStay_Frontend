import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DifferenceCardProps {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export const DifferenceCard: React.FC<DifferenceCardProps> = ({
  icon: Icon,
  title,
  desc
}) => {
  return (
    <div className="flex flex-col items-center text-center group">
      {/* Centered White Icon Container */}
      <div className="w-16 h-16 rounded-2xl bg-white shadow-ambient flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300 border border-outline-variant/10 shrink-0">
        <Icon className="w-7 h-7" />
      </div>
      
      {/* Content */}
      <h3 className="font-headline text-xl font-bold mb-3 text-on-surface">
        {title}
      </h3>
      <p className="font-body text-sm text-on-surface-variant leading-relaxed">
        {desc}
      </p>
    </div>
  );
};
