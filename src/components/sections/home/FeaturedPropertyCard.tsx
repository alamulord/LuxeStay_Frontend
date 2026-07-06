import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Sparkles, Heart } from 'lucide-react';
import { Room } from '../../../types/room.types';
import { formatCurrency } from '../../../lib/utils';
import { RecommendationBadge } from './RecommendationBadge';
import { useWishlistStore } from '../../../store/wishlistStore';
import { cn } from '../../../lib/utils';

interface FeaturedPropertyCardProps {
  room: Room;
}

function getCuratedReason(room: Room) {
  const hash = room.title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const score = 93 + (hash % 6);
  const reasons = [
    "Voted top architectural layout with absolute shoreline privacy.",
    "Features custom local organic furniture and private wellness spa.",
    "A majestic modernist estate with soaring cantilevered ocean decks.",
    "Includes fully-serviced private chef dining and panoramic vistas."
  ];
  const tags = [
    ["Ocean View", "Private Chef", "Quiet Area", "Perfect for Couples"],
    ["Infinity Pool", "Hot Tub", "High Privacy", "Dedicated Butler"],
    ["Modern Architecture", "Private Cellar", "Forest Access", "Fireplace"],
    ["Mountain Views", "Organic Textures", "Spa Access", "Quiet Contemplation"]
  ];
  return {
    score,
    reason: reasons[hash % reasons.length],
    tags: tags[hash % tags.length]
  };
}

export const FeaturedPropertyCard: React.FC<FeaturedPropertyCardProps> = ({ room }) => {
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const isFavorite = isInWishlist(room.id);
  const curation = getCuratedReason(room);

  return (
    <div 
      onClick={() => navigate(`/room/${room.id}`)}
      className="group relative bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant/10 shadow-ambient transition-all duration-500 hover:shadow-ambient-lg cursor-pointer flex flex-col justify-between"
    >
      {/* Photo with zoom and badges */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={room.images[0] || '/placeholder-room.jpg'}
          alt={room.title}
          className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.03]"
          loading="lazy"
        />
        
        {/* Heart button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(room);
          }}
          className={cn(
            "absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 z-10 shadow-ambient-md",
            isFavorite
              ? "bg-primary text-white"
              : "bg-white/80 backdrop-blur-sm text-on-surface hover:bg-white"
          )}
          aria-label={isFavorite ? "Remove from saved stays" : "Save this stay"}
        >
          <Heart className={cn("w-4.5 h-4.5", isFavorite && "fill-current")} />
        </button>



        {/* Curation info overlay revealed on hover */}
        <div className="absolute inset-0 bg-black/85 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 space-y-3 z-20">
          <div className="flex items-center gap-1.5 text-xs text-primary font-headline font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI recommendation curation</span>
          </div>
          
          <p className="text-xs text-white/90 leading-relaxed font-body italic">
            "{curation.reason}"
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {curation.tags.map((t, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded-lg bg-white/10 text-[9px] font-headline font-bold text-white uppercase tracking-widest">
                {t}
              </span>
            ))}
          </div>

          <p className="text-[10px] text-white/40 font-headline uppercase tracking-wider pt-2 border-t border-white/5">
            Click to view immersive story
          </p>
        </div>
      </div>

      {/* Details Box */}
      <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-headline text-lg font-bold text-on-surface line-clamp-1">
              {room.title}
            </h3>
            <div className="flex items-center gap-1 shrink-0">
              <Star className="w-3.5 h-3.5 fill-on-surface text-on-surface" />
              <span className="text-xs font-semibold text-on-surface">{room.rating.toFixed(2)}</span>
            </div>
          </div>
          
          <p className="text-xs text-on-surface-variant font-body">
            {room.city}, {room.country}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-outline-variant/10">
          <p className="font-body">
            <span className="font-bold text-on-surface text-[15px]">{formatCurrency(room.pricePerNight, 'GBP')}</span>
            <span className="text-xs text-on-surface-variant"> / night</span>
          </p>
          <span className="text-[10px] font-headline font-bold text-primary uppercase tracking-widest group-hover:underline">
            View Suite →
          </span>
        </div>
      </div>
    </div>
  );
};
