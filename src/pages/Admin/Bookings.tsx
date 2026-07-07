import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminTopBar } from '../../components/admin/AdminTopBar';
import { Booking } from '../../types/booking.types';
import api from '../../lib/api';
import { Calendar, CheckCircle, XCircle, Clock, Check } from 'lucide-react';
import { cn, formatCurrency } from '../../lib/utils';

export function AdminBookings() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isLoading, setIsLoading] = useState(true);

  const filteredBookings = bookings.filter((b) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const guestName = `${b.user?.firstName || ''} ${b.user?.lastName || ''}`.toLowerCase();
    const guestEmail = (b.user?.email || '').toLowerCase();
    const roomTitle = (b.room?.title || '').toLowerCase();
    return guestName.includes(query) || guestEmail.includes(query) || roomTitle.includes(query);
  });

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'ALL') {
        params.append('status', statusFilter);
      }
      params.append('page', page.toString());
      params.append('limit', '10');

      const response = await api.get<{ bookings: Booking[]; total: number }>(`/bookings/all?${params.toString()}`);
      setBookings(response.data.bookings);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Failed to load bookings', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [page, statusFilter]);

  const updateStatus = async (bookingId: string, status: string) => {
    try {
      await api.put(`/bookings/${bookingId}/status`, { status });
      setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: status as any } : b));
    } catch (error) {
      alert('Failed to update booking status');
    }
  };

  const cancelBooking = async (bookingId: string) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    try {
      await api.post(`/bookings/${bookingId}/cancel`);
      setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'CANCELLED' } : b));
    } catch (error) {
      alert('Failed to cancel booking');
    }
  };

  const stats = {
    total: total,
    pending: bookings.filter(b => b.status === 'PENDING').length,
    confirmed: bookings.filter(b => b.status === 'CONFIRMED').length,
    completed: bookings.filter(b => b.status === 'COMPLETED').length,
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex">
      <AdminSidebar />

      <div className="flex-1 ml-[260px]">
        <AdminTopBar title="Bookings Ledger" />

        <main className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="font-headline text-2xl font-bold text-[#191c1e]">Reservations Management</h2>
              <p className="text-sm text-[#464555] mt-0.5">Track, audit, and approve guest journeys</p>
            </div>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-ambient flex flex-col gap-2 border border-slate-100">
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#464555]">Total Bookings</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-[#191c1e]">{stats.total}</span>
                <Calendar className="w-5 h-5 text-admin-primary" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-ambient flex flex-col gap-2 border border-slate-100">
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#464555]">Pending Approval</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-[#191c1e]">{stats.pending}</span>
                <Clock className="w-5 h-5 text-amber-500" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-ambient flex flex-col gap-2 border border-slate-100">
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#464555]">Confirmed</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-[#191c1e]">{stats.confirmed}</span>
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-ambient flex flex-col gap-2 border border-slate-100">
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#464555]">Completed Trips</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-[#191c1e]">{stats.completed}</span>
                <Check className="w-5 h-5 text-admin-primary" />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl p-4 mb-8 flex items-center justify-between border border-slate-200/50 shadow-ambient">
            <div className="flex gap-2">
              {['ALL', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((st) => (
                <button
                  key={st}
                  onClick={() => { setStatusFilter(st); setPage(1); }}
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200",
                    statusFilter === st
                      ? "bg-admin-primary text-white shadow-sm"
                      : "bg-[#f2f4f6] text-[#464555] hover:bg-slate-200"
                  )}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12">Loading bookings...</div>
          ) : (
            <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-low border-b border-outline_variant/10">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-on_surface_variant">Guest</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-on_surface_variant">Room</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-on_surface_variant">Dates</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-on_surface_variant">Total Price</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-on_surface_variant">Status</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-on_surface_variant text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline_variant/5">
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-sm">{booking.user?.firstName} {booking.user?.lastName}</p>
                        <p className="text-xs text-on_surface_variant">{booking.user?.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-sm">{booking.room?.title}</p>
                        <p className="text-xs text-on_surface_variant">{booking.room?.city}, {booking.room?.country}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm">
                          {new Date(booking.checkInDate).toLocaleDateString()} - {new Date(booking.checkOutDate).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-on_surface_variant">
                          {Math.ceil((new Date(booking.checkOutDate).getTime() - new Date(booking.checkInDate).getTime()) / (1000 * 3600 * 24))} nights, {booking.guests} guests
                        </p>
                      </td>
                      <td className="px-6 py-4 font-bold text-sm">
                        {formatCurrency(booking.totalPrice)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          booking.status === 'CONFIRMED' && "bg-indigo-50 text-admin-primary",
                          booking.status === 'PENDING' && "bg-amber-50 text-amber-700",
                          booking.status === 'COMPLETED' && "bg-emerald-50 text-emerald-700",
                          booking.status === 'CANCELLED' && "bg-red-50 text-red-700"
                        )}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {booking.status === 'PENDING' && (
                            <button
                              onClick={() => updateStatus(booking.id, 'CONFIRMED')}
                              className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                              title="Confirm"
                            >
                              <CheckCircle className="w-5 h-5" />
                            </button>
                          )}
                          {booking.status === 'CONFIRMED' && (
                            <button
                              onClick={() => updateStatus(booking.id, 'COMPLETED')}
                              className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                              title="Mark Completed"
                            >
                              <Check className="w-5 h-5" />
                            </button>
                          )}
                          {booking.status !== 'CANCELLED' && booking.status !== 'COMPLETED' && (
                            <button
                              onClick={() => cancelBooking(booking.id)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                              title="Cancel Reservation"
                            >
                              <XCircle className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              {total > 10 && (
                <div className="px-6 py-4 bg-surface-container-low flex items-center justify-between">
                  <span className="text-xs text-on_surface_variant">
                    Showing {(page - 1) * 10 + 1} - {Math.min(page * 10, total)} of {total} bookings
                  </span>
                  <div className="flex gap-2">
                    <button
                      disabled={page === 1}
                      onClick={() => setPage(page - 1)}
                      className="px-3 py-1 bg-white border rounded text-xs disabled:opacity-50"
                    >
                      Prev
                    </button>
                    <button
                      disabled={page * 10 >= total}
                      onClick={() => setPage(page + 1)}
                      className="px-3 py-1 bg-white border rounded text-xs disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
