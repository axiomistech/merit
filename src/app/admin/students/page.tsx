'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  Search,
  Filter,
  Shield,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileDown,
  Gift,
  X,
} from 'lucide-react';
import {
  getStoredStudents,
  saveStoredStudents,
  AdminStudentRecord,
} from '@/lib/admin/store';
import { logAdminAction } from '@/lib/admin/auth';
import { toast } from 'sonner';

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<AdminStudentRecord[]>([]);
  const [search, setSearch] = useState('');
  const [filterExam, setFilterExam] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<AdminStudentRecord | null>(null);

  useEffect(() => {
    setStudents(getStoredStudents());
  }, []);

  const handleToggleSuspend = (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'active' ? 'suspended' : 'active';
    const updated = students.map((s) => (s.id === id ? { ...s, accountStatus: nextStatus as any } : s));
    setStudents(updated);
    saveStoredStudents(updated);
    logAdminAction('toggle_student_status', 'student', id, `Updated candidate status to ${nextStatus}`);
    toast.success(`Candidate account ${nextStatus === 'active' ? 'reactivated' : 'suspended'}.`);
  };

  const handleGrantAccess = (student: AdminStudentRecord) => {
    const paperName = prompt(`Enter Test Paper title to grant complimentary access to ${student.fullName}:`, 'NEET All-India Mock #2');
    if (!paperName) return;

    const notes = student.administrativeNotes || [];
    const updatedNotes = [...notes, `Granted access to ${paperName} on ${new Date().toLocaleDateString()}`];
    const updated = students.map((s) => (s.id === student.id ? { ...s, administrativeNotes: updatedNotes } : s));
    setStudents(updated);
    saveStoredStudents(updated);
    logAdminAction('grant_student_access', 'student', student.id, `Granted complimentary access to ${paperName}`);
    toast.success(`Access to ${paperName} granted to ${student.fullName}.`);
  };

  const filtered = students.filter((s) => {
    const matchSearch =
      s.fullName.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.registrationId.toLowerCase().includes(search.toLowerCase());
    const matchExam = filterExam === 'all' || s.targetExam.toLowerCase().includes(filterExam.toLowerCase());
    const matchStatus = filterStatus === 'all' || s.accountStatus === filterStatus;
    return matchSearch && matchExam && matchStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Student Profile Drawer / Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-[28px] border border-[#DCE2E6] bg-white p-6 sm:p-8 shadow-2xl my-8 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-[#20252B]">
                  {selectedStudent.registrationId}
                </span>
                <h3 className="text-lg font-bold font-sans text-[#20252B]">
                  {selectedStudent.fullName}
                </h3>
              </div>
              <button onClick={() => setSelectedStudent(null)} className="text-[#66727D]">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-[#F1F3F4] p-4 rounded-2xl border border-[#DCE2E6]">
              <div>
                <span className="text-[#66727D]">Email:</span>
                <div className="font-semibold text-[#20252B]">{selectedStudent.email}</div>
              </div>
              <div>
                <span className="text-[#66727D]">Target Exam:</span>
                <div className="font-semibold text-[#20252B]">{selectedStudent.targetExam}</div>
              </div>
              <div>
                <span className="text-[#66727D]">Tests Attempted:</span>
                <div className="font-mono font-bold text-[#20252B]">{selectedStudent.testsAttempted}</div>
              </div>
              <div>
                <span className="text-[#66727D]">Purchases:</span>
                <div className="font-mono font-bold text-[#20252B]">₹{selectedStudent.totalPurchases}</div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-[#20252B]">Administrative Notes:</span>
              <div className="rounded-xl bg-[#F1F3F4] p-3 text-[11px] space-y-1">
                {selectedStudent.administrativeNotes && selectedStudent.administrativeNotes.length > 0 ? (
                  selectedStudent.administrativeNotes.map((n, i) => (
                    <div key={i}>• {n}</div>
                  ))
                ) : (
                  <div className="text-[#66727D]">No administrative notes recorded yet.</div>
                )}
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={() => handleGrantAccess(selectedStudent)}
                className="flex-1 rounded-full border border-[#20252B] py-2.5 font-bold text-[#20252B] hover:bg-[#F1F3F4]"
              >
                Grant Access
              </button>
              <button
                type="button"
                onClick={() => {
                  handleToggleSuspend(selectedStudent.id, selectedStudent.accountStatus);
                  setSelectedStudent(null);
                }}
                className={`flex-1 rounded-full py-2.5 font-bold text-white shadow-sm ${
                  selectedStudent.accountStatus === 'active' ? 'bg-[#E4002B]' : 'bg-[#20252B]'
                }`}
              >
                {selectedStudent.accountStatus === 'active' ? 'Suspend Student' : 'Reactivate'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE2E6] pb-6">
        <div>
          <h1 className="text-2xl font-bold font-sans text-[#20252B]">
            Student Management & Registrations
          </h1>
          <p className="mt-1 text-xs text-[#66727D]">
            Directory of verified candidates with atomic registration numbers, purchase histories, and attempt telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#E9EEF1] px-3.5 py-1 font-mono text-xs font-bold text-[#20252B]">
            {students.length} Candidates Enrolled
          </span>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-[#66727D]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by FORT ID, Name, or Email..."
            className="w-full rounded-full border border-[#DCE2E6] bg-white py-2 pl-10 pr-4 text-xs text-[#20252B] focus:border-[#20252B] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <select
            value={filterExam}
            onChange={(e) => setFilterExam(e.target.value)}
            className="rounded-full border border-[#DCE2E6] bg-white px-3 py-1.5 text-xs text-[#20252B]"
          >
            <option value="all">All Exams</option>
            <option value="neet">NEET</option>
            <option value="jee">JEE Main</option>
            <option value="upsc">UPSC</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-full border border-[#DCE2E6] bg-white px-3 py-1.5 text-xs text-[#20252B]"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="rounded-[28px] border border-[#DCE2E6] bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#DCE2E6] bg-[#F1F3F4] text-[#66727D]">
              <tr>
                <th className="py-3.5 px-6 font-semibold">Candidate ID</th>
                <th className="py-3.5 px-6 font-semibold">Name & Email</th>
                <th className="py-3.5 px-6 font-semibold">Target Exam</th>
                <th className="py-3.5 px-6 font-semibold">Attempts</th>
                <th className="py-3.5 px-6 font-semibold">Purchases</th>
                <th className="py-3.5 px-6 font-semibold">Status</th>
                <th className="py-3.5 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE2E6]">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-[#F1F3F4]/50 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-[#20252B]">
                    {s.registrationId}
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-[#20252B]">{s.fullName}</div>
                    <div className="text-[11px] text-[#66727D]">{s.email}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="rounded-full bg-white border border-[#DCE2E6] px-2.5 py-0.5 text-[10px] font-bold text-[#20252B]">
                      {s.targetExam}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-mono font-bold text-[#20252B]">
                    {s.testsAttempted}
                  </td>
                  <td className="py-4 px-6 font-mono font-bold text-[#20252B]">
                    ₹{s.totalPurchases}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                        s.accountStatus === 'active'
                          ? 'bg-[#E9EEF1] text-[#20252B]'
                          : 'bg-[#FDEDF0] text-[#E4002B]'
                      }`}
                    >
                      {s.accountStatus}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => setSelectedStudent(s)}
                      className="font-bold text-[#20252B] hover:underline"
                    >
                      View Profile →
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
