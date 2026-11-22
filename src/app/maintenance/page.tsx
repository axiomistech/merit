import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function MaintenancePage() {
  return (
    <div className="bg-[#FBFBFA] text-[#121316] min-h-screen py-24 flex items-center justify-center px-4">
      <div className="max-w-md w-full merit-card p-8 sm:p-10 text-center shadow-xs space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F7F3EB] text-[#8C6D3B]">
          <AlertTriangle className="h-7 w-7" />
        </div>
        <h1 className="text-xl font-bold text-[#121316]">Scheduled Infrastructure Maintenance</h1>
        <p className="text-xs text-[#52525B] leading-relaxed">
          MERITWISE examination and assessment engines are undergoing scheduled
          system upgrades. Active test attempts and candidate records are securely preserved.
        </p>
      </div>
    </div>
  );
}
