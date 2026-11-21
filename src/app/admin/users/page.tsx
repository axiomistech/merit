'use client';

import React, { useState } from 'react';
import {
  UserCog,
  Plus,
  Shield,
  CheckCircle2,
  Lock,
  Search,
  KeyRound,
  X,
} from 'lucide-react';
import { INITIAL_ADMIN_USERS, ALL_PERMISSIONS, ROLE_DEFAULT_PERMISSIONS, logAdminAction } from '@/lib/admin/auth';
import { AdminUser, AdminRole } from '@/types/admin';
import { toast } from 'sonner';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>(INITIAL_ADMIN_USERS);
  const [search, setSearch] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState<{
    name: string;
    email: string;
    role: AdminRole;
  }>({
    name: '',
    email: '',
    role: 'content_admin',
  });

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.includes(search.toLowerCase())
  );

  const handleToggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const nextStatus = u.status === 'active' ? 'suspended' : 'active';
          logAdminAction('update_admin_status', 'admin_user', id, `Changed ${u.name} status to ${nextStatus}`);
          toast.success(`Admin account ${nextStatus === 'active' ? 'reactivated' : 'suspended'}`);
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  const handleCreateAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdmin.name || !newAdmin.email) return;

    const created: AdminUser = {
      id: `adm_${Date.now().toString(36)}`,
      name: newAdmin.name,
      email: newAdmin.email,
      role: newAdmin.role,
      status: 'active',
      created_at: new Date().toISOString(),
      permissions: ROLE_DEFAULT_PERMISSIONS[newAdmin.role],
    };

    setUsers([created, ...users]);
    logAdminAction('create_admin', 'admin_user', created.id, `Created admin ${created.name} (${created.role})`);
    toast.success(`Admin user ${created.name} invited successfully.`);
    setShowInviteModal(false);
    setNewAdmin({ name: '', email: '', role: 'content_admin' });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-[28px] border border-[#DCE2E6] bg-white p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-3">
              <h3 className="text-lg font-bold font-serif text-[#20252B]">Invite Administrator</h3>
              <button onClick={() => setShowInviteModal(false)} className="text-[#66727D]">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAdmin} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block text-[#66727D] font-medium">Full Name</label>
                <input
                  type="text"
                  required
                  value={newAdmin.name}
                  onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                  placeholder="e.g. Dr. Ramesh Kumar"
                  className="mt-1 w-full rounded-xl border border-[#DCE2E6] bg-white p-2.5 text-xs text-[#20252B] focus:border-[#20252B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#66727D] font-medium">Official Email Address</label>
                <input
                  type="email"
                  required
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                  placeholder="name@fortlearning.com"
                  className="mt-1 w-full rounded-xl border border-[#DCE2E6] bg-white p-2.5 text-xs text-[#20252B] focus:border-[#20252B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#66727D] font-medium">Assigned Role</label>
                <select
                  value={newAdmin.role}
                  onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value as any })}
                  className="mt-1 w-full rounded-xl border border-[#DCE2E6] bg-white p-2.5 text-xs text-[#20252B] focus:border-[#20252B] focus:outline-none"
                >
                  <option value="content_admin">Content Admin (Academic & Questions)</option>
                  <option value="evaluator">Evaluator (Descriptive Submissions)</option>
                  <option value="support_admin">Support Admin (Students & Tickets)</option>
                  <option value="finance_admin">Finance Admin (Payments & Pricing)</option>
                  <option value="super_admin">Super Admin (Full Access)</option>
                </select>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 rounded-full border border-[#DCE2E6] py-2.5 font-semibold text-[#20252B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-full bg-[#20252B] py-2.5 font-bold text-white shadow-sm"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE2E6] pb-6">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#20252B]">
            Admin Users & Role-Based Access Control
          </h1>
          <p className="mt-1 text-xs text-[#66727D]">
            Granular permission management across Super Admin, Content Admin, Evaluator, Support, and Finance roles.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowInviteModal(true)}
            className="inline-flex items-center gap-2 rounded-full bg-[#20252B] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-black transition-all"
          >
            <Plus className="h-4 w-4" />
            <span>Invite Administrator</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3.5 top-3 h-4 w-4 text-[#66727D]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, or role..."
          className="w-full rounded-full border border-[#DCE2E6] bg-white py-2 pl-10 pr-4 text-xs text-[#20252B] focus:border-[#20252B] focus:outline-none"
        />
      </div>

      {/* Admin Users Table */}
      <div className="rounded-[28px] border border-[#DCE2E6] bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#DCE2E6] bg-[#F1F3F4] text-[#66727D]">
              <tr>
                <th className="py-3.5 px-6 font-semibold">Administrator</th>
                <th className="py-3.5 px-6 font-semibold">Assigned Role</th>
                <th className="py-3.5 px-6 font-semibold">Status</th>
                <th className="py-3.5 px-6 font-semibold">Permissions</th>
                <th className="py-3.5 px-6 font-semibold">Last Active</th>
                <th className="py-3.5 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE2E6]">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-[#F1F3F4]/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-bold text-[#20252B]">{u.name}</div>
                    <div className="text-[11px] text-[#66727D]">{u.email}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="rounded-full bg-[#E9EEF1] px-3 py-1 font-mono text-[10px] font-bold text-[#20252B] uppercase">
                      {u.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`rounded-full px-2.5 py-0.5 font-bold uppercase text-[10px] ${
                        u.status === 'active'
                          ? 'bg-[#E9EEF1] text-[#20252B]'
                          : 'bg-[#FDEDF0] text-[#E4002B]'
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-[#66727D]">
                    <span className="font-mono font-bold text-[#20252B]">
                      {u.permissions?.length || 0}
                    </span>{' '}
                    grants assigned
                  </td>
                  <td className="py-4 px-6 text-[#66727D]">
                    {u.last_login ? u.last_login.split('T')[0] : 'Never'}
                  </td>
                  <td className="py-4 px-6 text-right">
                    {u.role !== 'super_admin' ? (
                      <button
                        onClick={() => handleToggleStatus(u.id)}
                        className={`font-semibold hover:underline ${
                          u.status === 'active' ? 'text-[#E4002B]' : 'text-[#20252B]'
                        }`}
                      >
                        {u.status === 'active' ? 'Suspend' : 'Activate'}
                      </button>
                    ) : (
                      <span className="text-[10px] text-[#66727D]">Locked (Super)</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
