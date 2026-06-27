import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, Search, Star, Wifi, Waves, Flame, Compass, Tv, Coffee, ShieldCheck } from 'lucide-react';
import { useFilterStore } from '../../store/filterStore';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const citiesList = [
  { name: 'All Locations', value: '' },
  { name: 'New York, USA', value: 'New York' },
  { name: 'Santorini, Greece', value: 'Santorini' },
  { name: 'Bend, Oregon', value: 'Bend' },
  { name: 'Ubud, Bali', value: 'Ubud' },
  { name: 'Maldives', value: 'Maldives' },
  { name: 'Shibuya, Tokyo', value: 'Tokyo' },
];

const amenitiesList = [
  { id: 'wifi', label: 'WiFi', icon: Wifi },
  { id: 'climate', label: 'Climate Control', icon: Tv }, // representing AC
  { id: 'kitchen', label: 'Kitchenette', icon: Coffee },
  { id: 'tv', label: 'Smart TV', icon: Tv },
  { id: 'pool', label: 'Private Pool', icon: Waves },
  { id: 'spa', label: 'Spa Access', icon: Flame },
  { id: 'gym', label: 'Gym Access', icon: ShieldCheck },
  { id: 'ocean', label: 'Ocean View', icon: Compass },
  { id: 'tub', label: 'Hot Tub', icon: Flame },
];

export function FilterModal({ isOpen, onClose }: FilterModalProps) {
  const store = useFilterStore();

  // Local state to hold filters before applying
  const [localLocation, setLocalLocation] = useState(store.location || '');
  const [localPriceMin, setLocalPriceMin] = useState<number | undefined>(store.priceMin);
  const [localPriceMax, setLocalPriceMax] = useState<number | undefined>(store.priceMax);
  const [localGuests, setLocalGuests] = useState<number | undefined>(store.guests);
  const [localBedrooms, setLocalBedrooms] = useState<number | undefined>(store.bedrooms);
  const [localAmenities, setLocalAmenities] = useState<string[]>(store.amenities || []);
  const [localSortBy, setLocalSortBy] = useState<'price' | 'rating' | 'newest' | undefined>(store.sortBy);
  const [localSortOrder, setLocalSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    if (isOpen) {
      setLocalLocation(store.location || '');
      setLocalPriceMin(store.priceMin);
      setLocalPriceMax(store.priceMax);
      setLocalGuests(store.guests);
      setLocalBedrooms(store.bedrooms);
      setLocalAmenities(store.amenities || []);
      setLocalSortBy(store.sortBy);
      setLocalSortOrder(store.sortOrder || 'desc');
    }
  }, [isOpen, store]);

  if (!isOpen) return null;

  const handleApply = () => {
    store.setLocation(localLocation || undefined);
    store.setGuests(localGuests);
    store.setBedrooms(localBedrooms);
    store.setPriceRange(localPriceMin, localPriceMax);
    store.setAmenities(localAmenities.length > 0 ? localAmenities : undefined);
    
    // Set Sort parameters
    if (localSortBy) {
      store.setSortBy(localSortBy);
      // If price, sync correct sort order
      if (localSortBy === 'price') {
        useFilterStore.setState({ sortOrder: localSortOrder });
      } else {
        useFilterStore.setState({ sortOrder: 'desc' });
      }
    } else {
      store.setSortBy(undefined);
    }

    onClose();
  };

  const handleClearAll = () => {
    setLocalLocation('');
    setLocalPriceMin(undefined);
    setLocalPriceMax(undefined);
    setLocalGuests(undefined);
    setLocalBedrooms(undefined);
    setLocalAmenities([]);
    setLocalSortBy('rating');
    setLocalSortOrder('desc');
  };

  const toggleAmenity = (name: string) => {
    setLocalAmenities(prev => 
      prev.includes(name) ? prev.filter(a => a !== name) : [...prev, name]
    );
  };

  const handleQuickPriceRange = (min: number | undefined, max: number | undefined) => {
    setLocalPriceMin(min);
    setLocalPriceMax(max);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1a1c1c]/40 backdrop-blur-sm flex items-center justify-center p-4 md:p-6 overflow-hidden">
      <div 
        className="bg-white w-full max-w-2xl rounded-2xl shadow-ambient-md flex flex-col max-h-[85vh] md:max-h-[90vh] overflow-hidden border border-outline-variant/10 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/10">
          <button onClick={onClose} className="p-1 rounded-full hover:bg-surface-container-high transition-colors">
            <X className="w-5 h-5 text-[#1a1c1c]" />
          </button>
          <h2 className="font-headline text-lg font-bold text-[#1a1c1c]" style={{ fontStyle: 'italic' }}>
            Refine Your Search
          </h2>
          <button 
            onClick={handleClearAll}
            className="text-xs font-bold uppercase tracking-wider text-[#5c3f41] hover:underline"
          >
            Clear all
          </button>
        </div>

        {/* Scrollable Filters List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 divide-y divide-outline-variant/10 select-none">
          
          {/* Location */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#5c3f41]">Destination</h3>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5c3f41]" />
              <input
                type="text"
                placeholder="Search destination cities or countries..."
                value={localLocation}
                onChange={(e) => setLocalLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-outline-variant/35 text-sm focus:outline-none focus:border-[#ba0036] transition-colors"
              />
            </div>
            
            {/* Quick Cities Grid */}
            <div className="flex flex-wrap gap-2 pt-1">
              {citiesList.map((city) => {
                const isSelected = city.value === localLocation || (city.value === '' && localLocation === '');
                return (
                  <button
                    key={city.name}
                    onClick={() => setLocalLocation(city.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                      isSelected
                        ? 'bg-[#ba0036] text-white border-[#ba0036] shadow-sm'
                        : 'bg-white text-[#1a1c1c] border-outline-variant/30 hover:border-[#1a1c1c]/55'
                    }`}
                  >
                    {city.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range */}
          <div className="pt-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#5c3f41]">Price range per night</h3>
            <div className="flex items-center gap-4">
              <div className="flex-1 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-[#5c3f41]">Min Price</span>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#5c3f41]">£</span>
                  <input
                    type="number"
                    value={localPriceMin !== undefined ? localPriceMin : ''}
                    onChange={(e) => setLocalPriceMin(e.target.value ? parseInt(e.target.value) : undefined)}
                    placeholder="0"
                    className="w-full pl-7 pr-3 py-2 rounded-xl border border-outline-variant/35 text-sm focus:outline-none focus:border-[#ba0036]"
                  />
                </div>
              </div>
              <div className="flex-shrink-0 text-sm font-semibold text-[#5c3f41] pt-6">—</div>
              <div className="flex-1 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-[#5c3f41]">Max Price</span>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#5c3f41]">£</span>
                  <input
                    type="number"
                    value={localPriceMax !== undefined ? localPriceMax : ''}
                    onChange={(e) => setLocalPriceMax(e.target.value ? parseInt(e.target.value) : undefined)}
                    placeholder="Any"
                    className="w-full pl-7 pr-3 py-2 rounded-xl border border-outline-variant/35 text-sm focus:outline-none focus:border-[#ba0036]"
                  />
                </div>
              </div>
            </div>

            {/* Quick Price Buttons */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => handleQuickPriceRange(undefined, undefined)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                  localPriceMin === undefined && localPriceMax === undefined
                    ? 'bg-[#ba0036] text-white border-[#ba0036]'
                    : 'bg-white text-[#1a1c1c] border-outline-variant/30 hover:border-[#1a1c1c]/50'
                }`}
              >
                All Prices
              </button>
              <button
                onClick={() => handleQuickPriceRange(undefined, 200)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                  localPriceMin === undefined && localPriceMax === 200
                    ? 'bg-[#ba0036] text-white border-[#ba0036]'
                    : 'bg-white text-[#1a1c1c] border-outline-variant/30 hover:border-[#1a1c1c]/50'
                }`}
              >
                Under £200
              </button>
              <button
                onClick={() => handleQuickPriceRange(200, 400)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                  localPriceMin === 200 && localPriceMax === 400
                    ? 'bg-[#ba0036] text-white border-[#ba0036]'
                    : 'bg-white text-[#1a1c1c] border-outline-variant/30 hover:border-[#1a1c1c]/50'
                }`}
              >
                £200 - £400
              </button>
              <button
                onClick={() => handleQuickPriceRange(400, undefined)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                  localPriceMin === 400 && localPriceMax === undefined
                    ? 'bg-[#ba0036] text-white border-[#ba0036]'
                    : 'bg-white text-[#1a1c1c] border-outline-variant/30 hover:border-[#1a1c1c]/50'
                }`}
              >
                £400+
              </button>
            </div>
          </div>

          {/* Rooms and Guests */}
          <div className="pt-6 space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#5c3f41]">Rooms & Guests</h3>
            
            {/* Guests Counter */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm text-[#1a1c1c]">Guests limit</p>
                <p className="text-xs text-[#5c3f41]">Minimum number of allowed guests capacity</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  disabled={localGuests === undefined || localGuests <= 1}
                  onClick={() => setLocalGuests(prev => prev ? prev - 1 : undefined)}
                  className="w-8 h-8 rounded-full border border-outline-variant/30 flex items-center justify-center disabled:opacity-40 hover:border-[#1a1c1c]"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center font-semibold text-sm">{localGuests || 'Any'}</span>
                <button
                  onClick={() => setLocalGuests(prev => (prev || 0) + 1)}
                  className="w-8 h-8 rounded-full border border-outline-variant/30 flex items-center justify-center hover:border-[#1a1c1c]"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Bedrooms Selection */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm text-[#1a1c1c]">Bedrooms count</p>
                <p className="text-xs text-[#5c3f41]">Filter suite layout by number of private bedrooms</p>
              </div>
              <div className="flex gap-2">
                {[undefined, 1, 2, 3].map((num) => (
                  <button
                    key={num === undefined ? 'any' : num}
                    onClick={() => setLocalBedrooms(num)}
                    className={`w-10 h-8 rounded-lg text-xs font-bold border transition-colors ${
                      localBedrooms === num
                        ? 'bg-[#ba0036] text-white border-[#ba0036]'
                        : 'bg-white text-[#1a1c1c] border-outline-variant/30 hover:border-[#1a1c1c]'
                    }`}
                  >
                    {num === undefined ? 'Any' : `${num}`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Popular Amenities */}
          <div className="pt-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#5c3f41]">Amenities & Collections</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {amenitiesList.map((amenity) => {
                const isSelected = localAmenities.includes(amenity.label);
                return (
                  <button
                    key={amenity.id}
                    onClick={() => toggleAmenity(amenity.label)}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-left transition-all duration-200 ${
                      isSelected
                        ? 'bg-[#ba0036]/5 text-[#ba0036] border-[#ba0036] font-semibold'
                        : 'bg-white text-[#1a1c1c] border-outline-variant/20 hover:border-outline-variant/40'
                    }`}
                  >
                    <amenity.icon className={`w-4 h-4 ${isSelected ? 'text-[#ba0036]' : 'text-[#5c3f41]'}`} />
                    <span className="text-xs">{amenity.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sorting */}
          <div className="pt-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#5c3f41]">Sorting Options</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setLocalSortBy('rating');
                  setLocalSortOrder('desc');
                }}
                className={`py-2 px-4 rounded-xl border text-xs font-bold text-center uppercase tracking-wider ${
                  localSortBy === 'rating'
                    ? 'bg-[#ba0036] text-white border-[#ba0036]'
                    : 'bg-white text-[#1a1c1c] border-outline-variant/30'
                }`}
              >
                Highest Rated
              </button>
              <button
                onClick={() => {
                  setLocalSortBy('newest');
                  setLocalSortOrder('desc');
                }}
                className={`py-2 px-4 rounded-xl border text-xs font-bold text-center uppercase tracking-wider ${
                  localSortBy === 'newest'
                    ? 'bg-[#ba0036] text-white border-[#ba0036]'
                    : 'bg-white text-[#1a1c1c] border-outline-variant/30'
                }`}
              >
                Newest Additions
              </button>
              <button
                onClick={() => {
                  setLocalSortBy('price');
                  setLocalSortOrder('asc');
                }}
                className={`py-2 px-4 rounded-xl border text-xs font-bold text-center uppercase tracking-wider ${
                  localSortBy === 'price' && localSortOrder === 'asc'
                    ? 'bg-[#ba0036] text-white border-[#ba0036]'
                    : 'bg-white text-[#1a1c1c] border-outline-variant/30'
                }`}
              >
                Price: Low to High
              </button>
              <button
                onClick={() => {
                  setLocalSortBy('price');
                  setLocalSortOrder('desc');
                }}
                className={`py-2 px-4 rounded-xl border text-xs font-bold text-center uppercase tracking-wider ${
                  localSortBy === 'price' && localSortOrder === 'desc'
                    ? 'bg-[#ba0036] text-white border-[#ba0036]'
                    : 'bg-white text-[#1a1c1c] border-outline-variant/30'
                }`}
              >
                Price: High to Low
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-outline-variant/10 bg-surface-container-lowest">
          <button 
            onClick={onClose} 
            className="px-5 py-2.5 border border-outline-variant/30 hover:border-[#1a1c1c] rounded-full text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Close
          </button>
          <button 
            onClick={handleApply}
            className="btn-primary-gradient px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-ambient"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
