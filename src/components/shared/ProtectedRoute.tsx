import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LoadingSpinner } from './LoadingSpinner';
import { Laptop } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireSuperAdmin?: boolean;
}

function SmallScreenBlock() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-white font-body text-left">
      <div className="max-w-md bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6 flex flex-col items-center">
        <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-2xl flex items-center justify-center animate-pulse">
          <Laptop className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-bold font-headline">Desktop Screen Required</h1>
          <p className="text-slate-400 text-xs leading-relaxed">
            To ensure complete operational visibility, administrative audit compliance, and platform operations security, the LuxeStay Admin Console requires a screen resolution of <strong>1024px</strong> or wider.
          </p>
        </div>
        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
          Please access this console on a desktop computer.
        </p>
      </div>
    </div>
  );
}

export function ProtectedRoute({
  children,
  requireAdmin = false,
  requireSuperAdmin = false,
}: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const isCmsOrAdminRoute = requireAdmin || requireSuperAdmin;
  if (isCmsOrAdminRoute && isSmallScreen) {
    return <SmallScreenBlock />;
  }

  if (!isAuthenticated) {
    // If attempting to access admin/superadmin, redirect to admin login
    const isAdminPath = location.pathname.startsWith('/admin') || location.pathname.startsWith('/superadmin');
    const redirectPath = isAdminPath ? '/admin/login' : '/login';
    return <Navigate to={`${redirectPath}?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  if (requireSuperAdmin && user?.role !== 'SUPER_ADMIN') {
    // Super admins can access everything, admins can go to admin dashboard but not super admin page
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (requireAdmin && user?.role !== 'ADMIN' && user?.role !== 'SUPER_ADMIN') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
