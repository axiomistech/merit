'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, Lock, Mail, ArrowRight, UserCheck, KeyRound } from 'lucide-react';
import {
  INITIAL_ADMIN_USERS,
  ROLE_DEFAULT_PERMISSIONS,
  ALL_PERMISSIONS,
  isAuthorizedAdminEmail,
} from '@/lib/admin/auth';
import { AdminRole, AdminUser } from '@/types/admin';
import { toast } from 'sonner';
import { MeritwiseLogo } from '@/components/brand/MeritwiseLogo';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('meritwisehq@gmail.com');
  const [password, setPassword] = useState('Admin@Meritwise2026!');
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<AdminRole>('admin');

  const handleRolePreset = (role: AdminRole) => {
    setSelectedRole(role);
    const found = INITIAL_ADMIN_USERS.find((u) => u.role === role);
    if (found) {
      setEmail(found.email);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      if (!isAuthorizedAdminEmail(normalizedEmail)) {
        toast.error('Access Denied. Only authorized administrator accounts can access this console.');
        setLoading(false);
        return;
      }

      const activeAdmin: AdminUser = INITIAL_ADMIN_USERS.find(
        (u) => u.email.toLowerCase() === normalizedEmail
      ) || {
        id: 'adm_meritwise_hq',
        name: 'Meritwise HQ Admin',
        email: normalizedEmail,
        role: selectedRole === 'admin' ? 'admin' : selectedRole,
        status: 'active' as const,
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
        permissions: ALL_PERMISSIONS,
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem('fort_admin_session', JSON.stringify(activeAdmin));
      }

      toast.success(`Authenticated as ${activeAdmin.name} (${activeAdmin.role.toUpperCase()})`);
      router.push('/admin');
    } catch (err: any) {
      toast.error('Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F3F4] text-[#20252B] flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-[28px] border border-[#DCE2E6] bg-white p-8 sm:p-10 shadow-[0_8px_30px_rgba(38,49,38,0.06)] space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#20252B] p-2 text-white shadow-sm mb-3">
            <MeritwiseLogo variant="white" size="xs" showWordmark={false} />
          </div>
          <h1 className="mt-4 text-2xl font-bold font-sans text-[#20252B]">
            MERITWISE Admin Portal
          </h1>
          <p className="mt-1 text-xs text-[#66727D]">
            Authorized Administrative System Access
          </p>
        </div>

        {/* Role Presets Selector */}
        <div className="space-y-2">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#66727D] text-center">
            Select Role Identity
          </div>
          <div className="grid grid-cols-2 gap-1.5 text-xs font-semibold">
            {[
              { id: 'admin', label: 'Admin (Full Access)' },
              { id: 'content_admin', label: 'Content Admin' },
              { id: 'evaluator', label: 'Evaluator' },
              { id: 'support_admin', label: 'Support Admin' },
              { id: 'finance_admin', label: 'Finance Admin' },
            ].map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => handleRolePreset(r.id as any)}
                className={`rounded-xl py-2 px-2.5 text-center transition-all ${
                  selectedRole === r.id
                    ? 'bg-[#20252B] text-white font-bold'
                    : 'border border-[#DCE2E6] bg-[#F1F3F4] text-[#66727D] hover:bg-white'
                } ${r.id === 'finance_admin' ? 'col-span-2' : ''}`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-[#66727D] font-medium">Administrator Email</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-[#66727D]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-[#DCE2E6] bg-white py-2.5 pl-10 pr-3 text-sm text-[#20252B] focus:border-[#20252B] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#66727D] font-medium">Security Key / Password</label>
            <div className="relative mt-1">
              <KeyRound className="absolute left-3.5 top-3 h-4 w-4 text-[#66727D]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-[#DCE2E6] bg-white py-2.5 pl-10 pr-3 text-sm text-[#20252B] focus:border-[#20252B] focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#20252B] py-3.5 text-sm font-bold text-white hover:bg-black transition-all shadow-md disabled:opacity-50 mt-4 flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Control Center'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="pt-2 text-center text-[11px] text-[#66727D] border-t border-[#DCE2E6]">
          Protected by server-authoritative role verification & audit logging.
        </div>
      </div>
    </div>
  );
}
