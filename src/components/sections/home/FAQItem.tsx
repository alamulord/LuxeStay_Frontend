import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { GlassCard } from '../../ui/GlassCard';

interface FAQItemProps {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
}

export const FAQItem: React.FC<FAQItemProps> = ({
  q,
  a,
  isOpen,
  onToggle
}) => {
  return (
    <GlassCard className="border-outline-variant/15 overflow-hidden transition-all duration-300 bg-white/[0.01]">
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none hover:bg-surface-container-low/40 transition-colors duration-300"
      >
        <span className="font-headline font-bold text-on-surface text-sm md:text-[15px] tracking-tight">
          {q}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-primary transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-outline-variant/10"
          >
            <p className="px-6 py-4.5 text-on-surface-variant text-xs leading-relaxed font-body">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
};
