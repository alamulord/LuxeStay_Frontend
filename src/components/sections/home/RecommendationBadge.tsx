import React from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface RecommendationBadgeProps {
  score: number;
  className?: string;
}

export const RecommendationBadge: React.FC<RecommendationBadgeProps> = ({ score, className }) => {
  return (
    <div 
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 bg-primary text-white text-[10px] font-headline font-bold uppercase tracking-wider rounded-lg shadow-lg border border-primary/20",
        className
      )}
    >
      <Sparkles className="w-3 h-3 animate-pulse" />
      <span>{score}% AI MATCH</span>
    </div>
  );
};
