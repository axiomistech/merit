import { NextResponse } from 'next/server';
import { getStoredAnnouncements } from '@/lib/admin/store';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const placement = searchParams.get('placement');
    const exam = searchParams.get('exam');

    let announcements = getStoredAnnouncements().filter((a) => a.isActive);

    if (placement) {
      announcements = announcements.filter((a) => a.placement === placement);
    }
    if (exam && exam !== 'all') {
      announcements = announcements.filter(
        (a) => a.targetExam === 'all' || a.targetExam === exam
      );
    }

    return NextResponse.json({
      success: true,
      total: announcements.length,
      data: announcements,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch announcements' },
      { status: 500 }
    );
  }
}
