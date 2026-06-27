import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LoadingSpinner } from './LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireSuperAdmin?: boolean;
}

export function ProtectedRoute({
  children,
  requireAdmin = false,
  requireSuperAdmin = false,
}: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
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
