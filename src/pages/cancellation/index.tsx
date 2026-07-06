import React from 'react';
import { LegalLayout } from '../../components/shared/LegalLayout';

export function Cancellation() {
  return (
    <LegalLayout
      activeTab="cancellation"
      title="Cancellation Options"
      subtitle="Transparent booking flexibility and refund terms tailored to your luxury stay."
    >
      <p>
        LuxeStay offers clear, standardized cancellation policies to accommodate changing travel plans while respecting the schedule of our curators and hosts.
      </p>

      <h3 className="text-xl font-bold text-primary mt-6 mb-2">1. Cancellation Tiers</h3>
      <p>
        Each property detail page and booking checkout panel clearly indicates which of the following three policies applies to the reservation:
      </p>

      <div className="space-y-4 my-6">
        <div className="bg-surface-container p-5 rounded-xl border-l-4 border-primary">
          <span className="font-bold block text-sm mb-1 text-on-surface">Flexible (Concierge Tier)</span>
          <p className="text-xs">Full refund for cancellations made up to 48 hours prior to local check-in time. Cancellations within 48 hours receive a 50% refund minus the first night charge.</p>
        </div>
        <div className="bg-surface-container p-5 rounded-xl border-l-4 border-secondary">
          <span className="font-bold block text-sm mb-1 text-on-surface">Moderate (Portfolio Tier)</span>
          <p className="text-xs">Full refund for cancellations made up to 7 days prior to check-in. Cancellations made between 7 days and 48 hours receive a 50% refund. No refunds are available within 48 hours of check-in.</p>
        </div>
        <div className="bg-surface-container p-5 rounded-xl border-l-4 border-outline">
          <span className="font-bold block text-sm mb-1 text-on-surface">Strict (Estate Tier)</span>
          <p className="text-xs">Full refund only for cancellations made within 48 hours of booking, provided the check-in is at least 14 days away. 50% refund for cancellations up to 14 days before check-in. No refunds within 14 days.</p>
        </div>
      </div>

      <h3 className="text-xl font-bold text-primary mt-6 mb-2">2. Extenuating Circumstances</h3>
      <p>
        In rare situations where unexpected events prevent a booking from being completed (such as localized natural disasters, government-mandated travel restrictions, or severe medical emergencies), LuxeStay will override standard policies to issue travel credits or full cash refunds upon verification.
      </p>
    </LegalLayout>
  );
}
