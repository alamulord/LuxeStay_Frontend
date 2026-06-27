import { create } from 'zustand';

interface UIState {
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;
  isDarkMode: boolean;
  toggleSearch: () => void;
  toggleMobileMenu: () => void;
  toggleDarkMode: () => void;
  closeSearch: () => void;
  closeMobileMenu: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSearchOpen: false,
  isMobileMenuOpen: false,
  isDarkMode: false,

  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  closeSearch: () => set({ isSearchOpen: false }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
}));