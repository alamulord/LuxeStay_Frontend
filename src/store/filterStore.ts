import { create } from 'zustand';
import { RoomFilters } from '../types/room.types';

interface FilterState extends RoomFilters {
  setLocation: (location: string | undefined) => void;
  setCheckIn: (checkIn: string | undefined) => void;
  setCheckOut: (checkOut: string | undefined) => void;
  setGuests: (guests: number | undefined) => void;
  setBedrooms: (bedrooms: number | undefined) => void;
  setPriceRange: (min: number | undefined, max: number | undefined) => void;
  setAmenities: (amenities: string[] | undefined) => void;
  setSortBy: (sortBy: 'price' | 'rating' | 'newest' | undefined) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  location: undefined,
  checkIn: undefined,
  checkOut: undefined,
  guests: undefined,
  bedrooms: undefined,
  priceMin: undefined,
  priceMax: undefined,
  amenities: undefined,
  sortBy: 'rating',
  sortOrder: 'desc',

  setLocation: (location) => set({ location }),
  setCheckIn: (checkIn) => set({ checkIn }),
  setCheckOut: (checkOut) => set({ checkOut }),
  setGuests: (guests) => set({ guests }),
  setBedrooms: (bedrooms) => set({ bedrooms }),
  setPriceRange: (priceMin, priceMax) => set({ priceMin, priceMax }),
  setAmenities: (amenities) => set({ amenities }),
  setSortBy: (sortBy) => set({ sortBy }),
  resetFilters: () => set({
    location: undefined,
    checkIn: undefined,
    checkOut: undefined,
    guests: undefined,
    bedrooms: undefined,
    priceMin: undefined,
    priceMax: undefined,
    amenities: undefined,
    sortBy: 'rating',
    sortOrder: 'desc',
  }),
}));