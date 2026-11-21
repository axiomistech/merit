'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  User,
  Shield,
  Save,
  CheckCircle2,
  Bell,
  Lock,
  Globe,
} from 'lucide-react';
import { toast } from 'sonner';

export default function StudentSettingsPage() {
  const [profile, setProfile] = useState({
    fullName: 'DHANUSH JAGADEESH',
    registrationId: 'FORT-26-000001',
    email: 'dhanush@fortlearning.com',
    targetExam: 'neet',
    targetYear: 2026,
    emailNotifications: true,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('fort_student_session');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setProfile((prev) => ({
            ...prev,
            fullName: parsed.fullName || prev.fullName,
            registrationId: parsed.registrationId || prev.registrationId,
            email: parsed.email || prev.email,
          }));
        } catch {}
      }
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('fort_student_session', JSON.stringify(profile));
    }
    toast.success('Account preferences saved.');
  };

  return (
    <div className="bg-[#F1F3F4] text-[#20252B] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-sans text-[#20252B]">
            Candidate Settings & Preferences
          </h1>
          <p className="mt-1 text-xs text-[#66727D]">
            Manage your personal profile, examination targets, and notification subscriptions.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-[0_2px_8px_rgba(38,49,38,0.04)] space-y-4 text-xs">
            <h2 className="text-sm font-bold text-[#20252B] flex items-center gap-2">
              <User className="h-4 w-4 text-[#9CC6E0]" />
              Personal Identification
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-[#20252B] mb-1">Registration ID</label>
                <input
                  type="text"
                  disabled
                  value={profile.registrationId}
                  className="w-full rounded-xl border border-[#DCE2E6] bg-[#F1F3F4] p-2.5 font-mono font-bold text-[#66727D]"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#20252B] mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  className="w-full rounded-xl border border-[#DCE2E6] p-2.5 text-[#20252B] focus:outline-none focus:border-[#9CC6E0]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#20252B] mb-1">Registered Email</label>
              <input
                type="email"
                disabled
                value={profile.email}
                className="w-full rounded-xl border border-[#DCE2E6] bg-[#F1F3F4] p-2.5 font-mono text-[#66727D]"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-[0_2px_8px_rgba(38,49,38,0.04)] space-y-4 text-xs">
            <h2 className="text-sm font-bold text-[#20252B] flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#9CC6E0]" />
              Examination Targets
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-[#20252B] mb-1">Primary Target Exam</label>
                <select
                  value={profile.targetExam}
                  onChange={(e) => setProfile({ ...profile, targetExam: e.target.value })}
                  className="w-full rounded-xl border border-[#DCE2E6] p-2.5 text-[#20252B] focus:outline-none focus:border-[#9CC6E0]"
                >
                  <option value="neet">NEET (UG) Medical</option>
                  <option value="jee">JEE Main / Advanced</option>
                  <option value="upsc">UPSC Civil Services</option>
                  <option value="engineering">Engineering Foundations</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-[#20252B] mb-1">Target Examination Year</label>
                <select
                  value={profile.targetYear}
                  onChange={(e) => setProfile({ ...profile, targetYear: Number(e.target.value) })}
                  className="w-full rounded-xl border border-[#DCE2E6] p-2.5 text-[#20252B] focus:outline-none focus:border-[#9CC6E0]"
                >
                  <option value={2026}>2026 (Upcoming)</option>
                  <option value={2027}>2027 (Long-term)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#DCE2E6]">
              <div>
                <div className="font-semibold text-[#20252B]">Weekly Performance Digests</div>
                <div className="text-[11px] text-[#66727D]">Receive diagnostic reports and weak-chapter suggestions</div>
              </div>
              <input
                type="checkbox"
                checked={profile.emailNotifications}
                onChange={(e) => setProfile({ ...profile, emailNotifications: e.target.checked })}
                className="h-4 w-4 rounded border-[#DCE2E6] text-[#20252B] focus:ring-[#9CC6E0]"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#20252B] text-white text-xs font-semibold hover:bg-[#344034] transition-colors shadow-sm"
            >
              <Save className="h-4 w-4" />
              Save Preferences
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
