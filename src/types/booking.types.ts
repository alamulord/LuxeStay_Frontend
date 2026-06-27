export interface Booking {
  id: string;
  userId: string;
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  totalPrice: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'CHECKED_IN' | 'CHECKED_OUT' | 'COMPLETED';
  specialRequests?: string;
  room: {
    id: string;
    title: string;
    images: string[];
    pricePerNight: number;
    location?: string;
    city?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
    address?: string;
  };
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  payment?: {
    amount: number;
    status: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingRequest {
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  specialRequests?: string;
}