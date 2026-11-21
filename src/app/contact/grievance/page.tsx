import React from 'react';
import { Shield } from 'lucide-react';

export const metadata = {
  title: 'Grievance Officer — FORT Learning',
  description: 'Statutory Grievance Redressal mechanism under IT Rules.',
};

export default function GrievanceOfficerPage() {
  return (
    <div className="bg-[#F7F5EF] text-[#2E332D] min-h-screen py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold sm:text-4xl text-[#263126]">Grievance Redressal Mechanism</h1>
        <p className="mt-2 text-xs text-[#92958D]">
          In accordance with Information Technology Act, 2000 and Rules made thereunder.
        </p>

        <div className="mt-8 rounded-2xl border border-[#E6E5DE] bg-white p-6 sm:p-8 space-y-4 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E9EEE3] text-[#758B62]">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#263126]">Designated Grievance Officer</h3>
              <p className="text-xs text-[#73786E]">FORT Learning Redressal Desk</p>
            </div>
          </div>

          <div className="border-t border-[#ECEAE4] pt-4 text-xs sm:text-sm space-y-2 text-[#73786E]">
            <div>
              <strong className="text-[#263126]">Designation:</strong> Grievance & Compliance Officer
            </div>
            <div>
              <strong className="text-[#263126]">Email:</strong> grievance@fortlearning.com
            </div>
            <div>
              <strong className="text-[#263126]">Response Time:</strong> Acknowledged within 24 hours; resolved within 15 days as per statutory timelines.
            </div>
            <div>
              <strong className="text-[#263126]">Platform Address:</strong> FORT Learning, FORTLEARNING.COM
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
