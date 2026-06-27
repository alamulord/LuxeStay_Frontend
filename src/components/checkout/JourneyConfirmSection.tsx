import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, MapPin } from 'lucide-react';
import { Room } from '../../types/room.types';
import { formatDate, formatCurrency } from '../../lib/utils';

interface JourneyConfirmSectionProps {
  room: Room;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
}

export function JourneyConfirmSection({ room, checkInDate, checkOutDate, guests }: JourneyConfirmSectionProps) {
  return (
    <div className="bg-surface-container-lowest rounded-lg p-6">
      <Link to={`/room/${room.id}`} className="flex items-center gap-2 text-on_surface_variant hover:text-primary mb-4">
        <ArrowLeft className="w-4 h-4" />
        <span>Change your stay</span>
      </Link>

      <h2 className="font-semibold text-xl mb-4">Confirm your stay</h2>

      <div className="flex gap-4 mb-4">
        <img
          src={room.images[0]}
          alt={room.title}
          className="w-24 h-24 rounded-md object-cover"
        />
        <div>
          <h3 className="font-medium">{room.title}</h3>
          <p className="text-sm text-on_surface_variant flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {room.city}, {room.country}
          </p>
          <div className="flex items-center gap-4 mt-2 text-sm text-on_surface_variant">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(checkInDate)} - {formatDate(checkOutDate)}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {guests} guests
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-outline_variant/15 pt-4">
        <div className="flex justify-between text-sm">
          <span>{formatCurrency(room.pricePerNight)} x nights</span>
          <span>{formatCurrency(room.pricePerNight)}</span>
        </div>
      </div>
    </div>
  );
}