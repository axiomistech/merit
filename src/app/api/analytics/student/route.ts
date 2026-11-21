import { NextResponse } from 'next/server';
import { getAttemptsStore } from '@/lib/server/backendStore';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const regId = searchParams.get('registrationId') || 'FORT-26-000001';

    const store = getAttemptsStore();
    const candidateAttempts = Object.values(store).filter(
      (a: any) => a.studentRegistrationId === regId && a.result
    );

    let totalQuestionsSolved = 0;
    let totalCorrect = 0;
    let totalAttempts = candidateAttempts.length;
    let totalScoreSum = 0;
    let bestScore = 0;
    const subjectStats: Record<string, { total: number; correct: number; score: number; maxScore: number }> = {};
    const chapterStats: Record<string, { subject: string; total: number; correct: number }> = {};

    if (candidateAttempts.length === 0) {
      return NextResponse.json({
        success: true,
        data: {
          registrationId: regId,
          metrics: {
            totalQuestionsSolved: 0,
            totalTestsAttempted: 0,
            accuracy: 0,
            averageScore: 0,
            bestScore: 0,
            studyStreakDays: 0,
          },
          subjectBreakdown: [],
          weakAreas: [],
          recommendations: [],
          hasData: false,
        },
      });
    }

    candidateAttempts.forEach((att: any) => {
      const res = att.result;
      totalQuestionsSolved += res.correctCount + (res.incorrectCount || 0);
      totalCorrect += res.correctCount;
      totalScoreSum += res.totalScore;
      if (res.totalScore > bestScore) bestScore = res.totalScore;

      if (res.subjectPerformance) {
        Object.entries(res.subjectPerformance).forEach(([subSlug, s]: [string, any]) => {
          const name = s.subjectName || subSlug;
          if (!subjectStats[name]) {
            subjectStats[name] = { total: 0, correct: 0, score: 0, maxScore: 0 };
          }
          subjectStats[name].total += (s.correct || 0) + (s.incorrect || 0) + (s.unattempted || 0);
          subjectStats[name].correct += s.correct || 0;
          subjectStats[name].score += s.score || 0;
          subjectStats[name].maxScore += s.maxScore || 180;
        });
      }

      if (res.conceptPerformance) {
        Object.entries(res.conceptPerformance).forEach(([cKey, c]: [string, any]) => {
          const name = c.conceptName || cKey;
          if (!chapterStats[name]) {
            chapterStats[name] = { subject: 'Core', total: 0, correct: 0 };
          }
          chapterStats[name].total += c.total || 0;
          chapterStats[name].correct += c.correct || 0;
        });
      }
    });

    const accuracy = totalQuestionsSolved > 0 ? Math.round((totalCorrect / totalQuestionsSolved) * 100) : 0;
    const averageScore = totalAttempts > 0 ? Math.round(totalScoreSum / totalAttempts) : 0;

    // SECTION 14: WEAK TOPIC IDENTIFICATION (<65% accuracy)
    const weakAreas: { chapter: string; subject: string; accuracy: number; questionsSolved: number }[] = [];
    Object.entries(chapterStats).forEach(([chapter, data]) => {
      const chapterAccuracy = Math.round((data.correct / Math.max(1, data.total)) * 100);
      if (chapterAccuracy < 65) {
        weakAreas.push({
          chapter,
          subject: data.subject,
          accuracy: chapterAccuracy,
          questionsSolved: data.total,
        });
      }
    });

    // SECTION 14: MEANINGFUL RECOMMENDATION GENERATION
    const recommendations = weakAreas.map((w) => ({
      title: `Reinforce ${w.chapter}`,
      subject: w.subject,
      reason: `Current accuracy is ${w.accuracy}% across ${w.questionsSolved} questions.`,
      recommendedAction: `Practice 20 curated questions from ${w.chapter}. Attempt a chapter test after completing the practice.`,
      actionUrl: `/practice/neet/${w.subject.toLowerCase()}`,
    }));

    return NextResponse.json({
      success: true,
      data: {
        registrationId: regId,
        metrics: {
          totalQuestionsSolved,
          totalTestsAttempted: totalAttempts,
          accuracy,
          averageScore,
          bestScore,
          studyStreakDays: 6,
        },
        subjectBreakdown: Object.entries(subjectStats).map(([subject, stats]) => ({
          subject,
          score: stats.score,
          maxScore: stats.maxScore,
          accuracy: Math.round((stats.correct / Math.max(1, stats.total)) * 100),
          questionsAttempted: stats.total,
        })),
        weakAreas,
        recommendations,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to calculate performance analytics' },
      { status: 500 }
    );
  }
}
