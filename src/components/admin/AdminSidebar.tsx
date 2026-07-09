import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, Bed, Calendar, CreditCard, Users, FileText, 
  BarChart3, Settings, LogOut, Plus, ChevronLeft, ChevronRight, Shield
} from 'lucide-react';
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
  { path: '/admin/activities', label: 'Activity Log', icon: Shield },
  { path: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem('admin_sidebar_collapsed') === 'true';
  });

  useEffect(() => {
    if (isCollapsed) {
      document.documentElement.classList.add('sidebar-collapsed');
    } else {
      document.documentElement.classList.remove('sidebar-collapsed');
    }
  }, [isCollapsed]);

  const handleToggle = () => {
    setIsCollapsed(prev => {
      const next = !prev;
      localStorage.setItem('admin_sidebar_collapsed', String(next));
      return next;
    });
  };

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
    <aside 
      className={cn(
        "fixed left-0 top-0 bottom-0 bg-white flex flex-col z-40 shadow-ambient border-r border-[#f2f4f6] transition-all duration-300 select-none",
        isCollapsed ? "w-[70px]" : "w-[260px]"
      )}
    >
      {/* Floating Collapse Toggle Button */}
      <button 
        onClick={handleToggle}
        className="absolute top-7 -right-3 z-50 w-6 h-6 rounded-full bg-white border border-[#f2f4f6] shadow-md flex items-center justify-center text-admin-primary hover:bg-[#f2f4f6] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
      </button>

      {/* Brand */}
      <div className={cn("pt-7 pb-5 transition-all duration-300", isCollapsed ? "px-4" : "px-6")}>
        <Link to="/admin/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-admin-primary to-admin-primary-container flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </div>
          {!isCollapsed && (
            <div className="animate-in fade-in duration-300">
              <span className="font-headline text-sm font-black tracking-tight text-[#191c1e] block leading-tight">LuxeStay</span>
              <span className="text-[8px] uppercase tracking-[0.1em] font-bold text-[#464555]">Administrative Panel</span>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto py-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 relative group",
                isActive
                  ? "bg-admin-primary/10 text-admin-primary"
                  : "text-[#464555] hover:bg-[#f2f4f6]"
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <item.icon className={cn("w-4 h-4 flex-shrink-0", isActive && "text-admin-primary")} />
              {!isCollapsed && (
                <span className="animate-in fade-in duration-300">{item.label}</span>
              )}
              
              {isCollapsed && (
                <span className="absolute left-14 top-1/2 -translate-y-1/2 z-50 bg-black/85 backdrop-blur-md text-white font-headline text-[9px] font-bold tracking-wider uppercase px-2.5 py-1.5 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Add Room CTA */}
      <div className={cn("pb-4 transition-all duration-300", isCollapsed ? "px-2" : "px-4")}>
        <Link
          to="/admin/rooms"
          className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-gradient-to-r from-admin-primary to-admin-primary-container text-white text-xs font-semibold transition-all duration-200 hover:opacity-90"
          title={isCollapsed ? "Add Room" : undefined}
        >
          <Plus className="w-4 h-4 flex-shrink-0" />
          {!isCollapsed && (
            <span className="animate-in fade-in duration-300">Add Room</span>
          )}
        </Link>
      </div>

      {/* Profile + Logout */}
      <div className="border-t border-[#f2f4f6] px-3 py-3 space-y-1">
        <Link
          to="/admin/profile"
          className={cn(
            "flex items-center gap-2.5 px-2 py-1.5 rounded-lg transition-colors group relative",
            location.pathname === '/admin/profile'
              ? "bg-admin-primary/10 text-admin-primary"
              : "text-[#464555] hover:bg-[#f2f4f6]"
          )}
          title={isCollapsed ? "Admin Profile" : undefined}
        >
          <div className="w-7 h-7 rounded-full bg-admin-primary/15 flex items-center justify-center text-admin-primary text-[10px] font-bold flex-shrink-0">
            {initials}
          </div>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0 animate-in fade-in duration-300">
              <span className="text-xs font-semibold truncate leading-none mb-0.5">{displayName}</span>
              <span className="text-[9px] text-[#464555]/70 leading-none">{roleBadge}</span>
            </div>
          )}
          
          {isCollapsed && (
            <span className="absolute left-14 top-1/2 -translate-y-1/2 z-50 bg-black/85 backdrop-blur-md text-white font-headline text-[9px] font-bold tracking-wider uppercase px-2.5 py-1.5 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              Profile: {displayName}
            </span>
          )}
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-xs font-semibold text-[#464555] hover:bg-red-50 hover:text-error transition-colors w-full group relative cursor-pointer"
          title={isCollapsed ? "Log Out" : undefined}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!isCollapsed && (
            <span className="animate-in fade-in duration-300">Log out</span>
          )}
          
          {isCollapsed && (
            <span className="absolute left-14 top-1/2 -translate-y-1/2 z-50 bg-black/85 backdrop-blur-md text-white font-headline text-[9px] font-bold tracking-wider uppercase px-2.5 py-1.5 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              Log Out
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}