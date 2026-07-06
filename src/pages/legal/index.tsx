import React from 'react';
import { LegalLayout } from '../../components/shared/LegalLayout';

export function Legal() {
  return (
    <LegalLayout
      activeTab="legal"
      title="Legal Disclosures"
      subtitle="Corporate credentials, regulatory compliance, and fair housing declarations."
    >
      <p>
        LuxeStay operates under strict adherence to local, national, and international hospitality laws. We ensure transparency in all business dealings and booking facilitations.
      </p>

      <h3 className="text-xl font-bold text-primary mt-6 mb-2">1. Corporate Registry</h3>
      <p>
        LuxeStay and LuxeStay.com are registered trademarks of LuxeStay Inc., a corporation registered in the State of Delaware, USA. All financial transactions are secured and processed through regulated merchant accounts under compliant SSL encryption protocols.
      </p>

      <h3 className="text-xl font-bold text-primary mt-6 mb-2">2. Non-Discrimination & Fair Housing</h3>
      <p>
        LuxeStay is committed to a community built on the principles of universal belonging and mutual respect:
      </p>
      <ul className="space-y-2 list-disc pl-5">
        <li>Our hosts must comply with all local laws relating to Fair Housing and public accommodations.</li>
        <li>We prohibit discrimination based on race, color, religion, sex, national origin, familial status, disability, sexual orientation, or gender identity.</li>
        <li>Failure to adhere to these standards results in immediate removal from the LuxeStay Collective.</li>
      </ul>

      <h3 className="text-xl font-bold text-primary mt-6 mb-2">3. Short-Term Rental Compliance</h3>
      <p>
        Hosts are responsible for acquiring and displaying any local short-term rental permits, registration numbers, or tourism licenses required by municipal jurisdictions. LuxeStay assists in collecting local transient occupancy taxes (TOT) where legislated.
      </p>
    </LegalLayout>
  );
}
