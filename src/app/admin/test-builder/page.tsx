'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminTestBuilderRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/question-papers');
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center bg-[#F1F3F4] text-xs text-[#66727D]">
      <div className="flex flex-col items-center gap-2">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#20252B] border-t-transparent" />
        <span>Redirecting to Question Paper Builder Studio...</span>
      </div>
    </div>
  );
}
