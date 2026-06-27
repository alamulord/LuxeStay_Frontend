import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminTopBar } from '../../components/admin/AdminTopBar';
import { User, UserRole } from '../../types/user.types';
import api from '../../lib/api';
import { Search, UserPlus, Ban, CheckCircle, Edit, Trash, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../contexts/AuthContext';

export function AdminUsers() {
  const { user: currentUser } = useAuth();
  const isSuperAdmin = currentUser?.role === 'SUPER_ADMIN';

  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Modals & form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState<UserRole>('USER');

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (roleFilter) params.append('role', roleFilter);
      if (statusFilter) params.append('status', statusFilter);
      params.append('page', page.toString());
      params.append('limit', '10');

      const response = await api.get<{ users: User[]; total: number }>(`/users?${params.toString()}`);
      setUsers(response.data.users);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Failed to load users directory', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search, roleFilter, statusFilter]);

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setRole('USER');
    setEditingUser(null);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setEmail(user.email);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setRole(user.role);
    setIsModalOpen(true);
  };

  const toggleSuspend = async (user: User) => {
    try {
      const updatedStatus = !user.isActive;
      await api.put(`/users/${user.id}`, { isActive: updatedStatus });
      setUsers(prev => prev.map(u => u.id === user.id ? { ...u, isActive: updatedStatus } : u));
    } catch (error) {
      alert('Failed to update account status');
    }
  };

  const handleDelete = async (user: User) => {
    if (!window.confirm(`Are you sure you want to permanently delete user ${user.firstName} ${user.lastName}?`)) return;
    try {
      await api.delete(`/users/${user.id}`);
      setUsers(prev => prev.filter(u => u.id !== user.id));
    } catch (error) {
      alert('Failed to delete user');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await api.put(`/users/${editingUser.id}`, { firstName, lastName, role });
      } else {
        await api.post('/users', { email, password, firstName, lastName, role, isVerified: true });
      }
      setIsModalOpen(false);
      resetForm();
      fetchUsers();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to save user info');
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex">
      <AdminSidebar />

      <div className="flex-1 ml-[260px]">
        <AdminTopBar title="User Accounts Directory" />

        <main className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="font-headline text-2xl font-bold text-[#191c1e]">User Directory</h2>
              <p className="text-sm text-[#464555] mt-0.5 font-medium">Manage and audit administrative & customer profiles</p>
            </div>
            {isSuperAdmin && (
              <button
                onClick={() => {
                  resetForm();
                  setIsModalOpen(true);
                }}
                className="flex items-center gap-2 bg-gradient-to-r from-admin-primary to-admin-primary-container text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity shadow-sm"
              >
                <UserPlus className="w-4 h-4" /> Create New User
              </button>
            )}
          </div>

          {/* Stats Summary Panel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-ambient border border-slate-100">
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#464555]">Total Registered</p>
              <h3 className="text-2xl font-bold text-[#191c1e] mt-1">{total}</h3>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-ambient border border-slate-100">
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#464555]">Active Accounts</p>
              <h3 className="text-2xl font-bold text-emerald-600 mt-1">
                {users.filter(u => u.isActive).length}
              </h3>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-ambient border border-slate-100">
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#464555]">Suspended Accounts</p>
              <h3 className="text-2xl font-bold text-red-600 mt-1">
                {users.filter(u => !u.isActive).length}
              </h3>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="bg-white rounded-xl p-4 mb-8 flex flex-wrap items-center justify-between gap-4 border border-slate-200/50 shadow-ambient">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative min-w-[300px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-[#f2f4f6] border-none rounded-lg py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-admin-primary/20 outline-none transition-all"
                  placeholder="Search by name or email..."
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="bg-[#f2f4f6] border-none text-sm rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-admin-primary/20 cursor-pointer outline-none transition-all text-[#464555]"
                >
                  <option value="">All Roles</option>
                  <option value="USER">User (Customer)</option>
                  <option value="ADMIN">Admin</option>
                  <option value="SUPER_ADMIN">Super Admin</option>
                </select>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-[#f2f4f6] border-none text-sm rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-admin-primary/20 cursor-pointer outline-none transition-all text-[#464555]"
                >
                  <option value="">All Statuses</option>
                  <option value="ACTIVE">Active</option>
                  <option value="SUSPENDED">Suspended</option>
                </select>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12 text-[#464555]">Loading users directory...</div>
          ) : (
            <div className="bg-white rounded-xl overflow-hidden shadow-ambient border border-slate-100">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-outline_variant/10">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-on_surface_variant">User</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-on_surface_variant">Role</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-on_surface_variant">Phone</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-on_surface_variant">Status</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-on_surface_variant text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline_variant/5">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden flex-shrink-0">
                            {user.avatar ? (
                              <img src={user.avatar} className="w-full h-full object-cover" alt="" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center font-bold text-xs bg-admin-primary/10 text-admin-primary">
                                {user.firstName[0]}{user.lastName[0]}
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{user.firstName} {user.lastName}</p>
                            <p className="text-xs text-on_surface_variant">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          user.role === 'SUPER_ADMIN' && "bg-indigo-100 text-indigo-800",
                          user.role === 'ADMIN' && "bg-blue-100 text-blue-800",
                          user.role === 'USER' && "bg-slate-100 text-slate-700"
                        )}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-on_surface_variant">
                        {user.phone || 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                          user.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        )}>
                          {user.isActive ? 'Active' : 'Suspended'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEdit(user)}
                            className="p-1.5 hover:bg-slate-100 rounded text-slate-600"
                            title="Edit Role & Info"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => toggleSuspend(user)}
                            className={cn(
                              "p-1.5 rounded",
                              user.isActive
                                ? "text-amber-600 hover:bg-amber-50"
                                : "text-emerald-600 hover:bg-emerald-50"
                            )}
                            title={user.isActive ? 'Suspend' : 'Activate'}
                          >
                            {user.isActive ? <Ban className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                          </button>
                          {isSuperAdmin && (
                            <button
                              onClick={() => handleDelete(user)}
                              className="p-1.5 hover:bg-red-50 text-red-600 rounded"
                              title="Delete Permanently"
                            >
                              <Trash className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              {total > 10 && (
                <div className="px-6 py-4 bg-surface-container-low flex items-center justify-between border-t border-outline_variant/10">
                  <span className="text-xs text-on_surface_variant">
                    Showing {(page - 1) * 10 + 1} - {Math.min(page * 10, total)} of {total} users
                  </span>
                  <div className="flex gap-2">
                    <button
                      disabled={page === 1}
                      onClick={() => setPage(page - 1)}
                      className="px-3 py-1 bg-white border rounded text-xs disabled:opacity-50"
                    >
                      Prev
                    </button>
                    <button
                      disabled={page * 10 >= total}
                      onClick={() => setPage(page + 1)}
                      className="px-3 py-1 bg-white border rounded text-xs disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl w-full max-w-md shadow-2xl p-6 animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold font-plus">
                {editingUser ? `Edit User: ${editingUser.firstName}` : 'Create New User'}
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
                className="p-1 hover:bg-surface-container-low rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on_surface_variant uppercase">First Name</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-surface-container-low border-none rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on_surface_variant uppercase">Last Name</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-surface-container-low border-none rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-on_surface_variant uppercase">Email</label>
                <input
                  type="email"
                  required
                  disabled={editingUser !== null}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface-container-low border-none rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
                  placeholder="name@example.com"
                />
              </div>

              {!editingUser && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on_surface_variant uppercase">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-surface-container-low border-none rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-primary/20"
                    placeholder="Min 6 characters"
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-bold text-on_surface_variant uppercase">Role Privilege</label>
                <select
                  value={role}
                  disabled={!isSuperAdmin}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full bg-surface-container-low border-none rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
                >
                  <option value="USER">User (Customer)</option>
                  <option value="ADMIN">Admin (Staff)</option>
                  <option value="SUPER_ADMIN">Super Admin</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-semibold shadow-md hover:bg-primary/95 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
