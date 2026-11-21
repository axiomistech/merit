import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="bg-[#0B1020] text-[#F5F7FB] min-h-screen py-24 flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-2xl border border-[#263554] bg-[#11182A] p-8 text-center shadow-2xl">
        <div className="font-mono text-5xl font-black text-[#6486C6]">404</div>
        <h1 className="mt-4 text-xl font-bold text-[#F5F7FB]">Resource Not Found</h1>
        <p className="mt-2 text-xs text-[#A7B0C0] leading-relaxed">
          The requested examination paper, question syllabus, or URL does not exist or has been
          archived.
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-[#6486C6] px-6 py-2.5 text-xs font-bold text-[#0B1020] hover:bg-[#7b9bd7]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Safe Ground</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
