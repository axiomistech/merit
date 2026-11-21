import { NextResponse } from 'next/server';
import { getAttemptsStore } from '@/lib/server/backendStore';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ attemptId: string }> }
) {
  try {
    const { attemptId } = await params;
    const body = await req.json();
    const { questionVersionId, selectedOptions, numericalValue, markedForReview } = body;

    const store = getAttemptsStore();
    const attempt = store[attemptId];

    if (!attempt) {
      return NextResponse.json(
        { success: false, error: `Attempt '${attemptId}' not found on server` },
        { status: 404 }
      );
    }

    if (attempt.status !== 'active') {
      return NextResponse.json(
        { success: false, error: 'Cannot update responses for a completed attempt' },
        { status: 400 }
      );
    }

    // Persist response state
    attempt.responses[questionVersionId] = {
      questionVersionId,
      selectedOptions: selectedOptions || [],
      numericalValue: numericalValue !== undefined ? numericalValue : null,
      isAnswered: (selectedOptions && selectedOptions.length > 0) || numericalValue !== undefined,
      markedForReview: !!markedForReview,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: 'Response persisted authoritatively on server',
      savedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to autosave response' },
      { status: 500 }
    );
  }
}
