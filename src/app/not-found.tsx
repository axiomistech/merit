import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="bg-[#F1F3F4] text-[#20252B] min-h-screen py-24 flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-2xl border border-[#DCE2E6] bg-white p-8 sm:p-10 text-center shadow-[0_4px_24px_rgba(38,49,38,0.06)]">
        <div className="font-mono text-5xl font-black text-[#20252B]">404</div>
        <h1 className="mt-4 text-xl font-bold text-[#20252B] font-sans">Resource Not Found</h1>
        <p className="mt-2 text-xs text-[#66727D] leading-relaxed">
          The requested examination paper, question syllabus, or URL does not exist or has been
          archived.
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-[#9CC6E0] px-6 py-2.5 text-xs font-bold text-[#20252B] hover:bg-[#C90026] transition-all shadow-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Safe Ground</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
