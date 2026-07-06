import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Heart, Bell, CreditCard, Settings, LogOut } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../contexts/AuthContext';

const menuItems = [
  { path: '/dashboard/trips', label: 'Trips', icon: User },
  { path: '/dashboard/saved', label: 'Saved', icon: Heart },
  { path: '/dashboard/notifications', label: 'Notifications', icon: Bell },
  { path: '/dashboard/payments', label: 'Payments', icon: CreditCard },
  { path: '/dashboard/profile', label: 'Profile', icon: Settings },
];

export function DashboardSidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/10">
      <div className="flex items-center gap-3 p-3 bg-surface rounded-xl border border-outline-variant/10 mb-6">
        {user?.avatar ? (
          <img 
            src={user.avatar} 
            alt="Profile avatar" 
            className="w-10 h-10 rounded-full object-cover border shrink-0 bg-slate-50"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-[#ba0036] flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-sm">
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </div>
        )}
        <div className="min-w-0">
          <p className="font-bold text-sm text-[#1a1c1c] truncate">{user?.firstName} {user?.lastName}</p>
          <p className="text-[10px] text-[#ba0036] font-bold uppercase tracking-wider mt-0.5">Premium Member</p>
        </div>
      </div>

      <nav className="space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-4 py-2 rounded-md transition-colors",
              location.pathname === item.path
                ? "bg-primary/10 text-primary font-medium"
                : "text-on_surface_variant hover:bg-surface-container-low"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <button
        onClick={logout}
        className="flex items-center gap-3 w-full px-4 py-2 mt-4 rounded-md text-red-500 hover:bg-red-50 transition-colors"
      >
        <LogOut className="w-5 h-5" />
        <span>Log out</span>
      </button>
    </div>
  );
}