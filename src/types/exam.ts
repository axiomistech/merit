import { QuestionType, DifficultyLevel } from './database';
import {
  ScientificContentBlock,
  ScientificOption,
  QuestionSourceMetadata,
  QuestionVerificationStatus,
} from './scientific';

export interface ExamOption {
  key: string; // 'A', 'B', 'C', 'D'
  text: string;
  imageUrl?: string;
  latex?: string;
  mhchem?: string;
  contentBlocks?: ScientificContentBlock[];
}

export interface QuestionData {
  id: string;
  versionId: string;
  displayNumber: number;
  questionType: QuestionType;
  examSlug?: string;
  subjectName: string;
  subjectSlug: string;
  chapterSlug?: string;
  unitName?: string;
  topic?: string;
  status?: string;
  conceptName?: string;
  conceptSlug?: string;
  difficulty: DifficultyLevel;
  text: string;
  imageUrl?: string;
  options: ExamOption[];
  contentBlocks?: ScientificContentBlock[];
  scientificOptions?: ScientificOption[];
  sourceMetadata?: QuestionSourceMetadata;
  verificationStatus?: QuestionVerificationStatus;
  multilingual?: {
    hi?: {
      text: string;
      contentBlocks?: ScientificContentBlock[];
      options?: ExamOption[];
    };
  };
  marks: number;
  negativeMarks: number;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
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
    subSections?: {
      id: string;
      name: string; // e.g. "Section A (MCQ)", "Section B (NVQ)"
      questionIndices: number[];
      isMandatory: boolean;
      questionType: QuestionType;
    }[];
  }[];
}

export interface CbtAccessibilitySettings {
  theme: 'light' | 'dark';
  fontSize: 'normal' | 'large' | 'xlarge';
  cursorTrail: boolean;
  cursorSize: 'default' | 'large';
  screenMagnifier: boolean;
}

export interface NtaCandidateShiftScore {
  candidateId: string;
  name: string;
  totalRawScore: number;
  mathScore: number;
  physicsScore: number;
  chemScore: number;
  totalCorrect: number;
  totalIncorrect: number;
  mathCorrect: number;
  mathIncorrect: number;
  physicsCorrect: number;
  physicsIncorrect: number;
  chemCorrect: number;
  chemIncorrect: number;
  percentile?: number;
  rank?: number;
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
