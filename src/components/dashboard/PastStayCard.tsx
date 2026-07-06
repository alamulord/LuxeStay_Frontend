import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';
import { Booking } from '../../types/booking.types';
import { formatDate, formatCurrency } from '../../lib/utils';

interface PastStayCardProps {
  booking: Booking;
  onReceiptClick: (booking: Booking) => void;
}

export function PastStayCard({ booking, onReceiptClick }: PastStayCardProps) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col justify-between hover:shadow-md transition-all duration-300 group">
      {/* Top Section: Image and Info */}
      <div className="flex gap-4">
        {/* Image */}
        <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-50 relative">
          <img 
            src={booking.room.images[0]} 
            alt={booking.room.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-black/75 backdrop-blur-md text-[8px] font-bold text-white uppercase tracking-wider rounded">
            Past
          </span>
        </div>

        {/* Info */}
        <div className="flex-grow min-w-0">
          <div className="flex gap-0.5 text-amber-500 mb-0.5">
            <Star className="w-3 h-3 fill-current" />
            <Star className="w-3 h-3 fill-current" />
            <Star className="w-3 h-3 fill-current" />
            <Star className="w-3 h-3 fill-current" />
            <Star className="w-3 h-3 fill-current" />
          </div>
          <h4 className="font-extrabold text-[#1a1c1c] text-sm group-hover:text-primary transition-colors leading-tight truncate">
            {booking.room.title}
          </h4>
          <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
            {booking.room.city} • {formatDate(booking.checkInDate)}
          </p>
          <p className="text-xs font-black text-[#1a1c1c] mt-1">
            {formatCurrency(booking.totalPrice)}
          </p>
        </div>
      </div>

      {/* Bottom Section: Separator and Full-Width Buttons */}
      <div className="flex gap-2 mt-4 pt-3 border-t border-slate-100">
        <button 
          onClick={() => onReceiptClick(booking)}
          className="flex-1 py-1.5 border border-slate-200 text-[#1a1c1c] hover:bg-slate-50 rounded-lg text-[11px] font-bold transition-all text-center"
        >
          Receipt
        </button>
        <Link 
          to={`/room/${booking.roomId}`}
          className="flex-1 py-1.5 bg-[#ba0036] text-white hover:bg-[#900028] rounded-lg text-[11px] font-bold transition-all text-center flex items-center justify-center gap-1 shadow-sm shadow-[#ba0036]/10"
        >
          Book Again <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}