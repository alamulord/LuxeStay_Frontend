import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../lib/api';
import { Room } from '../types/room.types';

interface WishlistState {
  items: Room[];
  isLoading: boolean;
  fetchWishlist: () => Promise<void>;
  addToWishlist: (room: Room) => void;
  removeFromWishlist: (roomId: string) => void;
  toggleWishlist: (room: Room) => Promise<void>;
  isInWishlist: (roomId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,

      fetchWishlist: async () => {
        set({ isLoading: true });
        try {
          const response = await api.get<Room[]>('/wishlist');
          set({ items: response.data, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
        }
      },

      addToWishlist: (room: Room) => {
        set((state) => ({
          items: [...state.items, room],
        }));
      },

      removeFromWishlist: (roomId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== roomId),
        }));
      },

      toggleWishlist: async (room: Room) => {
        try {
          const response = await api.post<{ isAdded: boolean; roomId: string }>('/wishlist/toggle', { roomId: room.id });
          const { isAdded } = response.data;
          set((state) => {
            if (isAdded) {
              return { items: [...state.items.filter(item => item.id !== room.id), room] };
            } else {
              return { items: state.items.filter((item) => item.id !== room.id) };
            }
          });
        } catch (error) {
          // Fallback to local toggle if not logged in / network error
          const { isInWishlist, addToWishlist, removeFromWishlist } = get();
          if (isInWishlist(room.id)) {
            removeFromWishlist(room.id);
          } else {
            addToWishlist(room);
          }
        }
      },

      isInWishlist: (roomId: string) => {
        return get().items.some((item) => item.id === roomId);
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
);