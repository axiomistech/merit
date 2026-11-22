import React from 'react';
import Link from 'next/link';
import { Mail, Shield } from 'lucide-react';

export const metadata = {
  title: 'Contact Us — MERITWISE',
  description: 'Reach MERITWISE academic support and grievance redressal officer.',
};

export default function ContactPage() {
  return (
    <div className="bg-[#FBFBFA] text-[#121316] min-h-screen py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#E4E4DF] bg-[#FFFFFF] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#52525B]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8C6D3B]" />
            MERITWISE DESK
          </div>
          <h1 className="text-4xl font-extrabold sm:text-5xl text-[#121316]">Contact MERITWISE</h1>
          <p className="mt-2 text-base text-[#52525B]">
            Our academic and technical support desks are available for candidates and administrators.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="merit-card p-8 shadow-xs space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7F3EB] text-[#8C6D3B]">
              <Mail className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-[#121316]">Candidate Support Desk</h3>
            <p className="text-xs text-[#52525B] leading-relaxed">
              For question inquiries, attempt verification, and candidate profile assistance.
            </p>
            <div className="pt-2 text-sm font-mono font-bold text-[#121316]">support@meritwise.com</div>
          </div>

          <div className="merit-card p-8 shadow-xs space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7F3EB] text-[#8C6D3B]">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-[#121316]">Grievance Redressal</h3>
            <p className="text-xs text-[#52525B] leading-relaxed">
              Statutory grievance officer under digital intermediary rules.
            </p>
            <Link
              href="/contact/grievance"
              className="inline-block text-xs font-semibold text-[#121316] hover:text-[#8C6D3B] hover:underline"
            >
              View Grievance Officer Details →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
