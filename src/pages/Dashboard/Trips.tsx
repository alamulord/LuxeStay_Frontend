import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/shared/Navbar';
import { Footer } from '../../components/shared/Footer';
import { DashboardSidebar } from '../../components/dashboard/DashboardSidebar';
import { UpcomingStayCard } from '../../components/dashboard/UpcomingStayCard';
import { PastStayCard } from '../../components/dashboard/PastStayCard';
import { ReferralCard } from '../../components/dashboard/ReferralCard';
import { useBookings } from '../../hooks/useBookings';

export function Trips() {
  const { bookings, isLoading } = useBookings();

  const upcomingBookings = bookings.filter(b => 
    new Date(b.checkInDate) > new Date() && b.status !== 'CANCELLED'
  );
  const pastBookings = bookings.filter(b => 
    new Date(b.checkInDate) <= new Date() || b.status === 'COMPLETED'
  );

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <main className="pt-20 px-4">
        <div className="max-w-7xl mx-auto py-8">
          <h1 className="font-plus text-3xl font-bold mb-8">Your trips</h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <DashboardSidebar />
            </div>

            <div className="lg:col-span-3 space-y-8">
              {upcomingBookings.length > 0 && (
                <section>
                  <h2 className="font-semibold text-xl mb-4">Upcoming trips</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {upcomingBookings.map(booking => (
                      <UpcomingStayCard key={booking.id} booking={booking} />
                    ))}
                  </div>
                </section>
              )}

              {pastBookings.length > 0 && (
                <section>
                  <h2 className="font-semibold text-xl mb-4">Past trips</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pastBookings.map(booking => (
                      <PastStayCard key={booking.id} booking={booking} />
                    ))}
                  </div>
                </section>
              )}

              {bookings.length === 0 && !isLoading && (
                <div className="text-center py-16 bg-surface-container-lowest rounded-lg">
                  <p className="text-on_surface_variant mb-4">No trips yet</p>
                  <Link to="/search" className="btn-primary">
                    Start exploring
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}