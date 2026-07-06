import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface CancelBookingDialogProps {
  isOpen: boolean;
  isSubmitting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function CancelBookingDialog({
  isOpen,
  isSubmitting,
  onClose,
  onConfirm,
}: CancelBookingDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm no-print">
      <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl p-6 space-y-6 border border-outline-variant/10">
        <div className="flex items-center gap-3 text-primary">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-[#ba0036]" />
          </div>
          <h3 className="font-bold text-[#1a1c1c] text-sm">Cancel Stay?</h3>
        </div>

        <p className="text-xs text-[#5c3f41] leading-relaxed">
          Are you sure you want to cancel this reservation? This action will release the suite dates immediately and refund your payment according to the host cancellation policy rules.
        </p>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button 
            onClick={onClose}
            className="px-4 py-2 border rounded-xl text-xs font-bold text-[#5c3f41] hover:bg-surface-container transition-colors"
            disabled={isSubmitting}
          >
            Go Back
          </button>
          <button 
            onClick={onConfirm}
            className="px-4 py-2 bg-[#ba0036] hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Cancelling..." : "Yes, Cancel Stay"}
          </button>
        </div>
      </div>
    </div>
  );
}
