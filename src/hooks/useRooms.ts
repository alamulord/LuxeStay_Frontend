import { useState, useEffect } from 'react';
import api from '../lib/api';
import { Room, RoomFilters } from '../types/room.types';

export function useRooms(filters: RoomFilters = {}) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filterString = JSON.stringify(filters);

  useEffect(() => {
    const fetchRooms = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (filters.location) params.append('location', filters.location);
        if (filters.guests) params.append('guests', filters.guests.toString());
        if (filters.bedrooms) params.append('bedrooms', filters.bedrooms.toString());
        if (filters.priceMin) params.append('priceMin', filters.priceMin.toString());
        if (filters.priceMax) params.append('priceMax', filters.priceMax.toString());
        if (filters.sortBy) params.append('sortBy', filters.sortBy);
        if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
        if (filters.isFeatured !== undefined) params.append('isFeatured', filters.isFeatured.toString());
        if (filters.amenities && filters.amenities.length > 0) {
          params.append('amenities', filters.amenities.join(','));
        }

        const response = await api.get<Room[]>(`/rooms?${params.toString()}`);
        setRooms(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, [filterString]);

  return { rooms, isLoading, error };
}

export function useFeaturedRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await api.get<Room[]>('/rooms/featured');
        setRooms(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return { rooms, isLoading };
}

const roomCache: Record<string, Room> = {};

export const prefetchRoom = async (id: string) => {
  if (!id || roomCache[id]) return;
  try {
    const response = await api.get<Room>(`/rooms/${id}`);
    roomCache[id] = response.data;
  } catch (err) {
    console.error('Failed to prefetch room details in background', err);
  }
};

export function useRoom(id: string) {
  const [room, setRoom] = useState<Room | null>(() => roomCache[id] || null);
  const [isLoading, setIsLoading] = useState(!roomCache[id]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoom = async () => {
      // Only set loading if we don't have cached data yet
      if (!roomCache[id]) {
        setIsLoading(true);
      }
      try {
        const response = await api.get<Room>(`/rooms/${id}`);
        roomCache[id] = response.data;
        setRoom(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchRoom();
    }
  }, [id]);

  return { room, isLoading, error };
}