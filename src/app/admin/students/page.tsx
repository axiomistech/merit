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
      freeClaim: 'Claimed',
      status: 'active',
      joined: '2026-11-18',
    },
    {
      id: 'FORT-26-000002',
      name: 'Priya Iyer',
      email: 'priya@example.com',
      exam: 'JEE Main',
      attempts: 2,
      freeClaim: 'Claimed',
      status: 'active',
      joined: '2026-11-19',
    },
    {
      id: 'FORT-26-000003',
      name: 'Rohan Deshmukh',
      email: 'rohan@example.com',
      exam: 'UPSC CSE',
      attempts: 1,
      freeClaim: 'Claimed',
      status: 'active',
      joined: '2026-11-20',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#263126] font-serif">Candidate Registrations</h1>
          <p className="mt-1 text-xs text-[#73786E]">
            Candidate database with atomic registration sequences and attempt histories.
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-[#92958D]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by FORT ID, Name, or Email..."
            className="w-72 rounded-xl border border-[#E6E5DE] bg-white py-2 pl-10 pr-3 text-xs text-[#263126] placeholder-[#92958D] focus:outline-none focus:border-[#9CAF88]"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-[#E6E5DE] bg-white shadow-[0_2px_8px_rgba(38,49,38,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#E6E5DE] bg-[#F7F5EF] text-[#73786E]">
              <tr>
                <th className="p-4 font-semibold">Registration ID</th>
                <th className="p-4 font-semibold">Candidate Name</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Exam</th>
                <th className="p-4 font-semibold">Attempts</th>
                <th className="p-4 font-semibold">Free Paper</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ECEAE4] text-[#2E332D]">
              {students.map((s) => (
                <tr key={s.id} className="hover:bg-[#F7F5EF]/60 transition-colors">
                  <td className="p-4 font-mono font-bold text-[#758B62]">{s.id}</td>
                  <td className="p-4 font-semibold text-[#263126]">{s.name}</td>
                  <td className="p-4 text-[#73786E]">{s.email}</td>
                  <td className="p-4">
                    <span className="rounded-full bg-[#F7F5EF] border border-[#E6E5DE] px-2.5 py-0.5 text-[10px] font-bold text-[#73786E]">
                      {s.exam}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-[#263126]">{s.attempts}</td>
                  <td className="p-4 text-[#758B62] font-semibold">{s.freeClaim}</td>
                  <td className="p-4">
                    <span className="rounded-full bg-[#E9EEE3] px-2.5 py-0.5 text-[10px] font-bold text-[#758B62] uppercase">
                      {s.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-xs text-[#758B62] hover:text-[#263126] font-semibold">
                      View Dossier
                    </button>
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
