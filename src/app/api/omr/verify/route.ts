import { NextResponse } from 'next/server';
import { getStoredOMRRecords, saveStoredOMRRecords } from '@/lib/admin/store';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { recordId, resolvedBubbles, reviewerName, reviewNotes } = body;

    const records = getStoredOMRRecords();
    const index = records.findIndex((r) => r.id === recordId);

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: `OMR record '${recordId}' not found` },
        { status: 404 }
      );
    }

    const rec = records[index];
    const updatedBubbles = rec.bubbles.map((b) => {
      if (resolvedBubbles && resolvedBubbles[b.qNum] !== undefined) {
        return {
          ...b,
          resolvedBubble: resolvedBubbles[b.qNum],
          isAmbiguous: false,
        };
      }
      return b;
    });

    const updatedRecord = {
      ...rec,
      status: 'verified' as const,
      ambiguousCount: 0,
      reviewerName: reviewerName || 'Admin Evaluator',
      reviewNotes: reviewNotes || 'Manually inspected and verified. Ambiguities resolved.',
      bubbles: updatedBubbles,
    };

    records[index] = updatedRecord;
    saveStoredOMRRecords(records);

    return NextResponse.json({
      success: true,
      message: 'OMR verified and official marks published',
      data: updatedRecord,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to verify OMR sheet' },
      { status: 500 }
    );
  }
}
