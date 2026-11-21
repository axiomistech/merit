import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function MaintenancePage() {
  return (
    <div className="bg-[#0B1020] text-[#F5F7FB] min-h-screen py-24 flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-2xl border border-[#263554] bg-[#11182A] p-8 text-center shadow-2xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400/20 text-amber-300">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <h1 className="mt-4 text-xl font-bold text-[#F5F7FB]">Scheduled Infrastructure Maintenance</h1>
        <p className="mt-2 text-xs text-[#A7B0C0] leading-relaxed">
          FORT Learning database and examination simulation engines are undergoing scheduled
          upgrades. Active test attempts are preserved and will resume normally shortly.
        </p>
      </div>
    </div>
  );
}
