import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Lock, Shield, Clock, Ban } from 'lucide-react';
import { Navbar } from '../components/shared/Navbar';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { useRoom } from '../hooks/useRooms';
import { useBooking } from '../contexts/BookingContext';
import { useBookingStore } from '../store/bookingStore';
import { useAuth } from '../contexts/AuthContext';
import { formatCurrency, calculateNights } from '../lib/utils';
import api from '../lib/api';
import { CheckoutSummary } from '../components/booking/CheckoutSummary';
import { CheckoutPaymentModal } from '../components/booking/CheckoutPaymentModal';
import { PremiumButton } from '../components/ui/PremiumButton';

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
            className="inline-flex items-center gap-2 text-sm text-primary font-headline font-semibold hover:underline mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Modify selection
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12">
            {/* ── Left Column ── */}
            <div className="space-y-10">
              <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight leading-tight">
                Confirm your journey
              </h1>

              {/* Dates */}
              <div className="py-6 border-b border-outline-variant/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-headline font-bold uppercase tracking-widest text-on-surface-variant">Dates</p>
                    <p className="text-on-surface font-semibold font-headline mt-1">{formattedCheckIn} – {formattedCheckOut}</p>
                  </div>
                  <Link to={`/room/${id}`} className="text-sm font-headline font-semibold text-primary hover:underline">
                    Edit
                  </Link>
                </div>
              </div>

              {/* Guests */}
              <div className="py-6 border-b border-outline-variant/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-headline font-bold uppercase tracking-widest text-on-surface-variant">Guests</p>
                    <p className="text-on-surface font-semibold font-headline mt-1">{guestCount} Guest{guestCount > 1 ? 's' : ''}</p>
                  </div>
                  <Link to={`/room/${id}`} className="text-sm font-headline font-semibold text-primary hover:underline">
                    Edit
                  </Link>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-headline text-xl font-bold text-on-surface">Choose how to pay</h2>
                  <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
                    <Lock className="w-3.5 h-3.5" />
                    <span className="font-headline font-bold uppercase tracking-wider">Secure Checkout</span>
                  </div>
                </div>

                {/* Card Option */}
                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 mb-4 ${
                    paymentMethod === 'card'
                      ? 'border-primary/30 bg-primary/[0.02] shadow-ambient-sm'
                      : 'border-outline-variant/20 hover:border-outline-variant/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        paymentMethod === 'card' ? 'border-primary' : 'border-outline-variant/40'
                      }`}>
                        {paymentMethod === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                      </div>
                      <span className="font-headline font-bold text-on-surface text-sm">Credit or Debit Card</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-headline font-bold tracking-wider text-on-surface-variant">
                      <span className="bg-surface-container-high px-2.5 py-1 rounded-lg">VISA</span>
                      <span className="bg-surface-container-high px-2.5 py-1 rounded-lg">MC</span>
                    </div>
                  </div>
                </div>

                {/* Alt Payment Options */}
                <div className="grid grid-cols-2 gap-4">
                  {(['apple', 'google'] as const).map((method) => (
                    <button
                      key={method}
                      onClick={() => setPaymentMethod(method)}
                      className={`p-4 rounded-2xl border text-center font-headline font-bold text-sm transition-all duration-300 ${
                        paymentMethod === method
                          ? 'border-primary/30 bg-primary/[0.02] text-on-surface shadow-ambient-sm'
                          : 'border-outline-variant/20 hover:border-outline-variant/40 text-on-surface-variant'
                      }`}
                    >
                      {method === 'apple' ? 'Apple Pay' : 'Google Pay'}
                    </button>
                  ))}
                </div>
              </div>

              {/* House Rules */}
              <div className="space-y-6">
                <h2 className="font-headline text-xl font-bold text-on-surface">Review house rules</h2>
                <p className="text-sm text-on-surface-variant font-body leading-relaxed">
                  By selecting the button below, I agree to the{' '}
                  <Link to="/terms" className="text-on-surface underline font-semibold">House Rules</Link>,{' '}
                  <Link to="/terms" className="text-on-surface underline font-semibold">Ground Rules for Guests</Link>, and{' '}
                  <Link to="/privacy" className="text-on-surface underline font-semibold">Privacy Policy</Link>.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-on-surface-variant" />
                    <div>
                      <p className="text-sm font-headline font-bold text-on-surface">Check-in after 3:00 PM</p>
                      <p className="text-xs text-on-surface-variant font-body mt-0.5">Self check-in with smart lock</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Ban className="w-5 h-5 text-on-surface-variant" />
                    <p className="text-sm font-headline font-bold text-on-surface">No smoking or parties allowed</p>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-4">
                <PremiumButton
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="px-10 py-4 font-headline text-xs font-bold uppercase tracking-wider"
                >
                  {isProcessing ? <LoadingSpinner size="sm" /> : 'Confirm and Pay'}
                </PremiumButton>
                <div className="flex items-center gap-4 mt-6 text-[10px] text-on-surface-variant font-headline font-bold uppercase tracking-wider">
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
            <CheckoutSummary
              room={effectiveRoom}
              pricePerNight={pricePerNight}
              nights={nights}
              subtotal={subtotal}
              serviceFee={serviceFee}
              taxes={taxes}
              total={total}
              formattedCheckIn={formattedCheckIn}
            />
          </div>
        </div>
      </main>

      {/* ══════ SECURE CARD PAYMENT MODAL ══════ */}
      {showCardModal && (
        <CheckoutPaymentModal
          isOpen={showCardModal}
          onClose={() => setShowCardModal(false)}
          paymentMethod={paymentMethod}
          cardNumber={cardNumber}
          setCardNumber={setCardNumber}
          cardExpiry={cardExpiry}
          setCardExpiry={setCardExpiry}
          cardCvc={cardCvc}
          setCardCvc={setCardCvc}
          paymentStep={paymentStep}
          paymentError={paymentError}
          totalPrice={createdBooking?.totalPrice || total}
          onSubmit={handleCardPayment}
        />
      )}
    </div>
  );
}