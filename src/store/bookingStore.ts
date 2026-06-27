import { create } from 'zustand';

interface BookingStore {
  checkIn: string | null;
  checkOut: string | null;
  guests: number;
  setCheckIn: (date: string) => void;
  setCheckOut: (date: string) => void;
  setGuests: (n: number) => void;
  reset: () => void;
}

export const useBookingStore = create<BookingStore>((set) => ({
  checkIn: null,
  checkOut: null,
  guests: 2,
  setCheckIn: (date) => set({ checkIn: date }),
  setCheckOut: (date) => set({ checkOut: date }),
  setGuests: (n) => set({ guests: n }),
  reset: () => set({ checkIn: null, checkOut: null, guests: 2 }),
}));
