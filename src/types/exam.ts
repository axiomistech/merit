import { QuestionType, DifficultyLevel } from './database';

export interface ExamOption {
  key: string; // 'A', 'B', 'C', 'D'
  text: string;
  imageUrl?: string;
}

export interface QuestionData {
  id: string;
  versionId: string;
  displayNumber: number;
  questionType: QuestionType;
  subjectName: string;
  subjectSlug: string;
  conceptName?: string;
  conceptSlug?: string;
  difficulty: DifficultyLevel;
  text: string;
  imageUrl?: string;
  options: ExamOption[];
  marks: number;
  negativeMarks: number;
  // Answer keys are stripped during active examination and only populated on result review
  answerKey?: {
    correctOptions?: string[];
    numericalValue?: number;
    numericalTolerance?: number;
  };
  explanation?: {
    text: string;
    solutionSteps?: string[];
  };
}

export type QuestionPaletteStatus =
  | 'not_visited'
  | 'not_answered'
  | 'answered'
  | 'marked_for_review'
  | 'answered_and_marked_for_review';

export interface AnswerState {
  questionVersionId: string;
  selectedOptions?: string[];
  numericalValue?: number;
  textResponse?: string;
  isAnswered: boolean;
  markedForReview: boolean;
  timeSpentSeconds: number;
  lastUpdated: number;
}

export interface ExamPaperConfig {
  id: string;
  name: string;
  slug: string;
  examSlug: string;
  examName: string;
  durationMinutes: number;
  totalMarks: number;
  totalQuestions: number;
  instructions: string[];
  sections: {
    id: string;
    name: string;
    subjectSlug: string;
    questionIndices: number[]; // 1-based question numbers
    isOptional?: boolean;
    maxQuestionsToAttempt?: number;
  }[];
}

export interface ExamAttemptEvaluation {
  totalScore: number;
  maxScore: number;
  scorePercentage: number;
  accuracy: number;
  attemptRate: number;
  completionRate: number;
  timeTakenSeconds: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  subjectPerformance: Record<string, {
    subjectName: string;
    score: number;
    maxScore: number;
    correct: number;
    incorrect: number;
    unattempted: number;
    accuracy: number;
  }>;
  conceptPerformance: Record<string, {
    conceptName: string;
    correct: number;
    total: number;
    accuracy: number;
  }>;
  questionResults: {
    questionVersionId: string;
    displayNumber: number;
    questionType: QuestionType;
    result: 'correct' | 'incorrect' | 'unattempted' | 'partial';
    marksEarned: number;
    timeSpentSeconds: number;
  }[];
}
