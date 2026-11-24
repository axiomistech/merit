import { QuestionData, AnswerState, ExamAttemptEvaluation, NtaCandidateShiftScore } from '@/types/exam';

export interface ScoringQuestionRule {
  questionVersionId: string;
  displayNumber: number;
  questionType: string;
  subjectSlug: string;
  subjectName: string;
  conceptSlug?: string;
  conceptName?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  marks: number;
  negativeMarks: number;
  correctOptions?: string[];
  numericalValue?: number;
  numericalTolerance?: number;
}

export interface EvaluateAttemptInput {
  questions: ScoringQuestionRule[];
  answers: Record<string, AnswerState>; // keyed by questionVersionId
  durationSeconds: number;
}

/**
 * Normalization procedure based on PERCENTILE SCORE (NTA Information Bulletin Appendix IV).
 * Percentile = 100 * (Number of candidates with raw score <= candidate's score) / (Total candidates in shift)
 * Rounded to 7 decimal places to avoid bunching and ties.
 */
export function calculateNtaPercentile(
  candidateScore: number,
  allShiftScores: number[]
): number {
  if (!allShiftScores || allShiftScores.length === 0) return 100.0;
  const countLessOrEqual = allShiftScores.filter((s) => s <= candidateScore).length;
  const rawPercentile = (100 * countLessOrEqual) / allShiftScores.length;
  // Return fixed to 7 decimal places as per NTA Appendix IV
  return Math.round(rawPercentile * 10000000) / 10000000;
}

/**
 * Official NTA 8-Stage Tie-Breaking Algorithm (Information Bulletin Chapter 3, Page 18).
 * Returns negative if candidate A ranks higher, positive if candidate B ranks higher, 0 if equal.
 */
export function resolveNtaTieBreak(
  a: NtaCandidateShiftScore,
  b: NtaCandidateShiftScore
): number {
  // 1. Higher NTA score in Mathematics
  if (b.mathScore !== a.mathScore) return b.mathScore - a.mathScore;

  // 2. Higher NTA score in Physics
  if (b.physicsScore !== a.physicsScore) return b.physicsScore - a.physicsScore;

  // 3. Higher NTA score in Chemistry
  if (b.chemScore !== a.chemScore) return b.chemScore - a.chemScore;

  // 4. Lower ratio of incorrect answers to correct answers across all subjects
  const ratioAOverall = a.totalCorrect > 0 ? a.totalIncorrect / a.totalCorrect : a.totalIncorrect > 0 ? 9999 : 0;
  const ratioBOverall = b.totalCorrect > 0 ? b.totalIncorrect / b.totalCorrect : b.totalIncorrect > 0 ? 9999 : 0;
  if (ratioAOverall !== ratioBOverall) return ratioAOverall - ratioBOverall;

  // 5. Lower ratio in Mathematics
  const ratioAMath = a.mathCorrect > 0 ? a.mathIncorrect / a.mathCorrect : a.mathIncorrect > 0 ? 9999 : 0;
  const ratioBMath = b.mathCorrect > 0 ? b.mathIncorrect / b.mathCorrect : b.mathIncorrect > 0 ? 9999 : 0;
  if (ratioAMath !== ratioBMath) return ratioAMath - ratioBMath;

  // 6. Lower ratio in Physics
  const ratioAPhys = a.physicsCorrect > 0 ? a.physicsIncorrect / a.physicsCorrect : a.physicsIncorrect > 0 ? 9999 : 0;
  const ratioBPhys = b.physicsCorrect > 0 ? b.physicsIncorrect / b.physicsCorrect : b.physicsIncorrect > 0 ? 9999 : 0;
  if (ratioAPhys !== ratioBPhys) return ratioAPhys - ratioBPhys;

  // 7. Lower ratio in Chemistry
  const ratioAChem = a.chemCorrect > 0 ? a.chemIncorrect / a.chemCorrect : a.chemIncorrect > 0 ? 9999 : 0;
  const ratioBChem = b.chemCorrect > 0 ? b.chemIncorrect / b.chemCorrect : b.chemIncorrect > 0 ? 9999 : 0;
  if (ratioAChem !== ratioBChem) return ratioAChem - ratioBChem;

  // 8. If tie persists, candidates are assigned the same rank
  return 0;
}

export function evaluateAttempt(input: EvaluateAttemptInput): ExamAttemptEvaluation {
  const { questions, answers, durationSeconds } = input;

  let totalScore = 0;
  let maxScore = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  let unattemptedCount = 0;

  const subjectMap: Record<string, {
    subjectName: string;
    score: number;
    maxScore: number;
    correct: number;
    incorrect: number;
    unattempted: number;
  }> = {};

  const conceptMap: Record<string, {
    conceptName: string;
    correct: number;
    total: number;
  }> = {};

  const questionResults: ExamAttemptEvaluation['questionResults'] = [];

  for (const q of questions) {
    maxScore += q.marks;

    if (!subjectMap[q.subjectSlug]) {
      subjectMap[q.subjectSlug] = {
        subjectName: q.subjectName,
        score: 0,
        maxScore: 0,
        correct: 0,
        incorrect: 0,
        unattempted: 0,
      };
    }
    subjectMap[q.subjectSlug].maxScore += q.marks;

    const conceptKey = q.conceptSlug || 'general';
    const conceptLabel = q.conceptName || 'General Concepts';
    if (!conceptMap[conceptKey]) {
      conceptMap[conceptKey] = {
        conceptName: conceptLabel,
        correct: 0,
        total: 0,
      };
    }
    conceptMap[conceptKey].total += 1;

    const answer = answers[q.questionVersionId];
    const isAnswered = answer && answer.isAnswered;
    const timeSpent = answer ? answer.timeSpentSeconds : 0;

    let result: 'correct' | 'incorrect' | 'unattempted' | 'partial' = 'unattempted';
    let marksEarned = 0;

    if (!isAnswered) {
      unattemptedCount++;
      subjectMap[q.subjectSlug].unattempted++;
      result = 'unattempted';
      marksEarned = 0;
    } else {
      if (q.questionType === 'single_correct' || q.questionType === 'assertion_reason') {
        const studentSelected = answer.selectedOptions?.[0];
        const correctOption = q.correctOptions?.[0];

        if (studentSelected && correctOption && studentSelected === correctOption) {
          result = 'correct';
          marksEarned = q.marks;
          correctCount++;
          subjectMap[q.subjectSlug].correct++;
          conceptMap[conceptKey].correct++;
        } else {
          result = 'incorrect';
          marksEarned = -Math.abs(q.negativeMarks);
          incorrectCount++;
          subjectMap[q.subjectSlug].incorrect++;
        }
      } else if (q.questionType === 'multiple_correct') {
        // Multi-select with strict/partial scoring (e.g. JEE Advanced)
        const studentSelected = new Set(answer.selectedOptions || []);
        const correctSet = new Set(q.correctOptions || []);

        const hasAnyIncorrect = Array.from(studentSelected).some((opt) => !correctSet.has(opt));

        if (hasAnyIncorrect) {
          result = 'incorrect';
          marksEarned = -Math.abs(q.negativeMarks);
          incorrectCount++;
          subjectMap[q.subjectSlug].incorrect++;
        } else if (studentSelected.size === correctSet.size && studentSelected.size > 0) {
          result = 'correct';
          marksEarned = q.marks;
          correctCount++;
          subjectMap[q.subjectSlug].correct++;
          conceptMap[conceptKey].correct++;
        } else if (studentSelected.size > 0 && studentSelected.size < correctSet.size) {
          // Partial marks for subset of correct options without any wrong option
          result = 'partial';
          marksEarned = Math.round((q.marks * studentSelected.size) / correctSet.size * 100) / 100;
          correctCount++;
          subjectMap[q.subjectSlug].correct++;
        } else {
          result = 'unattempted';
          unattemptedCount++;
          subjectMap[q.subjectSlug].unattempted++;
        }
      } else if (q.questionType === 'numerical') {
        const val = answer.numericalValue;
        const target = q.numericalValue;
        const tol = q.numericalTolerance ?? 0;

        if (val === undefined || val === null || isNaN(val)) {
          result = 'unattempted';
          marksEarned = 0;
          unattemptedCount++;
          subjectMap[q.subjectSlug].unattempted++;
        } else {
          // NTA Rule: For Section B, answers should be rounded off to nearest integer
          const isMatch =
            (target !== undefined && Math.abs(val - target) <= tol) ||
            (target !== undefined && Math.round(val) === Math.round(target));

          if (isMatch) {
            result = 'correct';
            marksEarned = q.marks;
            correctCount++;
            subjectMap[q.subjectSlug].correct++;
            conceptMap[conceptKey].correct++;
          } else {
            result = 'incorrect';
            marksEarned = -Math.abs(q.negativeMarks);
            incorrectCount++;
            subjectMap[q.subjectSlug].incorrect++;
          }
        }
      } else {
        // Default MCQ fallback
        const studentSelected = answer.selectedOptions?.[0];
        const correctOption = q.correctOptions?.[0];
        if (studentSelected && correctOption && studentSelected === correctOption) {
          result = 'correct';
          marksEarned = q.marks;
          correctCount++;
          subjectMap[q.subjectSlug].correct++;
          conceptMap[conceptKey].correct++;
        } else {
          result = 'incorrect';
          marksEarned = -Math.abs(q.negativeMarks);
          incorrectCount++;
          subjectMap[q.subjectSlug].incorrect++;
        }
      }
    }

    totalScore += marksEarned;
    subjectMap[q.subjectSlug].score += marksEarned;

    questionResults.push({
      questionVersionId: q.questionVersionId,
      displayNumber: q.displayNumber,
      questionType: q.questionType as any,
      result,
      marksEarned,
      timeSpentSeconds: timeSpent,
    });
  }

  const attemptedCount = correctCount + incorrectCount;
  const totalQuestions = questions.length;

  const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 10000) / 100 : 0;
  const attemptRate = totalQuestions > 0 ? Math.round((attemptedCount / totalQuestions) * 10000) / 100 : 0;
  const completionRate = totalQuestions > 0 ? Math.round(((attemptedCount + unattemptedCount) / totalQuestions) * 10000) / 100 : 0;
  const scorePercentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 10000) / 100 : 0;

  const subjectPerformance: ExamAttemptEvaluation['subjectPerformance'] = {};
  for (const [key, data] of Object.entries(subjectMap)) {
    const subAttempted = data.correct + data.incorrect;
    const subAccuracy = subAttempted > 0 ? Math.round((data.correct / subAttempted) * 10000) / 100 : 0;
    subjectPerformance[key] = {
      ...data,
      accuracy: subAccuracy,
    };
  }

  const conceptPerformance: ExamAttemptEvaluation['conceptPerformance'] = {};
  for (const [key, data] of Object.entries(conceptMap)) {
    const conceptAccuracy = data.total > 0 ? Math.round((data.correct / data.total) * 10000) / 100 : 0;
    conceptPerformance[key] = {
      conceptName: data.conceptName,
      correct: data.correct,
      total: data.total,
      accuracy: conceptAccuracy,
    };
  }

  return {
    totalScore: Math.round(totalScore * 100) / 100,
    maxScore: Math.round(maxScore * 100) / 100,
    scorePercentage,
    accuracy,
    attemptRate,
    completionRate,
    timeTakenSeconds: durationSeconds,
    correctCount,
    incorrectCount,
    unattemptedCount,
    subjectPerformance,
    conceptPerformance,
    questionResults,
  };
}
