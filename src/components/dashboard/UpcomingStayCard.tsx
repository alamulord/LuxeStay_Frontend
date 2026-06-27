import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Booking } from '../../types/booking.types';
import { formatDate, formatCurrency } from '../../lib/utils';

interface UpcomingStayCardProps {
  booking: Booking;
}

export function UpcomingStayCard({ booking }: UpcomingStayCardProps) {
  return (
    <div className="bg-surface-container-lowest rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Upcoming
        </span>
        <span className="text-on_surface_variant text-sm">
          Booked {formatDate(booking.createdAt)}
        </span>
      </div>

      <div className="flex gap-4">
        <img
          src={booking.room.images[0]}
          alt={booking.room.title}
          className="w-24 h-24 rounded-md object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold mb-1">{booking.room.title}</h3>
          <div className="flex items-center gap-2 mb-2">
            <p className="text-sm text-on_surface_variant flex items-center gap-1">
              <MapPin className="w-3 h-3 text-primary shrink-0" />
              {booking.room.city}, {booking.room.country}
            </p>
            {booking.room.latitude !== undefined && booking.room.latitude !== null && (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${booking.room.latitude},${booking.room.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-primary font-bold uppercase hover:underline ml-2"
                onClick={(e) => e.stopPropagation()}
              >
                Maps
              </a>
            )}
          </div>
          <p className="text-sm flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(booking.checkInDate)} - {formatDate(booking.checkOutDate)}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-outline_variant/15">
        <div>
          <p className="text-sm text-on_surface_variant">Total price</p>
          <p className="font-semibold">{formatCurrency(booking.totalPrice)}</p>
        </div>
        <Link
          to={`/booking/${booking.id}`}
          className="flex items-center gap-1 text-primary hover:underline"
        >
          View booking <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}