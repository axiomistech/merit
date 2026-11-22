'use client';

import React, { useState, useEffect } from 'react';
import { User, Mail, Calendar, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function StudentProfilePage() {
  const [profile, setProfile] = useState({
    fullName: 'Candidate',
    registrationId: 'MW-26-000001',
    email: 'candidate@example.com',
    dateOfBirth: '2005-04-15',
    country: 'India',
    targetExam: 'NEET',
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
    toast.success('Candidate profile updated successfully.');
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto text-[#121316]">
      {/* Header */}
      <div className="border-b border-[#E4E4DF] pb-6">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#E4E4DF] bg-[#FFFFFF] px-3 py-1 text-xs font-semibold text-[#52525B]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#8C6D3B]" />
          <span>Candidate Identity</span>
        </div>
        <h1 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[#121316]">
          Profile & Account Settings
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-[#52525B]">
          Your verified MERITWISE Candidate ID and preparation preferences.
        </p>
      </div>

      <form
        onSubmit={handleSave}
        className="merit-card p-6 sm:p-8 shadow-xs space-y-5 text-xs text-[#121316]"
      >
        <div>
          <label className="block text-[#52525B] font-semibold">Candidate ID (Immutable)</label>
          <input
            type="text"
            disabled
            value={profile.registrationId}
            className="mt-1.5 w-full rounded-xl border border-[#E4E4DF] bg-[#F4F4F0] p-3 font-mono font-bold text-[#121316] cursor-not-allowed"
          />
          <span className="mt-1 block text-[11px] text-[#71717A]">
            Assigned atomically upon registration and associated with all official test attempts, results, and vector OMR sheets.
          </span>
        </div>

        <div>
          <label className="block text-[#52525B] font-semibold">Candidate Full Name</label>
          <input
            type="text"
            required
            value={profile.fullName}
            onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
            className="mt-1.5 w-full rounded-xl border border-[#E4E4DF] bg-[#FFFFFF] p-3 text-sm text-[#121316] focus:border-[#121316] focus:outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-[#52525B] font-semibold">Email Address</label>
          <input
            type="email"
            disabled
            value={profile.email}
            className="mt-1.5 w-full rounded-xl border border-[#E4E4DF] bg-[#F4F4F0] p-3 text-sm text-[#71717A] cursor-not-allowed"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-[#52525B] font-semibold">Date of Birth</label>
            <input
              type="date"
              value={profile.dateOfBirth}
              onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
              className="mt-1.5 w-full rounded-xl border border-[#E4E4DF] bg-[#FFFFFF] p-3 text-sm text-[#121316] focus:border-[#121316] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#52525B] font-semibold">Country / Jurisdiction</label>
            <input
              type="text"
              value={profile.country}
              onChange={(e) => setProfile({ ...profile, country: e.target.value })}
              className="mt-1.5 w-full rounded-xl border border-[#E4E4DF] bg-[#FFFFFF] p-3 text-sm text-[#121316] focus:border-[#121316] focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-[#52525B] font-semibold">Primary Examination Focus</label>
          <select
            value={profile.targetExam}
            onChange={(e) => setProfile({ ...profile, targetExam: e.target.value })}
            className="mt-1.5 w-full rounded-xl border border-[#E4E4DF] bg-[#FFFFFF] p-3 text-sm text-[#121316] focus:border-[#121316] focus:outline-none"
          >
            <option value="NEET">NEET (UG) — Medical Entrance</option>
            <option value="JEE">JEE (Main & Advanced) — Engineering Entrance</option>
            <option value="UPSC">UPSC Civil Services — Prelims & CSAT</option>
            <option value="GATE">GATE — Graduate Aptitude Test in Engineering</option>
          </select>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="btn-merit-primary px-6 py-2.5 text-xs font-bold uppercase tracking-wider"
          >
            <Save className="h-4 w-4" />
            <span>Save Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
}
