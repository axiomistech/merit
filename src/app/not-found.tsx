import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="bg-[#F7F5EF] text-[#2E332D] min-h-screen py-24 flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-2xl border border-[#E6E5DE] bg-white p-8 sm:p-10 text-center shadow-[0_4px_24px_rgba(38,49,38,0.06)]">
        <div className="font-mono text-5xl font-black text-[#758B62]">404</div>
        <h1 className="mt-4 text-xl font-bold text-[#263126] font-serif">Resource Not Found</h1>
        <p className="mt-2 text-xs text-[#73786E] leading-relaxed">
          The requested examination paper, question syllabus, or URL does not exist or has been
          archived.
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-[#9CAF88] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#8ea07a] transition-all shadow-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Safe Ground</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
