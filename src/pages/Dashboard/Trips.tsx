import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, CreditCard, Languages, Globe, Gift } from 'lucide-react';
import { Navbar } from '../../components/shared/Navbar';
import { Footer } from '../../components/shared/Footer';
import { DashboardSidebar } from '../../components/dashboard/DashboardSidebar';
import { UpcomingStayCard } from '../../components/dashboard/UpcomingStayCard';
import { PastStayCard } from '../../components/dashboard/PastStayCard';
import { ReceiptModal } from '../../components/dashboard/ReceiptModal';
import { CancelBookingDialog } from '../../components/dashboard/CancelBookingDialog';
import { useBookings } from '../../hooks/useBookings';
import { Booking } from '../../types/booking.types';
import { useAuth } from '../../contexts/AuthContext';
import { PremiumButton } from '../../components/ui/PremiumButton';
import { Badge } from '../../components/ui/Badge';

export function Trips() {
  const { bookings, isLoading, cancelBooking } = useBookings();
  const { user } = useAuth();
  
  // Modals state
  const [selectedReceipt, setSelectedReceipt] = useState<Booking | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [isSubmittingCancel, setIsSubmittingCancel] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingBookings = bookings.filter(b => {
    const checkout = new Date(b.checkOutDate);
    checkout.setHours(0, 0, 0, 0);
    return checkout >= today && b.status !== 'CANCELLED' && b.status !== 'CHECKED_OUT' && b.status !== 'COMPLETED';
  });
  
  const pastBookings = bookings.filter(b => {
    const checkout = new Date(b.checkOutDate);
    checkout.setHours(0, 0, 0, 0);
    return (checkout < today && b.status !== 'CANCELLED') || b.status === 'COMPLETED' || b.status === 'CHECKED_OUT';
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleCancelClick = (bookingId: string) => {
    setCancellingId(bookingId);
  };

  const confirmCancel = async () => {
    if (!cancellingId) return;
    setIsSubmittingCancel(true);
    try {
      await cancelBooking(cancellingId);
      showToast("Your reservation has been successfully cancelled.");
      setCancellingId(null);
    } catch (err: any) {
      showToast(err.message || "Failed to cancel booking. Please try again.");
    } finally {
      setIsSubmittingCancel(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between print:bg-white print:text-black">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 bg-on-surface text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border border-outline-variant/10 no-print animate-fade-in font-body">
          <CheckCircle className="w-5 h-5 text-primary shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header and navbar hidden during printing */}
      <div className="no-print">
        <Navbar />
      </div>

      <main className="pt-20 px-4 flex-grow print:pt-0 print:px-0">
        <div className="max-w-7xl mx-auto py-8 print:py-0">
          <div className="mb-8 space-y-2 no-print">
            <h1 className="font-headline text-3xl md:text-5xl font-extrabold tracking-tight text-on-surface leading-tight">
              Good evening, {user?.firstName || 'Traveler'}.
            </h1>
            {upcomingBookings.length > 0 ? (
              <p className="text-sm text-on-surface-variant font-body">
                Your next journey begins in {Math.max(1, Math.ceil((new Date(upcomingBookings[0].checkInDate).getTime() - new Date().getTime()) / 86400000))} days.
              </p>
            ) : (
              <p className="text-sm text-on-surface-variant font-body">
                Where should your next adventure begin?
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1 no-print">
              <DashboardSidebar />
            </div>

            {/* Main Split Grid */}
            <div className="lg:col-span-3 grid grid-cols-1 xl:grid-cols-3 gap-8 print:block">
              
              {/* Stays List */}
              <div className="xl:col-span-2 space-y-12 print:w-full">
                
                {/* Upcoming Stays */}
                <section className="space-y-6">
                  <h2 className="text-xl font-headline font-bold flex items-center gap-2 text-on-surface no-print">
                    Upcoming Stays
                    <Badge variant="success">Active</Badge>
                  </h2>

                  <div className="space-y-6">
                    {upcomingBookings.map((booking) => (
                      <UpcomingStayCard 
                        key={booking.id}
                        booking={booking}
                        onCancelClick={handleCancelClick}
                        onReceiptClick={setSelectedReceipt}
                      />
                    ))}

                    {upcomingBookings.length === 0 && !isLoading && (
                      <div className="text-center py-12 bg-surface-container-lowest border border-outline-variant/10 rounded-2xl no-print">
                        <p className="text-xs text-on-surface-variant mb-4 font-body">No upcoming bookings found.</p>
                        <Link to="/search" className="inline-block">
                          <PremiumButton size="sm">Start exploring</PremiumButton>
                        </Link>
                      </div>
                    )}
                  </div>
                </section>

                {/* Past Stays */}
                <section className="space-y-6 no-print">
                  <h2 className="text-xl font-headline font-bold text-on-surface">Past Stays</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pastBookings.map((booking) => (
                      <PastStayCard 
                        key={booking.id}
                        booking={booking}
                        onReceiptClick={setSelectedReceipt}
                      />
                    ))}
                  </div>
                </section>

              </div>

              {/* Side Panels - Account Stats & Invite */}
              <div className="xl:col-span-1 space-y-8 no-print">
                
                {/* Account Overview Stats Card */}
                <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-3xl p-6 space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-outline-variant/10">
                    <h3 className="font-headline font-bold text-sm text-on-surface">Account Overview</h3>
                    <Link to="/dashboard/profile" className="text-primary font-headline font-bold text-xs hover:underline">
                      Edit
                    </Link>
                  </div>

                  <div className="space-y-4">
                    {/* Loyalty Points */}
                    <div className="flex items-center justify-between p-3.5 bg-surface-container rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                          ★
                        </div>
                        <span className="text-xs font-headline font-bold text-on-surface">Loyalty Points</span>
                      </div>
                      <span className="text-xs font-headline font-black text-primary">2,450 pts</span>
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-2 pt-2">
                      <p className="text-[10px] font-headline font-bold uppercase tracking-wider text-on-surface-variant">Payment Methods</p>
                      <div className="flex items-center justify-between py-2 border-b border-outline-variant/10 text-xs">
                        <div className="flex items-center gap-2 text-on-surface font-body">
                          <CreditCard className="w-4 h-4 text-primary shrink-0" />
                          <span>Visa •••• 4242</span>
                        </div>
                        <span className="text-[9px] bg-primary/5 text-primary px-2 py-0.5 rounded font-headline font-bold tracking-wider uppercase">Default</span>
                      </div>
                    </div>

                    {/* Preferences */}
                    <div className="space-y-2 pt-2">
                      <p className="text-[10px] font-headline font-bold uppercase tracking-wider text-on-surface-variant font-body">Preferences</p>
                      <div className="flex items-center justify-between p-2.5 border border-outline-variant/20 rounded-xl bg-surface/30 text-xs font-body">
                        <div className="flex items-center gap-2 text-on-surface-variant">
                          <Languages className="w-4 h-4" />
                          <span>Language</span>
                        </div>
                        <span className="font-headline font-bold text-on-surface">English (US)</span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 border border-outline-variant/20 rounded-xl bg-surface/30 text-xs font-body">
                        <div className="flex items-center gap-2 text-on-surface-variant">
                          <Globe className="w-4 h-4" />
                          <span>Currency</span>
                        </div>
                        <span className="font-headline font-bold text-on-surface">USD ($)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Promo Card */}
                <div className="relative overflow-hidden bg-on-surface text-white rounded-3xl p-6 space-y-4">
                  <div className="relative z-10 space-y-2">
                    <h4 className="font-headline font-bold text-base leading-tight text-white">
                      Invite friends, get <span className="text-primary">$100</span>
                    </h4>
                    <p className="text-white/60 text-xs leading-relaxed font-body">
                      Give your friends $50 off their first booking and earn $100 for your next stay.
                    </p>
                    <PremiumButton size="sm" className="mt-2 text-[10px] uppercase font-bold tracking-wider">
                      Get My Link
                    </PremiumButton>
                  </div>
                  <div className="absolute right-0 bottom-0 opacity-10 translate-x-4 translate-y-4 pointer-events-none">
                    <Gift className="w-32 h-32 text-white" />
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </main>

      <div className="no-print">
        <Footer />
      </div>

      {/* Receipt Modal */}
      {selectedReceipt && (
        <ReceiptModal 
          booking={selectedReceipt}
          onClose={() => setSelectedReceipt(null)}
        />
      )}

      {/* Confirm Cancellation */}
      <CancelBookingDialog 
        isOpen={!!cancellingId}
        isSubmitting={isSubmittingCancel}
        onClose={() => setCancellingId(null)}
        onConfirm={confirmCancel}
      />
    </div>
  );
}