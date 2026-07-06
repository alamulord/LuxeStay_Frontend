import React from 'react';
import { LegalLayout } from '../../components/shared/LegalLayout';

export function Terms() {
  return (
    <LegalLayout
      activeTab="terms"
      title="Terms of Service"
      subtitle="Last updated: October 24, 2024. Please read these terms carefully before booking."
    >
      <p>
        By accessing the website at LuxeStay, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
      </p>

      <div className="grid gap-6 my-8">
        <div className="flex gap-6 group">
          <span className="font-display text-4xl font-black text-outline/30 group-hover:text-primary transition-colors duration-500">
            01
          </span>
          <div className="pt-2">
            <h4 className="font-headline font-bold text-lg mb-2">Reservation Accuracy</h4>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Guests are responsible for ensuring that all information provided during the booking process is accurate and up to date.
            </p>
          </div>
        </div>
        <div className="flex gap-6 group">
          <span className="font-display text-4xl font-black text-outline/30 group-hover:text-primary transition-colors duration-500">
            02
          </span>
          <div className="pt-2">
            <h4 className="font-headline font-bold text-lg mb-2">Cancellation Policy</h4>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Cancellations must be made at least 48 hours prior to the scheduled arrival date to avoid a one-night room charge penalty.
            </p>
          </div>
        </div>
        <div className="flex gap-6 group">
          <span className="font-display text-4xl font-black text-outline/30 group-hover:text-primary transition-colors duration-500">
            03
          </span>
          <div className="pt-2">
            <h4 className="font-headline font-bold text-lg mb-2">Property Integrity</h4>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Any damage to property during the stay will be charged to the credit card on file upon checkout assessment.
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-primary mt-6 mb-2">Governing Law</h3>
      <p>
        These terms and conditions are governed by and construed in accordance with the laws of the State of California and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
      </p>
    </LegalLayout>
  );
}
