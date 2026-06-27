import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminTopBar } from '../../components/admin/AdminTopBar';
import { useAuth } from '../../contexts/AuthContext';
import { User, Mail, Phone, Calendar, Shield, Camera, Save, Eye, EyeOff } from 'lucide-react';
import api from '../../lib/api';

export function AdminProfile() {
  const { user, fetchProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: (user as any).phone || '',
      });
    }
  }, [user]);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    setMessage(null);
    try {
      await api.put('/auth/profile', formData);
      await fetchProfile();
      setIsEditing(false);
      setMessage({ type: 'success', text: 'Profile updated successfully.' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update profile.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    setMessage(null);
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'New password must be at least 6 characters.' });
      return;
    }
    setIsSaving(true);
    try {
      await api.post('/auth/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setIsChangingPassword(false);
      setMessage({ type: 'success', text: 'Password changed successfully.' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to change password.' });
    } finally {
      setIsSaving(false);
    }
  };

  const roleBadge = user?.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin';
  const roleColor = user?.role === 'SUPER_ADMIN' ? 'bg-amber-500/15 text-amber-600 font-semibold' : 'bg-admin-primary/10 text-admin-primary font-semibold';

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex">
      <AdminSidebar />

      <div className="flex-1 ml-[260px]">
        <AdminTopBar title="My Profile" />

        <main className="p-8 max-w-3xl mx-auto">
          {/* Status message */}
          {message && (
            <div className={`mb-6 px-4 py-3 rounded-lg text-sm ${
              message.type === 'success'
                ? 'bg-green-500/10 text-green-600 border border-green-500/20'
                : 'bg-red-500/10 text-red-600 border border-red-500/20'
            }`}>
              {message.text}
            </div>
          )}

          {/* Avatar + Role header */}
          <div className="bg-white rounded-xl p-6 mb-6 shadow-ambient border border-slate-100">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-admin-primary/10 flex items-center justify-center text-admin-primary text-2xl font-bold">
                  {user ? `${(user.firstName || '')[0] || ''}${(user.lastName || '')[0] || ''}`.toUpperCase() : 'A'}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-headline font-bold text-[#191c1e]">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-[#464555] text-sm">{user?.email}</p>
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${roleColor}`}>
                  {roleBadge}
                </span>
              </div>
            </div>
          </div>

          {/* Profile info */}
          <div className="bg-white rounded-xl p-6 mb-6 shadow-ambient border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-headline font-bold text-[#191c1e]">Personal Information</h3>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-sm text-admin-primary hover:underline font-semibold"
                >
                  Edit
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-[#464555] font-semibold mb-1 block uppercase">First Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#f2f4f6] rounded-lg border-none text-sm focus:ring-2 focus:ring-admin-primary/20 outline-none text-[#464555] transition-all"
                  />
                ) : (
                  <p className="text-sm font-medium text-[#191c1e]">{user?.firstName}</p>
                )}
              </div>
              <div>
                <label className="text-xs text-[#464555] font-semibold mb-1 block uppercase">Last Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#f2f4f6] rounded-lg border-none text-sm focus:ring-2 focus:ring-admin-primary/20 outline-none text-[#464555] transition-all"
                  />
                ) : (
                  <p className="text-sm font-medium text-[#191c1e]">{user?.lastName}</p>
                )}
              </div>
              <div>
                <label className="text-xs text-[#464555] font-semibold mb-1 block uppercase">Email</label>
                <p className="text-sm font-medium text-[#464555]">{user?.email}</p>
              </div>
              <div>
                <label className="text-xs text-[#464555] font-semibold mb-1 block uppercase">Phone</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#f2f4f6] rounded-lg border-none text-sm focus:ring-2 focus:ring-admin-primary/20 outline-none text-[#464555] transition-all"
                    placeholder="Enter phone number"
                  />
                ) : (
                  <p className="text-sm font-medium text-[#191c1e]">{(user as any)?.phone || '—'}</p>
                )}
              </div>
              <div>
                <label className="text-xs text-[#464555] font-semibold mb-1 block uppercase">Role</label>
                <p className="text-sm font-medium text-[#191c1e]">{roleBadge}</p>
              </div>
              <div>
                <label className="text-xs text-[#464555] font-semibold mb-1 block uppercase">Member Since</label>
                <p className="text-sm font-medium text-[#191c1e]">
                  {(user as any)?.createdAt ? new Date((user as any).createdAt).toLocaleDateString() : '—'}
                </p>
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-5 py-2.5 bg-admin-primary text-white rounded-lg hover:opacity-90 transition-all text-sm font-semibold disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm font-semibold text-[#464555]"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-xl p-6 shadow-ambient border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-headline font-bold text-[#191c1e]">Security</h3>
              {!isChangingPassword && (
                <button
                  onClick={() => setIsChangingPassword(true)}
                  className="text-sm text-admin-primary hover:underline font-semibold"
                >
                  Change Password
                </button>
              )}
            </div>

            {isChangingPassword ? (
              <div className="space-y-4 max-w-md">
                <div className="relative">
                  <label className="text-xs text-[#464555] font-semibold mb-1 block uppercase">Current Password</label>
                  <input
                    type={showCurrentPw ? 'text' : 'password'}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#f2f4f6] border-none rounded-lg text-sm pr-10 focus:ring-2 focus:ring-admin-primary/20 outline-none text-[#464555]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPw(!showCurrentPw)}
                    className="absolute right-3 top-9 text-[#464555]"
                  >
                    {showCurrentPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="relative">
                  <label className="text-xs text-[#464555] font-semibold mb-1 block uppercase">New Password</label>
                  <input
                    type={showNewPw ? 'text' : 'password'}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#f2f4f6] border-none rounded-lg text-sm pr-10 focus:ring-2 focus:ring-admin-primary/20 outline-none text-[#464555]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPw(!showNewPw)}
                    className="absolute right-3 top-9 text-[#464555]"
                  >
                    {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div>
                  <label className="text-xs text-[#464555] font-semibold mb-1 block uppercase">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#f2f4f6] border-none rounded-lg text-sm focus:ring-2 focus:ring-admin-primary/20 outline-none text-[#464555]"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleChangePassword}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-5 py-2.5 bg-admin-primary text-white rounded-lg hover:opacity-90 transition-all text-sm font-semibold disabled:opacity-50"
                  >
                    {isSaving ? 'Saving...' : 'Update Password'}
                  </button>
                  <button
                    onClick={() => setIsChangingPassword(false)}
                    className="px-5 py-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm font-semibold text-[#464555]"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-[#464555]">
                Your password was last updated recently. Use the "Change Password" button above to update it.
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
