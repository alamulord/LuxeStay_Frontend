import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/shared/Navbar';
import { Footer } from '../../components/shared/Footer';
import { DashboardSidebar } from '../../components/dashboard/DashboardSidebar';
import { PropertyCard } from '../../components/search/PropertyCard';
import { useWishlistStore } from '../../store/wishlistStore';

export function Saved() {
  const { items } = useWishlistStore();

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <main className="pt-20 px-4">
        <div className="max-w-7xl mx-auto py-8">
          <h1 className="font-plus text-3xl font-bold mb-8">Saved homes</h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <DashboardSidebar />
            </div>

            <div className="lg:col-span-3">
              {items.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map(room => (
                    <PropertyCard key={room.id} room={room} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-surface-container-lowest rounded-lg">
                  <p className="text-on_surface_variant mb-4">No saved homes yet</p>
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