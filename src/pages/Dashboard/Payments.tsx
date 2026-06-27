import React from 'react';
import { Navbar } from '../../components/shared/Navbar';
import { Footer } from '../../components/shared/Footer';
import { DashboardSidebar } from '../../components/dashboard/DashboardSidebar';
import { CreditCard, Plus, ShieldCheck } from 'lucide-react';

export function UserPayments() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />

      <main className="pt-20 px-4 flex-1">
        <div className="max-w-7xl mx-auto py-8">
          <h1 className="font-headline text-3xl font-bold mb-8 text-[#1a1c1c]">Payment Methods</h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <DashboardSidebar />
            </div>

            <div className="lg:col-span-3 space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-ambient border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-lg text-[#1a1c1c]">Your Payment Cards</h3>
                    <p className="text-sm text-[#5c3f41] mt-0.5">Securely manage your credit card profiles</p>
                  </div>
                </div>
                <button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-primary-container transition-colors btn-hover">
                  <Plus className="w-4 h-4" /> Add Payment Method
                </button>
              </div>

              {/* Card List Placeholder */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-outline-variant/20 rounded-xl p-5 bg-white relative flex flex-col justify-between h-44 shadow-ambient">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-bold text-[#5c3f41]/60 uppercase tracking-widest">Primary Card</p>
                      <p className="text-base font-semibold mt-1">•••• •••• •••• 4242</p>
                    </div>
                    <span className="text-xs bg-[#f3f3f3] px-2.5 py-1 rounded font-bold">Visa</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] text-[#5c3f41]/60 uppercase">Card Holder</p>
                      <p className="text-sm font-semibold mt-0.5">John Doe</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#5c3f41]/60 uppercase">Expires</p>
                      <p className="text-sm font-semibold mt-0.5">12/28</p>
                    </div>
                  </div>
                </div>

                <div className="border border-dashed border-outline-variant/30 rounded-xl p-5 flex flex-col items-center justify-center h-44 text-center cursor-pointer hover:bg-slate-50 transition-colors">
                  <Plus className="w-8 h-8 text-[#5c3f41]/40 mb-2" />
                  <p className="text-sm font-semibold text-[#5c3f41]">Add new credit card</p>
                  <p className="text-xs text-[#5c3f41]/50 mt-1">PCI-DSS Compliant security</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#5c3f41]/60 bg-surface-container-low p-4 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Your payment credentials are fully encrypted and securely stored by our payment gateway. We never store raw card numbers on our servers.</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
