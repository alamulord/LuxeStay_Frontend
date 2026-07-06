import React from 'react';
import { LucideIcon } from 'lucide-react';
import { GlassCard } from '../../ui/GlassCard';
import { cn } from '../../../lib/utils';

interface ExperienceCardProps {
  icon: LucideIcon;
  title: string;
  desc: string;
  heightClass?: string;
  badgeText?: string;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  icon: Icon,
  title,
  desc,
  heightClass = "h-auto",
  badgeText
}) => {
  return (
    <GlassCard className={cn("p-8 border-white/5 bg-white/[0.01] flex flex-col justify-between text-left relative overflow-hidden group", heightClass)}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="space-y-6 relative z-10">
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary border border-white/10 shadow-inner">
            <Icon className="w-5 h-5" />
          </div>
          {badgeText && (
            <span className="text-[8px] font-headline font-bold text-white/40 uppercase tracking-[0.2em] border border-white/10 px-2 py-0.5 rounded-full">
              {badgeText}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <h4 className="font-headline text-lg font-bold text-white tracking-tight">
            {title}
          </h4>
          <p className="text-white/60 text-xs leading-relaxed font-body">
            {desc}
          </p>
        </div>
      </div>
    </GlassCard>
  );
};
