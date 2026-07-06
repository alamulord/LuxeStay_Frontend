import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Download, Headphones, UtensilsCrossed, Car, MapPinned } from 'lucide-react';
import { Navbar } from '../components/shared/Navbar';
import { Footer } from '../components/shared/Footer';
import { useRoom } from '../hooks/useRooms';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { formatDate, formatCurrency, calculateNights } from '../lib/utils';
import { useBooking } from '../contexts/BookingContext';
import { useBookingStore } from '../store/bookingStore';
import { transitionDefault } from '../lib/animations';

const prepareCards = [
  {
    icon: UtensilsCrossed,
    title: 'Local Dining',
    description: 'Discover nearby Michelin-starred restaurants and culinary experiences.',
  },
  {
    icon: Car,
    title: 'Airport Transfers',
    description: 'Book private transfers for seamless arrivals and departures.',
  },
  {
    icon: MapPinned,
    title: 'Local Experiences',
    description: 'Explore curated tours, adventures, and hidden gems.',
  },
];

export function Confirmation() {
  const { id } = useParams<{ id: string }>();
  const { room, isLoading } = useRoom(id || '');
  const { checkInDate, checkOutDate, guests } = useBooking();
  const bookingStore = useBookingStore();

  const checkIn = bookingStore.checkIn || checkInDate || '';
  const checkOut = bookingStore.checkOut || checkOutDate || '';
  const guestCount = bookingStore.guests || guests || 2;

  const nights = checkIn && checkOut ? calculateNights(checkIn, checkOut) : 1;
  const totalPrice = room ? room.pricePerNight * nights : 0;

  const reservationId = `LX-${Date.now().toString(36).toUpperCase().slice(-6)}`;

  if (isLoading || !room) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const formattedCheckIn = checkIn
    ? new Date(checkIn).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
    : 'TBD';
  const formattedCheckOut = checkOut
    ? new Date(checkOut).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
    : 'TBD';

  return (
    <div className="min-h-screen bg-surface">
      <div className="print:hidden">
        <Navbar />
      </div>

      <main className="pt-[72px]">
        <div className="max-w-page mx-auto px-6 lg:px-10 py-12">
          {/* ══════ SUCCESS HEADER ══════ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={transitionDefault}
            className="text-center mb-10"
          >
            <div className="w-16 h-16 mx-auto mb-5 bg-tertiary/10 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-tertiary" strokeWidth={3} />
            </div>
            <h1 className="font-headline text-3xl md:text-4xl font-bold text-[#1a1c1c] mb-2">
              Booking Confirmed
            </h1>
            <p className="text-[#5c3f41]">
              {room.city}, {room.country} · Reservation confirmed
            </p>
            <span className="inline-block mt-4 px-4 py-1.5 bg-surface-container-high rounded-full text-xs font-bold uppercase tracking-wider text-[#1a1c1c]">
              Reservation ID: {reservationId}
            </span>
          </motion.div>

          {/* ══════ BOOKING CARD ══════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionDefault, delay: 0.15 }}
            className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 mb-12"
          >
            {/* Room Image Card */}
            <div className="relative rounded-xl overflow-hidden h-72 lg:h-80">
              <img
                src={room.images[0] || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop'}
                alt={room.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">Premier Suite</p>
                <h2 className="font-headline text-2xl font-bold text-white mt-1">{room.title}</h2>
              </div>
            </div>

            {/* Details Card */}
            <div className="bg-surface-container-lowest rounded-xl shadow-ambient p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#5c3f41]">Check-in</p>
                  <p className="text-sm font-semibold text-[#1a1c1c] mt-1">{formattedCheckIn}</p>
                  <p className="text-xs text-[#5c3f41]">After 3:00 PM</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#5c3f41]">Check-out</p>
                  <p className="text-sm font-semibold text-[#1a1c1c] mt-1">{formattedCheckOut}</p>
                  <p className="text-xs text-[#5c3f41]">Before 11:00 AM</p>
                </div>
              </div>

              <div className="border-t border-outline-variant/10 pt-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#5c3f41]">Address</p>
                <p className="text-sm text-[#1a1c1c] mt-1">{room.address || `${room.city}, ${room.country}`}</p>
                {room.latitude !== undefined && room.latitude !== null && (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${room.latitude},${room.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-[10px] text-[#ba0036] font-bold uppercase tracking-wider hover:underline"
                  >
                    View on Google Maps
                  </a>
                )}
              </div>

              <div className="border-t border-outline-variant/10 pt-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#5c3f41]">Total Paid</p>
                <p className="text-xl font-bold text-[#1a1c1c] mt-1">{formatCurrency(totalPrice)}</p>
              </div>

              <div className="border-t border-outline-variant/10 pt-4">
                <p className="text-sm text-[#5c3f41]">{guestCount} Guest{guestCount > 1 ? 's' : ''} · {nights} Night{nights > 1 ? 's' : ''}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionDefault, delay: 0.25 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12 print:hidden"
          >
            <Link
              to="/dashboard/trips"
              className="btn-primary-gradient px-8 py-3.5 rounded-full text-center font-semibold text-white btn-hover"
            >
              Manage Trip
            </Link>
            <button 
              onClick={() => window.print()}
              className="px-8 py-3.5 rounded-full border border-[#1a1c1c] text-sm font-semibold text-[#1a1c1c] hover:bg-[#1a1c1c] hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Print Receipt
            </button>
          </motion.div>

          {/* ══════ CONCIERGE ══════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionDefault, delay: 0.3 }}
            className="bg-surface-container-lowest rounded-xl shadow-ambient p-6 flex items-center gap-4 mb-12 print:hidden"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Headphones className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-headline font-bold text-[#1a1c1c]">Need help with your booking?</h3>
              <p className="text-sm text-[#5c3f41]">
                Our concierge team is available 24/7 for any questions about your stay.
              </p>
            </div>
            <Link to="/contact" className="ml-auto text-primary text-sm font-semibold hover:underline flex-shrink-0">
              Contact Us
            </Link>
          </motion.div>

          {/* ══════ PREPARE FOR YOUR STAY ══════ */}
          <motion.div
            className="print:hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionDefault, delay: 0.35 }}
          >
            <h2 className="font-headline text-xl font-bold text-[#1a1c1c] mb-6" style={{ fontStyle: 'italic' }}>
              Prepare for your stay
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {prepareCards.map((card) => (
                <div key={card.title} className="bg-surface-container-lowest rounded-xl shadow-ambient p-6 group hover:shadow-ambient-md transition-shadow duration-300">
                  <card.icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-headline font-bold text-[#1a1c1c] mb-2">{card.title}</h3>
                  <p className="text-sm text-[#5c3f41] leading-relaxed">{card.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}