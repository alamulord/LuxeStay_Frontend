import React, { useState, useEffect } from 'react';
import { Lock, ShieldCheck, Mail, Sparkles, Smartphone, Fingerprint } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';
import { LoadingSpinner } from '../shared/LoadingSpinner';

interface CheckoutPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentMethod: 'card' | 'apple' | 'google';
  cardNumber: string;
  setCardNumber: (val: string) => void;
  cardExpiry: string;
  setCardExpiry: (val: string) => void;
  cardCvc: string;
  setCardCvc: (val: string) => void;
  paymentStep: 'input' | 'processing' | 'success';
  paymentError: string;
  totalPrice: number;
  onSubmit: (e: React.FormEvent) => void;
}

export const CheckoutPaymentModal: React.FC<CheckoutPaymentModalProps> = ({
  isOpen,
  onClose,
  paymentMethod,
  cardNumber,
  setCardNumber,
  cardExpiry,
  setCardExpiry,
  cardCvc,
  setCardCvc,
  paymentStep,
  paymentError,
  totalPrice,
  onSubmit,
}) => {
  const [localError, setLocalError] = useState('');
  const [googleEmail, setGoogleEmail] = useState('guest@gmail.com');
  const [generatedAccountNo, setGeneratedAccountNo] = useState('');

  // Generate a random virtual account number for alternate methods on mount
  useEffect(() => {
    if (isOpen) {
      setLocalError('');
      if (paymentMethod === 'google') {
        const lastDigits = Math.floor(1000 + Math.random() * 9000);
        setGeneratedAccountNo(`GP-DEBIT-VIRTUAL-${lastDigits}`);
      } else if (paymentMethod === 'apple') {
        const lastDigits = Math.floor(1000 + Math.random() * 9000);
        setGeneratedAccountNo(`AP-CASH-DEVICE-${lastDigits}`);
      }
    }
  }, [isOpen, paymentMethod]);

  if (!isOpen) return null;

  const handleCardValidateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    // Secure Card Validations
    const cleanNumber = cardNumber.replace(/\s/g, '');
    if (cleanNumber.length !== 16 || !/^\d+$/.test(cleanNumber)) {
      setLocalError('Secure Validation Failed: Card number must be exactly 16 digits.');
      return;
    }

    if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
      setLocalError('Secure Validation Failed: Expiry date must be in MM/YY format.');
      return;
    }

    const [monthStr, yearStr] = cardExpiry.split('/');
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10);

    if (month < 1 || month > 12) {
      setLocalError('Secure Validation Failed: Expiry month must be between 01 and 12.');
      return;
    }

    // Assuming year >= 26
    if (year < 26) {
      setLocalError('Secure Validation Failed: Card has expired.');
      return;
    }

    if (cardCvc.length < 3 || cardCvc.length > 4 || !/^\d+$/.test(cardCvc)) {
      setLocalError('Secure Validation Failed: CVV must be 3 or 4 digits.');
      return;
    }

    // Pass up to the submit handler
    onSubmit(e);
  };

  const handleGooglePaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(googleEmail)) {
      setLocalError('Secure Validation Failed: Please enter a valid Google Account email.');
      return;
    }

    onSubmit(e);
  };

  const handleApplePaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest max-w-md w-full rounded-2xl shadow-ambient-lg overflow-hidden p-6 relative border border-outline-variant/10">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-full hover:bg-surface-container-low transition-colors"
        >
          <svg className="w-5 h-5 text-on-surface" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {paymentStep === 'input' && (
          <div className="space-y-6 text-left">
            <div>
              <h3 className="font-headline text-xl font-bold mb-1 text-on-surface flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                Secure Checkout
              </h3>
              <p className="text-xs text-on-surface-variant font-body">LuxeStay payment encryption service</p>
            </div>

            {/* Error notifications */}
            {(paymentError || localError) && (
              <div className="text-xs text-error bg-error/5 p-2.5 rounded-lg border border-error/10 font-body">
                {localError || paymentError}
              </div>
            )}

            {/* Card Payment Form */}
            {paymentMethod === 'card' && (
              <form onSubmit={handleCardValidateAndSubmit} className="space-y-6">
                {/* Visual Gold Card */}
                <div className="bg-gradient-to-br from-primary via-primary-container to-[#1a1c1c] p-5 rounded-xl text-white shadow-md relative overflow-hidden h-40 flex flex-col justify-between">
                  <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />
                  <div className="flex justify-between items-start font-headline font-bold">
                    <span className="text-xs tracking-widest uppercase italic">LuxeStay Gold</span>
                    <div className="w-8 h-6 bg-amber-200/80 rounded" />
                  </div>
                  <div className="font-mono text-base tracking-widest text-center my-2 select-all">
                    {cardNumber || '•••• •••• •••• ••••'}
                  </div>
                  <div className="flex justify-between items-center text-[10px] uppercase font-headline font-bold tracking-wider text-white/90">
                    <div>
                      <p className="text-white/60 text-[8px]">Expires</p>
                      <p className="font-mono mt-0.5">{cardExpiry || 'MM/YY'}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    required
                    placeholder="Card Number"
                    value={cardNumber}
                    onChange={(e) => {
                      const formatted = e.target.value
                        .replace(/\s?/g, '')
                        .replace(/(\d{4})/g, '$1 ')
                        .trim();
                      setCardNumber(formatted);
                    }}
                    maxLength={19}
                    className="w-full font-body text-sm px-4 py-3.5 rounded-xl border border-outline-variant/30 focus:border-primary focus:ring-0 bg-[#f8f7f4] text-on-surface focus:outline-none"
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => {
                        let val = e.target.value;
                        if (val.length === 2 && !val.includes('/')) val += '/';
                        setCardExpiry(val);
                      }}
                      maxLength={5}
                      className="w-full font-body text-sm px-4 py-3.5 rounded-xl border border-outline-variant/30 focus:border-primary focus:ring-0 bg-[#f8f7f4] text-on-surface focus:outline-none"
                    />
                    <input
                      type="password"
                      required
                      placeholder="CVV"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      maxLength={4}
                      className="w-full font-body text-sm px-4 py-3.5 rounded-xl border border-outline-variant/30 focus:border-primary focus:ring-0 bg-[#f8f7f4] text-on-surface focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary-gradient py-3.5 rounded-xl font-headline font-bold text-white shadow-ambient-md transition-all active:scale-95 duration-200 text-xs uppercase tracking-wider"
                >
                  Pay {formatCurrency(totalPrice, 'GBP')}
                </button>
              </form>
            )}

            {/* Google Pay Form */}
            {paymentMethod === 'google' && (
              <form onSubmit={handleGooglePaySubmit} className="space-y-6">
                {/* Visual GPay Details Sheet */}
                <div className="bg-[#1f1f1f] p-5 rounded-xl text-white shadow-md relative overflow-hidden h-40 flex flex-col justify-between border border-white/10">
                  <div className="flex justify-between items-center">
                    <span className="font-headline font-extrabold text-sm tracking-widest text-[#4285f4]">
                      Google <span className="text-[#34a853]">P</span><span className="text-[#fbbc05]">a</span><span className="text-[#ea4335]">y</span>
                    </span>
                    <ShieldCheck className="w-5 h-5 text-[#34a853]" />
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-[9px] uppercase tracking-wider text-white/50">Virtual Account Number</p>
                    <p className="font-mono text-sm tracking-widest text-white/90">
                      {generatedAccountNo || 'GP-DEBIT-VIRTUAL-••••'}
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-[10px] uppercase font-headline font-bold tracking-wider text-white/80">
                    <div>
                      <p className="text-white/40 text-[8px]">Google Account</p>
                      <p className="mt-0.5">{googleEmail}</p>
                    </div>
                  </div>
                </div>

                {/* Secure Email Input */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                    Authorize Google Account Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/60" />
                    <input
                      type="email"
                      required
                      placeholder="you@gmail.com"
                      value={googleEmail}
                      onChange={(e) => setGoogleEmail(e.target.value)}
                      className="w-full font-body text-sm pl-11 pr-4 py-3.5 rounded-xl border border-outline-variant/30 focus:border-primary focus:ring-0 bg-[#f8f7f4] text-on-surface focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black hover:bg-[#1a1c1c] py-3.5 rounded-xl font-headline font-bold text-white shadow-md transition-all active:scale-95 duration-200 text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  Pay with Google Pay
                </button>
              </form>
            )}

            {/* Apple Pay Form */}
            {paymentMethod === 'apple' && (
              <form onSubmit={handleApplePaySubmit} className="space-y-6">
                {/* Visual Apple Pay Card */}
                <div className="bg-gradient-to-tr from-[#3a3d40] to-[#181a1b] p-5 rounded-xl text-white shadow-md relative overflow-hidden h-40 flex flex-col justify-between border border-white/5">
                  <div className="flex justify-between items-center">
                    <span className="font-headline font-extrabold text-sm tracking-wider flex items-center gap-1.5 text-white">
                      <Smartphone className="w-4 h-4 text-white" />
                      Apple Pay
                    </span>
                    <ShieldCheck className="w-5 h-5 text-tertiary" />
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-[9px] uppercase tracking-wider text-white/50">Device Card Number</p>
                    <p className="font-mono text-sm tracking-widest text-white/90">
                      {generatedAccountNo || 'AP-CASH-DEVICE-••••'}
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-[10px] uppercase font-headline font-bold tracking-wider text-white/80">
                    <div>
                      <p className="text-white/40 text-[8px]">Status</p>
                      <p className="mt-0.5 flex items-center gap-1 text-tertiary font-bold">
                        <Fingerprint className="w-3.5 h-3.5" /> Secure Element Linked
                      </p>
                    </div>
                  </div>
                </div>

                {/* Touch ID simulated prompt */}
                <div className="flex flex-col items-center justify-center p-6 bg-[#f8f7f4] rounded-xl border border-outline-variant/10 text-center space-y-3">
                  <Fingerprint className="w-12 h-12 text-primary animate-pulse" />
                  <div>
                    <p className="text-xs font-bold text-on-surface">Touch ID or Face ID Required</p>
                    <p className="text-[10px] text-on-surface-variant mt-1 font-body">
                      Double-click power button or authenticate using biometrics on device.
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black hover:bg-[#1a1c1c] py-3.5 rounded-xl font-headline font-bold text-white shadow-md transition-all active:scale-95 duration-200 text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Fingerprint className="w-4 h-4" /> Authorize Apple Pay
                </button>
              </form>
            )}
          </div>
        )}

        {/* Processing Step */}
        {paymentStep === 'processing' && (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
            <LoadingSpinner size="lg" />
            <div>
              <h3 className="font-headline font-bold text-lg text-on-surface">Authorizing Payment</h3>
              <p className="text-xs text-on-surface-variant font-body mt-1">
                Connecting securely with banking gateways...
              </p>
            </div>
          </div>
        )}

        {/* Success Step */}
        {paymentStep === 'success' && (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-tertiary/10 text-tertiary rounded-full flex items-center justify-center border border-tertiary/20">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-headline font-bold text-lg text-tertiary">Booking Confirmed!</h3>
              <p className="text-xs text-on-surface-variant font-body mt-1">
                Directing to confirmation screen...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
