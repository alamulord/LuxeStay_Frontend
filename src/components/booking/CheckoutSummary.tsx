import React from 'react';
import { formatCurrency } from '../../lib/utils';
import { Room } from '../../types/room.types';

interface CheckoutSummaryProps {
  room: Room;
  pricePerNight: number;
  nights: number;
  subtotal: number;
  serviceFee: number;
  taxes: number;
  total: number;
  formattedCheckIn: string;
}

export const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({
  room,
  pricePerNight,
  nights,
  subtotal,
  serviceFee,
  taxes,
  total,
  formattedCheckIn,
}) => {
  return (
    <div>
      <div className="sticky top-24 bg-surface-container-lowest rounded-2xl shadow-ambient p-6 space-y-5 border border-outline-variant/10">
        {/* Room Preview */}
        <div className="flex gap-4">
          <img
            src={
              room.images[0] ||
              'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=200&h=200&fit=crop'
            }
            alt={room.title}
            className="w-28 h-24 object-cover rounded-xl flex-shrink-0"
          />
          <div>
            <p className="text-[10px] font-headline font-bold uppercase tracking-widest text-primary">
              {room.city}
            </p>
            <h3 className="font-headline text-base font-bold text-on-surface leading-tight mt-0.5">
              {room.title}
            </h3>
            <div className="flex items-center gap-1 mt-1.5 text-xs text-on-surface-variant font-body">
              <span className="font-semibold text-on-surface">★ {room.rating.toFixed(2)}</span>
              <span>({room.reviewCount} reviews)</span>
            </div>
          </div>
        </div>

        <div className="border-t border-outline-variant/10" />

        {/* Price Details */}
        <div>
          <h4 className="font-headline font-bold text-on-surface mb-4">Price details</h4>
          <div className="space-y-3 font-body text-sm">
            <div className="flex justify-between">
              <span className="text-on-surface-variant">
                {formatCurrency(pricePerNight, 'GBP')} x {nights} nights
              </span>
              <span className="text-on-surface font-semibold">{formatCurrency(subtotal, 'GBP')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant underline">Service fee</span>
              <span className="text-on-surface font-semibold">{formatCurrency(serviceFee, 'GBP')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant font-body">Occupancy taxes</span>
              <span className="text-on-surface font-semibold">{formatCurrency(taxes, 'GBP')}</span>
            </div>
          </div>
        </div>

        <div className="border-t border-outline-variant/10" />

        <div className="flex justify-between">
          <span className="font-headline font-bold text-on-surface">Total (GBP)</span>
          <span className="text-xl font-headline font-bold text-on-surface">
            {formatCurrency(total, 'GBP')}
          </span>
        </div>

        {/* Cancellation Notice */}
        <div className="bg-surface-container-low rounded-xl p-4 flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-primary text-xs font-bold font-headline">i</span>
          </div>
          <p className="text-xs text-on-surface-variant font-body leading-relaxed">
            <strong className="text-on-surface font-semibold">Free cancellation before {formattedCheckIn}.</strong>{' '}
            Get a full refund if you change your mind within the next 48 hours.
          </p>
        </div>
      </div>
    </div>
  );
};
