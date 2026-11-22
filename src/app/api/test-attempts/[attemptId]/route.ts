import { NextResponse } from 'next/server';
import { getAttemptsStore } from '@/lib/server/backendStore';
import { SAMPLE_NEET_PAPER, getFullNeet180Questions } from '@/data/seedData';
import { getStoredTests } from '@/lib/admin/store';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ attemptId: string }> }
) {
  try {
    const { attemptId } = await params;
    const store = getAttemptsStore();
    let attempt = store[attemptId];

    // If attempt is not yet in store (e.g. direct link or fresh load), auto-initialize authoritatively
    if (!attempt) {
      const paper = SAMPLE_NEET_PAPER;
      const durationMinutes = paper.durationMinutes || 200;
      const now = new Date();
      const deadline = new Date(now.getTime() + durationMinutes * 60 * 1000);
      const questions = getFullNeet180Questions();

      const questionsSnapshot = questions.map((q) => ({
        versionId: q.versionId,
        displayNumber: q.displayNumber,
        questionType: q.questionType,
        subjectSlug: q.subjectSlug,
        subjectName: q.subjectName,
        conceptSlug: q.conceptSlug || '',
        conceptName: q.conceptName || '',
        difficulty: q.difficulty,
        marks: q.marks,
        negativeMarks: q.negativeMarks,
        text: q.text,
        options: q.options,
        answerKey: q.answerKey,
        explanation: q.explanation,
      }));

      attempt = {
        id: attemptId,
        studentId: 'usr_candidate_01',
        studentRegistrationId: 'FORT-26-000001',
        studentName: 'Candidate',
        paperId: paper.id,
        paperSlug: paper.slug,
        paperName: paper.name,
        paperSnapshot: {
          id: paper.id,
          name: paper.name,
          slug: paper.slug,
          durationMinutes,
          maxMarks: (paper as any).maxMarks || 720,
          negativeMarkingScheme: '-1 for incorrect, +4 for correct',
        },
        questionsSnapshot,
        status: 'active',
        started_at: now.toISOString(),
        deadline_at: deadline.toISOString(),
        submitted_at: null,
        durationSeconds: 0,
        responses: {},
        result: null,
      };

      store[attemptId] = attempt;
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
    const sanitizedQuestions = attempt.questionsSnapshot.map((q: any) => ({
      versionId: q.versionId,
      displayNumber: q.displayNumber,
      questionType: q.questionType,
      subjectSlug: q.subjectSlug,
      subjectName: q.subjectName,
      conceptSlug: q.conceptSlug,
      conceptName: q.conceptName,
      difficulty: q.difficulty,
      marks: q.marks,
      negativeMarks: q.negativeMarks,
      text: q.text,
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
        durationMinutes: attempt.paperSnapshot.durationMinutes,
        totalQuestions: sanitizedQuestions.length,
        maxMarks: attempt.paperSnapshot.maxMarks,
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
