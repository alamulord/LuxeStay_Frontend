import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { formatDate } from '../../lib/utils';
import { 
  User, Mail, Phone, Calendar, Shield, Edit2, CheckCircle, 
  AlertCircle, Loader2, Save, X, Camera, Sparkles, Award
} from 'lucide-react';

const PRESETS_AVATARS = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD5eW-jAA1QCruFsbPoGjVVkKHhV16A4b3tK35Jxjv0Rqi5EpzB8adk4v3WzWYGZpzciFKAN5Lk79F-Iw6enzTYSXOtFjxtU7EQcFzg-FKnvy4TLt5Er8GgSqw9zCl42UlUoQa41HdjqNTuNihC23VxaBgOJiZ1gGhBCQ2aux2mxmh9j1Q3RfI6PMf781zoCzhAgWFRxfSEAk9tyTyXMuis2J0Cd3ede75bDUtXF5rOLB9XJ4mKNC5BAg7qM78QIMF45WVr7OiWmQEH',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&q=80'
];

export function AccountOverviewPanel() {
  const { user, updateProfile } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth ? user.dateOfBirth.split('T')[0] : '');
  const [avatar, setAvatar] = useState(user?.avatar || PRESETS_AVATARS[0]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'N/A';

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMsg(null);
    try {
      await updateProfile({
        firstName,
        lastName,
        phone,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth).toISOString() : undefined,
        avatar
      });
      setStatusMsg({ type: 'success', text: 'Profile changes saved successfully.' });
      setIsEditing(false);
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message || 'Failed to update profile. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFirstName(user?.firstName || '');
    setLastName(user?.lastName || '');
    setPhone(user?.phone || '');
    setDateOfBirth(user?.dateOfBirth ? user.dateOfBirth.split('T')[0] : '');
    setAvatar(user?.avatar || PRESETS_AVATARS[0]);
    setIsEditing(false);
    setStatusMsg(null);
  };

  return (
    <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm border border-outline-variant/10">
      
      {/* Header */}
      <div className="flex justify-between items-center pb-6 border-b border-outline-variant/10 mb-8">
        <div>
          <h2 className="font-plus text-xl font-black text-[#1a1c1c] tracking-tight">Profile Details</h2>
          <p className="text-xs text-slate-400 mt-1">Manage your identity credentials and personal choices.</p>
        </div>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 border border-outline-variant/20 hover:bg-slate-50 text-[#1a1c1c] rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95"
          >
            <Edit2 className="w-3.5 h-3.5" /> Edit Profile
          </button>
        )}
      </div>

      {statusMsg && (
        <div className={`p-4 rounded-xl flex items-center gap-3 mb-6 text-xs font-bold leading-relaxed border ${
          statusMsg.type === 'success' 
            ? 'bg-green-50 border-green-100 text-green-800' 
            : 'bg-red-50 border-red-100 text-red-800'
        }`}>
          {statusMsg.type === 'success' ? <CheckCircle className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {isEditing ? (
        /* Edit Form State */
        <form onSubmit={handleSave} className="space-y-8">
          
          {/* Avatar Curation Selector */}
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Curate Profile Photo</label>
            
            <div className="flex flex-wrap items-center gap-6">
              {/* Current Preview */}
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#ba0036] bg-slate-50 shrink-0 shadow-md">
                <img src={avatar} alt="Avatar preview" className="w-full h-full object-cover" />
              </div>

              {/* Presets List */}
              <div className="space-y-2">
                <p className="text-[10px] font-semibold text-slate-400">Select an Editorial Portrait:</p>
                <div className="flex items-center gap-3">
                  {PRESETS_AVATARS.map((url, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setAvatar(url)}
                      className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all hover:scale-105 ${
                        avatar === url ? 'border-[#ba0036] scale-105 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={url} alt={`Preset ${i}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Custom URL Field */}
            <div className="pt-2">
              <label className="text-[10px] font-bold text-slate-500 block mb-1">Or paste a custom image URL:</label>
              <input
                type="url"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                className="w-full rounded-xl border border-outline-variant/30 px-4 py-2.5 text-xs focus:ring-2 focus:ring-[#ba0036] focus:border-[#ba0036] bg-surface/30 font-medium"
              />
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">First Name</label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full rounded-xl border border-outline-variant/30 px-4 py-3 text-xs font-semibold focus:ring-2 focus:ring-[#ba0036] focus:border-[#ba0036] bg-surface/30 text-[#1a1c1c]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Last Name</label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full rounded-xl border border-outline-variant/30 px-4 py-3 text-xs font-semibold focus:ring-2 focus:ring-[#ba0036] focus:border-[#ba0036] bg-surface/30 text-[#1a1c1c]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full rounded-xl border border-outline-variant/30 px-4 py-3 text-xs font-semibold focus:ring-2 focus:ring-[#ba0036] focus:border-[#ba0036] bg-surface/30 text-[#1a1c1c]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Date of Birth</label>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="w-full rounded-xl border border-outline-variant/30 px-4 py-3 text-xs font-semibold focus:ring-2 focus:ring-[#ba0036] focus:border-[#ba0036] bg-surface/30 text-[#1a1c1c]"
              />
            </div>

          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/10">
            <button
              type="button"
              onClick={handleCancel}
              className="px-5 py-3 border border-outline-variant/20 hover:bg-slate-50 text-[#1a1c1c] rounded-xl text-xs font-bold transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-[#ba0036] hover:bg-[#900028] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all hover:scale-102 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving Changes
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" /> Save Changes
                </>
              )}
            </button>
          </div>

        </form>
      ) : (
        /* Read-Only Layout View */
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Portrait Left Bar */}
          <div className="w-full md:w-1/3 flex flex-col items-center p-6 bg-surface rounded-2xl border border-slate-100/50 space-y-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-200 shadow-sm relative group bg-slate-50">
              <img src={avatar} alt="User Avatar" className="w-full h-full object-cover" />
            </div>
            
            <div className="text-center space-y-1">
              <h3 className="font-bold text-[#1a1c1c] text-base">{user?.firstName} {user?.lastName}</h3>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#ba0036]/5 text-[#ba0036] rounded-full text-[9px] uppercase tracking-widest font-black border border-[#ba0036]/10">
                <Sparkles className="w-2.5 h-2.5 fill-current" /> Premium Member
              </span>
            </div>

            {/* Loyalty points card */}
            <div className="w-full p-4 bg-white border rounded-xl flex items-center justify-between text-xs mt-2 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-slate-50 border flex items-center justify-center">
                  <Award className="w-4 h-4 text-[#ba0036]" />
                </div>
                <span className="font-bold text-[#1a1c1c]">Loyalty Points</span>
              </div>
              <span className="font-mono font-black text-[#ba0036]">2,450 pts</span>
            </div>
          </div>

          {/* Details Table Right Side */}
          <div className="flex-1 w-full space-y-5">
            
            <div className="flex items-start gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50/50 transition-colors">
              <div className="p-2.5 bg-slate-50 rounded-lg shrink-0">
                <User className="w-4 h-4 text-[#ba0036]" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Legal Name</p>
                <p className="font-bold text-sm text-[#1a1c1c] mt-0.5">{user?.firstName} {user?.lastName}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50/50 transition-colors">
              <div className="p-2.5 bg-slate-50 rounded-lg shrink-0">
                <Mail className="w-4 h-4 text-[#ba0036]" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Email Address</p>
                <p className="font-bold text-sm text-[#1a1c1c] mt-0.5">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50/50 transition-colors">
              <div className="p-2.5 bg-slate-50 rounded-lg shrink-0">
                <Phone className="w-4 h-4 text-[#ba0036]" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Phone Number</p>
                <p className="font-bold text-sm text-[#1a1c1c] mt-0.5">{user?.phone || 'Not registered'}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50/50 transition-colors">
              <div className="p-2.5 bg-slate-50 rounded-lg shrink-0">
                <Calendar className="w-4 h-4 text-[#ba0036]" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Date of Birth</p>
                <p className="font-bold text-sm text-[#1a1c1c] mt-0.5">
                  {user?.dateOfBirth ? formatDate(user.dateOfBirth) : 'Not specified'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50/50 transition-colors">
              <div className="p-2.5 bg-slate-50 rounded-lg shrink-0">
                <Shield className="w-4 h-4 text-[#ba0036]" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Member Since</p>
                <p className="font-bold text-sm text-[#1a1c1c] mt-0.5">{memberSince}</p>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}