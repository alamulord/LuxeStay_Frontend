import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, User, Heart, Globe, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useUIStore } from '../../store/uiStore';

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { toggleMobileMenu, isMobileMenuOpen, closeMobileMenu } = useUIStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const isHome = location.pathname === '/';

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel">
        <div className="max-w-page mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo + Brand */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
              <span className="font-headline text-xl font-bold tracking-tight text-[#1a1c1c]">
                LuxeStay
              </span>
            </Link>

            {/* Center Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                to="/info/immersive-experiences"
                className="text-sm font-medium text-[#1a1c1c] hover:text-primary transition-colors duration-200"
              >
                Experiences
              </Link>
              <Link
                to="/info/support-safety"
                className="text-sm font-medium text-[#1a1c1c] hover:text-primary transition-colors duration-200"
              >
                Concierge
              </Link>
              <Link
                to="/info/about-our-vision"
                className="text-sm font-medium text-[#1a1c1c] hover:text-primary transition-colors duration-200"
              >
                About
              </Link>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard/saved"
                    className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-surface-container-low transition-colors"
                  >
                    <Heart className="w-[18px] h-[18px] text-[#1a1c1c]" />
                  </Link>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 pl-3 pr-1 py-1 rounded-full border border-outline-variant/20 hover:shadow-ambient transition-all duration-200"
                  >
                    <Menu className="w-4 h-4 text-[#5c3f41]" />
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-semibold">
                      {user?.firstName?.[0]?.toUpperCase() || 'U'}
                    </div>
                  </button>

                  {/* User Dropdown */}
                  {showUserMenu && (
                    <div
                      className="absolute right-6 top-16 w-56 bg-surface-container-lowest rounded-xl shadow-ambient-lg py-2 z-50"
                      onMouseLeave={() => setShowUserMenu(false)}
                    >
                      <div className="px-4 py-3 border-b border-outline-variant/10">
                        <p className="text-sm font-semibold text-[#1a1c1c]">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-xs text-[#5c3f41] mt-0.5">{user?.email}</p>
                      </div>
                      <Link
                        to="/dashboard/trips"
                        className="block px-4 py-2.5 text-sm text-[#1a1c1c] hover:bg-surface-container-low transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        My Trips
                      </Link>
                      <Link
                        to="/dashboard/saved"
                        className="block px-4 py-2.5 text-sm text-[#1a1c1c] hover:bg-surface-container-low transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Saved
                      </Link>
                      <Link
                        to="/dashboard/profile"
                        className="block px-4 py-2.5 text-sm text-[#1a1c1c] hover:bg-surface-container-low transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Profile
                      </Link>
                      <div className="border-t border-outline-variant/10 mt-1 pt-1">
                        <button
                          onClick={() => {
                            logout();
                            setShowUserMenu(false);
                            navigate('/');
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm text-primary hover:bg-surface-container-low transition-colors"
                        >
                          Log out
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate('/login')}
                    className="hidden md:block text-sm font-medium text-[#1a1c1c] px-4 py-2 hover:bg-surface-container-low rounded-full transition-colors"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => navigate('/signup')}
                    className="hidden md:block text-sm font-medium text-white bg-primary px-5 py-2.5 rounded-full hover:bg-primary-container transition-colors btn-hover"
                  >
                    Sign up
                  </button>
                  <button
                    onClick={toggleMobileMenu}
                    className="flex md:hidden items-center gap-2 pl-3 pr-1 py-1 rounded-full border border-outline-variant/20"
                  >
                    <Menu className="w-4 h-4 text-[#5c3f41]" />
                    <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center">
                      <User className="w-4 h-4 text-[#5c3f41]" />
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={closeMobileMenu} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-surface-container-lowest shadow-ambient-lg p-6">
            <div className="flex justify-end mb-8">
              <button onClick={closeMobileMenu}>
                <X className="w-6 h-6 text-[#1a1c1c]" />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {!isAuthenticated ? (
                <>
                  <button
                    onClick={() => { navigate('/login'); closeMobileMenu(); }}
                    className="w-full text-left px-4 py-3 text-sm font-medium text-[#1a1c1c] hover:bg-surface-container-low rounded-lg transition-colors"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => { navigate('/signup'); closeMobileMenu(); }}
                    className="w-full btn-primary-gradient text-center py-3 rounded-full text-sm"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  <Link to="/dashboard/trips" className="px-4 py-3 text-sm font-medium hover:bg-surface-container-low rounded-lg" onClick={closeMobileMenu}>My Trips</Link>
                  <Link to="/dashboard/saved" className="px-4 py-3 text-sm font-medium hover:bg-surface-container-low rounded-lg" onClick={closeMobileMenu}>Saved</Link>
                  <Link to="/dashboard/profile" className="px-4 py-3 text-sm font-medium hover:bg-surface-container-low rounded-lg" onClick={closeMobileMenu}>Profile</Link>
                </>
              )}
              <div className="border-t border-outline-variant/10 pt-4 mt-2">
                <Link to="/info/immersive-experiences" className="block px-4 py-3 text-sm hover:bg-surface-container-low rounded-lg" onClick={closeMobileMenu}>Experiences</Link>
                <Link to="/info/support-safety" className="block px-4 py-3 text-sm hover:bg-surface-container-low rounded-lg" onClick={closeMobileMenu}>Concierge</Link>
                <Link to="/info/about-our-vision" className="block px-4 py-3 text-sm hover:bg-surface-container-low rounded-lg" onClick={closeMobileMenu}>About</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}