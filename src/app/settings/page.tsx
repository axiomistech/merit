'use client';

import React, { useState, useEffect } from 'react';
import { User, Shield, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function StudentSettingsPage() {
  const [profile, setProfile] = useState({
    fullName: 'Candidate',
    registrationId: 'MW-26-000001',
    email: 'candidate@example.com',
    targetExam: 'neet',
    targetYear: 2026,
    emailNotifications: true,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored =
        localStorage.getItem('merit_student_session') || localStorage.getItem('fort_student_session');
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
      localStorage.setItem('merit_student_session', JSON.stringify(profile));
      localStorage.setItem('fort_student_session', JSON.stringify(profile));
    }
    toast.success('Account preferences saved.');
  };

  return (
    <div className="bg-[#FBFBFA] text-[#121316] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#121316]">
            Candidate Settings & Preferences
          </h1>
          <p className="mt-1 text-xs text-[#52525B]">
            Manage your personal profile, examination targets, and notification subscriptions.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="merit-card p-6 shadow-xs space-y-4 text-xs">
            <h2 className="text-sm font-bold text-[#121316] flex items-center gap-2">
              <User className="h-4 w-4 text-[#8C6D3B]" />
              Personal Identification
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-[#121316] mb-1">Candidate ID</label>
                <input
                  type="text"
                  disabled
                  value={profile.registrationId}
                  className="w-full rounded-xl border border-[#E4E4DF] bg-[#F4F4F0] p-2.5 font-mono font-bold text-[#71717A] cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#121316] mb-1">Full Name</label>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  className="w-full rounded-xl border border-[#E4E4DF] bg-[#FFFFFF] p-2.5 text-[#121316] focus:outline-none focus:border-[#121316]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#121316] mb-1">Registered Email</label>
              <input
                type="email"
                disabled
                value={profile.email}
                className="w-full rounded-xl border border-[#E4E4DF] bg-[#F4F4F0] p-2.5 font-mono text-[#71717A] cursor-not-allowed"
              />
            </div>
          </div>

          <div className="merit-card p-6 shadow-xs space-y-4 text-xs">
            <h2 className="text-sm font-bold text-[#121316] flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#8C6D3B]" />
              Examination Targets
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-[#121316] mb-1">Primary Target Exam</label>
                <select
                  value={profile.targetExam}
                  onChange={(e) => setProfile({ ...profile, targetExam: e.target.value })}
                  className="w-full rounded-xl border border-[#E4E4DF] bg-[#FFFFFF] p-2.5 text-[#121316] focus:outline-none focus:border-[#121316]"
                >
                  <option value="neet">NEET (UG) Medical</option>
                  <option value="jee-main">JEE Main Engineering</option>
                  <option value="jee-advanced">JEE Advanced Engineering</option>
                  <option value="gate">GATE Graduate Engineering</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-[#121316] mb-1">Target Examination Year</label>
                <select
                  value={profile.targetYear}
                  onChange={(e) => setProfile({ ...profile, targetYear: Number(e.target.value) })}
                  className="w-full rounded-xl border border-[#E4E4DF] bg-[#FFFFFF] p-2.5 text-[#121316] focus:outline-none focus:border-[#121316]"
                >
                  <option value={2026}>2026 (Upcoming)</option>
                  <option value={2027}>2027 (Long-term)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#E4E4DF]">
              <div>
                <div className="font-semibold text-[#121316]">Performance Digest Notifications</div>
                <div className="text-[11px] text-[#71717A]">Receive periodic diagnostic reports and weak-area suggestions</div>
              </div>
              <input
                type="checkbox"
                checked={profile.emailNotifications}
                onChange={(e) => setProfile({ ...profile, emailNotifications: e.target.checked })}
                className="h-4 w-4 rounded border-[#E4E4DF] text-[#121316] focus:ring-[#8C6D3B]"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="btn-merit-primary px-6 py-2.5 text-xs font-bold uppercase tracking-wider"
            >
              <Save className="h-4 w-4" />
              <span>Save Preferences</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
