import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search as SearchIcon, X, Star, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { Navbar } from '../components/shared/Navbar';
import { Footer } from '../components/shared/Footer';
import { PropertyCard } from '../components/search/PropertyCard';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { useRooms, prefetchRoom } from '../hooks/useRooms';
import { useFilterStore } from '../store/filterStore';
import { fadeIn, staggerContainer } from '../lib/animations';
import { MapWidget } from '../components/search/MapWidget';
import { FilterModal } from '../components/search/FilterModal';

export function Search() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const focusRoomIdFromQuery = searchParams.get('focus');
  const [focusedRoomId, setFocusedRoomId] = useState<string | null>(null);

  const filters = useFilterStore();
  const { rooms, isLoading, error } = useRooms({
    location: filters.location,
    guests: filters.guests,
    bedrooms: filters.bedrooms,
    priceMin: filters.priceMin,
    priceMax: filters.priceMax,
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
    amenities: filters.amenities,
  });

  // Sync focusRoomId from query params
  useEffect(() => {
    if (focusRoomIdFromQuery) {
      setFocusedRoomId(focusRoomIdFromQuery);
    }
  }, [focusRoomIdFromQuery]);

  const handleSelectRoom = (roomId: string) => {
    setFocusedRoomId(roomId);
    setSearchParams({ focus: roomId });
    prefetchRoom(roomId);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />

      {/* Main Split Screen Container */}
      <main className="pt-[72px] h-[calc(100vh-72px)] flex overflow-hidden">
        
        {/* Left Side: Results List */}
        <div className="w-full md:w-[50%] lg:w-[45%] h-full flex flex-col overflow-hidden bg-surface">
          
          {/* Filter Bar (Fixed inside Left Column Header) */}
          <div className="px-6 lg:px-10 py-3.5 border-b border-outline-variant/10 flex-shrink-0 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
              
              {/* Sliders filter toggle button */}
              <button
                onClick={() => setIsFilterModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border bg-white text-[#1a1c1c] border-outline-variant/30 hover:border-[#1a1c1c] transition-all duration-200 uppercase tracking-wider flex-shrink-0"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#1a1c1c]" />
                Filters
              </button>

              {/* Dynamic Badges */}
              {filters.location && (
                <span className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-bold bg-primary/5 text-primary border border-primary/20 uppercase tracking-wider flex-shrink-0">
                  {filters.location}
                  <X className="w-3 h-3 cursor-pointer hover:text-black" onClick={() => filters.setLocation(undefined)} />
                </span>
              )}

              {(filters.priceMin !== undefined || filters.priceMax !== undefined) && (
                <span className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-bold bg-primary/5 text-primary border border-primary/20 uppercase tracking-wider flex-shrink-0">
                  {filters.priceMin && !filters.priceMax ? `> £${filters.priceMin}` : ''}
                  {!filters.priceMin && filters.priceMax ? `< £${filters.priceMax}` : ''}
                  {filters.priceMin && filters.priceMax ? `£${filters.priceMin}-£${filters.priceMax}` : ''}
                  <X className="w-3 h-3 cursor-pointer hover:text-black" onClick={() => filters.setPriceRange(undefined, undefined)} />
                </span>
              )}

              {filters.guests && (
                <span className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-bold bg-primary/5 text-primary border border-primary/20 uppercase tracking-wider flex-shrink-0">
                  {filters.guests}+ guests
                  <X className="w-3 h-3 cursor-pointer hover:text-black" onClick={() => filters.setGuests(undefined)} />
                </span>
              )}

              {filters.bedrooms && (
                <span className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-bold bg-primary/5 text-primary border border-primary/20 uppercase tracking-wider flex-shrink-0">
                  {filters.bedrooms} BR
                  <X className="w-3 h-3 cursor-pointer hover:text-black" onClick={() => filters.setBedrooms(undefined)} />
                </span>
              )}

              {filters.amenities && filters.amenities.map(amenity => (
                <span key={amenity} className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-bold bg-primary/5 text-primary border border-primary/20 uppercase tracking-wider flex-shrink-0">
                  {amenity}
                  <X className="w-3 h-3 cursor-pointer hover:text-black" onClick={() => {
                    const next = filters.amenities?.filter(a => a !== amenity);
                    filters.setAmenities(next && next.length > 0 ? next : undefined);
                  }} />
                </span>
              ))}

              {/* Clear All Shortcut if active */}
              {(filters.location || filters.priceMin !== undefined || filters.priceMax !== undefined || filters.guests || filters.bedrooms || filters.amenities) && (
                <button
                  onClick={() => filters.resetFilters()}
                  className="text-[10px] font-bold text-[#5c3f41] hover:underline uppercase tracking-wider pl-2 flex-shrink-0"
                >
                  Reset all
                </button>
              )}
            </div>
            <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider text-[#5c3f41] flex-shrink-0 ml-4">
              {rooms.length} results
            </span>
          </div>

          {/* Listings Container (Scrollable) */}
          <div className="flex-1 overflow-y-auto px-6 lg:px-10 py-6 hide-scrollbar space-y-6">
            {/* Page Header */}
            <div>
              <h1 className="font-headline text-2xl lg:text-3xl font-extrabold text-[#1a1c1c] tracking-tight">
                Exquisite Stays{filters.location ? ` in ${filters.location}` : ''}
              </h1>
              <p className="text-xs text-[#5c3f41] mt-1 font-medium">
                Handpicked editorial collection of luxury retreats and modern boutiques.
              </p>
            </div>

            {isLoading ? (
              <div className="space-y-6">
                {/* Large card skeleton */}
                <div className="w-full h-[400px] bg-white rounded-2xl overflow-hidden border border-outline-variant/10 shadow-ambient animate-pulse flex flex-col">
                  <div className="w-full h-64 bg-slate-200"></div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                      <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                      <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                      <div className="h-6 bg-slate-200 rounded w-1/5"></div>
                      <div className="h-8 bg-slate-200 rounded w-1/5"></div>
                    </div>
                  </div>
                </div>
                {/* Small card skeletons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white rounded-2xl overflow-hidden border border-outline-variant/10 shadow-ambient animate-pulse flex flex-col h-[340px]">
                      <div className="w-full h-44 bg-slate-200"></div>
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div className="space-y-3">
                          <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                          <div className="h-5 bg-slate-200 rounded w-3/4"></div>
                          <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                          <div className="h-5 bg-slate-200 rounded w-1/4"></div>
                          <div className="h-8 bg-slate-200 rounded w-1/4"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-error font-medium">{error}</p>
              </div>
            ) : rooms.length === 0 ? (
              <div className="text-center py-20 space-y-2">
                <p className="text-[#5c3f41] text-base font-bold">No properties found matching your criteria.</p>
                <p className="text-xs text-[#5c3f41]/60">Try adjusting your filters or search location.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Asymmetric layout: Large card first */}
                {rooms.length > 0 && (
                  <div className="mb-4">
                    <PropertyCard 
                      room={rooms[0]} 
                      variant="default" 
                      focusedRoomId={focusedRoomId}
                      onSelectRoom={handleSelectRoom}
                    />
                  </div>
                )}

                {/* Remaining Properties Grid */}
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                >
                  {rooms.slice(1).map((room) => (
                    <motion.div key={room.id} variants={fadeIn}>
                      <PropertyCard 
                        room={room} 
                        focusedRoomId={focusedRoomId}
                        onSelectRoom={handleSelectRoom}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}

            {/* Inline Footer inside list scroll container */}
            <div className="pt-12 border-t border-outline-variant/10 flex-shrink-0">
              <Footer />
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Map */}
        <div className="hidden md:block md:w-[50%] lg:w-[55%] h-full border-l border-outline-variant/15 relative">
          <MapWidget 
            rooms={rooms}
            focusedRoomId={focusedRoomId}
            onSelectRoom={handleSelectRoom}
          />
        </div>

      </main>

      <FilterModal 
        isOpen={isFilterModalOpen} 
        onClose={() => setIsFilterModalOpen(false)} 
      />
    </div>
  );
}