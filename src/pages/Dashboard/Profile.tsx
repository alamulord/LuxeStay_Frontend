import React from 'react';
import { Navbar } from '../../components/shared/Navbar';
import { Footer } from '../../components/shared/Footer';
import { DashboardSidebar } from '../../components/dashboard/DashboardSidebar';
import { AccountOverviewPanel } from '../../components/dashboard/AccountOverviewPanel';
import { ReferralCard } from '../../components/dashboard/ReferralCard';

export function Profile() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <main className="pt-20 px-4">
        <div className="max-w-7xl mx-auto py-8">
          <h1 className="font-plus text-3xl font-bold mb-8">Profile</h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <DashboardSidebar />
            </div>

            <div className="lg:col-span-3 space-y-6">
              <AccountOverviewPanel />
              <ReferralCard />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}