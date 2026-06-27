import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Lock, CreditCard, Shield, Clock, Ban } from 'lucide-react';
import { Navbar } from '../components/shared/Navbar';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { useRoom } from '../hooks/useRooms';
import { useBooking } from '../contexts/BookingContext';
import { useBookingStore } from '../store/bookingStore';
import { useAuth } from '../contexts/AuthContext';
import { formatCurrency, calculateNights } from '../lib/utils';
import api from '../lib/api';

export function Checkout() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { checkInDate, checkOutDate, guests: ctxGuests, selectedRoom } = useBooking();
  const bookingStore = useBookingStore();
  const { room, isLoading } = useRoom(id || '');

  // Prioritize booking store values (Zustand) over React Context
  const checkIn = bookingStore.checkIn || checkInDate || '';
  const checkOut = bookingStore.checkOut || checkOutDate || '';
  const guestCount = bookingStore.guests || ctxGuests || 2;

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'google'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [showCardModal, setShowCardModal] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'input' | 'processing' | 'success'>('input');
  const [paymentError, setPaymentError] = useState('');
  const [createdBooking, setCreatedBooking] = useState<any>(null);
  const [createdPayment, setCreatedPayment] = useState<any>(null);

  const effectiveRoom = selectedRoom || room;

  const nights = checkIn && checkOut ? calculateNights(checkIn, checkOut) : 5;
  const pricePerNight = effectiveRoom?.pricePerNight || 0;
  const subtotal = pricePerNight * nights;
  const serviceFee = Math.round(subtotal * 0.034);
  const taxes = Math.round(subtotal * 0.01);
  const total = subtotal + serviceFee + taxes;

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=' + encodeURIComponent(`/checkout/${id}`));
      return;
    }

    setIsProcessing(true);
    setPaymentError('');
    try {
      const bookingRes = await api.post('/bookings/create', {
        roomId: id,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        guests: guestCount,
      });
      const bookingData = bookingRes.data;
      setCreatedBooking(bookingData);

      const paymentRes = await api.post('/payments/create', {
        bookingId: bookingData.id,
        method: 'STRIPE',
      });
      setCreatedPayment(paymentRes.data);

      setPaymentStep('input');
      setShowCardModal(true);
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || 'Failed to initiate checkout. Please check dates.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCardPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createdPayment) return;

    setPaymentStep('processing');
    setPaymentError('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await api.post(`/payments/${createdPayment.id}/simulate-success`);
      setPaymentStep('success');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setShowCardModal(false);
      navigate(`/confirmation/${id}`);
    } catch (err: any) {
      setPaymentStep('input');
      setPaymentError(err.response?.data?.message || 'Transaction declined. Please try again.');
    }
  };

  if (isLoading || !effectiveRoom) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const formattedCheckIn = checkIn
    ? new Date(checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Select date';
  const formattedCheckOut = checkOut
    ? new Date(checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Select date';

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <main className="pt-[72px]">
        <div className="max-w-page mx-auto px-6 lg:px-10 py-10">
          {/* Back Link */}
          <Link
            to={`/room/${id}`}
            className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Modify selection
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12">
            {/* ── Left Column ── */}
            <div className="space-y-10">
              <h1 className="font-headline text-3xl md:text-4xl font-bold text-[#1a1c1c]">
                Confirm your journey
              </h1>

              {/* Dates */}
              <div className="py-6 border-b border-outline-variant/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#5c3f41]">Dates</p>
                    <p className="text-[#1a1c1c] font-medium mt-1">{formattedCheckIn} – {formattedCheckOut}</p>
                  </div>
                  <Link to={`/room/${id}`} className="text-sm font-semibold text-primary hover:underline">
                    Edit
                  </Link>
                </div>
              </div>

              {/* Guests */}
              <div className="py-6 border-b border-outline-variant/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#5c3f41]">Guests</p>
                    <p className="text-[#1a1c1c] font-medium mt-1">{guestCount} Adult{guestCount > 1 ? 's' : ''}</p>
                  </div>
                  <Link to={`/room/${id}`} className="text-sm font-semibold text-primary hover:underline">
                    Edit
                  </Link>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-headline text-xl font-bold text-[#1a1c1c]">Choose how to pay</h2>
                  <div className="flex items-center gap-1.5 text-xs text-[#5c3f41]">
                    <Lock className="w-3.5 h-3.5" />
                    <span className="uppercase font-bold tracking-wider">Secure Checkout</span>
                  </div>
                </div>

                {/* Card Option */}
                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-5 rounded-xl border cursor-pointer transition-all duration-200 mb-4 ${
                    paymentMethod === 'card'
                      ? 'border-primary/40 bg-primary/[0.02]'
                      : 'border-outline-variant/20 hover:border-outline-variant/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'card' ? 'border-primary' : 'border-outline-variant/40'
                      }`}>
                        {paymentMethod === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                      </div>
                      <span className="font-medium text-[#1a1c1c]">Credit or Debit Card</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold tracking-wider bg-surface-container-high px-2 py-0.5 rounded text-[#5c3f41]">VISA</span>
                      <span className="text-[10px] font-bold tracking-wider bg-surface-container-high px-2 py-0.5 rounded text-[#5c3f41]">MC</span>
                    </div>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="space-y-4 mt-4">
                      <input
                        type="text"
                        placeholder="Card number"
                        value={cardNumber}
                        onChange={(e) => {
                          const formatted = e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
                          setCardNumber(formatted);
                        }}
                        maxLength={19}
                        className="input-field"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Expiration"
                          value={cardExpiry}
                          onChange={(e) => {
                            let val = e.target.value;
                            if (val.length === 2 && !val.includes('/')) val += '/';
                            setCardExpiry(val);
                          }}
                          maxLength={5}
                          className="input-field"
                        />
                        <input
                          type="password"
                          placeholder="CVV"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          maxLength={4}
                          className="input-field"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Alt Payment Options */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setPaymentMethod('apple')}
                    className={`p-4 rounded-xl border text-center font-medium transition-all duration-200 ${
                      paymentMethod === 'apple'
                        ? 'border-primary/40 bg-primary/[0.02]'
                        : 'border-outline-variant/20 hover:border-outline-variant/40'
                    }`}
                  >
                    Apple Pay
                  </button>
                  <button
                    onClick={() => setPaymentMethod('google')}
                    className={`p-4 rounded-xl border text-center font-medium transition-all duration-200 ${
                      paymentMethod === 'google'
                        ? 'border-primary/40 bg-primary/[0.02]'
                        : 'border-outline-variant/20 hover:border-outline-variant/40'
                    }`}
                  >
                    Google Pay
                  </button>
                </div>
              </div>

              {/* House Rules */}
              <div>
                <h2 className="font-headline text-xl font-bold text-[#1a1c1c] mb-4">Review house rules</h2>
                <p className="text-sm text-[#5c3f41] mb-5">
                  By selecting the button below, I agree to the{' '}
                  <Link to="/terms" className="text-[#1a1c1c] underline font-medium">House Rules</Link>,{' '}
                  <Link to="/terms" className="text-[#1a1c1c] underline font-medium">Ground Rules for Guests</Link>, and{' '}
                  <Link to="/privacy" className="text-[#1a1c1c] underline font-medium">Privacy Policy</Link>.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#5c3f41]" />
                    <div>
                      <p className="text-sm font-semibold text-[#1a1c1c]">Check-in after 3:00 PM</p>
                      <p className="text-xs text-[#5c3f41]">Self check-in with smart lock</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Ban className="w-5 h-5 text-[#5c3f41]" />
                    <p className="text-sm font-semibold text-[#1a1c1c]">No smoking or parties</p>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div>
                <button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="btn-primary-gradient px-10 py-4 rounded-xl font-bold text-white btn-hover disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? <LoadingSpinner size="sm" /> : 'Confirm and Pay'}
                </button>
                <div className="flex items-center gap-4 mt-4 text-[10px] text-[#5c3f41] uppercase tracking-wider font-bold">
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" />
                    Norton Secured
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    PCI Compliant
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right Column — Price Summary ── */}
            <div>
              <div className="sticky top-24 bg-surface-container-lowest rounded-xl shadow-ambient p-6 space-y-5">
                {/* Room Preview */}
                <div className="flex gap-4">
                  <img
                    src={effectiveRoom.images[0] || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=200&h=200&fit=crop'}
                    alt={effectiveRoom.title}
                    className="w-28 h-24 object-cover rounded-lg flex-shrink-0"
                  />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                      {effectiveRoom.city}
                    </p>
                    <h3 className="font-headline text-base font-bold text-[#1a1c1c] leading-tight mt-0.5">
                      {effectiveRoom.title}
                    </h3>
                    <div className="flex items-center gap-1 mt-1.5">
                      <span className="text-xs font-medium">★ {effectiveRoom.rating.toFixed(2)}</span>
                      <span className="text-xs text-[#5c3f41]">({effectiveRoom.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-outline-variant/10" />

                {/* Price Details */}
                <div>
                  <h4 className="font-headline font-bold text-[#1a1c1c] mb-4">Price details</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#5c3f41]">{formatCurrency(pricePerNight)} x {nights} nights</span>
                      <span className="text-[#1a1c1c]">{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#5c3f41] underline">Service fee</span>
                      <span className="text-[#1a1c1c]">{formatCurrency(serviceFee)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#5c3f41]">Occupancy taxes</span>
                      <span className="text-[#1a1c1c]">{formatCurrency(taxes)}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-outline-variant/10" />

                <div className="flex justify-between">
                  <span className="font-bold text-[#1a1c1c]">Total (USD)</span>
                  <span className="text-xl font-bold text-[#1a1c1c]">{formatCurrency(total)}</span>
                </div>

                {/* Cancellation Notice */}
                <div className="bg-surface-container-low rounded-lg p-4 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-xs font-bold">i</span>
                  </div>
                  <p className="text-xs text-[#5c3f41] leading-relaxed">
                    <strong className="text-[#1a1c1c]">Free cancellation before {formattedCheckIn}.</strong>{' '}
                    Get a full refund if you change your mind within the next 48 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ══════ CARD PAYMENT MODAL ══════ */}
      {showCardModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest max-w-md w-full rounded-2xl shadow-ambient-lg overflow-hidden p-6 relative">
            <button
              onClick={() => setShowCardModal(false)}
              className="absolute right-4 top-4 p-1 rounded-full hover:bg-surface-container-low transition-colors"
            >
              <svg className="w-5 h-5 text-[#1a1c1c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {paymentStep === 'input' && (
              <form onSubmit={handleCardPayment} className="space-y-6">
                <div>
                  <h3 className="font-headline text-xl font-bold mb-1">Secure Payment</h3>
                  <p className="text-xs text-[#5c3f41]">LuxeStay payment encryption service</p>
                </div>

                {/* Visual Card */}
                <div className="bg-gradient-to-br from-primary via-primary-container to-[#1a1c1c] p-5 rounded-xl text-white shadow-md relative overflow-hidden h-40 flex flex-col justify-between">
                  <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-sm tracking-widest italic">LuxeStay Gold</span>
                    <div className="w-8 h-6 bg-amber-200/80 rounded" />
                  </div>
                  <div className="font-mono text-base tracking-widest text-center">
                    {cardNumber || '•••• •••• •••• ••••'}
                  </div>
                  <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-wider">
                    <div>
                      <p className="text-white/60">Expires</p>
                      <p>{cardExpiry || 'MM/YY'}</p>
                    </div>
                  </div>
                </div>

                {paymentError && (
                  <div className="text-xs text-error bg-error/5 p-2.5 rounded border border-error/10">
                    {paymentError}
                  </div>
                )}

                <div className="space-y-4">
                  <input type="text" required placeholder="Card Number" value={cardNumber}
                    onChange={(e) => {
                      const formatted = e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
                      setCardNumber(formatted);
                    }}
                    maxLength={19} className="input-field" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" required placeholder="MM/YY" value={cardExpiry}
                      onChange={(e) => {
                        let val = e.target.value;
                        if (val.length === 2 && !val.includes('/')) val += '/';
                        setCardExpiry(val);
                      }}
                      maxLength={5} className="input-field" />
                    <input type="password" required placeholder="CVV" value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      maxLength={4} className="input-field" />
                  </div>
                </div>

                <button type="submit" className="w-full btn-primary-gradient py-3 rounded-xl font-bold text-white">
                  Pay {formatCurrency(createdBooking?.totalPrice || total)}
                </button>
              </form>
            )}

            {paymentStep === 'processing' && (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <LoadingSpinner size="lg" />
                <div>
                  <h3 className="font-headline font-bold text-lg">Authorizing Payment</h3>
                  <p className="text-xs text-[#5c3f41] mt-1">Connecting securely with bank gateways...</p>
                </div>
              </div>
            )}

            {paymentStep === 'success' && (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-tertiary/10 text-tertiary rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-headline font-bold text-lg text-tertiary">Booking Confirmed!</h3>
                  <p className="text-xs text-[#5c3f41] mt-1">Directing to confirmation screen...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}