import React from 'react';
import { CreditCard } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PaymentMethodSelectorProps {
  selectedMethod: string;
  onMethodChange: (method: string) => void;
}

export function PaymentMethodSelector({ selectedMethod, onMethodChange }: PaymentMethodSelectorProps) {
  const methods = [
    { id: 'stripe', name: 'Credit Card', icon: '💳', description: 'Pay with Visa, Mastercard, or American Express' },
    { id: 'paystack', name: 'Paystack', icon: '🌍', description: 'Pay with mobile money or bank transfer' },
  ];

  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-xl">Payment method</h2>
      
      <div className="space-y-3">
        {methods.map((method) => (
          <button
            key={method.id}
            onClick={() => onMethodChange(method.id)}
            className={cn(
              "w-full p-4 rounded-lg border-2 text-left transition-all",
              selectedMethod === method.id
                ? "border-primary bg-primary/5"
                : "border-outline_variant/15 hover:border-primary/50"
            )}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{method.icon}</span>
              <div>
                <p className="font-medium">{method.name}</p>
                <p className="text-sm text-on_surface_variant">{method.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}