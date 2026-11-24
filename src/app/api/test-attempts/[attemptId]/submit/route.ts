import { NextResponse } from 'next/server';
import { getAttemptsStore, saveAttemptsStore } from '@/lib/server/backendStore';
import { evaluateAttempt } from '@/lib/scoring/engine';
import { SAMPLE_JEE_MAIN_PAPER, SAMPLE_JEE_MAIN_QUESTIONS } from '@/data/otherExamsData';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ attemptId: string }> }
) {
  try {
    const { attemptId } = await params;
    const body = await req.json().catch(() => ({}));
    const clientAnswers = body.answers;

    const store = getAttemptsStore();
    let attempt = store[attemptId];

    if (!attempt && (attemptId.includes('jee') || attemptId.includes('demo'))) {
      const now = new Date();
      attempt = {
        id: attemptId,
        paperName: SAMPLE_JEE_MAIN_PAPER.name,
        paperSlug: SAMPLE_JEE_MAIN_PAPER.slug,
        status: 'active',
        started_at: new Date(now.getTime() - 1000 * 60 * 30).toISOString(),
        deadline_at: new Date(now.getTime() + 1000 * 60 * 150).toISOString(),
        paperSnapshot: {
          durationMinutes: SAMPLE_JEE_MAIN_PAPER.durationMinutes,
          maxMarks: SAMPLE_JEE_MAIN_PAPER.totalMarks,
        },
        questionsSnapshot: SAMPLE_JEE_MAIN_QUESTIONS,
        responses: {},
      };
      store[attemptId] = attempt;
    }

    if (!attempt) {
      return NextResponse.json(
        { success: false, error: `Attempt '${attemptId}' not found on server` },
        { status: 404 }
      );
    }

    if (attempt.status === 'submitted' || attempt.status === 'evaluated') {
      return NextResponse.json({
        success: true,
        message: 'Attempt already finalized',
        result: attempt.result,
      });
    }

    const now = new Date();
    const deadline = new Date(attempt.deadline_at);
    const isOverdue = now.getTime() > deadline.getTime() + 10000; // 10s grace period

    // Merge server autosaved responses with any final client payload
    const effectiveAnswers = {
      ...attempt.responses,
      ...(clientAnswers || {}),
    };

    const startTime = new Date(attempt.started_at).getTime();
    const durationSeconds = Math.min(
      Math.floor((now.getTime() - startTime) / 1000),
      attempt.paperSnapshot.durationMinutes * 60
    );

    // SECTION 12 MANDATORY: BACKEND AUTHORITATIVE EVALUATION
    const evaluation = evaluateAttempt({
      questions: attempt.questionsSnapshot.map((q: any) => ({
        questionVersionId: q.versionId,
        displayNumber: q.displayNumber,
        questionType: q.questionType,
        subjectSlug: q.subjectSlug,
        subjectName: q.subjectName,
        conceptSlug: q.conceptSlug,
        conceptName: q.conceptName,
        difficulty: q.difficulty,
        marks: q.marks,
        negativeMarks: q.negativeMarks,
        correctOptions: q.answerKey?.correctOptions,
        numericalValue: q.answerKey?.numericalValue,
        numericalTolerance: q.answerKey?.numericalTolerance,
      })),
      answers: effectiveAnswers,
      durationSeconds,
    });

    attempt.status = isOverdue ? 'auto_submitted' : 'submitted';
    attempt.submitted_at = now.toISOString();
    attempt.durationSeconds = durationSeconds;
    attempt.result = evaluation;

    saveAttemptsStore();

    return NextResponse.json({
      success: true,
      message: 'Test submitted and evaluated authoritatively',
      data: {
        attemptId: attempt.id,
        paperName: attempt.paperName,
        status: attempt.status,
        submittedAt: attempt.submitted_at,
        durationSeconds: attempt.durationSeconds,
        evaluation,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to submit attempt' },
      { status: 500 }
    );
  }
}
