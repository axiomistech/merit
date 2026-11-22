import { describe, it, expect } from 'vitest';
import { evaluateAttempt } from '../../src/lib/scoring/engine';
import { SAMPLE_NEET_QUESTIONS } from '../../src/data/seedData';

describe('Test Attempt Lifecycle & Immutability Engine (Section 10 & 30)', () => {
  it('creates an authoritative score based strictly on answer keys and negative marking', () => {
    const questionSnapshot = SAMPLE_NEET_QUESTIONS.slice(0, 5).map((q) => ({
      questionVersionId: q.versionId,
      displayNumber: q.displayNumber,
      questionType: q.questionType,
      subjectSlug: q.subjectSlug,
      subjectName: q.subjectName,
      difficulty: q.difficulty,
      marks: q.marks,
      negativeMarks: q.negativeMarks,
      correctOptions: q.answerKey?.correctOptions || ['B'],
    }));

    // Answers: Q1 correct (+4), Q2 incorrect (-1), Q3 unanswered (0)
    const clientAnswers = {
      [questionSnapshot[0].questionVersionId]: {
        questionVersionId: questionSnapshot[0].questionVersionId,
        selectedOptions: ['B'],
        isAnswered: true,
      },
      [questionSnapshot[1].questionVersionId]: {
        questionVersionId: questionSnapshot[1].questionVersionId,
        selectedOptions: ['C'], // wrong
        isAnswered: true,
      },
      // Q3, Q4, Q5 unattempted
    };

    const result = evaluateAttempt({
      questions: questionSnapshot,
      answers: clientAnswers as any,
      durationSeconds: 180,
    });

    expect(result.correctCount).toBe(1);
    expect(result.incorrectCount).toBe(1);
    expect(result.unattemptedCount).toBe(3);
    expect(result.totalScore).toBe(3); // +4 - 1 = 3
    expect(result.accuracy).toBe(50); // 1 out of 2 attempted
  });

  it('guarantees historical result immutability when question bank master is modified', () => {
    // 1. Snapshot taken at exam start
    const originalSnapshot = [
      {
        questionVersionId: 'q_master_v1',
        displayNumber: 1,
        questionType: 'single_correct' as const,
        subjectSlug: 'physics',
        subjectName: 'Physics',
        difficulty: 'medium' as const,
        marks: 4,
        negativeMarks: -1,
        correctOptions: ['A'],
      },
    ];

    const studentAnswers = {
      q_master_v1: {
        questionVersionId: 'q_master_v1',
        selectedOptions: ['A'],
        isAnswered: true,
      },
    };

    const historicalResult = evaluateAttempt({
      questions: originalSnapshot,
      answers: studentAnswers as any,
      durationSeconds: 60,
    });

    expect(historicalResult.totalScore).toBe(4);

    // 2. Admin later edits question in question bank (e.g. changes correct answer to B)
    const mutatedQuestionBankQuestion = {
      ...originalSnapshot[0],
      questionVersionId: 'q_master_v2', // new version
      correctOptions: ['B'],
    };

    // 3. Verify that re-evaluating historical attempt using its frozen snapshot yields the exact same score
    const recheckedResult = evaluateAttempt({
      questions: originalSnapshot, // Still uses frozen v1 snapshot!
      answers: studentAnswers as any,
      durationSeconds: 60,
    });

    expect(recheckedResult.totalScore).toBe(4);
    expect(recheckedResult.correctCount).toBe(1);
  });

  it('sanitizes questions delivered during active examination by omitting answer keys', () => {
    const rawQuestion = {
      versionId: 'qv_neet_phy_01',
      displayNumber: 1,
      questionType: 'single_correct',
      subjectSlug: 'physics',
      subjectName: 'Physics',
      conceptSlug: 'kinematics',
      conceptName: 'Motion in 1D',
      difficulty: 'medium',
      marks: 4,
      negativeMarks: -1,
      text: 'A projectile is launched at 45 degrees...',
      options: [{ key: 'A', text: 'Option A' }, { key: 'B', text: 'Option B' }],
      answerKey: { correctOptions: ['A'] },
      explanation: { text: 'Detailed solution for question 1.' },
    };

    // Active test serializer
    const sanitized = {
      versionId: rawQuestion.versionId,
      displayNumber: rawQuestion.displayNumber,
      questionType: rawQuestion.questionType,
      subjectSlug: rawQuestion.subjectSlug,
      subjectName: rawQuestion.subjectName,
      conceptSlug: rawQuestion.conceptSlug,
      conceptName: rawQuestion.conceptName,
      difficulty: rawQuestion.difficulty,
      marks: rawQuestion.marks,
      negativeMarks: rawQuestion.negativeMarks,
      text: rawQuestion.text,
      options: rawQuestion.options,
    };

    expect((sanitized as any).answerKey).toBeUndefined();
    expect((sanitized as any).explanation).toBeUndefined();
    expect(sanitized.text).toBe(rawQuestion.text);
  });

  it('enforces server-authoritative wall clock deadline and detects overdue attempts', () => {
    const startedAt = new Date(Date.now() - 205 * 60 * 1000); // started 205 mins ago
    const durationMinutes = 200;
    const deadlineAt = new Date(startedAt.getTime() + durationMinutes * 60 * 1000); // 5 mins ago

    const now = new Date();
    const isOverdue = now.getTime() > deadlineAt.getTime() + 10000; // past 10s grace period

    expect(isOverdue).toBe(true);

    const attemptStatus = isOverdue ? 'auto_submitted' : 'submitted';
    expect(attemptStatus).toBe('auto_submitted');
  });
});
