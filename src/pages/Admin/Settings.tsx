import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminTopBar } from '../../components/admin/AdminTopBar';
import api from '../../lib/api';
import { Save, Shield, Settings, Sliders } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function AdminSettings() {
  const { user } = useAuth();
  const isSuperAdmin = user?.role === 'SUPER_ADMIN';

  const [cancellationPolicy, setCancellationPolicy] = useState('Moderate (Full refund 5 days prior)');
  const [currency, setCurrency] = useState('USD');
  const [stripeMode, setStripeMode] = useState('sandbox');
  const [stripePublicKey, setStripePublicKey] = useState('');
  const [googleMapsEnabled, setGoogleMapsEnabled] = useState(true);
  const [geoapifyEnabled, setGeoapifyEnabled] = useState(true);
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/admin/settings');
      const data = response.data;
      setCancellationPolicy(data.cancellationPolicy || 'Moderate (Full refund 5 days prior)');
      setCurrency(data.currency || 'USD');
      setStripeMode(data.stripeMode || 'sandbox');
      setStripePublicKey(data.stripePublicKey || '');
      setGoogleMapsEnabled(data.googleMapsEnabled !== undefined ? data.googleMapsEnabled : true);
      setGeoapifyEnabled(data.geoapifyEnabled !== undefined ? data.geoapifyEnabled : true);
      setEmailNotificationsEnabled(data.emailNotificationsEnabled !== undefined ? data.emailNotificationsEnabled : true);
    } catch (error) {
      console.error('Failed to load settings', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload = {
        cancellationPolicy,
        currency,
        stripeMode,
        stripePublicKey,
        googleMapsEnabled,
        geoapifyEnabled,
        emailNotificationsEnabled,
      };
      await api.put('/admin/settings', payload);
      alert('Platform configurations saved successfully.');
    } catch (error) {
      console.error(error);
      alert('Failed to save settings.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex">
      <AdminSidebar />

      <div className="flex-1 ml-[260px]">
        <AdminTopBar title="Platform Settings" />

        <main className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-headline text-2xl font-bold flex items-center gap-2 text-[#191c1e]">
              <Settings className="w-6 h-6 text-admin-primary" /> Configuration Console
            </h2>
          </div>

          {isLoading ? (
            <div className="text-center py-12 text-[#464555]">Loading configurations...</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
              <fieldset disabled={!isSuperAdmin} className="space-y-6">
              {/* Financial Settings */}
              <div className="bg-white p-6 rounded-xl shadow-ambient border border-slate-100 space-y-4">
                <h3 className="text-sm font-bold font-plus text-indigo-700 flex items-center gap-2 uppercase tracking-wider">
                  <Shield className="w-4 h-4" /> Gateway & Transaction Control
                </h3>
                <hr className="border-slate-100" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#464555] uppercase">Base Currency</label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full bg-[#f2f4f6] border-none rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-admin-primary/20 text-[#464555] outline-none"
                    >
                      <option value="USD">USD - US Dollar ($)</option>
                      <option value="EUR">EUR - Euro (€)</option>
                      <option value="GBP">GBP - British Pound (£)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#464555] uppercase">Stripe API Mode</label>
                    <select
                      value={stripeMode}
                      onChange={(e) => setStripeMode(e.target.value)}
                      className="w-full bg-[#f2f4f6] border-none rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-admin-primary/20 text-[#464555] outline-none"
                    >
                      <option value="sandbox">Sandbox (Development / Testing)</option>
                      <option value="live">Live (Production Payments)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#464555] uppercase">Stripe Public Key</label>
                  <input
                    type="text"
                    value={stripePublicKey}
                    onChange={(e) => setStripePublicKey(e.target.value)}
                    className="w-full bg-[#f2f4f6] border-none rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-admin-primary/20 font-mono text-xs outline-none text-[#464555]"
                    placeholder="pk_test_..."
                  />
                </div>
              </div>

              {/* Policy Settings */}
              <div className="bg-white p-6 rounded-xl shadow-ambient border border-slate-100 space-y-4">
                <h3 className="text-sm font-bold font-plus text-indigo-700 flex items-center gap-2 uppercase tracking-wider">
                  <Sliders className="w-4 h-4" /> Guest Rules & Policies
                </h3>
                <hr className="border-slate-100" />
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#464555] uppercase">Default Cancellation Policy</label>
                  <select
                    value={cancellationPolicy}
                    onChange={(e) => setCancellationPolicy(e.target.value)}
                    className="w-full bg-[#f2f4f6] border-none rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-admin-primary/20 text-[#464555] outline-none"
                  >
                    <option value="Flexible (Full refund 24h prior)">Flexible (Full refund 24h prior)</option>
                    <option value="Moderate (Full refund 5 days prior)">Moderate (Full refund 5 days prior)</option>
                    <option value="Strict (No refund)">Strict (No refund)</option>
                  </select>
                </div>
              </div>

              {/* Feature Switches */}
              <div className="bg-white p-6 rounded-xl shadow-ambient border border-slate-100 space-y-4">
                <h3 className="text-sm font-bold font-plus text-indigo-700 flex items-center gap-2 uppercase tracking-wider">
                  System Switches
                </h3>
                <hr className="border-slate-100" />
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={googleMapsEnabled}
                      onChange={(e) => setGoogleMapsEnabled(e.target.checked)}
                      className="rounded text-admin-primary focus:ring-admin-primary/20 border-slate-300"
                    />
                    <span className="text-sm font-semibold text-slate-700">Enable Google Maps Location Displays</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={geoapifyEnabled}
                      onChange={(e) => setGeoapifyEnabled(e.target.checked)}
                      className="rounded text-admin-primary focus:ring-admin-primary/20 border-slate-300"
                    />
                    <span className="text-sm font-semibold text-slate-700">Enable Geoapify Places Intelligence (Search Map)</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={emailNotificationsEnabled}
                      onChange={(e) => setEmailNotificationsEnabled(e.target.checked)}
                      className="rounded text-admin-primary focus:ring-admin-primary/20 border-slate-300"
                    />
                    <span className="text-sm font-semibold text-slate-700">Enable Automated Email Dispatch (SendGrid/SMTP)</span>
                  </label>
                </div>
              </div>

              </fieldset>
              <div className="flex items-center justify-between gap-4 mt-6">
                {!isSuperAdmin && (
                  <p className="text-xs text-rose-500 font-semibold bg-rose-50 px-3 py-1.5 rounded border border-rose-100">
                    * Only Super Admin can modify global configuration parameters.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isSaving || !isSuperAdmin}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-admin-primary to-admin-primary-container text-white rounded-lg text-sm font-bold shadow-md hover:opacity-90 transition-all disabled:opacity-50 ml-auto"
                >
                  <Save className="w-4 h-4" /> {isSaving ? 'Saving Configurations...' : 'Save Configuration Parameters'}
                </button>
              </div>
            </form>
          )}
        </main>
      </div>
    </div>
  );
}
