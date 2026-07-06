import React from 'react';
import { NewsletterForm } from './NewsletterForm';

export const InnerCircleSection: React.FC = () => {
  return (
    <section className="max-w-page mx-auto px-6 lg:px-10 mb-24 no-print select-none">
      {/* Rose Red Gradient Container */}
      <div className="relative overflow-hidden rounded-[2.5rem] py-20 px-8 md:px-16 text-center bg-gradient-to-br from-primary via-primary/95 to-primary-container shadow-2xl border-none text-white">
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <span className="text-[10px] font-headline font-bold text-white/70 uppercase tracking-[0.3em] block">
            Invitation Only
          </span>
          
          <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Become part of our private collection of travelers.
          </h2>
          
          <p className="text-white/90 text-xs md:text-sm max-w-lg mx-auto font-body leading-relaxed">
            Gain early access to new property listings, exclusive member curations, and private travel itineraries.
          </p>

          <div className="pt-4">
            <NewsletterForm />
          </div>
          
          <p className="text-[9px] text-white/60 font-body">
            By invitation only. We honor your digital confidentiality.
          </p>
        </div>

      </div>
    </section>
  );
};
