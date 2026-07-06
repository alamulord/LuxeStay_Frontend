import React from 'react';
import { FileText, Globe, MapPin } from 'lucide-react';
import { Booking } from '../../types/booking.types';
import { formatDate } from '../../lib/utils';

interface UpcomingStayCardProps {
  booking: Booking;
  onCancelClick: (bookingId: string) => void;
  onReceiptClick: (booking: Booking) => void;
}

export function UpcomingStayCard({ booking, onCancelClick, onReceiptClick }: UpcomingStayCardProps) {
  const calculateNights = (checkIn: string, checkOut: string): number => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const nights = calculateNights(booking.checkInDate, booking.checkOutDate);

  return (
    <div className="bg-surface-container-lowest border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex flex-col md:flex-row">
        {/* Room Image */}
        <div className="w-full md:w-2/5 relative h-48 md:h-auto overflow-hidden bg-surface-container">
          <img 
            src={booking.room.images[0]} 
            alt={booking.room.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold text-[#1a1c1c]">
            {nights} {nights === 1 ? 'Night' : 'Nights'}
          </div>
        </div>

        {/* Stay Details */}
        <div className="flex-1 p-6 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-bold text-[#1a1c1c]">{booking.room.title}</h3>
                <p className="text-xs text-[#5c3f41] flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                  {booking.room.city}, {booking.room.country}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Confirmation</p>
                <p className="font-mono text-xs font-bold text-primary">#LX-{booking.id.slice(-6).toUpperCase()}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 py-4 border-y border-outline-variant/10 text-xs text-[#1a1c1c] bg-surface/30 px-3 rounded-xl mt-4">
              <div>
                <p className="text-[10px] text-slate-400 font-semibold mb-1">Check-in</p>
                <p className="font-bold">{formatDate(booking.checkInDate)}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-semibold mb-1">Check-out</p>
                <p className="font-bold">{formatDate(booking.checkOutDate)}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-semibold mb-1">Guests</p>
                <p className="font-bold">{booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}</p>
              </div>
            </div>
          </div>

          {/* Interactive Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-outline-variant/10 no-print">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => onReceiptClick(booking)}
                className="px-4 py-2 border border-outline-variant/20 hover:bg-surface-container rounded-xl text-xs font-bold text-[#1a1c1c] flex items-center gap-1.5 transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                Receipt
              </button>
              {booking.room.latitude !== undefined && booking.room.latitude !== null && (
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${booking.room.latitude},${booking.room.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-outline-variant/20 hover:bg-surface-container rounded-xl text-xs font-bold text-[#1a1c1c] flex items-center gap-1.5 transition-colors"
                >
                  <Globe className="w-3.5 h-3.5" />
                  Maps
                </a>
              )}
            </div>

            <button 
              onClick={() => onCancelClick(booking.id)}
              className="px-4 py-2 text-xs font-bold text-primary hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-100"
            >
              Cancel Stay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}