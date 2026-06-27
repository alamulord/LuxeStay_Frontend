import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Room } from '../types/room.types';

interface BookingState {
  selectedRoom: Room | null;
  checkInDate: string | null;
  checkOutDate: string | null;
  guests: number;
}

interface BookingContextType extends BookingState {
  setSelectedRoom: (room: Room | null) => void;
  setDates: (checkIn: string | null, checkOut: string | null) => void;
  setGuests: (guests: number) => void;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [checkInDate, setCheckInDate] = useState<string | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<string | null>(null);
  const [guests, setGuests] = useState(1);

  const setDates = (checkIn: string | null, checkOut: string | null) => {
    setCheckInDate(checkIn);
    setCheckOutDate(checkOut);
  };

  const resetBooking = () => {
    setSelectedRoom(null);
    setCheckInDate(null);
    setCheckOutDate(null);
    setGuests(1);
  };

  return (
    <BookingContext.Provider
      value={{
        selectedRoom,
        checkInDate,
        checkOutDate,
        guests,
        setSelectedRoom,
        setDates,
        setGuests,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}