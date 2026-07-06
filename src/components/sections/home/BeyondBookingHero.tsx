import React from 'react';
import { Eye } from 'lucide-react';

export const BeyondBookingHero: React.FC = () => {
  return (
    <div className="relative h-[440px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group cursor-pointer lg:col-span-8">
      {/* Background Image */}
      <img
        alt="AI Immersive Virtual Tours"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-102 opacity-70"
        src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
        loading="lazy"
      />
      
      {/* Vignette Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      
      <div className="absolute bottom-0 left-0 p-8 md:p-12 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary border border-primary/20 shrink-0">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="font-headline text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Immersive 3D Walkthroughs
          </h3>
        </div>
        <p className="text-white/80 text-xs md:text-sm max-w-xl leading-relaxed font-body">
          Experience spatial reality before you travel. Walk through floor plans, measure spaces, and visualize view-lines in high-fidelity digital replicas.
        </p>
      </div>

      <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-[9px] font-headline font-bold tracking-[0.2em] uppercase text-white">
        Live Virtual Tour
      </div>
    </div>
  );
};
