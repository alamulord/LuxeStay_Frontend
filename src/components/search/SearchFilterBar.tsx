import React from 'react';
import { SlidersHorizontal, X } from 'lucide-react';

interface FilterStore {
  location?: string;
  priceMin?: number;
  priceMax?: number;
  guests?: number;
  bedrooms?: number;
  amenities?: string[];
  setLocation: (loc?: string) => void;
  setPriceRange: (min?: number, max?: number) => void;
  setGuests: (g?: number) => void;
  setBedrooms: (b?: number) => void;
  setAmenities: (a?: string[]) => void;
  resetFilters: () => void;
}

interface SearchFilterBarProps {
  filters: FilterStore;
  onOpenFilterModal: () => void;
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  filters,
  onOpenFilterModal,
}) => {
  const hasActiveFilters = !!(
    filters.location ||
    filters.priceMin !== undefined ||
    filters.priceMax !== undefined ||
    filters.guests ||
    filters.bedrooms ||
    (filters.amenities && filters.amenities.length > 0)
  );

  return (
    <div className="px-6 lg:px-10 py-3.5 border-b border-outline-variant/10 flex-shrink-0 bg-white flex items-center justify-between">
      <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
        <button
          onClick={onOpenFilterModal}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-headline font-bold border bg-white text-on-surface border-outline-variant/30 hover:border-on-surface transition-all duration-200 uppercase tracking-wider flex-shrink-0"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-on-surface" />
          Filters
        </button>

        {filters.location && (
          <span className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-headline font-bold bg-primary/5 text-primary border border-primary/20 uppercase tracking-wider flex-shrink-0">
            {filters.location}
            <X
              className="w-3 h-3 cursor-pointer hover:text-black"
              onClick={() => filters.setLocation(undefined)}
            />
          </span>
        )}

        {(filters.priceMin !== undefined || filters.priceMax !== undefined) && (
          <span className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-headline font-bold bg-primary/5 text-primary border border-primary/20 uppercase tracking-wider flex-shrink-0">
            {filters.priceMin && !filters.priceMax ? `> £${filters.priceMin}` : ''}
            {!filters.priceMin && filters.priceMax ? `< £${filters.priceMax}` : ''}
            {filters.priceMin && filters.priceMax
              ? `£${filters.priceMin}-£${filters.priceMax}`
              : ''}
            <X
              className="w-3 h-3 cursor-pointer hover:text-black"
              onClick={() => filters.setPriceRange(undefined, undefined)}
            />
          </span>
        )}

        {filters.guests && (
          <span className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-headline font-bold bg-primary/5 text-primary border border-primary/20 uppercase tracking-wider flex-shrink-0">
            {filters.guests}+ guests
            <X
              className="w-3 h-3 cursor-pointer hover:text-black"
              onClick={() => filters.setGuests(undefined)}
            />
          </span>
        )}

        {filters.bedrooms && (
          <span className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-headline font-bold bg-primary/5 text-primary border border-primary/20 uppercase tracking-wider flex-shrink-0">
            {filters.bedrooms} BR
            <X
              className="w-3 h-3 cursor-pointer hover:text-black"
              onClick={() => filters.setBedrooms(undefined)}
            />
          </span>
        )}

        {filters.amenities &&
          filters.amenities.map((amenity) => (
            <span
              key={amenity}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-headline font-bold bg-primary/5 text-primary border border-primary/20 uppercase tracking-wider flex-shrink-0"
            >
              {amenity}
              <X
                className="w-3 h-3 cursor-pointer hover:text-black"
                onClick={() => {
                  const next = filters.amenities?.filter((a) => a !== amenity);
                  filters.setAmenities(next && next.length > 0 ? next : undefined);
                }}
              />
            </span>
          ))}

        {hasActiveFilters && (
          <button
            onClick={() => filters.resetFilters()}
            className="text-[10px] font-headline font-bold text-on-surface-variant hover:underline uppercase tracking-wider pl-2 flex-shrink-0"
          >
            Reset all
          </button>
        )}
      </div>
    </div>
  );
};
