import { NextResponse } from 'next/server';
import { SAMPLE_NEET_PAPER, getFullNeet180Questions } from '@/data/seedData';
import { getStoredTests } from '@/lib/admin/store';
import { getAttemptsStore } from '@/lib/server/backendStore';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { paperSlug, studentId, studentRegistrationId, studentName } = body;

    const paper =
      getStoredTests().find((t: any) => t.slug === paperSlug || t.id === paperSlug) ||
      SAMPLE_NEET_PAPER;

    const attemptId = `ATT-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const durationMinutes = paper.durationMinutes || 200;
    const deadline = new Date(now.getTime() + durationMinutes * 60 * 1000);

    // SECTION 10 & 30 MANDATORY: IMMUTABLE SNAPSHOT OF TEST QUESTIONS
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

    const attemptRecord = {
      id: attemptId,
      studentId: studentId || 'usr_candidate_01',
      studentRegistrationId: studentRegistrationId || 'FORT-26-000001',
      studentName: studentName || 'Candidate',
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

    getAttemptsStore()[attemptId] = attemptRecord;

    return NextResponse.json({
      success: true,
      data: {
        attemptId,
        paperName: paper.name,
        durationMinutes,
        startedAt: now.toISOString(),
        deadlineAt: deadline.toISOString(),
        totalQuestions: questionsSnapshot.length,
        maxMarks: (paper as any).maxMarks || 720,
        // Exclude correct answer keys from student client during active test
        questions: questionsSnapshot.map((q) => ({
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
        })),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to start test attempt' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const regId = searchParams.get('registrationId');

    const store = getAttemptsStore();
    let attempts = Object.values(store);

    if (regId) {
      attempts = attempts.filter((a) => a.studentRegistrationId === regId);
    }

    return NextResponse.json({
      success: true,
      total: attempts.length,
      data: attempts.map((a) => ({
        id: a.id,
        paperName: a.paperName,
        status: a.status,
        startedAt: a.started_at,
        submittedAt: a.submitted_at,
        score: a.result?.totalScore || null,
        accuracy: a.result?.accuracy || null,
      })),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch attempts' },
      { status: 500 }
    );
  }
}
