import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../../lib/utils';

interface CategoryItemProps {
  id: string;
  label: string;
  icon: LucideIcon;
  isActive: boolean;
  onClick: () => void;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({
  id,
  label,
  icon: Icon,
  isActive,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center gap-1.5 pb-2.5 transition-colors duration-300 flex-shrink-0 outline-none select-none group",
        isActive ? "text-primary font-bold" : "text-on-surface-variant hover:text-on-surface"
      )}
    >
      <Icon className={cn("w-4 h-4 transition-transform duration-300", !isActive && "group-hover:scale-110")} />
      <span className="text-[11px] font-headline font-bold uppercase tracking-widest">{label}</span>
      
      {isActive && (
        <motion.div
          layoutId="activeCategoryHighlight"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </button>
  );
};
