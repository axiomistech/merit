import { NextResponse } from 'next/server';
import { getStoredNotifications } from '@/lib/admin/store';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const audience = searchParams.get('audience');

    let notifs = getStoredNotifications();
    if (audience && audience !== 'all') {
      notifs = notifs.filter(
        (n) => n.targetAudience === audience || n.targetAudience === 'all_students'
      );
    }

    return NextResponse.json({
      success: true,
      total: notifs.length,
      data: notifs,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}
