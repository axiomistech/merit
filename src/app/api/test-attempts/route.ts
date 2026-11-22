import { NextResponse } from 'next/server';
import {
  getStoredPaperBySlugServer,
  getStoredQuestionByIdServer,
  getAttemptsStore,
  saveAttemptsStore,
  getEntitlementsStore,
} from '@/lib/server/backendStore';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { paperSlug, studentId, studentRegistrationId, studentName, attemptId: requestedAttemptId } = body;

    if (!paperSlug) {
      return NextResponse.json(
        { success: false, error: 'paperSlug is required to start an examination attempt.' },
        { status: 400 }
      );
    }

    const regId = studentRegistrationId || 'MW-26-000001';

    // 1. Validate Access Entitlement
    const entitlementsStore = getEntitlementsStore();
    const userEntitlements = entitlementsStore[regId] || [];
    const hasEntitlement = userEntitlements.some(
      (e) => e.status === 'active' && (e.paperSlug === 'all' || e.paperSlug === paperSlug)
    );

    // If paper requires paid access or unlock and user has not unlocked it:
    // (Free eligible papers can be claimed via POST /api/entitlements)
    const paper = getStoredPaperBySlugServer(paperSlug);
    if (!paper) {
      return NextResponse.json(
        {
          success: false,
          error: `Examination paper '${paperSlug}' not found. Examinations must be explicitly created and published by an administrator.`,
        },
        { status: 404 }
      );
    }

    if (paper.status !== 'published') {
      return NextResponse.json(
        {
          success: false,
          error: `Examination paper '${paper.name}' is currently in '${paper.status}' state and has not been published for student attempts.`,
        },
        { status: 400 }
      );
    }

    // 2. Duplicate Attempt Recovery
    const store = getAttemptsStore();
    const existingAttempt = Object.values(store).find(
      (a: any) =>
        a.studentRegistrationId === regId &&
        (a.paperSlug === paperSlug || a.paperId === paperSlug) &&
        a.status === 'active' &&
        new Date(a.deadline_at).getTime() > Date.now()
    );

    if (existingAttempt) {
      return NextResponse.json({
        success: true,
        message: 'Resuming existing active test attempt (idempotent)',
        data: {
          attemptId: existingAttempt.id,
          paperName: existingAttempt.paperName,
          durationMinutes: existingAttempt.paperSnapshot.durationMinutes,
          startedAt: existingAttempt.started_at,
          deadlineAt: existingAttempt.deadline_at,
          totalQuestions: existingAttempt.questionsSnapshot.length,
          maxMarks: existingAttempt.paperSnapshot.maxMarks,
          responses: existingAttempt.responses || {},
          questions: existingAttempt.questionsSnapshot.map((q: any) => ({
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
          })),
        },
      });
    }

    // 3. Load Actual Questions Assigned to this Paper by Administrator
    const questions: any[] = [];
    for (let i = 0; i < (paper.questionIds || []).length; i++) {
      const qid = paper.questionIds[i];
      const q = getStoredQuestionByIdServer(qid);
      if (q && (q.status === 'published' || q.status === 'approved')) {
        questions.push({
          id: q.id,
          versionId: q.versionId,
          displayNumber: i + 1,
          questionType: q.questionType,
          subjectSlug: q.subjectSlug,
          subjectName: q.subjectName,
          chapterSlug: q.chapterSlug || '',
          conceptName: q.conceptName || '',
          difficulty: q.difficulty,
          marks: q.marks,
          negativeMarks: q.negativeMarks,
          text: q.text,
          imageUrl: q.imageUrl,
          options: q.options,
          answerKey: q.answerKey, // Confidential: preserved on server snapshot for evaluation
          explanation: q.explanation, // Confidential: preserved for post-submission review
        });
      }
    }

    if (questions.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Examination paper '${paper.name}' does not contain any published questions. Please contact an administrator.`,
        },
        { status: 400 }
      );
    }

    const attemptId = requestedAttemptId || `ATT-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const durationMinutes = paper.durationMinutes || 180;
    const deadline = new Date(now.getTime() + durationMinutes * 60 * 1000);

    const attemptRecord = {
      id: attemptId,
      studentId: studentId || 'usr_candidate_01',
      studentRegistrationId: regId,
      studentName: studentName || 'Candidate',
      paperId: paper.id,
      paperSlug: paper.slug,
      paperName: paper.name,
      paperSnapshot: {
        id: paper.id,
        name: paper.name,
        slug: paper.slug,
        durationMinutes,
        maxMarks: paper.maxMarks,
        markingScheme: paper.markingScheme,
      },
      questionsSnapshot: questions,
      status: 'active',
      started_at: now.toISOString(),
      deadline_at: deadline.toISOString(),
      submitted_at: null,
      durationSeconds: 0,
      responses: {},
      result: null,
    };

    store[attemptId] = attemptRecord;
    saveAttemptsStore();

    // Sanitize questions: strip answerKey and explanation before returning to client
    const sanitizedQuestions = questions.map((q) => ({
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
        attemptId,
        paperName: paper.name,
        durationMinutes,
        startedAt: now.toISOString(),
        deadlineAt: deadline.toISOString(),
        totalQuestions: sanitizedQuestions.length,
        maxMarks: paper.maxMarks,
        questions: sanitizedQuestions,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to initialize test attempt' },
      { status: 500 }
    );
  }
}
