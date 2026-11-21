import React from 'react';
import { Shield } from 'lucide-react';

export const metadata = {
  title: 'Grievance Officer — FORT Learning',
  description: 'Statutory Grievance Redressal mechanism under IT Rules.',
};

export default function GrievanceOfficerPage() {
  return (
    <div className="bg-[#0B1020] text-[#F5F7FB] min-h-screen py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Grievance Redressal Mechanism</h1>
        <p className="mt-2 text-xs text-[#7C8799]">
          In accordance with Information Technology Act, 2000 and Rules made thereunder.
        </p>

        <div className="mt-8 rounded-2xl border border-[#263554] bg-[#11182A] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#6486C6]/20 text-[#6486C6]">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F5F7FB]">Designated Grievance Officer</h3>
              <p className="text-xs text-[#A7B0C0]">FORT Learning Redressal Desk</p>
            </div>
          </div>

          <div className="border-t border-[#263554] pt-4 text-xs sm:text-sm space-y-2 text-[#A7B0C0]">
            <div>
              <strong className="text-[#F5F7FB]">Designation:</strong> Grievance & Compliance Officer
            </div>
            <div>
              <strong className="text-[#F5F7FB]">Email:</strong> grievance@fortlearning.com
            </div>
            <div>
              <strong className="text-[#F5F7FB]">Response Time:</strong> Acknowledged within 24 hours; resolved within 15 days as per statutory timelines.
            </div>
            <div>
              <strong className="text-[#F5F7FB]">Platform Address:</strong> FORT Learning, FORTLEARNING.COM
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
