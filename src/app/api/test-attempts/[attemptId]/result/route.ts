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
        { success: false, error: `Attempt '${attemptId}' not found` },
        { status: 404 }
      );
    }

    if (!attempt.result) {
      return NextResponse.json(
        { success: false, error: 'Attempt has not been evaluated yet' },
        { status: 400 }
      );
    }

    // Attach explanations and correct answer keys for question-by-question review
    const questionReview = attempt.questionsSnapshot.map((q: any) => {
      const studentAns = attempt.responses[q.versionId];
      const evalItem = attempt.result.questionResults?.find(
        (e: any) => e.questionVersionId === q.versionId
      );

      return {
        questionVersionId: q.versionId,
        displayNumber: q.displayNumber,
        subjectName: q.subjectName,
        conceptName: q.conceptName,
        difficulty: q.difficulty,
        text: q.text,
        options: q.options,
        studentSelectedOptions: studentAns?.selectedOptions || [],
        correctOptions: q.answerKey?.correctOptions || [],
        isCorrect: evalItem?.result === 'correct',
        marksAwarded: evalItem?.marksEarned || 0,
        explanation: q.explanation?.text || 'Standard solution explanation.',
      };
    });

    return NextResponse.json({
      success: true,
      data: {
        attemptId: attempt.id,
        paperName: attempt.paperName,
        studentName: attempt.studentName,
        studentRegistrationId: attempt.studentRegistrationId,
        startedAt: attempt.started_at,
        submittedAt: attempt.submitted_at,
        durationSeconds: attempt.durationSeconds,
        summary: {
          totalScore: attempt.result.totalScore,
          maxScore: attempt.result.maxScore,
          percentage: attempt.result.scorePercentage,
          accuracy: attempt.result.accuracy,
          correctCount: attempt.result.correctCount,
          wrongCount: attempt.result.incorrectCount,
          unansweredCount: attempt.result.unattemptedCount,
        },
        sectionScores: attempt.result.subjectPerformance,
        questionReview,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch attempt result' },
      { status: 500 }
    );
  }
}
