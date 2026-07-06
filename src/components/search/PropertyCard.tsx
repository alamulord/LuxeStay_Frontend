import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Heart, Star, Sparkles } from 'lucide-react';
import { Room } from '../../types/room.types';
import { formatCurrency } from '../../lib/utils';
import { useWishlistStore } from '../../store/wishlistStore';
import { cn } from '../../lib/utils';
import { PremiumButton } from '../ui/PremiumButton';
import { Badge } from '../ui/Badge';

interface PropertyCardProps {
  room: Room & { compatibilityScore?: number };
  variant?: 'default' | 'compact';
  focusedRoomId?: string | null;
  onSelectRoom?: (roomId: string) => void;
  isAiMode?: boolean;
}

function getAiDecoration(room: Room) {
  const hash = room.title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const score = 92 + (hash % 7); // returns between 92% and 98%
  
  const bestForOptions = [
    "Uninterrupted sunset viewing & quiet contemplation",
    "Couples seeking architectural seclusion and privacy",
    "Multi-generational family retreats with high culinary standards",
    "Wellness enthusiasts seeking private spa and coastal views",
    "Design enthusiasts who appreciate clean lines and native stone"
  ];
  
  const whyOptions = [
    `Designed to blur the boundary between indoor elegance and the natural beauty of ${room.city}.`,
    `A striking modernist silhouette offering absolute privacy and unmatched architectural detail.`,
    `Features a soaring cantilevered lounge deck overlooking the pristine scenery of ${room.country}.`,
    `Curated with local organic textures and custom furnishings for a calm, editorial atmosphere.`,
    `Provides dedicated, high-touch butler service alongside private access to pristine settings.`
  ];

  const explanationOptions = [
    "This residence aligns with your preference for clean architecture and absolute privacy. The master suite features floor-to-ceiling glass paneling that frames the landscape, while the private lounge and chef amenities ensure an exclusive hosting experience.",
    "A rare design marvel situated in a premier vantage point. The layout offers massive whitespace, soft stone textures, and a custom wellness wing. Perfect for travelers seeking a distraction-free, quiet sanctuary.",
    "Every aspect of this stay has been optimized for tranquility. The spatial transitions between the living quarters and the outdoor pool feel natural and calm, matching your desire for high-end, rest-oriented luxury."
  ];

  return {
    score,
    bestFor: bestForOptions[hash % bestForOptions.length],
    why: whyOptions[hash % whyOptions.length],
    explanation: explanationOptions[hash % explanationOptions.length]
  };
}

export function PropertyCard({ 
  room, 
  variant = 'default', 
  focusedRoomId = null, 
  onSelectRoom,
  isAiMode = false
}: PropertyCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const isFavorite = isInWishlist(room.id);
  const location = useLocation();
  const navigate = useNavigate();
  
  const isSearchPage = location.pathname === '/search';
  const isFocused = focusedRoomId === room.id;

  const handleCardClick = (e: React.MouseEvent) => {
    if (!isSearchPage) {
      e.preventDefault();
      navigate(`/search?focus=${room.id}`);
    } else {
      if (!isFocused) {
        e.preventDefault();
        if (onSelectRoom) {
          onSelectRoom(room.id);
        }
      } else {
        navigate(`/room/${room.id}${isAiMode ? '?from_ai=true' : ''}`);
      }
    }
  };

  const aiInfo = isAiMode ? getAiDecoration(room) : null;

  return (
    <div 
      onClick={handleCardClick} 
      className={cn(
        "group block cursor-pointer transition-all duration-300 rounded-2xl p-2.5 border border-transparent",
        isFocused && isSearchPage 
          ? "bg-surface-container-low shadow-ambient-lg border-primary/20" 
          : "hover:bg-surface-container-low"
      )}
    >
      <div className="overflow-hidden">
        {/* Image Container */}
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden img-hover-zoom">
          <img
            src={room.images[0] || '/placeholder-room.jpg'}
            alt={room.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(room);
            }}
            className={cn(
              "absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 z-10 shadow-ambient-md",
              isFavorite
                ? "bg-primary text-white scale-100"
                : "bg-white/80 backdrop-blur-sm text-on-surface hover:bg-white hover:scale-110"
            )}
            aria-label={isFavorite ? "Remove from saved stays" : "Save this stay"}
          >
            <Heart className={cn("w-4 h-4", isFavorite && "fill-current")} />
          </button>
          
          {/* Highlight Notification overlay */}
          {isSearchPage && isFocused && (
            <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px] flex items-center justify-center z-20 transition-all duration-300">
              <span className="px-5 py-2.5 bg-primary text-white text-xs font-headline font-bold uppercase tracking-[0.15em] rounded-full shadow-2xl animate-pulse text-center">
                Click again for details
              </span>
            </div>
          )}

          {/* Featured Badge */}
          {room.isFeatured && !isAiMode && (
            <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-headline font-bold uppercase tracking-wider text-on-surface rounded-lg z-10 shadow-ambient-sm">
              Editorial Choice
            </span>
          )}

          {/* Compatibility Match Badge */}
          {isAiMode && aiInfo && (
            <span className="absolute top-3 left-3 px-3 py-1 bg-primary text-white text-[10px] font-headline font-bold uppercase tracking-wider rounded-lg z-10 shadow-lg border border-primary/20">
              {aiInfo.score}% Compatibility Match
            </span>
          )}
        </div>

        {/* Details */}
        <div className="pt-4.5 pb-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-headline text-[15px] font-bold text-on-surface line-clamp-1">
              {room.title}
            </h3>
            {!isAiMode && (
              <div className="flex items-center gap-1 flex-shrink-0">
                <Star className="w-3.5 h-3.5 fill-on-surface text-on-surface" />
                <span className="text-sm font-semibold text-on-surface">{room.rating.toFixed(2)}</span>
              </div>
            )}
          </div>
          
          <p className="text-sm text-on-surface-variant mt-0.5 font-body">
            {room.city}, {room.country}
          </p>

          {/* AI Mode Curated Editorial Layout */}
          {isAiMode && aiInfo ? (
            <div className="mt-3 pt-3 border-t border-outline-variant/10 space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs text-primary font-headline font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Why this property fits</span>
              </div>
              <p className="text-xs text-on-surface font-headline font-bold italic leading-relaxed">
                "{aiInfo.why}"
              </p>
              <p className="text-[11px] text-on-surface-variant leading-relaxed font-body">
                {aiInfo.explanation}
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <Badge variant="ai">Best for: {aiInfo.bestFor}</Badge>
              </div>
            </div>
          ) : (
            variant === 'default' && (
              <p className="text-xs text-on-surface-variant/80 mt-1 font-body">
                Added {new Date(room.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
            )
          )}

          <div className="flex items-center justify-between mt-3.5 pt-1.5">
            <p className="font-body">
              <span className="font-bold text-on-surface text-base">{formatCurrency(room.pricePerNight, 'GBP')}</span>
              <span className="text-xs text-on-surface-variant"> / night</span>
            </p>
            {isSearchPage && isFocused && (
              <PremiumButton 
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/room/${room.id}${isAiMode ? '?from_ai=true' : ''}`);
                }}
                size="sm"
                className="z-10 text-[10px] tracking-wider uppercase"
              >
                View Suite
              </PremiumButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}