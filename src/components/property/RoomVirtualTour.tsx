import React, { useState, useEffect } from 'react';
import { Star, X, Sparkles, AlertCircle } from 'lucide-react';
import { PremiumButton } from '../ui/PremiumButton';
import { TourViewer } from './TourViewer';
import { Tour } from '../../types/tour.types';
import api from '../../lib/api';
import { LoadingSpinner } from '../shared/LoadingSpinner';

interface RoomVirtualTourProps {
  is3dActive: boolean;
  setIs3dActive: (val: boolean) => void;
  tour3dUrl?: string | null;
  roomId: string;
}

export const RoomVirtualTour: React.FC<RoomVirtualTourProps> = ({
  is3dActive,
  setIs3dActive,
  tour3dUrl,
  roomId,
}) => {
  const [tour, setTour] = useState<Tour | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!roomId) return;
    const fetchTour = async () => {
      try {
        setIsLoading(true);
        const res = await api.get<Tour>(`/rooms/${roomId}/tour`);
        setTour(res.data);
      } catch (err) {
        console.log('No published tour found for room:', roomId);
        setTour(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTour();
  }, [roomId]);

  if (is3dActive) {
    return (
      <div id="3d-tour-section" className="pt-8 border-t border-outline-variant/10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-headline text-xl font-bold text-on-surface italic">
            Property Interactive Tour
          </h2>
        </div>

        {isLoading ? (
          <div className="aspect-[16/9] w-full rounded-2xl bg-zinc-950 flex items-center justify-center border border-outline-variant/10">
            <LoadingSpinner size="lg" />
          </div>
        ) : tour ? (
          <TourViewer tour={tour} onClose={() => setIs3dActive(false)} />
        ) : (
          /* Features Coming Soon Placeholder Visual */
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#121414] to-[#1e2222] border border-outline-variant/10 flex flex-col items-center justify-center p-8 text-center space-y-5 shadow-ambient">
            <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center text-primary mb-2 shadow-inner">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div className="space-y-2 max-w-lg">
              <h3 className="text-white font-headline text-lg font-bold">
                Tour Experience In Preparation
              </h3>
              <p className="text-white/60 text-xs font-body leading-relaxed">
                A customized 3D Virtual Tour & Photo Walkthrough for this suite is currently in curation by our design team. Explore the main photo gallery above for a detailed visual overview.
              </p>
            </div>
            <button
              onClick={() => setIs3dActive(false)}
              className="px-6 py-2.5 bg-white/10 hover:bg-white/15 text-white border border-white/10 rounded-xl font-headline font-bold text-[10px] uppercase tracking-wider transition-all duration-300 flex items-center gap-1 active:scale-95 shadow-md"
            >
              <X className="w-3.5 h-3.5" /> Close Preview
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div id="3d-tour-section" className="pt-8 border-t border-outline-variant/10">
      <h2 className="font-headline text-xl font-bold text-on-surface mb-5 italic">
        Property Interactive Tour
      </h2>

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
            Launch Interactive Tour
          </h3>
          <p className="text-white/80 text-xs max-w-md leading-relaxed mb-6 font-body font-light">
            Step inside. Experience the suite in high-resolution walkthrough frames or rotate 360° to explore the layout.
          </p>
          <PremiumButton
            onClick={() => setIs3dActive(true)}
            variant="primary"
            size="sm"
            className="text-[10px] uppercase tracking-wider"
          >
            Launch Tour
          </PremiumButton>
        </div>
      </div>
    </div>
  );
};
