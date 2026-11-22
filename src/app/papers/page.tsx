'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * MERITWISE Protected Papers Controller
 * 
 * Public question-paper repository has been permanently removed.
 * Question papers are discoverable and accessible solely within
 * the authenticated student dashboard (/dashboard/qp-prep).
 * 
 * Unauthenticated visitors are redirected to the login flow.
 * Authenticated candidates are routed to their personal dashboard.
 */
export default function ProtectedPapersGateway() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const session =
        localStorage.getItem('merit_student_session') ||
        localStorage.getItem('fort_student_session');

      if (session) {
        // Authenticated candidate -> redirect to private student question paper workspace
        router.replace('/dashboard/qp-prep');
      } else {
        // Unauthenticated visitor -> redirect to authentication flow
        router.replace('/login?redirect=/dashboard/qp-prep');
      }
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#F8FAF6] flex items-center justify-center p-6 text-center">
      <div className="space-y-3">
        <div className="h-8 w-8 mx-auto animate-spin rounded-full border-2 border-[#151A15] border-t-transparent" />
        <p className="text-xs font-bold uppercase tracking-wider text-[#75896A]">
          Verifying authorization...
        </p>
      </div>
    </div>
  );
}
