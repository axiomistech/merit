import React from 'react';
import Link from 'next/link';
import { Mail, Shield, MessageSquare, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'Contact Us — FORT Learning',
  description: 'Reach FORT Learning support and grievance redressal officer.',
};

export default function ContactPage() {
  return (
    <div className="bg-[#0B1020] text-[#F5F7FB] min-h-screen py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Contact FORT Learning</h1>
          <p className="mt-4 text-base text-[#A7B0C0]">
            Our academic and technical support desks are available for candidates and educators.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#263554] bg-[#11182A] p-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#6486C6]/20 text-[#6486C6]">
              <Mail className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-[#F5F7FB]">Student Support Desk</h3>
            <p className="mt-2 text-xs text-[#A7B0C0] leading-relaxed">
              For question inquiries, attempt recovery, and account assistance.
            </p>
            <div className="mt-4 text-sm font-mono text-[#6486C6]">support@fortlearning.com</div>
          </div>

          <div className="rounded-2xl border border-[#263554] bg-[#11182A] p-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EF4444]/20 text-[#EF4444]">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-[#F5F7FB]">Grievance Redressal</h3>
            <p className="mt-2 text-xs text-[#A7B0C0] leading-relaxed">
              Statutory grievance officer under Information Technology Rules.
            </p>
            <Link
              href="/contact/grievance"
              className="mt-4 inline-block text-xs font-semibold text-[#6486C6] hover:underline"
            >
              View Grievance Officer Details →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
