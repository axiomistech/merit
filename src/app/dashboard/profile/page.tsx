'use client';

import React, { useState, useEffect } from 'react';
import { User, Mail, Shield, Calendar, Globe, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function StudentProfilePage() {
  const [profile, setProfile] = useState({
    fullName: 'Candidate',
    registrationId: 'FORT-26-000001',
    email: 'student@example.com',
    dateOfBirth: '2005-04-15',
    country: 'India',
    targetExam: 'FORT NEET (UG)',
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
    toast.success('Candidate profile updated successfully.');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-3xl mx-auto">
      <div className="border-b border-[#263554] pb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#6486C6]">
          Candidate Identity
        </span>
        <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#F5F7FB]">
          Profile & Account Settings
        </h1>
        <p className="text-xs text-[#A7B0C0]">
          Your immutable FORT Registration ID and personal contact details.
        </p>
      </div>

      <form onSubmit={handleSave} className="rounded-2xl border border-[#263554] bg-[#11182A] p-6 space-y-4 text-xs">
        <div>
          <label className="block text-[#A7B0C0] font-medium">FORT Registration ID (Immutable)</label>
          <input
            type="text"
            disabled
            value={profile.registrationId}
            className="mt-1 w-full rounded-lg border border-[#263554] bg-[#0B1020] p-2.5 font-mono font-bold text-[#6486C6] cursor-not-allowed"
          />
          <span className="text-[10px] text-[#7C8799]">
            Assigned atomically upon registration and associated with all official test attempts.
          </span>
        </div>

        <div>
          <label className="block text-[#A7B0C0] font-medium">Candidate Full Name</label>
          <input
            type="text"
            required
            value={profile.fullName}
            onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
            className="mt-1 w-full rounded-lg border border-[#263554] bg-[#172033] p-2.5 text-[#F5F7FB] focus:outline-none focus:border-[#6486C6]"
          />
        </div>

        <div>
          <label className="block text-[#A7B0C0] font-medium">Email Address</label>
          <input
            type="email"
            disabled
            value={profile.email}
            className="mt-1 w-full rounded-lg border border-[#263554] bg-[#0B1020] p-2.5 text-[#A7B0C0] cursor-not-allowed"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[#A7B0C0] font-medium">Date of Birth</label>
            <input
              type="date"
              value={profile.dateOfBirth}
              onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
              className="mt-1 w-full rounded-lg border border-[#263554] bg-[#172033] p-2.5 text-[#F5F7FB] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#A7B0C0] font-medium">Country</label>
            <input
              type="text"
              value={profile.country}
              onChange={(e) => setProfile({ ...profile, country: e.target.value })}
              className="mt-1 w-full rounded-lg border border-[#263554] bg-[#172033] p-2.5 text-[#F5F7FB] focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-1.5 rounded-xl bg-[#6486C6] px-6 py-2.5 text-xs font-bold text-[#0B1020] hover:bg-[#7b9bd7]"
          >
            <Save className="h-4 w-4" />
            <span>Save Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
}
