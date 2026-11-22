'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function DedicatedReviewRedirectPage() {
  const params = useParams();
  const router = useRouter();
  const attemptId = (params?.attemptId as string) || '';

  useEffect(() => {
    if (attemptId) {
      router.replace(`/dashboard/results/${attemptId}?tab=solutions`);
    } else {
      router.replace('/dashboard');
    }
  }, [attemptId, router]);

  return (
    <div className="flex h-screen items-center justify-center bg-[#F1F3F4] text-xs text-[#66727D]">
      <div className="flex flex-col items-center gap-2">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#20252B] border-t-transparent" />
        <span>Loading Question Solutions Review...</span>
      </div>
    </div>
  );
}
