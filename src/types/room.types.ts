export interface Amenity {
  id: string;
  name: string;
  icon: string;
  type: 'BASIC' | 'PREMIUM' | 'LUXURY';
}

export interface RoomAmenity {
  id: string;
  amenity: Amenity;
}

export interface Room {
  id: string;
  title: string;
  description: string;
  pricePerNight: number;
  maxGuests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  squareFeet?: number;
  location: string;
  latitude?: number;
  longitude?: number;
  address: string;
  city: string;
  country: string;
  zipCode?: string;
  images: string[];
  tour3dUrl?: string;
  isFeatured: boolean;
  isAvailable: boolean;
  views: number;
  rating: number;
  reviewCount: number;
  amenities: RoomAmenity[];
  createdAt: string;
  updatedAt: string;
}

export interface RoomFilters {
  location?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  bedrooms?: number;
  priceMin?: number;
  priceMax?: number;
  amenities?: string[];
  isFeatured?: boolean;
  sortBy?: 'price' | 'rating' | 'newest';
  sortOrder?: 'asc' | 'desc';
}

export interface CreateRoomRequest {
  title: string;
  description: string;
  pricePerNight: number;
  maxGuests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  squareFeet?: number;
  location: string;
  latitude?: number;
  longitude?: number;
  address: string;
  city: string;
  country: string;
  zipCode?: string;
  images: string[];
  amenities?: string[];
  tour3dUrl?: string;
  isFeatured?: boolean;
  isAvailable?: boolean;
}