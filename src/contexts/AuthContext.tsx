import React, { createContext, useContext, useEffect, useRef, ReactNode } from 'react';
import { useAuthStore } from '../store/authStore';
import { useWishlistStore } from '../store/wishlistStore';

import { User } from '../types/user.types';

interface AuthContextType {
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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/** Session refresh interval — 90 seconds (between 1–2 min as requested) */
const SESSION_REFRESH_INTERVAL_MS = 90_000;

export function AuthProvider({ children }: { children: ReactNode }) {
  const {
    user, token, isAuthenticated, isLoading,
    login, register, logout, fetchProfile, refreshSession, updateProfile,
  } = useAuthStore();
  const fetchWishlist = useWishlistStore((state) => state.fetchWishlist);
  const refreshIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // On mount, if we have a token but no user, hydrate profile
  useEffect(() => {
    if (token && !user) {
      fetchProfile();
    }
  }, [token, user, fetchProfile]);

  const hasRefreshedRef = useRef(false);

  // Fetch wishlist when user authenticates
  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist();
    }
  }, [isAuthenticated, fetchWishlist]);

  // ── Silent session refresh every 90 seconds ──
  useEffect(() => {
    // Clear any existing interval
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
      refreshIntervalRef.current = null;
    }

    if (isAuthenticated) {
      // Perform an immediate refresh only once on initial authentication/mount
      if (!hasRefreshedRef.current) {
        hasRefreshedRef.current = true;
        refreshSession();
      }

      // Set up recurring refresh
      refreshIntervalRef.current = setInterval(() => {
        refreshSession();
      }, SESSION_REFRESH_INTERVAL_MS);
    } else {
      hasRefreshedRef.current = false;
    }

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
        refreshIntervalRef.current = null;
      }
    };
  }, [isAuthenticated, refreshSession]);

  // ── Inactivity Auto Logout after 10 minutes ──
  useEffect(() => {
    if (!isAuthenticated) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        console.log('User inactive for 10 minutes. Logging out...');
        logout();
      }, 10 * 60 * 1000); // 10 minutes of inactivity
    };

    // Initialize timer on load/auth
    resetTimer();

    // Listen to all interaction events
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    events.forEach(event => {
      window.addEventListener(event, resetTimer);
    });

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      events.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [isAuthenticated, logout]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        fetchProfile,
        updateProfile,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}