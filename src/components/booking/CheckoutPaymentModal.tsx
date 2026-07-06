import React from 'react';
import { formatCurrency } from '../../lib/utils';
import { LoadingSpinner } from '../shared/LoadingSpinner';

interface CheckoutPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest max-w-md w-full rounded-2xl shadow-ambient-lg overflow-hidden p-6 relative border border-outline-variant/10">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-full hover:bg-surface-container-low transition-colors"
        >
          <svg className="w-5 h-5 text-on-surface" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {paymentStep === 'input' && (
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <h3 className="font-headline text-xl font-bold mb-1 text-on-surface">Secure Payment</h3>
              <p className="text-xs text-on-surface-variant font-body">LuxeStay payment encryption service</p>
            </div>

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

            {paymentError && (
              <div className="text-xs text-error bg-error/5 p-2.5 rounded-lg border border-error/10 font-body">
                {paymentError}
              </div>
            )}

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
                className="input-field w-full font-body text-sm px-4 py-3 rounded-xl border border-outline-variant/30 focus:border-primary focus:ring-0"
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
                  className="input-field w-full font-body text-sm px-4 py-3 rounded-xl border border-outline-variant/30 focus:border-primary focus:ring-0"
                />
                <input
                  type="password"
                  required
                  placeholder="CVV"
                  value={cardCvc}
                  onChange={(e) => setCardCvc(e.target.value)}
                  maxLength={4}
                  className="input-field w-full font-body text-sm px-4 py-3 rounded-xl border border-outline-variant/30 focus:border-primary focus:ring-0"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full btn-primary-gradient py-3.5 rounded-xl font-headline font-bold text-white shadow-ambient-md transition-all active:scale-95 duration-200"
            >
              Pay {formatCurrency(totalPrice, 'GBP')}
            </button>
          </form>
        )}

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
