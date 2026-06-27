import React, { useState } from 'react';
import { Calendar, Users } from 'lucide-react';
import { Room } from '../../types/room.types';
import { formatCurrency, calculateNights } from '../../lib/utils';
import { useBooking } from '../../contexts/BookingContext';
import { useNavigate } from 'react-router-dom';

interface StickyBookingPanelProps {
  room: Room;
}

export function StickyBookingPanel({ room }: StickyBookingPanelProps) {
  const navigate = useNavigate();
  const { setSelectedRoom, setDates, setGuests, checkInDate, checkOutDate, guests } = useBooking();
  const [checkIn, setCheckIn] = useState(checkInDate || '');
  const [checkOut, setCheckOut] = useState(checkOutDate || '');
  const [guestCount, setGuestCount] = useState(guests || 1);

  const nights = checkIn && checkOut ? calculateNights(checkIn, checkOut) : 0;
  const totalPrice = nights * room.pricePerNight;

  const handleReserve = () => {
    setSelectedRoom(room);
    setDates(checkIn, checkOut);
    setGuests(guestCount);
    navigate(`/checkout/${room.id}`);
  };

  return (
    <div className="sticky top-24 bg-surface-container-lowest rounded-lg p-6 shadow-lg">
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <span className="text-2xl font-bold">{formatCurrency(room.pricePerNight)}</span>
          <span className="text-on_surface_variant"> / night</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-medium">{room.rating.toFixed(1)}</span>
          <span className="text-on_surface_variant text-sm">({room.reviewCount} reviews)</span>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center border border-outline_variant/15 rounded-md overflow-hidden">
          <div className="flex-1 p-3 border-r border-outline_variant/15">
            <label className="text-xs text-on_surface_variant block">Check-in</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full text-sm font-medium outline-none"
            />
          </div>
          <div className="flex-1 p-3">
            <label className="text-xs text-on_surface_variant block">Check-out</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full text-sm font-medium outline-none"
            />
          </div>
        </div>

        <div className="p-3 border border-outline_variant/15 rounded-md">
          <label className="text-xs text-on_surface_variant block">Guests</label>
          <select
            value={guestCount}
            onChange={(e) => setGuestCount(Number(e.target.value))}
            className="w-full text-sm font-medium outline-none"
          >
            {Array.from({ length: room.maxGuests }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num} guest{num > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button onClick={handleReserve} className="btn-primary w-full mb-4" disabled={!checkIn || !checkOut}>
        {checkIn && checkOut ? 'Reserve' : 'Select dates'}
      </button>

      {nights > 0 && (
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-on_surface_variant">
              {formatCurrency(room.pricePerNight)} x {nights} nights
            </span>
            <span>{formatCurrency(totalPrice)}</span>
          </div>
          <div className="flex justify-between text-on_surface_variant">
            <span>Service fee</span>
            <span>{formatCurrency(totalPrice * 0.1)}</span>
          </div>
          <div className="border-t border-outline_variant/15 pt-2 flex justify-between font-semibold">
            <span>Total</span>
            <span>{formatCurrency(totalPrice + totalPrice * 0.1)}</span>
          </div>
        </div>
      )}
    </div>
  );
}