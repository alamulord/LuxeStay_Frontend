import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../components/shared/Navbar';
import { Footer } from '../components/shared/Footer';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { Calendar, MapPin, Download, ArrowLeft, ShieldCheck, Mail, Phone, CreditCard } from 'lucide-react';
import { formatDate, formatCurrency, calculateNights } from '../lib/utils';
import api from '../lib/api';

interface Booking {
  id: string;
  userId: string;
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  totalPrice: number;
  status: string;
  specialRequests?: string;
  room: {
    id: string;
    title: string;
    images: string[];
    pricePerNight: number;
    address: string;
    city: string;
    country: string;
    latitude?: number;
    longitude?: number;
  };
  payment?: {
    amount: number;
    status: string;
    method: string;
    transactionId?: string;
  };
  createdAt: string;
}

export function BookingDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await api.get<Booking>(`/bookings/${id}`);
        setBooking(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to retrieve booking information');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-surface flex flex-col justify-between">
        <Navbar />
        <main className="pt-20 px-4 flex-grow flex items-center justify-center">
          <div className="text-center max-w-md">
            <p className="text-red-500 font-semibold mb-4">{error || 'Booking details not found'}</p>
            <button onClick={() => navigate('/dashboard/trips')} className="btn-primary">
              Back to My Trips
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const nights = calculateNights(booking.checkInDate, booking.checkOutDate);

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between">
      {/* Hide on print */}
      <div className="print:hidden">
        <Navbar />
      </div>

      <main className="pt-20 px-4 flex-grow print:pt-0 print:px-0">
        {/* Style block for print overrides */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            body {
              background: white;
              color: black;
            }
            .print\\:hidden {
              display: none !important;
            }
            .print-container {
              border: none !important;
              box-shadow: none !important;
              margin: 0 !important;
              padding: 0 !important;
              max-width: 100% !important;
            }
            .print-header {
              border-bottom: 2px solid #000 !important;
              margin-bottom: 20px !important;
              padding-bottom: 10px !important;
            }
          }
        `}} />

        <div className="max-w-3xl mx-auto py-8 print-container print:py-0">
          {/* Back button and Download button - hidden on print */}
          <div className="flex items-center justify-between mb-6 print:hidden">
            <Link to="/dashboard/trips" className="flex items-center gap-2 text-sm text-on_surface_variant hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to My Trips
            </Link>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-primary/10 text-primary hover:bg-primary/15 px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
            >
              <Download className="w-4 h-4" /> Download PDF / Print
            </button>
          </div>

          {/* Printable Ticket Voucher */}
          <div className="bg-surface-container-lowest border border-outline_variant/15 rounded-xl shadow-sm overflow-hidden print:border-none print:shadow-none">
            {/* Voucher Header */}
            <div className="bg-gradient-to-r from-primary to-indigo-600 px-6 py-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4 print:from-white print:to-white print:text-black print:px-0 print:py-4 print-header">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-white/20 px-2.5 py-1 rounded-full print:bg-slate-100 print:text-slate-700">
                  LuxeStay Booking Voucher
                </span>
                <h1 className="font-plus text-2xl font-bold mt-3">Reservation Ticket</h1>
                <p className="text-white/80 text-sm mt-1 print:text-slate-500">Booking Reference: <span className="font-mono font-bold select-all text-white print:text-black">{booking.id}</span></p>
              </div>
              <div className="text-right md:text-right print:text-left">
                <p className="text-xs text-white/70 print:text-slate-500">Status</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mt-1 uppercase tracking-wider ${
                  booking.status === 'CONFIRMED' ? 'bg-emerald-500 text-white print:border print:border-emerald-500 print:text-emerald-500' :
                  booking.status === 'PENDING' ? 'bg-amber-500 text-white print:border print:border-amber-500 print:text-amber-500' :
                  'bg-red-500 text-white print:border print:border-red-500 print:text-red-500'
                }`}>
                  {booking.status}
                </span>
              </div>
            </div>

            {/* Voucher Body */}
            <div className="p-6 md:p-8 space-y-8 print:px-0 print:py-4">
              {/* Hotel & Guest Core Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-on_surface_variant mb-3">Room Information</h2>
                  <h3 className="font-plus text-lg font-bold text-on_surface mb-1">{booking.room.title}</h3>
                  <p className="text-sm text-on_surface_variant flex items-center gap-1.5 mb-1.5">
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    {booking.room.address}, {booking.room.city}, {booking.room.country}
                  </p>
                  <p className="text-sm text-on_surface_variant flex items-center gap-1.5 mb-3">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    Verified LuxeStay Property
                  </p>
                  {booking.room.latitude !== undefined && booking.room.latitude !== null && (
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${booking.room.latitude},${booking.room.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-primary font-bold uppercase tracking-wider hover:underline print:hidden bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-md transition-colors"
                    >
                      <MapPin className="w-3.5 h-3.5 fill-current" />
                      View on Google Maps
                    </a>
                  )}
                </div>
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-on_surface_variant mb-3">Guest Details</h2>
                  <p className="text-sm font-semibold mb-1">Guests: <span className="font-normal text-on_surface_variant">{booking.guests} Guests</span></p>
                  <p className="text-sm font-semibold mb-1">Duration: <span className="font-normal text-on_surface_variant">{nights} night{nights > 1 ? 's' : ''}</span></p>
                  <p className="text-sm font-semibold">Booked On: <span className="font-normal text-on_surface_variant">{formatDate(booking.createdAt)}</span></p>
                </div>
              </div>

              <hr className="border-outline_variant/15 print:border-black" />

              {/* Dates & Times */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-surface-container-low p-4 rounded-xl print:bg-white print:border print:border-black/10">
                <div className="border-r border-outline_variant/15 pr-4 sm:pr-6 last:border-none print:border-none">
                  <span className="text-[10px] uppercase font-bold text-on_surface_variant tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-primary" /> Check-In
                  </span>
                  <p className="text-xl font-bold mt-2">{formatDate(booking.checkInDate)}</p>
                  <p className="text-xs text-on_surface_variant mt-1">From 3:00 PM</p>
                </div>
                <div className="pl-0 sm:pl-6">
                  <span className="text-[10px] uppercase font-bold text-on_surface_variant tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-primary" /> Check-Out
                  </span>
                  <p className="text-xl font-bold mt-2">{formatDate(booking.checkOutDate)}</p>
                  <p className="text-xs text-on_surface_variant mt-1">Before 11:00 AM</p>
                </div>
              </div>

              {/* Special Requests */}
              {booking.specialRequests && (
                <div className="bg-surface-container-low p-4 rounded-xl print:bg-white print:border print:border-black/10">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-on_surface_variant mb-2">Special Requests</h2>
                  <p className="text-sm italic text-on_surface leading-relaxed">"{booking.specialRequests}"</p>
                </div>
              )}

              <hr className="border-outline_variant/15 print:border-black" />

              {/* Ledger Summary */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-on_surface_variant mb-4">Payment Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-on_surface_variant">{formatCurrency(booking.room.pricePerNight)} x {nights} nights</span>
                    <span>{formatCurrency(booking.room.pricePerNight * nights)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-on_surface_variant">Cleaning & Service Fee</span>
                    <span>{formatCurrency(0)}</span>
                  </div>
                  <div className="border-t border-outline_variant/10 pt-2 flex justify-between font-bold text-base text-on_surface">
                    <span>Total Price</span>
                    <span>{formatCurrency(booking.totalPrice)}</span>
                  </div>
                </div>

                {/* Payment Detail Details */}
                {booking.payment && (
                  <div className="mt-4 p-4 rounded-lg bg-surface-container-low flex items-start gap-3 text-xs print:bg-white print:border print:border-black/10">
                    <CreditCard className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-on_surface">Payment Info</p>
                      <p className="text-on_surface_variant mt-0.5">Method: {booking.payment.method} | Status: <span className="font-semibold uppercase">{booking.payment.status}</span></p>
                      {booking.payment.transactionId && (
                        <p className="text-on_surface_variant mt-0.5">Transaction ID: <span className="font-mono">{booking.payment.transactionId}</span></p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Legal Notice */}
              <div className="text-[10px] text-on_surface_variant leading-relaxed pt-4 border-t border-outline_variant/15 print:border-black">
                <p className="font-semibold mb-1">Check-in Instructions & Policy</p>
                <p>Please present this voucher and a valid government-issued photo ID upon check-in. The reservation is non-transferable. Cancellations and modifications are subject to LuxeStay terms. For customer service, contact support@luxestay.com.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Hide on print */}
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
