import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Bed, Calendar, CreditCard, Users, FileText, BarChart3, Settings, LogOut, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../contexts/AuthContext';

const menuItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: Home },
  { path: '/admin/rooms', label: 'Rooms', icon: Bed },
  { path: '/admin/bookings', label: 'Bookings', icon: Calendar },
  { path: '/admin/payments', label: 'Payments', icon: CreditCard },
  { path: '/admin/users', label: 'Users', icon: Users },
  { path: '/admin/cms', label: 'CMS', icon: FileText },
  { path: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const initials = user
    ? `${(user.firstName || '')[0] || ''}${(user.lastName || '')[0] || ''}`.toUpperCase()
    : 'A';

  const displayName = user
    ? `${user.firstName || ''} ${user.lastName || ''}`.trim()
    : 'Admin';

  const roleBadge = user?.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin';

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[260px] bg-white flex flex-col z-40 shadow-ambient">
      {/* Brand */}
      <div className="px-6 pt-7 pb-5">
        <Link to="/admin/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-admin-primary to-admin-primary-container flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </div>
          <div>
            <span className="font-headline text-lg font-bold tracking-tight text-[#191c1e] block leading-tight">LuxeStay</span>
            <span className="text-[9px] uppercase tracking-[0.15em] font-bold text-[#464555]">Administrative Panel</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto py-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-admin-primary/10 text-admin-primary"
                  : "text-[#464555] hover:bg-[#f2f4f6]"
              )}
            >
              <item.icon className={cn("w-[18px] h-[18px]", isActive && "text-admin-primary")} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Add Room CTA */}
      <div className="px-4 pb-3">
        <Link
          to="/admin/rooms"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-gradient-to-r from-admin-primary to-admin-primary-container text-white text-sm font-semibold transition-all duration-200 hover:opacity-90"
        >
          <Plus className="w-4 h-4" />
          Add Room
        </Link>
      </div>

      {/* Profile + Logout */}
      <div className="border-t border-[#f2f4f6] px-4 py-4 space-y-1">
        <Link
          to="/admin/profile"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
            location.pathname === '/admin/profile'
              ? "bg-admin-primary/10 text-admin-primary"
              : "text-[#464555] hover:bg-[#f2f4f6]"
          )}
        >
          <div className="w-8 h-8 rounded-full bg-admin-primary/15 flex items-center justify-center text-admin-primary text-xs font-bold flex-shrink-0">
            {initials}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium truncate">{displayName}</span>
            <span className="text-[10px] text-[#464555]/70">{roleBadge}</span>
          </div>
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#464555] hover:bg-red-50 hover:text-error transition-colors w-full"
        >
          <LogOut className="w-[18px] h-[18px]" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}