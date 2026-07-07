import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, AuthResponse } from '../types/user.types';
import api from '../lib/api';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; password: string; firstName: string; lastName: string; phone?: string }) => Promise<void>;
  logout: () => void;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: { firstName: string; lastName: string; phone?: string; dateOfBirth?: string; avatar?: string }) => Promise<void>;
  refreshSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const response = await api.post<AuthResponse>('/auth/login', { email, password });
          const { user, token } = response.data;
          localStorage.setItem('token', token);
          set({ user, token, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (data: { email: string; password: string; firstName: string; lastName: string; phone?: string }) => {
        set({ isLoading: true });
        try {
          const response = await api.post<AuthResponse>('/auth/register', data);
          const { user, token } = response.data;
          localStorage.setItem('token', token);
          set({ user, token, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, isAuthenticated: false });
      },

      fetchProfile: async () => {
        if (!get().user) {
          set({ isLoading: true });
        }
        try {
          const response = await api.get<User>('/auth/profile');
          set({ user: response.data, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
        }
      },

      updateProfile: async (data: { firstName: string; lastName: string; phone?: string; dateOfBirth?: string; avatar?: string }) => {
        set({ isLoading: true });
        try {
          const response = await api.put<User>('/auth/profile', data);
          set({ user: response.data, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      /**
       * Silently refresh the session by calling POST /auth/refresh.
       * On success, updates token + user in store and localStorage.
       * On failure (e.g. deactivated account), logs the user out.
       */
      refreshSession: async () => {
        const state = get();
        if (!state.token || !state.isAuthenticated) return;

        try {
          const response = await api.post<AuthResponse>('/auth/refresh');
          const { user, token } = response.data;
          localStorage.setItem('token', token);
          set({ user, token, isAuthenticated: true });
        } catch {
          // If refresh fails (401/403), force logout
          get().logout();
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token, user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);