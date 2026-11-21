import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function MaintenancePage() {
  return (
    <div className="bg-[#F1F3F4] text-[#20252B] min-h-screen py-24 flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-2xl border border-[#DCE2E6] bg-white p-8 sm:p-10 text-center shadow-[0_4px_24px_rgba(38,49,38,0.06)]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FEF3C7] text-[#92400E]">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <h1 className="mt-4 text-xl font-bold text-[#20252B] font-serif">Scheduled Infrastructure Maintenance</h1>
        <p className="mt-2 text-xs text-[#66727D] leading-relaxed">
          FORT Learning database and examination simulation engines are undergoing scheduled
          upgrades. Active test attempts are preserved and will resume normally shortly.
        </p>
      </div>
    </div>
  );
}
