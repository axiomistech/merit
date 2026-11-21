export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type ExamCategory = 'medical' | 'engineering' | 'civil_services' | 'university';

export type QuestionType =
  | 'single_correct'
  | 'multiple_correct'
  | 'numerical'
  | 'assertion_reason'
  | 'matrix_match'
  | 'descriptive';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export type AttemptStatus =
  | 'ready'
  | 'active'
  | 'paused'
  | 'submitted'
  | 'auto_submitted'
  | 'evaluated'
  | 'abandoned';

export interface Profile {
  id: string;
  registration_id: string;
  full_name: string;
  email: string;
  date_of_birth?: string | null;
  phone?: string | null;
  country: string;
  avatar_url?: string | null;
  onboarding_completed: boolean;
  account_status: 'active' | 'suspended' | 'deactivated';
  created_at: string;
  updated_at: string;
}

export interface Examination {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  category: ExamCategory;
  active: boolean;
  icon?: string | null;
  display_order: number;
  created_at: string;
}

export interface Subject {
  id: string;
  examination_id: string;
  name: string;
  slug: string;
  display_order: number;
}

export interface Concept {
  id: string;
  subject_id: string;
  syllabus_node_id?: string | null;
  name: string;
  slug: string;
  description?: string | null;
  display_order: number;
}

export interface QuestionPaper {
  id: string;
  examination_id: string;
  examination_version_id?: string | null;
  name: string;
  slug: string;
  description?: string | null;
  paper_type: 'mock_exam' | 'previous_year' | 'chapter_test' | 'subject_test' | 'custom_practice';
  duration_minutes: number;
  max_marks: number;
  price: number; // in INR
  is_free_eligible: boolean;
  status: 'draft' | 'published' | 'archived';
  configuration: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Attempt {
  id: string;
  student_id: string;
  paper_id: string;
  paper_version_snapshot: Record<string, any>;
  examination_configuration_snapshot: Record<string, any>;
  status: AttemptStatus;
  started_at?: string | null;
  deadline_at?: string | null;
  submitted_at?: string | null;
  evaluated_at?: string | null;
  duration_seconds: number;
  score?: number | null;
  max_score?: number | null;
  accuracy?: number | null;
  attempt_metadata: Record<string, any>;
  created_at: string;
}

export interface AttemptAnswer {
  id: string;
  attempt_id: string;
  question_version_id: string;
  answer_data: {
    selected_options?: string[];
    numerical_value?: number;
    text_response?: string;
  };
  is_answered: boolean;
  marked_for_review: boolean;
  time_spent_seconds: number;
  saved_at: string;
}
