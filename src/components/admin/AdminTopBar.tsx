import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, HelpCircle, LogOut, UserCircle, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

interface AdminTopBarProps {
  title: string;
}

export function AdminTopBar({ title }: AdminTopBarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const initials = user
    ? `${(user.firstName || '')[0] || ''}${(user.lastName || '')[0] || ''}`.toUpperCase()
    : 'A';

  const displayName = user
    ? `${user.firstName || ''} ${user.lastName || ''}`.trim()
    : 'Admin';

  const roleBadge = user?.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header className="h-16 bg-white flex items-center justify-between px-8 shadow-ambient">
      {/* Left — Title */}
      <h1 className="font-headline text-xl font-bold text-[#191c1e]">{title}</h1>

      {/* Right — Search, Notifications, Profile */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden lg:block">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#464555]" />
          <input
            type="text"
            placeholder="Search rooms, bookings..."
            className="pl-10 pr-4 py-2 bg-[#f2f4f6] rounded-lg text-sm w-72 outline-none focus:ring-2 focus:ring-admin-primary/30 transition-all"
          />
        </div>

        {/* Help */}
        <button className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[#f2f4f6] transition-colors">
          <HelpCircle className="w-[18px] h-[18px] text-[#464555]" />
        </button>

        {/* Notifications */}
        <button className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[#f2f4f6] transition-colors relative">
          <Bell className="w-[18px] h-[18px] text-[#464555]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full" />
        </button>

        {/* Divider */}
        <div className="w-px h-8 bg-[#f2f4f6]" />

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2.5 hover:bg-[#f2f4f6] rounded-lg px-2.5 py-1.5 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-admin-primary/10 flex items-center justify-center text-admin-primary text-xs font-bold">
              {initials}
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-sm font-medium text-[#191c1e] leading-tight">{displayName}</span>
              <span className="text-[10px] text-[#464555]/70 leading-tight">{roleBadge}</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-[#464555] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-ambient-lg py-1.5 z-50">
              <button
                onClick={() => { navigate('/admin/profile'); setIsDropdownOpen(false); }}
                className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-[#191c1e] hover:bg-[#f2f4f6] transition-colors"
              >
                <UserCircle className="w-4 h-4 text-[#464555]" />
                View Profile
              </button>
              <div className="border-t border-[#f2f4f6] my-1" />
              <button
                onClick={handleLogout}
                className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-error hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}