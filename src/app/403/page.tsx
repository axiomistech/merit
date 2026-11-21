import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function ForbiddenPage() {
  return (
    <div className="bg-[#0B1020] text-[#F5F7FB] min-h-screen py-24 flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-2xl border border-[#263554] bg-[#11182A] p-8 text-center shadow-2xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EF4444]/20 text-[#EF4444]">
          <ShieldAlert className="h-8 w-8" />
        </div>
        <div className="mt-4 font-mono text-4xl font-black text-[#EF4444]">403</div>
        <h1 className="mt-2 text-xl font-bold text-[#F5F7FB]">Access Prohibited</h1>
        <p className="mt-2 text-xs text-[#A7B0C0] leading-relaxed">
          You do not have administrative clearance to access this module. All unauthorized access
          attempts are recorded in the security audit logs.
        </p>

        <div className="mt-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-[#6486C6] px-6 py-2.5 text-xs font-bold text-[#0B1020] hover:bg-[#7b9bd7]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Candidate Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
