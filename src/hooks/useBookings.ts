import { useState, useEffect } from 'react';
import api from '../lib/api';
import { Booking, CreateBookingRequest } from '../types/booking.types';

export function useBookings(filters?: { status?: string }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (filters?.status) params.append('status', filters.status);

        const response = await api.get<Booking[]>(`/bookings/my-bookings?${params.toString()}`);
        setBookings(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [filters?.status]);

  const createBooking = async (data: CreateBookingRequest) => {
    const response = await api.post<Booking>('/bookings/create', data);
    return response.data;
  };

  const cancelBooking = async (bookingId: string) => {
    const response = await api.post<Booking>(`/bookings/${bookingId}/cancel`);
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'CANCELLED' } : b))
    );
    return response.data;
  };

  return { bookings, isLoading, error, createBooking, cancelBooking };
}

export function useAllBookings(page: number = 1, limit: number = 10) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        const response = await api.get<{ bookings: Booking[]; total: number }>(
          `/bookings/all?page=${page}&limit=${limit}`
        );
        setBookings(response.data.bookings);
        setTotal(response.data.total);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [page, limit]);

  return { bookings, isLoading, total };
}