import React from 'react';
import { formatCurrency, calculateNights } from '../../lib/utils';

interface PriceBreakdownSidebarProps {
  pricePerNight: number;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
}

export function PriceBreakdownSidebar({ pricePerNight, checkInDate, checkOutDate, guests }: PriceBreakdownSidebarProps) {
  const nights = calculateNights(checkInDate, checkOutDate);
  const subtotal = pricePerNight * nights;
  const serviceFee = subtotal * 0.1;
  const total = subtotal + serviceFee;

  return (
    <div className="bg-surface-container-lowest rounded-lg p-6 space-y-4">
      <h2 className="font-semibold text-xl">Price details</h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-on_surface_variant">
            {formatCurrency(pricePerNight)} x {nights} night{nights > 1 ? 's' : ''}
          </span>
          <span>{formatCurrency(subtotal)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-on_surface_variant">Service fee</span>
          <span>{formatCurrency(serviceFee)}</span>
        </div>

        <div className="border-t border-outline_variant/15 pt-3">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total ({guests} guest{guests > 1 ? 's' : ''})</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>

        <p className="text-xs text-on_surface_variant">
          You won't be charged yet
        </p>
      </div>
    </div>
  );
}