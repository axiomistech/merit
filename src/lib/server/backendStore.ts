import fs from 'fs';
import path from 'path';
import { TutorialVideoConfig } from '@/types/admin';

export const DEFAULT_TUTORIAL_VIDEO: TutorialVideoConfig = {
  id: 'vid_default_walkthrough',
  enabled: true,
  videoUrl: '/api/videos/meritwise-platform-walkthrough.mp4',
  storageKey: 'tutorial-videos/meritwise-platform-walkthrough.mp4',
  fileName: 'meritwise-platform-walkthrough.mp4',
  title: 'MERITWISE Platform Walkthrough & Tutorial',
  subtitle: 'See how Meritwise works in action.',
  description: 'Complete platform demonstration: Timed examination simulation, physical-grade vector OMR response sheets, and diagnostic analytics.',
  mimeType: 'video/mp4',
  sizeBytes: 131776,
  posterUrl: '/brand/tutorial-poster.jpg',
  updated_at: new Date().toISOString(),
};

export function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  const patterns = [
    /(?:youtube\.com\/watch\?(?:.*&)?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/i,
    /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/i,
  ];
  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
}

export interface StoredQuestion {
  id: string;
  versionId: string;
  examSlug: string;
  subjectSlug: string;
  subjectName: string;
  chapterSlug?: string;
  unitName?: string;
  topic?: string;
  conceptSlug?: string;
  conceptName?: string;
  questionType: 'single_correct' | 'multiple_correct' | 'numerical' | 'assertion_reason';
  difficulty: 'easy' | 'medium' | 'hard';
  marks: number;
  negativeMarks: number;
  status: 'draft' | 'pending_review' | 'approved' | 'published' | 'archived';
  text: string;
  imageUrl?: string;
  options: { key: string; text: string; imageUrl?: string }[];
  answerKey: {
    correctOptions?: string[];
    numericalValue?: number;
    numericalTolerance?: number;
  };
  explanation?: {
    text: string;
    imageUrl?: string;
  };
  created_at: string;
  updated_at: string;
  created_by?: string;
}

export interface StoredPaper {
  id: string;
  name: string;
  slug: string;
  examSlug: string;
  paperType: 'mock_exam' | 'previous_year' | 'chapter_test' | 'subject_test';
  year?: number;
  subject?: string;
  durationMinutes: number;
  totalQuestions: number;
  maxMarks: number;
  markingScheme: string;
  hasOMR: boolean;
  price: number;
  isFreeEligible: boolean;
  status: 'draft' | 'pending_review' | 'approved' | 'published' | 'archived';
  instructions: string[];
  sections: {
    name: string;
    questionsCount: number;
    maxMarks: number;
    instructions?: string;
  }[];
  questionIds: string[];
  created_at: string;
  updated_at: string;
  published_at?: string;
  created_by?: string;
}

interface PersistentDatabaseSchema {
  questions: StoredQuestion[];
  papers: StoredPaper[];
  entitlements: Record<string, any[]>;
  attempts: Record<string, any>;
  tutorialVideo?: TutorialVideoConfig;
}

declare global {
  var __fort_content_db: PersistentDatabaseSchema | undefined;
}

const DB_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'fort_db.json');

function loadDatabaseFromDisk(): PersistentDatabaseSchema {
  try {
    if (fs.existsSync(DB_FILE_PATH)) {
      const raw = fs.readFileSync(DB_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(raw);
      return {
        questions: Array.isArray(parsed.questions) ? parsed.questions : [],
        papers: Array.isArray(parsed.papers) ? parsed.papers : [],
        entitlements: parsed.entitlements || {},
        attempts: parsed.attempts || {},
        tutorialVideo: parsed.tutorialVideo || DEFAULT_TUTORIAL_VIDEO,
      };
    }
  } catch (err) {
    console.error('Error reading persistent database from disk:', err);
  }

  // DEFAULT IS COMPLETELY EMPTY: No simulated, fabricated, or seed questions/papers.
  return {
    questions: [],
    papers: [],
    entitlements: {},
    attempts: {},
    tutorialVideo: DEFAULT_TUTORIAL_VIDEO,
  };
}

function persistDatabaseToDisk(db: PersistentDatabaseSchema) {
  try {
    const dir = path.dirname(DB_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving persistent database to disk:', err);
  }
}

function getDatabase(): PersistentDatabaseSchema {
  if (!global.__fort_content_db) {
    global.__fort_content_db = loadDatabaseFromDisk();
  }
  return global.__fort_content_db;
}

// ----------------------------------------------------------------------------
// QUESTIONS CRUD & VALIDATION
// ----------------------------------------------------------------------------

export function getStoredQuestionsServer(filter?: {
  examSlug?: string;
  subjectSlug?: string;
  chapterSlug?: string;
  difficulty?: string;
  status?: string;
  search?: string;
}): StoredQuestion[] {
  const db = getDatabase();
  let list = db.questions;

  if (filter?.examSlug && filter.examSlug !== 'all') {
    list = list.filter((q) => q.examSlug === filter.examSlug);
  }
  if (filter?.subjectSlug && filter.subjectSlug !== 'all') {
    list = list.filter((q) => q.subjectSlug === filter.subjectSlug);
  }
  if (filter?.chapterSlug && filter.chapterSlug !== 'all') {
    list = list.filter((q) => q.chapterSlug === filter.chapterSlug);
  }
  if (filter?.difficulty && filter.difficulty !== 'all') {
    list = list.filter((q) => q.difficulty === filter.difficulty);
  }
  if (filter?.status && filter.status !== 'all') {
    list = list.filter((q) => q.status === filter.status);
  }
  if (filter?.search) {
    const qLower = filter.search.toLowerCase();
    list = list.filter(
      (q) =>
        q.text.toLowerCase().includes(qLower) ||
        q.subjectName.toLowerCase().includes(qLower) ||
        (q.topic && q.topic.toLowerCase().includes(qLower)) ||
        (q.conceptName && q.conceptName.toLowerCase().includes(qLower))
    );
  }

  return list;
}

export function getStoredQuestionByIdServer(id: string): StoredQuestion | null {
  const db = getDatabase();
  return db.questions.find((q) => q.id === id || q.versionId === id) || null;
}

export function validateQuestionForSave(q: Partial<StoredQuestion>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!q.text || q.text.trim().length === 0) {
    errors.push('Question text is required.');
  }

  if (!q.examSlug) {
    errors.push('Target examination is required.');
  }

  if (!q.subjectSlug || !q.subjectName) {
    errors.push('Subject discipline is required.');
  }

  if (!q.questionType) {
    errors.push('Question type must be specified.');
  }

  if (q.marks === undefined || q.marks <= 0) {
    errors.push('Marks must be greater than zero.');
  }

  if (q.negativeMarks === undefined) {
    errors.push('Negative marking must be defined (use 0 for zero penalty).');
  }

  if (q.questionType === 'single_correct' || q.questionType === 'multiple_correct' || q.questionType === 'assertion_reason') {
    if (!q.options || q.options.length < 2) {
      errors.push('At least 2 options are required for choice-based questions.');
    } else {
      const texts = q.options.map((o) => o.text.trim().toLowerCase());
      const hasEmpty = q.options.some((o) => o.text.trim().length === 0);
      if (hasEmpty) {
        errors.push('All options must have non-empty text.');
      }
      const uniqueTexts = new Set(texts.filter((t) => t.length > 0));
      if (uniqueTexts.size !== texts.length) {
        errors.push('Duplicate option text detected. Options must be distinct.');
      }
    }

    if (!q.answerKey?.correctOptions || q.answerKey.correctOptions.length === 0) {
      errors.push('Correct answer option must be specified.');
    } else {
      const validKeys = (q.options || []).map((o) => o.key);
      const invalidKeys = q.answerKey.correctOptions.filter((k) => !validKeys.includes(k));
      if (invalidKeys.length > 0) {
        errors.push(`Correct option key '${invalidKeys.join(', ')}' does not match any valid option.`);
      }
    }
  }

  if (q.questionType === 'numerical') {
    if (q.answerKey?.numericalValue === undefined || isNaN(Number(q.answerKey.numericalValue))) {
      errors.push('Valid numerical answer value is required for numerical questions.');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function saveStoredQuestionServer(question: StoredQuestion): { success: boolean; errors?: string[] } {
  const validation = validateQuestionForSave(question);
  if (!validation.valid) {
    return { success: false, errors: validation.errors };
  }

  const db = getDatabase();
  const index = db.questions.findIndex((q) => q.id === question.id);
  if (index >= 0) {
    db.questions[index] = { ...question, updated_at: new Date().toISOString() };
  } else {
    db.questions.unshift({ ...question, created_at: new Date().toISOString(), updated_at: new Date().toISOString() });
  }

  persistDatabaseToDisk(db);
  return { success: true };
}

export function deleteStoredQuestionServer(id: string): boolean {
  const db = getDatabase();
  const initialLen = db.questions.length;
  db.questions = db.questions.filter((q) => q.id !== id);
  if (db.questions.length !== initialLen) {
    persistDatabaseToDisk(db);
    return true;
  }
  return false;
}

// ----------------------------------------------------------------------------
// PAPERS CRUD & VALIDATION
// ----------------------------------------------------------------------------

export function getStoredPapersServer(filter?: {
  examSlug?: string;
  status?: string;
  paperType?: string;
}): StoredPaper[] {
  const db = getDatabase();
  let list = db.papers;

  if (filter?.examSlug && filter.examSlug !== 'all') {
    list = list.filter((p) => p.examSlug === filter.examSlug);
  }
  if (filter?.status && filter.status !== 'all') {
    list = list.filter((p) => p.status === filter.status);
  }
  if (filter?.paperType && filter.paperType !== 'all') {
    list = list.filter((p) => p.paperType === filter.paperType);
  }

  return list;
}

export function getStoredPaperBySlugServer(slug: string): StoredPaper | null {
  const db = getDatabase();
  return db.papers.find((p) => p.slug === slug || p.id === slug) || null;
}

export function validatePaperForSave(p: Partial<StoredPaper>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!p.name || p.name.trim().length === 0) {
    errors.push('Paper title is required.');
  }

  if (!p.examSlug) {
    errors.push('Target examination is required.');
  }

  if (!p.durationMinutes || p.durationMinutes <= 0) {
    errors.push('Paper duration must be greater than zero.');
  }

  if (p.status === 'published') {
    if (!p.questionIds || p.questionIds.length === 0) {
      errors.push('Cannot publish paper with zero questions. Add questions from Question Bank.');
    } else {
      const db = getDatabase();
      const missingIds = p.questionIds.filter((qid) => !db.questions.some((q) => q.id === qid));
      if (missingIds.length > 0) {
        errors.push(`Paper references ${missingIds.length} missing question(s) that do not exist in the database.`);
      }

      const unpublishedQuestions = p.questionIds
        .map((qid) => db.questions.find((q) => q.id === qid))
        .filter((q) => q && q.status !== 'published' && q.status !== 'approved');
      if (unpublishedQuestions.length > 0) {
        errors.push(`Paper contains ${unpublishedQuestions.length} draft/unapproved question(s). All questions must be approved or published.`);
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function saveStoredPaperServer(paper: StoredPaper): { success: boolean; errors?: string[] } {
  const validation = validatePaperForSave(paper);
  if (!validation.valid) {
    return { success: false, errors: validation.errors };
  }

  const db = getDatabase();
  const index = db.papers.findIndex((p) => p.id === paper.id || p.slug === paper.slug);
  if (index >= 0) {
    db.papers[index] = { ...paper, updated_at: new Date().toISOString() };
  } else {
    db.papers.unshift({
      ...paper,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      published_at: paper.status === 'published' ? new Date().toISOString() : undefined,
    });
  }

  persistDatabaseToDisk(db);
  return { success: true };
}

export function deleteStoredPaperServer(id: string): boolean {
  const db = getDatabase();
  const initialLen = db.papers.length;
  db.papers = db.papers.filter((p) => p.id !== id && p.slug !== id);
  if (db.papers.length !== initialLen) {
    persistDatabaseToDisk(db);
    return true;
  }
  return false;
}

// ----------------------------------------------------------------------------
// ATTEMPTS & ENTITLEMENTS STORE
// ----------------------------------------------------------------------------

export function getAttemptsStore(): Record<string, any> {
  const db = getDatabase();
  return db.attempts;
}

export function saveAttemptsStore(): void {
  const db = getDatabase();
  persistDatabaseToDisk(db);
}

export function getEntitlementsStore(): Record<string, any[]> {
  const db = getDatabase();
  return db.entitlements;
}

export function saveEntitlementsStore(): void {
  const db = getDatabase();
  persistDatabaseToDisk(db);
}

// ----------------------------------------------------------------------------
// TUTORIAL VIDEO STORE
// ----------------------------------------------------------------------------

export function getStoredTutorialVideoServer(): TutorialVideoConfig {
  const db = getDatabase();
  const config = db.tutorialVideo || DEFAULT_TUTORIAL_VIDEO;

  // Defensive fallback: If the referenced video file does not exist on disk and we are not in tests,
  // gracefully fall back to the built-in default walkthrough video
  if (process.env.NODE_ENV !== 'test' && config.fileName) {
    const filePath = path.join(process.cwd(), 'public', 'uploads', 'videos', path.basename(config.fileName));
    if (!fs.existsSync(filePath)) {
      return DEFAULT_TUTORIAL_VIDEO;
    }
  }

  return config;
}

export function saveStoredTutorialVideoServer(config: TutorialVideoConfig): boolean {
  const db = getDatabase();
  db.tutorialVideo = {
    ...config,
    updated_at: new Date().toISOString(),
  };
  persistDatabaseToDisk(db);
  return true;
}

