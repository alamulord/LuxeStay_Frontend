import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminTopBar } from '../../components/admin/AdminTopBar';
import api from '../../lib/api';
import { CreditCard, ShieldCheck, CornerUpLeft } from 'lucide-react';
import { cn, formatCurrency } from '../../lib/utils';

interface PaymentInfo {
  id: string;
  amount: number;
  currency: string;
  status: string;
  method: string;
  transactionId: string;
  createdAt: string;
  booking: {
    id: string;
    room: { title: string };
    user: { firstName: string; lastName: string; email: string };
  };
}

export function AdminPayments() {
  const [payments, setPayments] = useState<PaymentInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPayments = async () => {
    setIsLoading(true);
    try {
      const response = await api.get<PaymentInfo[]>('/payments');
      setPayments(response.data);
    } catch (error) {
      console.error('Failed to load payments ledger', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleRefund = async (paymentId: string) => {
    if (!window.confirm('Are you sure you want to issue a full refund for this transaction?')) return;
    try {
      await api.post(`/payments/${paymentId}/refund`);
      alert('Refund processed successfully');
      fetchPayments();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to process refund');
    }
  };

  const totalRevenue = payments
    .filter(p => p.status === 'COMPLETED')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex">
      <AdminSidebar />

      <div className="flex-1 ml-[260px]">
        <AdminTopBar title="Financial Ledger" />

        <main className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="font-headline text-2xl font-bold text-[#191c1e]">Payments & Settlements</h2>
              <p className="text-sm text-[#464555] mt-0.5 font-medium">Reconcile transaction details and settlements</p>
            </div>
          </div>

          {/* KPI Mini Bento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-ambient flex flex-col gap-2 border border-slate-100">
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#464555]">Gross Earnings</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-admin-primary">{formatCurrency(totalRevenue)}</span>
                <CreditCard className="w-5 h-5 text-admin-primary" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-ambient flex flex-col gap-2 border border-slate-100">
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#464555]">Active Gateway Connections</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#191c1e]">Stripe (sandbox)</span>
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-ambient flex flex-col gap-2 border border-slate-100">
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#464555]">Settled Transactions</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-[#191c1e]">{payments.filter(p => p.status === 'COMPLETED').length}</span>
                <span className="text-xs text-[#464555]/75 font-medium">100% online</span>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12">Loading transactions ledger...</div>
          ) : (
            <div className="bg-white rounded-xl overflow-hidden shadow-ambient border border-slate-100">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-low border-b border-outline_variant/10">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-on_surface_variant">Guest / Booking</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-on_surface_variant">Property</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-on_surface_variant">Gateway & Txn</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-on_surface_variant">Amount</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-on_surface_variant">Status</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-on_surface_variant text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline_variant/5">
                  {payments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-sm">
                          {payment.booking?.user?.firstName || 'Unknown'} {payment.booking?.user?.lastName || 'User'}
                        </p>
                        <p className="text-xs text-on_surface_variant">{payment.booking?.user?.email || 'N/A'}</p>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        {payment.booking?.room?.title || 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block bg-slate-100 text-[10px] font-bold px-2 py-0.5 rounded uppercase text-slate-600 mb-1">
                          {payment.method}
                        </span>
                        <p className="text-[10px] text-on_surface_variant font-mono">{payment.transactionId || 'No txn ID'}</p>
                      </td>
                      <td className="px-6 py-4 font-bold text-sm text-indigo-900">
                        {formatCurrency(payment.amount)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          payment.status === 'COMPLETED' && "bg-emerald-50 text-emerald-700",
                          payment.status === 'PENDING' && "bg-amber-50 text-amber-700",
                          payment.status === 'REFUNDED' && "bg-red-50 text-red-700"
                        )}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                          {payment.status === 'COMPLETED' && (
                            <button
                              onClick={() => handleRefund(payment.id)}
                              className="flex items-center gap-1 text-xs text-red-600 hover:bg-red-50 px-2 py-1 rounded transition-colors"
                              title="Process Refund"
                            >
                              <CornerUpLeft className="w-4 h-4" /> Refund
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
