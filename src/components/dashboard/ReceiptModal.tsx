import React from 'react';
import { CreditCard, MapPin, Printer, X, FileText } from 'lucide-react';
import { Booking } from '../../types/booking.types';
import { useAuth } from '../../contexts/AuthContext';
import { formatDate, formatCurrency } from '../../lib/utils';

interface ReceiptModalProps {
  booking: Booking;
  onClose: () => void;
}

export function ReceiptModal({ booking, onClose }: ReceiptModalProps) {
  const { user } = useAuth();

  const calculateNights = (checkIn: string, checkOut: string): number => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm print-modal-overlay">
      <div className="bg-white rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl p-8 relative flex flex-col justify-between print-receipt-card">
        
        {/* Modal Controls (hidden on print) */}
        <div className="flex items-center justify-between pb-4 border-b border-outline-variant/10 mb-6 no-print">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-[#1a1c1c] text-sm">Trip Receipt</h3>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => window.print()}
              className="px-3.5 py-1.5 bg-[#ba0036] hover:bg-primary text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" /> Print
            </button>
            <button 
              onClick={onClose}
              className="p-1.5 border hover:bg-surface-container rounded-lg transition-colors text-slate-400"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Receipt Printable Copy Wrapper */}
        <div className="printable-receipt space-y-8 text-[#1a1c1c] text-xs font-sans">
          
          {/* Header Branding */}
          <div className="flex justify-between items-start pb-6 border-b border-slate-200">
            <div>
              <h2 className="font-serif font-light text-2xl text-[#1a1c1c] tracking-widest uppercase">LuxeStay</h2>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-1">Editorial Hospitality Group</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Statement of Account</span>
              <p className="text-[10px] text-slate-400 font-mono mt-1">Invoice #LX-{booking.id.slice(-6).toUpperCase()}</p>
            </div>
          </div>

          {/* Status Banner */}
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100 text-[11px]">
            <div>
              <p className="text-slate-400 uppercase tracking-wider text-[9px] font-bold">Transaction Reference</p>
              <p className="font-mono text-[#1a1c1c] mt-0.5">txn_{booking.id.slice(0, 8)}</p>
            </div>
            <div className="text-right">
              <p className="text-slate-400 uppercase tracking-wider text-[9px] font-bold">Date Issued</p>
              <p className="font-bold text-[#1a1c1c] mt-0.5">{formatDate(booking.createdAt)}</p>
            </div>
          </div>

          {/* Guest & Reservation Split */}
          <div className="grid grid-cols-2 gap-8 py-2">
            <div className="space-y-1">
              <h4 className="font-bold text-[9px] uppercase tracking-wider text-slate-400">Guest Details</h4>
              <p className="font-bold text-[#1a1c1c] text-sm">{user?.firstName} {user?.lastName}</p>
              <p className="text-slate-500 font-medium">{user?.email}</p>
              <p className="text-slate-500 font-medium">{booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}</p>
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-[9px] uppercase tracking-wider text-slate-400">Method of Payment</h4>
              <p className="font-bold text-[#1a1c1c]">Visa ending in 4242</p>
              <p className="text-slate-500 font-medium">Status: Paid in Full</p>
            </div>
          </div>

          {/* Stay Details */}
          <div className="border border-slate-200 rounded-xl p-5 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-extrabold text-[#1a1c1c] text-sm">{booking.room.title}</h4>
                <p className="text-slate-500 text-[10px] uppercase font-semibold tracking-wider mt-0.5">
                  {booking.room.city}, {booking.room.country}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-semibold">Length of Stay</span>
                <span className="font-bold text-slate-700 text-xs">
                  {calculateNights(booking.checkInDate, booking.checkOutDate)} Nights
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-100 text-[11px]">
              <div>
                <p className="text-slate-400 font-bold mb-0.5 uppercase tracking-wider text-[8px]">Check-in Date</p>
                <p className="font-bold text-[#1a1c1c]">{formatDate(booking.checkInDate)}</p>
              </div>
              <div>
                <p className="text-slate-400 font-bold mb-0.5 uppercase tracking-wider text-[8px]">Check-out Date</p>
                <p className="font-bold text-[#1a1c1c]">{formatDate(booking.checkOutDate)}</p>
              </div>
            </div>
          </div>

          {/* Pricing breakdown */}
          <div className="space-y-3">
            <h4 className="font-bold text-[9px] uppercase tracking-wider text-slate-400">Folio Statement</h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[9px] uppercase tracking-wider font-bold text-slate-400 border-b border-slate-200">
                    <th className="py-2.5 px-4 font-bold">Charges</th>
                    <th className="py-2.5 px-4 text-right font-bold">Rate</th>
                    <th className="py-2.5 px-4 text-right font-bold">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[11px]">
                  <tr>
                    <td className="py-3 px-4 font-semibold text-[#1a1c1c]">
                      Room Rate Charges ({calculateNights(booking.checkInDate, booking.checkOutDate)} nights)
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-slate-500">
                      {formatCurrency(booking.room.pricePerNight)} / night
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-semibold text-[#1a1c1c]">
                      {formatCurrency(
                        booking.room.pricePerNight * 
                        calculateNights(booking.checkInDate, booking.checkOutDate)
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-slate-500">Post-stay Cleaning Service</td>
                    <td className="py-3 px-4 text-right font-mono text-slate-400">—</td>
                    <td className="py-3 px-4 text-right font-mono text-[#1a1c1c]">$50.00</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-slate-500">Service Fee (10%)</td>
                    <td className="py-3 px-4 text-right font-mono text-slate-400">10.0%</td>
                    <td className="py-3 px-4 text-right font-mono text-[#1a1c1c]">
                      {formatCurrency(
                        Math.round(booking.room.pricePerNight * 
                        calculateNights(booking.checkInDate, booking.checkOutDate) * 0.1)
                      )}
                    </td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="py-3 px-4 font-bold text-[#1a1c1c] text-xs">Total Account Summary</td>
                    <td className="py-3 px-4 text-right font-mono text-slate-400">—</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-[#ba0036] text-xs">
                      {formatCurrency(booking.totalPrice)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Authorized Sign-off */}
          <div className="flex justify-between items-end pt-8 border-t border-slate-200">
            <div className="text-left space-y-1 max-w-sm text-[10px] text-slate-400">
              <p>LuxeStay Editorial Hospitality Group</p>
              <p>London • Paris • New York • Tokyo</p>
            </div>
            <div className="text-right space-y-1">
              <div className="font-serif italic text-base text-slate-500 font-light mb-1 select-none">
                LuxeStay Concierge
              </div>
              <div className="h-px w-32 bg-slate-200 ml-auto"></div>
              <p className="text-[7px] uppercase tracking-wider font-bold text-slate-400">Authorized Signature</p>
            </div>
          </div>

        </div>

        {/* Back Button (hidden on print) */}
        <div className="mt-8 no-print">
          <button 
            onClick={onClose}
            className="w-full py-3 bg-[#1a1c1c] hover:bg-black text-white text-xs font-bold rounded-xl transition-all"
          >
            Close Receipt
          </button>
        </div>

      </div>
    </div>
  );
}
