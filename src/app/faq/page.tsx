import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'FAQ — FORT Learning',
  description:
    'Frequently asked questions regarding examinations, paper access, free paper claim, payments, and OMR generation on FORT Learning.',
};

export default function FaqPage() {
  const faqs = [
    {
      cat: 'Examinations & Practice',
      items: [
        {
          q: 'Which examinations are currently supported on FORT Learning?',
          a: 'FORT Learning supports NEET (UG), JEE Main, JEE Advanced, UPSC Civil Services (Prelims & Mains), and University Engineering semester examinations.',
        },
        {
          q: 'How does the Live OMR system work for NEET?',
          a: 'Whenever you select an answer in an active NEET paper, the corresponding bubble fills instantly on the OMR sheet. If you change your answer, the previous bubble clears and the new one fills. You can also click bubbles directly on the OMR grid.',
        },
        {
          q: 'Can I download and print the OMR sheet?',
          a: 'Yes. You can download an A4 printable vector PDF containing candidate metadata, registration ID, question grid, and authentic bubble alignment.',
        },
      ],
    },
    {
      cat: 'Pricing & Entitlements',
      items: [
        {
          q: 'What is the cost of question papers on FORT Learning?',
          a: 'Your first eligible question paper is 100% free upon account creation. Subsequent papers cost ₹10 each. There are no mandatory recurring monthly subscriptions.',
        },
        {
          q: 'How are payments processed?',
          a: 'Payments are processed through Razorpay using UPI, debit/credit cards, and NetBanking with verified server-side cryptographic signatures.',
        },
        {
          q: 'Can I access papers I already purchased in the past?',
          a: 'Yes. Once an entitlement is granted, your access to that attempt, results, solutions, and OMR sheet is permanent in your account history.',
        },
      ],
    },
    {
      cat: 'Exam Integrity & Grading',
      items: [
        {
          q: 'Are answers or solutions leaked before submission?',
          a: 'Never. Answer keys and solutions are stored server-side and stripped from the client payload during active examination execution. They are only released after submission.',
        },
        {
          q: 'What happens if my internet disconnects during a test?',
          a: 'Answers are buffered and autosaved. If you refresh or briefly disconnect, your progress is recovered from the server snapshot. The server-authoritative timer continues running.',
        },
      ],
    },
  ];

  return (
    <div className="bg-[#F1F3F4] text-[#20252B] min-h-screen py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl text-[#20252B]">Frequently Asked Questions</h1>
          <p className="mt-4 text-base text-[#66727D]">
            Everything you need to know about FORT Learning, examination simulations, and pricing.
          </p>
        </div>

        <div className="mt-16 space-y-12">
          {faqs.map((sec, idx) => (
            <div key={idx} className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#20252B]">
                {sec.cat}
              </h2>
              <div className="space-y-4">
                {sec.items.map((item, i) => (
                  <div key={i} className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-soft">
                    <h3 className="text-base font-bold text-[#20252B]">{item.q}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#66727D]">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
