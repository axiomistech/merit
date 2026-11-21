import React from 'react';
import Link from 'next/link';
import { Mail, Shield } from 'lucide-react';

export const metadata = {
  title: 'Contact Us — FORT Learning',
  description: 'Reach FORT Learning support and grievance redressal officer.',
};

export default function ContactPage() {
  return (
    <div className="bg-[#F7F5EF] text-[#2E332D] min-h-screen py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl text-[#263126]">Contact FORT Learning</h1>
          <p className="mt-4 text-base text-[#73786E]">
            Our academic and technical support desks are available for candidates and educators.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#E6E5DE] bg-white p-8 shadow-soft">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E9EEE3] text-[#758B62]">
              <Mail className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-[#263126]">Student Support Desk</h3>
            <p className="mt-2 text-xs text-[#73786E] leading-relaxed">
              For question inquiries, attempt recovery, and account assistance.
            </p>
            <div className="mt-4 text-sm font-mono font-bold text-[#758B62]">support@fortlearning.com</div>
          </div>

          <div className="rounded-2xl border border-[#E6E5DE] bg-white p-8 shadow-soft">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FCE8E4] text-[#E8412C]">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-[#263126]">Grievance Redressal</h3>
            <p className="mt-2 text-xs text-[#73786E] leading-relaxed">
              Statutory grievance officer under Information Technology Rules.
            </p>
            <Link
              href="/contact/grievance"
              className="mt-4 inline-block text-xs font-bold text-[#758B62] hover:underline"
            >
              View Grievance Officer Details →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
