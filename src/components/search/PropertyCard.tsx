import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { Room } from '../../types/room.types';
import { formatCurrency } from '../../lib/utils';
import { useWishlistStore } from '../../store/wishlistStore';
import { cn } from '../../lib/utils';

interface PropertyCardProps {
  room: Room;
  variant?: 'default' | 'compact';
  focusedRoomId?: string | null;
  onSelectRoom?: (roomId: string) => void;
}

export function PropertyCard({ room, variant = 'default', focusedRoomId = null, onSelectRoom }: PropertyCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const isFavorite = isInWishlist(room.id);
  const location = useLocation();
  const navigate = useNavigate();
  
  const isSearchPage = location.pathname === '/search';
  const isFocused = focusedRoomId === room.id;

  const handleCardClick = (e: React.MouseEvent) => {
    if (!isSearchPage) {
      // Landing page: go to search and focus the room on map
      e.preventDefault();
      navigate(`/search?focus=${room.id}`);
    } else {
      // Search page:
      if (!isFocused) {
        // First click: focus the map, block details navigation
        e.preventDefault();
        if (onSelectRoom) {
          onSelectRoom(room.id);
        }
      } else {
        // Second click: go to details view
        navigate(`/room/${room.id}`);
      }
    }
  };

  return (
    <div 
      onClick={handleCardClick} 
      className={cn(
        "group block cursor-pointer transition-all duration-300 rounded-xl p-2",
        isFocused && isSearchPage ? "bg-surface-container-low shadow-ambient border-2 border-[#ba0036]/20" : "hover:bg-surface-container-low"
      )}
    >
      <div className="overflow-hidden">
        {/* Image Container */}
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden img-hover-zoom">
          <img
            src={room.images[0] || '/placeholder-room.jpg'}
            alt={room.title}
            className="w-full h-full object-cover"
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
              "absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 z-10",
              isFavorite
                ? "bg-primary text-white"
                : "bg-white/80 backdrop-blur-sm text-[#1a1c1c] hover:bg-white hover:scale-110"
            )}
          >
            <Heart className={cn("w-4 h-4", isFavorite && "fill-current")} />
          </button>
          
          {/* Highlight Notification badge */}
          {isSearchPage && isFocused && (
            <span className="absolute bottom-3 left-3 px-3 py-1.5 bg-[#ba0036] text-white text-[10px] font-bold uppercase tracking-wider rounded-md shadow-lg animate-pulse z-10">
              Click again to view details
            </span>
          )}

          {/* Featured Badge */}
          {room.isFeatured && (
            <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-[#1a1c1c] rounded-md z-10">
              Editorial Choice
            </span>
          )}
        </div>

        {/* Details */}
        <div className="pt-3 pb-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-headline text-[15px] font-semibold text-[#1a1c1c] line-clamp-1">
              {room.title}
            </h3>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Star className="w-3.5 h-3.5 fill-[#1a1c1c] text-[#1a1c1c]" />
              <span className="text-sm font-medium text-[#1a1c1c]">{room.rating.toFixed(2)}</span>
            </div>
          </div>
          <p className="text-sm text-[#5c3f41] mt-0.5">
            {room.city}, {room.country}
          </p>
          {variant === 'default' && (
            <p className="text-sm text-[#5c3f41] mt-0.5">
              Added {new Date(room.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </p>
          )}
          <div className="flex items-center justify-between mt-1.5">
            <p>
              <span className="font-semibold text-[#1a1c1c]">{formatCurrency(room.pricePerNight, 'GBP')}</span>
              <span className="text-sm text-[#5c3f41]"> / night</span>
            </p>
            {isSearchPage && isFocused && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/room/${room.id}`);
                }}
                className="text-xs bg-[#ba0036] text-white font-bold px-3 py-1 rounded-full hover:bg-[#ba0036]/90 transition-colors uppercase tracking-wider shadow z-10"
              >
                View Suite
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}