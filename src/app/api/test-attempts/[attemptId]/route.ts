import { NextResponse } from 'next/server';
import { getAttemptsStore } from '@/lib/server/backendStore';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ attemptId: string }> }
) {
  try {
    const { attemptId } = await params;
    const store = getAttemptsStore();
    const attempt = store[attemptId];

    if (!attempt) {
      return NextResponse.json(
        { success: false, error: `Examination attempt '${attemptId}' not found.` },
        { status: 404 }
      );
    }

    const now = new Date();
    const deadline = new Date(attempt.deadline_at);
    const isExpired = now.getTime() > deadline.getTime();

    // Check if auto-submission is required on recovery
    if (isExpired && attempt.status === 'active') {
      attempt.status = 'auto_submitted';
      attempt.submitted_at = deadline.toISOString();
    }

    // SANITIZATION: Never expose correct answer keys or explanations during active/un-submitted examination
    const sanitizedQuestions = (attempt.questionsSnapshot || []).map((q: any) => ({
      id: q.id,
      versionId: q.versionId,
      displayNumber: q.displayNumber,
      questionType: q.questionType,
      subjectSlug: q.subjectSlug,
      subjectName: q.subjectName,
      chapterSlug: q.chapterSlug,
      conceptName: q.conceptName,
      difficulty: q.difficulty,
      marks: q.marks,
      negativeMarks: q.negativeMarks,
      text: q.text,
      imageUrl: q.imageUrl,
      options: q.options,
    }));

    return NextResponse.json({
      success: true,
      data: {
        attemptId: attempt.id,
        paperName: attempt.paperName,
        paperSlug: attempt.paperSlug,
        status: attempt.status,
        startedAt: attempt.started_at,
        deadlineAt: attempt.deadline_at,
        serverTime: now.toISOString(),
        durationMinutes: attempt.paperSnapshot?.durationMinutes || 180,
        totalQuestions: sanitizedQuestions.length,
        maxMarks: attempt.paperSnapshot?.maxMarks || 720,
        responses: attempt.responses || {},
        questions: sanitizedQuestions,
        result: attempt.result || null,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to retrieve test attempt' },
      { status: 500 }
    );
  }
}
