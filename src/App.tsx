import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BookingProvider } from './contexts/BookingContext';
import { ErrorBoundary } from './components/shared/ErrorBoundary';
import { LoadingSpinner } from './components/shared/LoadingSpinner';
import { ProtectedRoute } from './components/shared/ProtectedRoute';

import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { RoomDetails } from './pages/RoomDetails';
import { Checkout } from './pages/Checkout';
import { Confirmation } from './pages/Confirmation';
import { Login } from './pages/Auth/Login';
import { Signup } from './pages/Auth/Signup';
import { About, Contact, Terms, Privacy } from './pages/StaticPages';
import { NotFound } from './pages/NotFound';
import { InfoPage } from './pages/InfoPage';

// Lazy loaded views for route chunking
const Trips = lazy(() => import('./pages/Dashboard/Trips').then(m => ({ default: m.Trips })));
const Saved = lazy(() => import('./pages/Dashboard/Saved').then(m => ({ default: m.Saved })));
const Profile = lazy(() => import('./pages/Dashboard/Profile').then(m => ({ default: m.Profile })));
const Notifications = lazy(() => import('./pages/Dashboard/Notifications').then(m => ({ default: m.Notifications })));
const UserPayments = lazy(() => import('./pages/Dashboard/Payments').then(m => ({ default: m.UserPayments })));

const AdminDashboard = lazy(() => import('./pages/Admin/Dashboard').then(m => ({ default: m.AdminDashboard })));
const AdminRooms = lazy(() => import('./pages/Admin/Rooms').then(m => ({ default: m.AdminRooms })));
const AdminBookings = lazy(() => import('./pages/Admin/Bookings').then(m => ({ default: m.AdminBookings })));
const AdminPayments = lazy(() => import('./pages/Admin/Payments').then(m => ({ default: m.AdminPayments })));
const AdminUsers = lazy(() => import('./pages/Admin/Users').then(m => ({ default: m.AdminUsers })));
const AdminCMS = lazy(() => import('./pages/Admin/CMS').then(m => ({ default: m.AdminCMS })));
const AdminAnalytics = lazy(() => import('./pages/Admin/Analytics').then(m => ({ default: m.AdminAnalytics })));
const AdminSettings = lazy(() => import('./pages/Admin/Settings').then(m => ({ default: m.AdminSettings })));
const AdminProfile = lazy(() => import('./pages/Admin/Profile').then(m => ({ default: m.AdminProfile })));

const BookingDetails = lazy(() => import('./pages/BookingDetails').then(m => ({ default: m.BookingDetails })));
const ReviewForm = lazy(() => import('./pages/ReviewForm').then(m => ({ default: m.ReviewForm })));
const AdminLogin = lazy(() => import('./pages/Auth/AdminLogin').then(m => ({ default: m.AdminLogin })));
const SuperAdminLogin = lazy(() => import('./pages/Auth/SuperAdminLogin').then(m => ({ default: m.SuperAdminLogin })));

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <BookingProvider>
            <Suspense fallback={
              <div className="min-h-screen bg-surface flex items-center justify-center">
                <LoadingSpinner size="lg" />
              </div>
            }>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/room/:id" element={<RoomDetails />} />
                <Route path="/checkout/:id" element={<Checkout />} />
                <Route path="/confirmation/:id" element={<Confirmation />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/superadmin/login" element={<SuperAdminLogin />} />
                <Route path="/booking/:id" element={<BookingDetails />} />
                <Route path="/room/:id/review" element={<ReviewForm />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/info/:slug" element={<InfoPage />} />
                
                {/* Auth Protected User Routes */}
                <Route path="/dashboard/trips" element={
                  <ProtectedRoute>
                    <Trips />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/saved" element={
                  <ProtectedRoute>
                    <Saved />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/notifications" element={
                  <ProtectedRoute>
                    <Notifications />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/payments" element={
                  <ProtectedRoute>
                    <UserPayments />
                  </ProtectedRoute>
                } />
                
                {/* Auth Protected Admin & Super Admin Routes */}
                <Route path="/admin/dashboard" element={
                  <ProtectedRoute requireAdmin>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin/rooms" element={
                  <ProtectedRoute requireAdmin>
                    <AdminRooms />
                  </ProtectedRoute>
                } />
                <Route path="/admin/bookings" element={
                  <ProtectedRoute requireAdmin>
                    <AdminBookings />
                  </ProtectedRoute>
                } />
                <Route path="/admin/payments" element={
                  <ProtectedRoute requireAdmin>
                    <AdminPayments />
                  </ProtectedRoute>
                } />
                <Route path="/admin/users" element={
                  <ProtectedRoute requireAdmin>
                    <AdminUsers />
                  </ProtectedRoute>
                } />
                <Route path="/admin/cms" element={
                  <ProtectedRoute requireAdmin>
                    <AdminCMS />
                  </ProtectedRoute>
                } />
                <Route path="/admin/analytics" element={
                  <ProtectedRoute requireAdmin>
                    <AdminAnalytics />
                  </ProtectedRoute>
                } />
                <Route path="/admin/settings" element={
                  <ProtectedRoute requireAdmin>
                    <AdminSettings />
                  </ProtectedRoute>
                } />
                <Route path="/admin/profile" element={
                  <ProtectedRoute requireAdmin>
                    <AdminProfile />
                  </ProtectedRoute>
                } />

                {/* 404 Fallback Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BookingProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;