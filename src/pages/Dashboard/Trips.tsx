import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, MapPin, ArrowRight, Printer, X, CreditCard, 
  Globe, Languages, Gift, AlertTriangle, FileText, CheckCircle 
} from 'lucide-react';
import { Navbar } from '../../components/shared/Navbar';
import { Footer } from '../../components/shared/Footer';
import { DashboardSidebar } from '../../components/dashboard/DashboardSidebar';
import { useBookings } from '../../hooks/useBookings';
import { useAuth } from '../../contexts/AuthContext';
import { formatDate, formatCurrency } from '../../lib/utils';
import { Booking } from '../../types/booking.types';

export function Trips() {
  const { bookings, isLoading, cancelBooking } = useBookings();
  const { user } = useAuth();
  
  // Modals state
  const [selectedReceipt, setSelectedReceipt] = useState<Booking | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [isSubmittingCancel, setIsSubmittingCancel] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const upcomingBookings = bookings.filter(b => 
    new Date(b.checkInDate) > new Date() && b.status !== 'CANCELLED'
  );
  
  const pastBookings = bookings.filter(b => 
    new Date(b.checkInDate) <= new Date() || b.status === 'COMPLETED'
  );

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

  // Helper to calculate nights
  const calculateNights = (inDate: string, outDate: string) => {
    const diff = new Date(outDate).getTime() - new Date(inDate).getTime();
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between print:bg-white print:text-black">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 bg-[#1a1c1c] text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border border-outline-variant/10 animate-fade-in no-print">
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
          <h1 className="font-plus text-3xl md:text-4xl font-black tracking-tight mb-8 text-[#1a1c1c] no-print">
            My Trips
          </h1>

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
                  <h2 className="text-xl font-bold flex items-center gap-2 text-[#1a1c1c] no-print">
                    Upcoming Stays
                    <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-[10px] uppercase font-black tracking-wider rounded">
                      Active
                    </span>
                  </h2>

                  <div className="space-y-6">
                    {upcomingBookings.map((booking) => {
                      const nights = calculateNights(booking.checkInDate, booking.checkOutDate);
                      return (
                        <div 
                          key={booking.id} 
                          className="bg-surface-container-lowest border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex flex-col md:flex-row">
                            {/* Room Image */}
                            <div className="w-full md:w-2/5 relative h-48 md:h-auto overflow-hidden bg-surface-container">
                              <img 
                                src={booking.room.images[0]} 
                                alt={booking.room.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold text-[#1a1c1c]">
                                {nights} {nights === 1 ? 'Night' : 'Nights'}
                              </div>
                            </div>

                            {/* Stay Details */}
                            <div className="flex-1 p-6 flex flex-col justify-between space-y-6">
                              <div>
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <h3 className="text-xl font-bold text-[#1a1c1c]">{booking.room.title}</h3>
                                    <p className="text-xs text-[#5c3f41] flex items-center gap-1 mt-1">
                                      <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                                      {booking.room.city}, {booking.room.country}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Confirmation</p>
                                    <p className="font-mono text-xs font-bold text-primary">#LX-{booking.id.slice(-6).toUpperCase()}</p>
                                  </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4 py-4 border-y border-outline-variant/10 text-xs text-[#1a1c1c] bg-surface/30 px-3 rounded-xl mt-4">
                                  <div>
                                    <p className="text-[10px] text-slate-400 font-semibold mb-1">Check-in</p>
                                    <p className="font-bold">{formatDate(booking.checkInDate)}</p>
                                  </div>
                                  <div>
                                    <p className="text-[10px] text-slate-400 font-semibold mb-1">Check-out</p>
                                    <p className="font-bold">{formatDate(booking.checkOutDate)}</p>
                                  </div>
                                  <div>
                                    <p className="text-[10px] text-slate-400 font-semibold mb-1">Guests</p>
                                    <p className="font-bold">{booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}</p>
                                  </div>
                                </div>
                              </div>

                              {/* Interactive Actions */}
                              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-outline-variant/10 no-print">
                                <div className="flex items-center gap-2">
                                  <button 
                                    onClick={() => setSelectedReceipt(booking)}
                                    className="px-4 py-2 border border-outline-variant/20 hover:bg-surface-container rounded-xl text-xs font-bold text-[#1a1c1c] flex items-center gap-1.5 transition-colors"
                                  >
                                    <FileText className="w-3.5 h-3.5" />
                                    Receipt
                                  </button>
                                  {booking.room.latitude && (
                                    <a 
                                      href={`https://www.google.com/maps/search/?api=1&query=${booking.room.latitude},${booking.room.longitude}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-4 py-2 border border-outline-variant/20 hover:bg-surface-container rounded-xl text-xs font-bold text-[#1a1c1c] flex items-center gap-1.5 transition-colors"
                                    >
                                      <Globe className="w-3.5 h-3.5" />
                                      Maps
                                    </a>
                                  )}
                                </div>

                                <button 
                                  onClick={() => handleCancelClick(booking.id)}
                                  className="px-4 py-2 text-xs font-bold text-primary hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-100"
                                >
                                  Cancel Stay
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {upcomingBookings.length === 0 && !isLoading && (
                      <div className="text-center py-12 bg-surface-container-lowest border rounded-2xl no-print">
                        <p className="text-xs text-[#5c3f41] mb-4">No upcoming bookings found.</p>
                        <Link to="/search" className="btn-primary inline-block">
                          Start exploring
                        </Link>
                      </div>
                    )}
                  </div>
                </section>

                {/* Past Stays */}
                <section className="space-y-6 no-print">
                  <h2 className="text-xl font-bold text-[#1a1c1c]">Past Stays</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pastBookings.map((booking) => (
                      <div 
                        key={booking.id} 
                        className="bg-surface-container-lowest border rounded-2xl p-5 flex gap-4 hover:shadow-sm transition-all group"
                      >
                        <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-surface-container">
                          <img 
                            src={booking.room.images[0]} 
                            alt={booking.room.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex-grow flex flex-col justify-between">
                          <div>
                            <h4 className="font-bold text-[#1a1c1c] text-sm group-hover:text-primary transition-colors">
                              {booking.room.title}
                            </h4>
                            <p className="text-[11px] text-[#5c3f41] mt-1">
                              {booking.room.city} • {formatDate(booking.checkInDate)}
                            </p>
                          </div>
                          <div className="flex items-center justify-between pt-2 mt-2 border-t border-outline-variant/10">
                            <span className="text-[10px] font-bold text-slate-400">
                              {formatCurrency(booking.totalPrice)}
                            </span>
                            <div className="flex items-center gap-3">
                              <button 
                                onClick={() => setSelectedReceipt(booking)}
                                className="text-[10px] font-bold text-[#1a1c1c] hover:underline"
                              >
                                Receipt
                              </button>
                              <Link 
                                to={`/room/${booking.roomId}`}
                                className="text-[10px] font-bold text-primary flex items-center gap-0.5 hover:underline"
                              >
                                Book Again <ArrowRight className="w-3 h-3" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

              </div>

              {/* Side Panels - Account Stats & Invite */}
              <div className="xl:col-span-1 space-y-8 no-print">
                
                {/* Account Overview Stats Card */}
                <div className="bg-surface-container-lowest border rounded-3xl p-6 space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-outline-variant/10">
                    <h3 className="font-bold text-sm text-[#1a1c1c]">Account Overview</h3>
                    <Link to="/dashboard/profile" className="text-primary font-bold text-xs hover:underline">
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
                        <span className="text-xs font-bold text-[#1a1c1c]">Loyalty Points</span>
                      </div>
                      <span className="text-xs font-black text-primary">2,450 pts</span>
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-2 pt-2">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Payment Methods</p>
                      <div className="flex items-center justify-between py-2 border-b border-outline-variant/10 text-xs">
                        <div className="flex items-center gap-2 text-[#1a1c1c]">
                          <CreditCard className="w-4 h-4 text-primary shrink-0" />
                          <span>Visa •••• 4242</span>
                        </div>
                        <span className="text-[9px] bg-primary/5 text-primary px-2 py-0.5 rounded font-black tracking-wider uppercase">Default</span>
                      </div>
                    </div>

                    {/* Preferences */}
                    <div className="space-y-2 pt-2">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Preferences</p>
                      <div className="flex items-center justify-between p-2.5 border border-outline-variant/20 rounded-xl bg-surface/30 text-xs">
                        <div className="flex items-center gap-2 text-[#5c3f41]">
                          <Languages className="w-4 h-4" />
                          <span>Language</span>
                        </div>
                        <span className="font-bold text-[#1a1c1c]">English (US)</span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 border border-outline-variant/20 rounded-xl bg-surface/30 text-xs">
                        <div className="flex items-center gap-2 text-[#5c3f41]">
                          <Globe className="w-4 h-4" />
                          <span>Currency</span>
                        </div>
                        <span className="font-bold text-[#1a1c1c]">USD ($)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Promo Card */}
                <div className="relative overflow-hidden bg-[#1a1c1c] text-white rounded-3xl p-6 space-y-4">
                  <div className="relative z-10 space-y-2">
                    <h4 className="font-headline font-bold text-base leading-tight">
                      Invite friends, get <span className="text-primary">$100</span>
                    </h4>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      Give your friends $50 off their first booking and earn $100 for your next stay.
                    </p>
                    <button className="mt-2 bg-[#ba0036] hover:bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-colors">
                      Get My Link
                    </button>
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

      {/* -------------------- VIEW RECEIPT MODAL (PRINT OPTIMIZED) -------------------- */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm print:relative print:bg-white print:block print:inset-auto print:z-0">
          
          <div className="bg-white rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl p-8 relative flex flex-col justify-between print:shadow-none print:p-0 print:m-0 print:w-full print:rounded-none">
            
            {/* Modal Controls (hidden on print) */}
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/10 mb-6 no-print">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-[#1a1c1c] text-sm">Trip Receipt</h3>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 bg-[#ba0036] hover:bg-primary text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" /> Print
                </button>
                <button 
                  onClick={() => setSelectedReceipt(null)}
                  className="p-1.5 border hover:bg-surface-container rounded-lg transition-colors text-slate-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Receipt Printable Copy Wrapper */}
            <div className="space-y-6 text-[#1a1c1c] text-xs">
              
              {/* Header Branding */}
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="font-headline font-extrabold text-xl text-[#ba0036]">LuxeStay</h2>
                  <p className="text-[10px] text-slate-400 mt-0.5">Editorial Hospitality Group</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-xs uppercase tracking-wide text-slate-500">Invoice / Receipt</p>
                  <p className="text-[10px] text-slate-400 font-mono mt-1">#LX-{selectedReceipt.id.slice(-6).toUpperCase()}</p>
                </div>
              </div>

              {/* Booking Status Banner */}
              <div className="p-3 bg-surface-container-low rounded-xl border flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-400">Payment Status</p>
                  <p className="font-bold text-green-700">PAID IN FULL</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400">Date Issued</p>
                  <p className="font-bold">{formatDate(selectedReceipt.createdAt)}</p>
                </div>
              </div>

              {/* Stay Particulars */}
              <div className="space-y-2">
                <h4 className="font-bold text-[10px] uppercase tracking-wider text-slate-400">Reservation Details</h4>
                <div className="p-4 border rounded-xl space-y-3 bg-surface/10">
                  <div className="flex justify-between">
                    <span className="font-bold text-sm">{selectedReceipt.room.title}</span>
                    <span className="text-[#5c3f41]">{selectedReceipt.room.city}, {selectedReceipt.room.country}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t text-[11px]">
                    <div>
                      <p className="text-slate-400 mb-0.5">Check-in</p>
                      <p className="font-bold">{formatDate(selectedReceipt.checkInDate)}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 mb-0.5">Check-out</p>
                      <p className="font-bold">{formatDate(selectedReceipt.checkOutDate)}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 mb-0.5">Duration</p>
                      <p className="font-bold">
                        {calculateNights(selectedReceipt.checkInDate, selectedReceipt.checkOutDate)} Nights
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guest & Billing Details */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-[10px] uppercase tracking-wider text-slate-400 mb-2">Guest</h4>
                  <p className="font-bold">{user?.firstName} {user?.lastName}</p>
                  <p className="text-[#5c3f41]">{user?.email}</p>
                  <p className="text-[#5c3f41] mt-1">{selectedReceipt.guests} {selectedReceipt.guests === 1 ? 'Person' : 'People'}</p>
                </div>
                <div>
                  <h4 className="font-bold text-[10px] uppercase tracking-wider text-slate-400 mb-2">Payment Method</h4>
                  <div className="flex items-center gap-1.5 font-bold">
                    <CreditCard className="w-4 h-4 text-primary" />
                    <span>Visa ending in 4242</span>
                  </div>
                  <p className="text-[#5c3f41] mt-1">Transaction Ref: txn_{selectedReceipt.id.slice(0, 8)}</p>
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-2">
                <h4 className="font-bold text-[10px] uppercase tracking-wider text-slate-400">Charges Summary</h4>
                <div className="divide-y border-t border-b">
                  <div className="py-2 flex justify-between">
                    <span>
                      {selectedReceipt.room.title} (Room rate)
                    </span>
                    <span className="font-mono">
                      {formatCurrency(selectedReceipt.room.pricePerNight)} / night
                    </span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span>
                      Nightly Subtotal ({calculateNights(selectedReceipt.checkInDate, selectedReceipt.checkOutDate)} nights)
                    </span>
                    <span className="font-mono font-semibold">
                      {formatCurrency(
                        selectedReceipt.room.pricePerNight * 
                        calculateNights(selectedReceipt.checkInDate, selectedReceipt.checkOutDate)
                      )}
                    </span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span>Cleaning Fee</span>
                    <span className="font-mono">$50.00</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span>LuxeStay Service &amp; Concierge Fee (10%)</span>
                    <span className="font-mono">
                      {formatCurrency(
                        Math.round(selectedReceipt.room.pricePerNight * 
                        calculateNights(selectedReceipt.checkInDate, selectedReceipt.checkOutDate) * 0.1)
                      )}
                    </span>
                  </div>
                  <div className="py-3 flex justify-between text-sm font-black bg-surface/20 px-2 rounded-lg">
                    <span>Amount Charged (Total)</span>
                    <span className="text-[#ba0036] font-mono">
                      {formatCurrency(selectedReceipt.totalPrice)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Receipt Footer Info */}
              <div className="text-center pt-4 text-[10px] text-slate-400 space-y-1.5 border-t border-dashed">
                <p>Thank you for choosing LuxeStay. Enjoy your luxury editorial experience.</p>
                <p>For support, modifications, or local concierge requests, reach out to concierge@luxestay.com</p>
              </div>

            </div>

            {/* Back Button (hidden on print) */}
            <div className="mt-8 no-print">
              <button 
                onClick={() => setSelectedReceipt(null)}
                className="w-full py-3 bg-[#1a1c1c] hover:bg-black text-white text-xs font-bold rounded-xl transition-all"
              >
                Close Receipt
              </button>
            </div>

          </div>
        </div>
      )}

      {/* -------------------- CONFIRM CANCELLATION MODAL -------------------- */}
      {cancellingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm no-print">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl p-6 space-y-6 border border-outline-variant/10">
            <div className="flex items-center gap-3 text-primary">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-[#1a1c1c] text-sm">Cancel Stay?</h3>
            </div>

            <p className="text-xs text-[#5c3f41] leading-relaxed">
              Are you sure you want to cancel this reservation? This action will release the suite dates immediately and refund your payment according to the host cancellation policy rules.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button 
                onClick={() => setCancellingId(null)}
                className="px-4 py-2 border rounded-xl text-xs font-bold text-[#5c3f41] hover:bg-surface-container transition-colors"
                disabled={isSubmittingCancel}
              >
                Go Back
              </button>
              <button 
                onClick={confirmCancel}
                className="px-4 py-2 bg-primary hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors disabled:opacity-50"
                disabled={isSubmittingCancel}
              >
                {isSubmittingCancel ? "Cancelling..." : "Yes, Cancel Stay"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}