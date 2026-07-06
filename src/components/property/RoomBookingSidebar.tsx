import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';
import { PremiumButton } from '../ui/PremiumButton';

interface RoomBookingSidebarProps {
  roomId: string;
  pricePerNight: number;
  rating: number;
  maxGuests: number;
  checkIn: string | null;
  checkOut: string | null;
  guests: number;
  setCheckIn: (val: string) => void;
  setCheckOut: (val: string) => void;
  setGuests: (val: number) => void;
}

export const RoomBookingSidebar: React.FC<RoomBookingSidebarProps> = ({
  roomId,
  pricePerNight,
  rating,
  maxGuests,
  checkIn,
  checkOut,
  guests,
  setCheckIn,
  setCheckOut,
  setGuests,
}) => {
  const navigate = useNavigate();

  const nights =
    checkIn && checkOut
      ? Math.max(1, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000))
      : 5;

  const subtotal = pricePerNight * nights;
  const cleaningFee = 120;
  const serviceFee = Math.round(subtotal * 0.065);
  const total = subtotal + cleaningFee + serviceFee;

  return (
    <div className="sticky top-24 bg-surface-container-lowest rounded-2xl shadow-ambient p-6 space-y-5 border border-outline-variant/10">
      {/* Price + Rating */}
      <div className="flex items-baseline justify-between">
        <div>
          <span className="text-2xl font-bold text-on-surface">{formatCurrency(pricePerNight, 'GBP')}</span>
          <span className="text-xs text-on-surface-variant ml-1 font-body">/ night</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-on-surface text-on-surface" />
          <span className="text-sm font-semibold text-on-surface">{rating.toFixed(2)}</span>
        </div>
      </div>

      {/* Date/Guest Inputs */}
      <div className="border border-outline-variant/20 rounded-xl overflow-hidden bg-white">
        <div className="grid grid-cols-2 divide-x divide-outline-variant/20">
          <div className="p-3">
            <p className="text-[10px] font-headline font-bold uppercase tracking-widest text-on-surface-variant">
              Check-in
            </p>
            <input
              type="date"
              value={checkIn || ''}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setCheckIn(e.target.value)}
              className="text-xs text-on-surface font-body outline-none bg-transparent w-full mt-1.5 focus:ring-0"
            />
          </div>
          <div className="p-3">
            <p className="text-[10px] font-headline font-bold uppercase tracking-widest text-on-surface-variant">
              Check-out
            </p>
            <input
              type="date"
              value={checkOut || ''}
              min={checkIn || new Date().toISOString().split('T')[0]}
              onChange={(e) => setCheckOut(e.target.value)}
              className="text-xs text-on-surface font-body outline-none bg-transparent w-full mt-1.5 focus:ring-0"
            />
          </div>
        </div>
        <div className="border-t border-outline-variant/20 p-3 bg-white">
          <p className="text-[10px] font-headline font-bold uppercase tracking-widest text-on-surface-variant">
            Guests
          </p>
          <select
            value={guests || 2}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="text-xs text-on-surface font-body outline-none bg-transparent w-full mt-1.5 focus:ring-0 border-0 p-0"
          >
            {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} Guest{n > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      {checkIn && checkOut ? (
        <>
          {/* Reserve Button */}
          <PremiumButton
            onClick={() => navigate(`/checkout/${roomId}`)}
            className="w-full py-4 text-xs tracking-wider uppercase font-bold"
          >
            Reserve Suite
          </PremiumButton>

          <p className="text-center text-xs text-on-surface-variant font-body">
            You won't be charged yet
          </p>

          {/* Price Breakdown */}
          <div className="space-y-3 pt-4 border-t border-outline-variant/10">
            <div className="flex justify-between text-sm font-body">
              <span className="text-on-surface-variant">
                {formatCurrency(pricePerNight, 'GBP')} × {nights} nights
              </span>
              <span className="text-on-surface font-semibold">{formatCurrency(subtotal, 'GBP')}</span>
            </div>
            <div className="flex justify-between text-sm font-body">
              <span className="text-on-surface-variant">Cleaning fee</span>
              <span className="text-on-surface font-semibold">{formatCurrency(cleaningFee, 'GBP')}</span>
            </div>
            <div className="flex justify-between text-sm font-body">
              <span className="text-on-surface-variant">Editorial service fee</span>
              <span className="text-on-surface font-semibold">{formatCurrency(serviceFee, 'GBP')}</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-outline-variant/10">
              <span className="font-headline font-bold text-on-surface">Total</span>
              <span className="text-xl font-headline font-bold text-on-surface">
                {formatCurrency(total, 'GBP')}
              </span>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 text-center">
          <p className="text-xs text-on-surface-variant font-body leading-relaxed">
            Select check-in and check-out dates above to check pricing and availability.
          </p>
        </div>
      )}
    </div>
  );
};
