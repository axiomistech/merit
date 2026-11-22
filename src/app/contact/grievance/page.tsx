import React from 'react';
import { Shield } from 'lucide-react';

export const metadata = {
  title: 'Grievance Officer — MERITWISE',
  description: 'Statutory Grievance Redressal mechanism under IT Rules.',
};

export default function GrievanceOfficerPage() {
  return (
    <div className="bg-[#FBFBFA] text-[#121316] min-h-screen py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold sm:text-4xl text-[#121316]">Grievance Redressal Mechanism</h1>
        <p className="mt-2 text-xs text-[#71717A]">
          In accordance with Information Technology Act, 2000 and Rules made thereunder.
        </p>

        <div className="mt-8 merit-card p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7F3EB] text-[#8C6D3B]">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#121316]">Designated Grievance Officer</h3>
              <p className="text-xs text-[#71717A]">MERITWISE Redressal Desk</p>
            </div>
          </div>

          <div className="border-t border-[#E4E4DF] pt-4 text-xs sm:text-sm space-y-2 text-[#52525B]">
            <div>
              <strong className="text-[#121316]">Designation:</strong> Grievance & Compliance Officer
            </div>
            <div>
              <strong className="text-[#121316]">Email:</strong> grievance@meritwise.com
            </div>
            <div>
              <strong className="text-[#121316]">Response Time:</strong> Acknowledged within 24 hours; resolved within 15 days as per statutory timelines.
            </div>
            <div>
              <strong className="text-[#121316]">Platform Address:</strong> MERITWISE, MERITWISE.COM
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
