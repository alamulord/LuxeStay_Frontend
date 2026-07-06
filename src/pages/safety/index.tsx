import React from 'react';
import { LegalLayout } from '../../components/shared/LegalLayout';

export function Safety() {
  return (
    <LegalLayout
      activeTab="safety"
      title="Safety Information"
      subtitle="Ensuring peace of mind and secure environments across all LuxeStay retreats."
    >
      <p>
        At LuxeStay, your safety, security, and well-being are paramount. We work alongside professional hosts, security advisors, and local emergency services to implement standards that match a five-star luxury hotel.
      </p>

      <h3 className="text-xl font-bold text-primary mt-6 mb-2">1. Secure Access & Physical Safety</h3>
      <p>
        All properties listed in the LuxeStay portfolio are vetted for physical security. We mandate:
      </p>
      <ul className="space-y-2 list-disc pl-5">
        <li>Smart electronic locks with unique, time-expiring guest entry codes.</li>
        <li>Exterior-only safety monitoring (cameras in common outside areas, fully disclosed to guests).</li>
        <li>Secured windows, structural soundproofing, and safe-deposit boxes in every master suite.</li>
      </ul>

      <h3 className="text-xl font-bold text-primary mt-6 mb-2">2. Health & Sanitation Standards</h3>
      <p>
        Before every check-in, properties undergo a comprehensive 50-point cleaning protocol led by certified professional housekeepers:
      </p>
      <ul className="space-y-2 list-disc pl-5">
        <li>Medical-grade disinfection of all high-touch surfaces, bathrooms, and kitchens.</li>
        <li>100% organic cotton linen and towel laundering at high thermal ratings.</li>
        <li>HEPA filter air purification systems active in bedrooms.</li>
      </ul>

      <h3 className="text-xl font-bold text-primary mt-6 mb-2">3. 24/7 Emergency Support</h3>
      <p>
        Every guest has direct access to the LuxeStay Emergency Concierge:
      </p>
      <ul className="space-y-2 list-disc pl-5">
        <li>A physical or virtual host on-call 24 hours a day.</li>
        <li>In-app emergency button automatically dialing local emergency services (police, fire, ambulance) and sharing your exact GPS location.</li>
        <li>Emergency first-aid, fire extinguishers, and carbon monoxide detectors inspected quarterly.</li>
      </ul>
    </LegalLayout>
  );
}
