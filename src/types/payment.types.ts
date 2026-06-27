export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  method: 'STRIPE' | 'PAYSTACK';
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
}
