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
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#DCE2E6] pb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#20252B]">
          Candidate Identity
        </span>
        <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#20252B] font-sans">
          Profile & Account Settings
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-[#66727D]">
          Your immutable FORT Registration ID and personal contact details.
        </p>
      </div>

      <form
        onSubmit={handleSave}
        className="rounded-2xl border border-[#DCE2E6] bg-white p-6 sm:p-8 shadow-[0_2px_8px_rgba(38,49,38,0.04)] space-y-5 text-xs text-[#20252B]"
      >
        <div>
          <label className="block text-[#66727D] font-medium">FORT Registration ID (Immutable)</label>
          <input
            type="text"
            disabled
            value={profile.registrationId}
            className="mt-1.5 w-full rounded-xl border border-[#DCE2E6] bg-[#F1F3F4] p-3 font-mono font-bold text-[#20252B] cursor-not-allowed"
          />
          <span className="mt-1 block text-[11px] text-[#66727D]">
            Assigned atomically upon registration and associated with all official test attempts and OMR records.
          </span>
        </div>

        <div>
          <label className="block text-[#66727D] font-medium">Candidate Full Name</label>
          <input
            type="text"
            required
            value={profile.fullName}
            onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
            className="mt-1.5 w-full rounded-xl border border-[#DCE2E6] bg-white p-3 text-sm text-[#20252B] focus:border-[#9CC6E0] focus:ring-1 focus:ring-[#9CC6E0] focus:outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-[#66727D] font-medium">Email Address</label>
          <input
            type="email"
            disabled
            value={profile.email}
            className="mt-1.5 w-full rounded-xl border border-[#DCE2E6] bg-[#F1F3F4] p-3 text-sm text-[#66727D] cursor-not-allowed"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-[#66727D] font-medium">Date of Birth</label>
            <input
              type="date"
              value={profile.dateOfBirth}
              onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
              className="mt-1.5 w-full rounded-xl border border-[#DCE2E6] bg-white p-3 text-sm text-[#20252B] focus:border-[#9CC6E0] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#66727D] font-medium">Country / Jurisdiction</label>
            <input
              type="text"
              value={profile.country}
              onChange={(e) => setProfile({ ...profile, country: e.target.value })}
              className="mt-1.5 w-full rounded-xl border border-[#DCE2E6] bg-white p-3 text-sm text-[#20252B] focus:border-[#9CC6E0] focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-[#66727D] font-medium">Primary Examination Focus</label>
          <select
            value={profile.targetExam}
            onChange={(e) => setProfile({ ...profile, targetExam: e.target.value })}
            className="mt-1.5 w-full rounded-xl border border-[#DCE2E6] bg-white p-3 text-sm text-[#20252B] focus:border-[#9CC6E0] focus:outline-none"
          >
            <option value="FORT NEET (UG)">FORT NEET (UG) Medical</option>
            <option value="FORT JEE Main">FORT JEE Main Engineering</option>
            <option value="FORT JEE Advanced">FORT JEE Advanced IIT</option>
            <option value="FORT UPSC Civil Services">FORT UPSC Civil Services</option>
            <option value="FORT University Engineering">FORT University Engineering</option>
          </select>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-[#9CC6E0] px-6 py-3 text-xs font-bold text-[#20252B] shadow-sm hover:bg-[#C90026] transition-all"
          >
            <Save className="h-4 w-4" />
            <span>Save Profile Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
}
