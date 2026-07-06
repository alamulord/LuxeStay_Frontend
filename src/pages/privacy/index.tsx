import React from 'react';
import { LegalLayout } from '../../components/shared/LegalLayout';

export function Privacy() {
  return (
    <LegalLayout
      activeTab="privacy"
      title="Privacy Policy"
      subtitle="Last updated: October 24, 2024. Your privacy is our highest standard."
    >
      <h3 className="text-xl font-bold text-primary mt-6 mb-2">1. Introduction</h3>
      <p>
        LuxeStay Hospitality Group ("we", "us", "our") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
      </p>

      <div className="my-8 p-6 bg-surface-container rounded-2xl border border-outline-variant/10">
        <h4 className="text-base font-bold text-primary mb-3">Key Summary of Data Use</h4>
        <ul className="space-y-3 list-disc pl-5">
          <li>We collect data to personalize your stay and improve concierge services.</li>
          <li>Personal information is never sold to third-party marketing entities.</li>
          <li>We use industry-leading encryption for all financial transactions.</li>
        </ul>
      </div>

      <h3 className="text-xl font-bold text-primary mt-6 mb-2">2. The Data We Collect</h3>
      <p>
        We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="bg-surface-container p-5 rounded-xl">
          <span className="font-bold block text-sm mb-1 uppercase tracking-wider text-on-surface">Identity Data</span>
          <p className="text-xs">First name, maiden name, last name, username or similar identifier, marital status, title, and gender.</p>
        </div>
        <div className="bg-surface-container p-5 rounded-xl">
          <span className="font-bold block text-sm mb-1 uppercase tracking-wider text-on-surface">Contact Data</span>
          <p className="text-xs">Billing address, delivery address, email address, and telephone numbers.</p>
        </div>
        <div className="bg-surface-container p-5 rounded-xl">
          <span className="font-bold block text-sm mb-1 uppercase tracking-wider text-on-surface">Technical Data</span>
          <p className="text-xs">Internet protocol (IP) address, your login data, browser type and version, and location data.</p>
        </div>
        <div className="bg-surface-container p-5 rounded-xl">
          <span className="font-bold block text-sm mb-1 uppercase tracking-wider text-on-surface">Profile Data</span>
          <p className="text-xs">Your reservations, your interests, preferences, feedback and survey responses.</p>
        </div>
      </div>

      <h3 className="text-xl font-bold text-primary mt-6 mb-2">3. Data Security</h3>
      <p>
        We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
      </p>
    </LegalLayout>
  );
}
