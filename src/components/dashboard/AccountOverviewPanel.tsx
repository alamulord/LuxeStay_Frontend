import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

export function AccountOverviewPanel() {
  const { user } = useAuth();

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'N/A';

  return (
    <div className="bg-surface-container-lowest rounded-lg p-6">
      <h2 className="font-semibold text-xl mb-4">Account overview</h2>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-on_surface_variant">First name</label>
          <p className="font-medium">{user?.firstName}</p>
        </div>

        <div>
          <label className="text-sm text-on_surface_variant">Last name</label>
          <p className="font-medium">{user?.lastName}</p>
        </div>

        <div>
          <label className="text-sm text-on_surface_variant">Email</label>
          <p className="font-medium">{user?.email}</p>
        </div>

        <div>
          <label className="text-sm text-on_surface_variant">Phone</label>
          <p className="font-medium">{user?.phone || 'Not set'}</p>
        </div>

        <div>
          <label className="text-sm text-on_surface_variant">Member since</label>
          <p className="font-medium">{memberSince}</p>
        </div>
      </div>
    </div>
  );
}