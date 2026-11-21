'use client';

import React, { useState } from 'react';
import { Users, Search, Filter, Shield, Clock } from 'lucide-react';

export default function AdminStudentsPage() {
  const [search, setSearch] = useState('');

  const students = [
    {
      id: 'FORT-26-000001',
      name: 'Aarav Sharma',
      email: 'aarav@example.com',
      exam: 'NEET',
      attempts: 4,
      freeClaim: 'Used',
      status: 'active',
      joined: '2026-11-18',
    },
    {
      id: 'FORT-26-000002',
      name: 'Priya Iyer',
      email: 'priya@example.com',
      exam: 'JEE Main',
      attempts: 2,
      freeClaim: 'Used',
      status: 'active',
      joined: '2026-11-19',
    },
    {
      id: 'FORT-26-000003',
      name: 'Rohan Deshmukh',
      email: 'rohan@example.com',
      exam: 'UPSC CSE',
      attempts: 1,
      freeClaim: 'Used',
      status: 'active',
      joined: '2026-11-20',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#F5F7FB]">Student Registrations</h1>
          <p className="text-xs text-[#A7B0C0]">
            Candidate database with atomic registration sequences and attempt histories.
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#7C8799]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by FORT ID, Name, or Email..."
            className="w-72 rounded-xl border border-[#1D2940] bg-[#0B1020] py-2 pl-9 pr-3 text-xs text-[#F5F7FB] placeholder-[#7C8799] focus:outline-none focus:border-[#6486C6]"
          />
        </div>
      </div>

      <div className="rounded-xl border border-[#1D2940] bg-[#0B1020] overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-[#1D2940] bg-[#11182A] text-[#A7B0C0]">
            <tr>
              <th className="p-4">Registration ID</th>
              <th className="p-4">Candidate Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Exam</th>
              <th className="p-4">Attempts</th>
              <th className="p-4">Free Paper</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1D2940]">
            {students.map((s) => (
              <tr key={s.id} className="hover:bg-[#11182A]/50 transition-colors">
                <td className="p-4 font-mono font-bold text-[#6486C6]">{s.id}</td>
                <td className="p-4 font-semibold text-[#F5F7FB]">{s.name}</td>
                <td className="p-4 text-[#A7B0C0]">{s.email}</td>
                <td className="p-4">
                  <span className="rounded bg-[#1D2940] px-2 py-0.5 text-[10px] font-bold text-[#A7B0C0]">
                    {s.exam}
                  </span>
                </td>
                <td className="p-4 font-mono text-[#F5F7FB]">{s.attempts}</td>
                <td className="p-4 text-[#10B981]">{s.freeClaim}</td>
                <td className="p-4">
                  <span className="rounded bg-[#10B981]/20 px-2 py-0.5 text-[10px] font-bold text-[#10B981] uppercase">
                    {s.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-xs text-[#6486C6] hover:underline font-semibold">
                    View Dossier
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
