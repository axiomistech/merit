import React from 'react';
import Link from 'next/link';
import { Mail, Shield } from 'lucide-react';

export const metadata = {
  title: 'Contact Us — FORT Learning',
  description: 'Reach FORT Learning support and grievance redressal officer.',
};

export default function ContactPage() {
  return (
    <div className="bg-[#F1F3F4] text-[#20252B] min-h-screen py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl text-[#20252B]">Contact FORT Learning</h1>
          <p className="mt-4 text-base text-[#66727D]">
            Our academic and technical support desks are available for candidates and educators.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#DCE2E6] bg-white p-8 shadow-soft">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E9EEF1] text-[#20252B]">
              <Mail className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-[#20252B]">Student Support Desk</h3>
            <p className="mt-2 text-xs text-[#66727D] leading-relaxed">
              For question inquiries, attempt recovery, and account assistance.
            </p>
            <div className="mt-4 text-sm font-mono font-bold text-[#20252B]">support@fortlearning.com</div>
          </div>

          <div className="rounded-2xl border border-[#DCE2E6] bg-white p-8 shadow-soft">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDEDF0] text-[#E4002B]">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-[#20252B]">Grievance Redressal</h3>
            <p className="mt-2 text-xs text-[#66727D] leading-relaxed">
              Statutory grievance officer under Information Technology Rules.
            </p>
            <Link
              href="/contact/grievance"
              className="mt-4 inline-block text-xs font-bold text-[#20252B] hover:underline"
            >
              View Grievance Officer Details →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
