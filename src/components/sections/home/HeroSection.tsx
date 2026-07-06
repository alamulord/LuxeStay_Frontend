import React from 'react';
import { motion } from 'framer-motion';
import { HeroBackground } from './HeroBackground';
import { HeroOverlay } from './HeroOverlay';
import { PromptComposer } from '../../ui/PromptComposer';
import { transitionDefault } from '../../../lib/animations';

interface HeroSectionProps {
  onSearch: (prompt: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  return (
    <section className="relative mx-4 lg:mx-8 mt-2 rounded-3xl overflow-hidden shadow-ambient-lg border border-outline-variant/10 select-none no-print">
      <div className="relative h-[660px] lg:h-[740px] flex items-center justify-center">
        
        {/* Background Parallax & Overlays */}
        <HeroBackground />
        <HeroOverlay />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl px-6 text-center space-y-10">
          
          <div className="space-y-4">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitionDefault}
              className="text-white/65 font-headline font-bold text-xs uppercase tracking-[0.4em] block"
            >
              Luxury Hospitality Reimagined
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transitionDefault, delay: 0.1 }}
              className="font-headline text-4xl md:text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight"
            >
              Experience Living, <br className="hidden sm:inline" />
              <span className="text-white/60 italic font-normal font-serif text-3xl md:text-4xl lg:text-[64px]">Spatially.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transitionDefault, delay: 0.2 }}
              className="text-white/80 text-xs md:text-sm max-w-xl mx-auto font-body leading-relaxed pt-2"
            >
              Step inside our private portfolio of design-driven homes, fully managed by local concierges.
            </motion.p>
          </div>

          {/* Centered custom template search input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionDefault, delay: 0.3 }}
            className="w-full max-w-2xl"
          >
            <PromptComposer onSubmit={onSearch} />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
