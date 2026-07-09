import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminTopBar } from '../../components/admin/AdminTopBar';
import {
  Activity, Search, Filter, RefreshCw, Shield, User, LogIn,
  LogOut, Key, ShieldAlert, ShieldCheck, Bed, Calendar,
  CreditCard, Edit3, Trash2, CheckSquare, AlertTriangle,
  Globe, Clock, ChevronLeft, ChevronRight, Download,
} from 'lucide-react';
import api from '../../lib/api';

interface ActivityLog {
  id: string;
  action: string;
  details?: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    avatar?: string;
  } | null;
}

interface PaginatedResult {
  logs: ActivityLog[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

const ACTION_META: Record<string, { label: string; icon: any; color: string; bg: string }> = {
  USER_LOGIN:             { label: 'Login',              icon: LogIn,       color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
  USER_LOGOUT:            { label: 'Logout',             icon: LogOut,      color: 'text-slate-500',   bg: 'bg-slate-50 border-slate-200' },
  USER_REGISTER:          { label: 'Registration',       icon: User,        color: 'text-blue-600',    bg: 'bg-blue-50 border-blue-200' },
  AUTH_FAILED_LOGIN:      { label: 'Failed Login',       icon: ShieldAlert, color: 'text-red-600',     bg: 'bg-red-50 border-red-200' },
  AUTH_PASSWORD_CHANGE_FAILED: { label: 'Pwd Fail',    icon: ShieldAlert, color: 'text-red-600',     bg: 'bg-red-50 border-red-200' },
  PASSWORD_CHANGE:        { label: 'Password Changed',   icon: Key,         color: 'text-amber-600',   bg: 'bg-amber-50 border-amber-200' },
  PROFILE_UPDATE:         { label: 'Profile Update',     icon: Edit3,       color: 'text-indigo-600',  bg: 'bg-indigo-50 border-indigo-200' },
  ROOM_CREATE:            { label: 'Room Created',       icon: Bed,         color: 'text-violet-600',  bg: 'bg-violet-50 border-violet-200' },
  ROOM_UPDATE:            { label: 'Room Updated',       icon: Edit3,       color: 'text-indigo-600',  bg: 'bg-indigo-50 border-indigo-200' },
  ROOM_DELETE:            { label: 'Room Deleted',       icon: Trash2,      color: 'text-red-600',     bg: 'bg-red-50 border-red-200' },
  AMENITY_CREATE:         { label: 'Amenity Added',      icon: CheckSquare, color: 'text-teal-600',    bg: 'bg-teal-50 border-teal-200' },
  BOOKING_CREATE:         { label: 'Booking Made',       icon: Calendar,    color: 'text-blue-600',    bg: 'bg-blue-50 border-blue-200' },
  BOOKING_CANCEL:         { label: 'Booking Cancelled',  icon: AlertTriangle,color: 'text-orange-600', bg: 'bg-orange-50 border-orange-200' },
  PAYMENT_PROCESS:        { label: 'Payment',            icon: CreditCard,  color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
  TOUR_HOTSPOT_CREATE:    { label: 'Hotspot Added',      icon: Globe,       color: 'text-cyan-600',    bg: 'bg-cyan-50 border-cyan-200' },
  TOUR_HOTSPOT_DELETE:    { label: 'Hotspot Deleted',    icon: Trash2,      color: 'text-red-600',     bg: 'bg-red-50 border-red-200' },
  TOUR_HOTSPOT_SUGGEST:   { label: 'AI Suggestion',      icon: ShieldCheck, color: 'text-primary',     bg: 'bg-primary/10 border-primary/20' },
};

function getActionMeta(action: string) {
  return ACTION_META[action] ?? { label: action.replace(/_/g, ' '), icon: Activity, color: 'text-slate-600', bg: 'bg-slate-50 border-slate-200' };
}

function isCyberEvent(action: string) {
  return action.includes('FAILED') || action.includes('AUTH_') || action === 'PASSWORD_CHANGE';
}

function formatUA(ua?: string) {
  if (!ua) return 'Unknown agent';
  if (ua.includes('Chrome')) return 'Chrome Browser';
  if (ua.includes('Firefox')) return 'Firefox Browser';
  if (ua.includes('Safari')) return 'Safari Browser';
  if (ua.includes('Edge')) return 'Edge Browser';
  if (ua.includes('curl')) return 'cURL / API';
  return ua.slice(0, 40) + (ua.length > 40 ? '…' : '');
}

export function AdminActivities() {
  const [data, setData] = useState<PaginatedResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchLogs = useCallback(async (pg = 1) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({ page: String(pg), limit: '50' });
      if (search) params.set('search', search);
      if (roleFilter) params.set('role', roleFilter);
      const res = await api.get<PaginatedResult>(`/analytics/activity/all?${params}`);
      setData(res.data);
      setPage(pg);
    } catch (err) {
      console.error('Failed to load activities', err);
    } finally {
      setIsLoading(false);
    }
  }, [search, roleFilter]);

  useEffect(() => { fetchLogs(1); }, [fetchLogs]);

  const handleExport = () => {
    if (!data) return;
    const csv = ['Time,User,Role,Action,Details,IP,User Agent']
      .concat(data.logs.map(l =>
        [
          new Date(l.createdAt).toLocaleString(),
          l.user ? `${l.user.firstName} ${l.user.lastName}` : 'Anonymous',
          l.user?.role || 'GUEST',
          l.action,
          `"${(l.details || '').replace(/"/g, '""')}"`,
          l.ipAddress || '',
          `"${(l.userAgent || '').replace(/"/g, '""')}"`,
        ].join(',')
      ))
      .join('\n');
    const a = document.createElement('a');
    a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    a.download = `LuxeStay_Activities_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex text-left font-body">
      <AdminSidebar />
      <div className="flex-1 ml-[260px]">
        <AdminTopBar title="Activity Log" />

        <main className="p-8 max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-on-surface font-headline tracking-tight flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary" />
                Security & Activity Log
              </h2>
              <p className="text-sm text-on-surface-variant mt-1">
                Complete audit trail — all user, admin, guest, and cyber events.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => fetchLogs(page)}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 flex items-center gap-2 transition-all"
              >
                <RefreshCw className="w-4 h-4" /> Refresh
              </button>
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 flex items-center gap-2 transition-all"
              >
                <Download className="w-4 h-4" /> Export CSV
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-wrap gap-3 shadow-sm">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search action, detail, email…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select
                value={roleFilter}
                onChange={e => setRoleFilter(e.target.value)}
                className="pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none bg-white appearance-none"
              >
                <option value="">All Roles</option>
                <option value="SUPER_ADMIN">Super Admin</option>
                <option value="ADMIN">Admin</option>
                <option value="USER">User</option>
              </select>
            </div>
          </div>

          {/* Stats pills */}
          {data && (
            <div className="flex gap-4 flex-wrap">
              <div className="bg-white border border-slate-100 rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                {data.total.toLocaleString()} total events
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2 text-sm font-semibold text-red-700">
                {data.logs.filter(l => isCyberEvent(l.action)).length} security events (this page)
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-semibold text-slate-600">
                Page {data.page} of {data.pages}
              </div>
            </div>
          )}

          {/* Table */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
            {isLoading ? (
              <div className="flex items-center justify-center py-24">
                <div className="w-9 h-9 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              </div>
            ) : !data || data.logs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-slate-400">
                <Activity className="w-10 h-10 mb-3 opacity-30" />
                <p className="font-semibold text-sm">No activity logs found</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {data.logs.map(log => {
                  const meta = getActionMeta(log.action);
                  const Icon = meta.icon;
                  const isExpanded = expandedId === log.id;
                  const isCyber = isCyberEvent(log.action);

                  return (
                    <div
                      key={log.id}
                      className={`px-6 py-4 hover:bg-slate-50/60 cursor-pointer transition-colors ${isCyber ? 'border-l-2 border-red-400' : ''}`}
                      onClick={() => setExpandedId(isExpanded ? null : log.id)}
                    >
                      <div className="flex items-center gap-4">
                        {/* Icon */}
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center border flex-shrink-0 ${meta.bg}`}>
                          <Icon className={`w-4 h-4 ${meta.color}`} />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-xs font-bold uppercase tracking-wide ${meta.color}`}>{meta.label}</span>
                            {isCyber && (
                              <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
                                🔒 Security
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-on-surface font-medium truncate mt-0.5">
                            {log.details || log.action}
                          </p>
                          <div className="flex items-center gap-3 mt-1">
                            {log.user ? (
                              <span className="text-xs text-slate-500 font-medium">
                                {log.user.firstName} {log.user.lastName}
                                <span className="ml-1 text-slate-400">({log.user.role})</span>
                              </span>
                            ) : (
                              <span className="text-xs text-slate-400 italic">Anonymous / System</span>
                            )}
                            {log.ipAddress && (
                              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                                <Globe className="w-3 h-3" /> {log.ipAddress}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Time */}
                        <div className="text-right flex-shrink-0">
                          <span className="text-xs text-slate-400 flex items-center gap-1 justify-end">
                            <Clock className="w-3 h-3" />
                            {new Date(log.createdAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                          </span>
                        </div>
                      </div>

                      {/* Expanded detail */}
                      {isExpanded && (
                        <div className="mt-3 ml-13 pl-1 border-l-2 border-slate-100 ml-[52px] space-y-1">
                          {log.user?.email && (
                            <p className="text-xs text-slate-500"><span className="font-semibold">Email:</span> {log.user.email}</p>
                          )}
                          {log.ipAddress && (
                            <p className="text-xs text-slate-500"><span className="font-semibold">IP Address:</span> {log.ipAddress}</p>
                          )}
                          {log.userAgent && (
                            <p className="text-xs text-slate-500"><span className="font-semibold">User Agent:</span> {formatUA(log.userAgent)}</p>
                          )}
                          {log.details && (
                            <p className="text-xs text-slate-500"><span className="font-semibold">Details:</span> {log.details}</p>
                          )}
                          <p className="text-xs text-slate-400">
                            <span className="font-semibold">Full timestamp:</span>{' '}
                            {new Date(log.createdAt).toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Pagination */}
          {data && data.pages > 1 && (
            <div className="flex items-center justify-center gap-3">
              <button
                disabled={page <= 1}
                onClick={() => fetchLogs(page - 1)}
                className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm font-semibold text-slate-600">
                Page {data.page} / {data.pages}
              </span>
              <button
                disabled={page >= data.pages}
                onClick={() => fetchLogs(page + 1)}
                className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Security note */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-amber-800">Security Protocol Active</p>
              <p className="text-xs text-amber-700 mt-0.5">
                All authentication attempts, profile changes, password changes, and system events are
                automatically recorded with IP addresses and user agents. Failed login attempts are
                flagged and highlighted for immediate review.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
