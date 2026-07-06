import React from 'react';
import { Star, X } from 'lucide-react';
import { PremiumButton } from '../ui/PremiumButton';

interface RoomVirtualTourProps {
  is3dActive: boolean;
  setIs3dActive: (val: boolean) => void;
  tour3dUrl?: string | null;
}

export const RoomVirtualTour: React.FC<RoomVirtualTourProps> = ({
  is3dActive,
  setIs3dActive,
  tour3dUrl,
}) => {
  return (
    <div id="3d-tour-section" className="pt-8 border-t border-outline-variant/10">
      <h2 className="font-headline text-xl font-bold text-on-surface mb-5 italic">
        3D Space Walkthrough
      </h2>

      {is3dActive ? (
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-ambient bg-black border border-outline-variant/10">
          <iframe
            src={tour3dUrl || 'https://my.matterport.com/show/?m=JGPnGqyB6Ax'}
            className="w-full h-full border-none"
            allowFullScreen
            allow="xr-spatial-tracking"
          />
          <button
            onClick={() => setIs3dActive(false)}
            className="absolute top-4 right-4 bg-white/95 text-on-surface text-[10px] font-headline font-bold px-4 py-2 rounded-full hover:bg-white uppercase tracking-wider transition-all duration-300 z-20 flex items-center gap-1 shadow-ambient active:scale-95"
          >
            <X className="w-3.5 h-3.5" /> Close Tour
          </button>
        </div>
      ) : (
        <div
          onClick={() => setIs3dActive(true)}
          className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-ambient bg-[#1a1c1c] group cursor-pointer border border-outline-variant/10"
        >
          <img
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=450&fit=crop"
            alt="3D Space Preview"
            className="w-full h-full object-cover opacity-60 group-hover:scale-[1.02] transition-transform duration-700 blur-[0.5px]"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-6">
            <span className="w-14 h-14 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 mb-4">
              <Star className="w-6 h-6 fill-current" />
            </span>
            <h3 className="text-white font-headline text-lg font-bold mb-1">
              Immersive Spatial Walkthrough
            </h3>
            <p className="text-white/80 text-xs max-w-md leading-relaxed mb-6 font-body">
              Explore every corner of the property virtually before your arrival. Rotate 360° and move between rooms.
            </p>
            <PremiumButton
              onClick={() => setIs3dActive(true)}
              variant="primary"
              size="sm"
              className="text-[10px] uppercase tracking-wider"
            >
              Launch 3D Tour
            </PremiumButton>
          </div>
        </div>
      )}
    </div>
  );
};
