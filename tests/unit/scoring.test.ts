import { describe, it, expect } from 'vitest';
import { evaluateAttempt, ScoringQuestionRule } from '@/lib/scoring/engine';
import { AnswerState } from '@/types/exam';

describe('FORT Scoring Engine', () => {
  const sampleNeetQuestions: ScoringQuestionRule[] = [
    {
      questionVersionId: 'q1',
      displayNumber: 1,
      questionType: 'single_correct',
      subjectSlug: 'physics',
      subjectName: 'Physics',
      conceptSlug: 'electrostatics',
      conceptName: 'Electrostatics',
      difficulty: 'medium',
      marks: 4,
      negativeMarks: 1,
      correctOptions: ['B'],
    },
    {
      questionVersionId: 'q2',
      displayNumber: 2,
      questionType: 'single_correct',
      subjectSlug: 'chemistry',
      subjectName: 'Chemistry',
      conceptSlug: 'chemical-bonding',
      conceptName: 'Chemical Bonding',
      difficulty: 'easy',
      marks: 4,
      negativeMarks: 1,
      correctOptions: ['A'],
    },
    {
      questionVersionId: 'q3',
      displayNumber: 3,
      questionType: 'single_correct',
      subjectSlug: 'biology',
      subjectName: 'Biology',
      conceptSlug: 'genetics',
      conceptName: 'Genetics',
      difficulty: 'hard',
      marks: 4,
      negativeMarks: 1,
      correctOptions: ['D'],
    },
    {
      questionVersionId: 'q4',
      displayNumber: 4,
      questionType: 'numerical',
      subjectSlug: 'physics',
      subjectName: 'Physics',
      conceptSlug: 'optics',
      conceptName: 'Ray Optics',
      difficulty: 'medium',
      marks: 4,
      negativeMarks: 1,
      numericalValue: 15.5,
      numericalTolerance: 0.1,
    },
  ];

  it('correctly calculates score for perfect attempt', () => {
    const answers: Record<string, AnswerState> = {
      q1: { questionVersionId: 'q1', selectedOptions: ['B'], isAnswered: true, markedForReview: false, timeSpentSeconds: 45, lastUpdated: 1 },
      q2: { questionVersionId: 'q2', selectedOptions: ['A'], isAnswered: true, markedForReview: false, timeSpentSeconds: 30, lastUpdated: 2 },
      q3: { questionVersionId: 'q3', selectedOptions: ['D'], isAnswered: true, markedForReview: false, timeSpentSeconds: 60, lastUpdated: 3 },
      q4: { questionVersionId: 'q4', numericalValue: 15.55, isAnswered: true, markedForReview: false, timeSpentSeconds: 90, lastUpdated: 4 },
    };

    const evalResult = evaluateAttempt({
      questions: sampleNeetQuestions,
      answers,
      durationSeconds: 225,
    });

    expect(evalResult.totalScore).toBe(16);
    expect(evalResult.maxScore).toBe(16);
    expect(evalResult.correctCount).toBe(4);
    expect(evalResult.incorrectCount).toBe(0);
    expect(evalResult.unattemptedCount).toBe(0);
    expect(evalResult.accuracy).toBe(100);
    expect(evalResult.attemptRate).toBe(100);
    expect(evalResult.scorePercentage).toBe(100);
  });

  it('correctly applies NEET negative marking (+4 for correct, -1 for wrong, 0 for unattempted)', () => {
    const answers: Record<string, AnswerState> = {
      q1: { questionVersionId: 'q1', selectedOptions: ['B'], isAnswered: true, markedForReview: false, timeSpentSeconds: 50, lastUpdated: 1 }, // Correct: +4
      q2: { questionVersionId: 'q2', selectedOptions: ['C'], isAnswered: true, markedForReview: false, timeSpentSeconds: 40, lastUpdated: 2 }, // Wrong: -1
      // q3 is unattempted: 0
      q4: { questionVersionId: 'q4', numericalValue: 99, isAnswered: true, markedForReview: false, timeSpentSeconds: 60, lastUpdated: 3 }, // Wrong: -1
    };

    const evalResult = evaluateAttempt({
      questions: sampleNeetQuestions,
      answers,
      durationSeconds: 150,
    });

    // Score = 4 - 1 + 0 - 1 = 2
    expect(evalResult.totalScore).toBe(2);
    expect(evalResult.maxScore).toBe(16);
    expect(evalResult.correctCount).toBe(1);
    expect(evalResult.incorrectCount).toBe(2);
    expect(evalResult.unattemptedCount).toBe(1);
    // Accuracy = 1 correct out of 3 attempted = 33.33%
    expect(evalResult.accuracy).toBe(33.33);
    // Attempt Rate = 3 attempted out of 4 = 75%
    expect(evalResult.attemptRate).toBe(75);
    // Subject scores
    expect(evalResult.subjectPerformance['physics'].score).toBe(3); // +4 from q1, -1 from q4
    expect(evalResult.subjectPerformance['chemistry'].score).toBe(-1);
    expect(evalResult.subjectPerformance['biology'].score).toBe(0);
  });

  it('handles completely blank/empty attempt without division by zero', () => {
    const evalResult = evaluateAttempt({
      questions: sampleNeetQuestions,
      answers: {},
      durationSeconds: 10,
    });

    expect(evalResult.totalScore).toBe(0);
    expect(evalResult.correctCount).toBe(0);
    expect(evalResult.incorrectCount).toBe(0);
    expect(evalResult.unattemptedCount).toBe(4);
    expect(evalResult.accuracy).toBe(0);
    expect(evalResult.attemptRate).toBe(0);
  });
});
