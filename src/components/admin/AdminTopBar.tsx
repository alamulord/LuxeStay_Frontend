import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, HelpCircle, LogOut, UserCircle, ChevronDown, Globe, Activity, BookOpen, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';

interface AdminTopBarProps {
  title: string;
}

export function AdminTopBar({ title }: AdminTopBarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    if (val) {
      newParams.set('q', val);
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams);
  };

  return (
    <>
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
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2 bg-[#f2f4f6] rounded-lg text-sm w-72 outline-none focus:ring-2 focus:ring-admin-primary/30 transition-all font-medium text-[#191c1e]"
            />
          </div>

          {/* Help */}
          <button 
            onClick={() => setIsHelpOpen(true)}
            className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[#f2f4f6] transition-colors"
          >
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
                  className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-[#191c1e] hover:bg-[#f2f4f6] transition-colors font-medium"
                >
                  <UserCircle className="w-4 h-4 text-[#464555]" />
                  View Profile
                </button>
                <div className="border-t border-[#f2f4f6] my-1" />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-error hover:bg-red-50 transition-colors font-semibold"
                >
                  <LogOut className="w-4 h-4" />
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Glassmorphic Help & Support Modal */}
      {isHelpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#000]/30 backdrop-blur-sm" onClick={() => setIsHelpOpen(false)} />
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative border border-[#f2f4f6] z-10 font-body text-left">
            
            {/* Header */}
            <div className="px-8 py-5 border-b border-[#f2f4f6] flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-5 h-5 text-admin-primary" />
                <h3 className="font-headline font-bold text-[#191c1e] text-base">LuxeStay Operations Guide</h3>
              </div>
              <button 
                onClick={() => setIsHelpOpen(false)}
                className="w-8 h-8 rounded-full bg-white border flex items-center justify-center hover:bg-[#f2f4f6] transition-all"
              >
                <X className="w-4 h-4 text-[#464555]" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6 max-h-[500px] overflow-y-auto">
              
              {/* Live Status Indicators */}
              <div className="bg-[#f2f4f6] p-5 rounded-2xl space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-[#464555] flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-emerald-500" /> Operational System Status
                </h4>
                <div className="grid grid-cols-3 gap-4 text-xs font-semibold pt-1">
                  <div className="bg-white px-4 py-3 rounded-xl border flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span>API Service</span>
                  </div>
                  <div className="bg-white px-4 py-3 rounded-xl border flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span>Database</span>
                  </div>
                  <div className="bg-white px-4 py-3 rounded-xl border flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span>Stripe CDN</span>
                  </div>
                </div>
              </div>

              {/* Guide Topics */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-[#464555] flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-admin-primary" /> Quick Help Topics
                </h4>
                <div className="space-y-3">
                  <div className="border border-[#f2f4f6] p-4 rounded-xl space-y-1">
                    <h5 className="font-bold text-sm text-[#191c1e]">Confirming & Managing Bookings</h5>
                    <p className="text-xs text-[#464555] font-light leading-relaxed">
                      Staff can confirm or reject pending guest bookings under the Bookings tab. Updating booking statuses automatically generates system alerts and sends confirmation emails to the registered guests.
                    </p>
                  </div>

                  <div className="border border-[#f2f4f6] p-4 rounded-xl space-y-1">
                    <h5 className="font-bold text-sm text-[#191c1e]">AI Suggestion Engine</h5>
                    <p className="text-xs text-[#464555] font-light leading-relaxed">
                      The AI model identifies revenue, listing quality, and capacity leaks. Clicking "Apply Optimization" lets the AI execute code fixes or routes the administrator directly to the target configuration page.
                    </p>
                  </div>

                  <div className="border border-[#f2f4f6] p-4 rounded-xl space-y-1">
                    <h5 className="font-bold text-sm text-[#191c1e]">Global Console Search</h5>
                    <p className="text-xs text-[#464555] font-light leading-relaxed">
                      Use the top global search bar on any dashboard view. It updates the URL query parameters immediately, filtering rooms, payments, bookings, and audit records instantly.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer Support */}
            <div className="bg-slate-50 border-t border-[#f2f4f6] px-8 py-4 flex items-center justify-between text-xs">
              <span className="text-[#464555] font-medium">Developer Hotline: support@luxestay.internal</span>
              <span className="text-slate-400 font-bold">v2.4.0-prod</span>
            </div>

          </div>
        </div>
      )}
    </>
  );
}