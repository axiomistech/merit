export type AdminRole =
  | 'super_admin'
  | 'content_admin'
  | 'evaluator'
  | 'support_admin'
  | 'finance_admin';

export type AdminPermission =
  | 'dashboard.view'
  | 'analytics.view'
  | 'students.view'
  | 'students.manage'
  | 'exams.view'
  | 'exams.manage'
  | 'syllabus.manage'
  | 'questions.view'
  | 'questions.create'
  | 'questions.edit'
  | 'questions.review'
  | 'questions.publish'
  | 'tests.create'
  | 'tests.edit'
  | 'tests.publish'
  | 'omr.manage'
  | 'evaluations.manage'
  | 'payments.view'
  | 'payments.manage'
  | 'refunds.manage'
  | 'coupons.manage'
  | 'notifications.manage'
  | 'cms.manage'
  | 'support.manage'
  | 'admins.manage'
  | 'settings.manage'
  | 'audit_logs.view';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  status: 'active' | 'suspended';
  created_at: string;
  last_login?: string;
  permissions: AdminPermission[];
  avatar_url?: string;
}

export interface AuditLogEntry {
  id: string;
  actor_name: string;
  actor_email: string;
  actor_role: AdminRole;
  action: string;
  resource_type: string;
  resource_id?: string;
  metadata?: Record<string, any>;
  change_summary: string;
  created_at: string;
  ip_address?: string;
}

export interface SupportTicketItem {
  id: string;
  ticket_number: string;
  student_name: string;
  student_email: string;
  student_registration_id: string;
  category: 'account' | 'payment' | 'test' | 'question_error' | 'omr' | 'technical' | 'other';
  subject: string;
  description: string;
  status: 'new' | 'open' | 'in_progress' | 'waiting_for_student' | 'resolved' | 'closed';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  assigned_admin?: string;
  created_at: string;
  updated_at: string;
  internal_notes?: string[];
}

export interface CouponItem {
  id: string;
  code: string;
  name: string;
  description?: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number; // e.g., 20% or ₹5 (500 paise)
  applicable_exams: string[]; // ['all'] or ['neet', 'jee']
  min_purchase_amount: number;
  max_discount_amount?: number;
  total_limit: number;
  used_count: number;
  per_user_limit: number;
  starts_at: string;
  expires_at: string;
  status: 'active' | 'paused' | 'expired';
  revenue_generated: number;
}

export interface AdminTransactionRecord {
  id: string;
  orderId: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  productName: string;
  amount: number; // in INR
  status: 'successful' | 'failed' | 'refunded' | 'pending';
  gateway: 'razorpay' | 'complimentary';
  gatewayPaymentId: string;
  created_at: string;
}

export interface ProductPackage {
  id: string;
  title: string;
  slug: string;
  examSlug: string;
  paperType: 'single_paper' | 'mock_series' | 'chapter_bundle' | 'full_pass';
  description: string;
  price: number; // INR
  originalPrice?: number;
  includedPapersCount: number;
  accessValidityDays: number;
  features: string[];
  status: 'active' | 'inactive';
  salesCount: number;
  created_at: string;
}

export interface PricingRule {
  id: string;
  examSlug: string;
  examName: string;
  basePrice: number;
  firstPaperFree: boolean;
  bundleDiscountPercent: number;
  descriptiveEvaluationSurcharge: number;
  isActive: boolean;
  updated_at: string;
}

export interface RefundRecord {
  id: string;
  paymentId: string;
  orderId: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  amount: number; // INR
  reason: 'duplicate_payment' | 'technical_failure' | 'accidental_purchase' | 'satisfaction_guarantee' | 'other';
  notes: string;
  status: 'processed' | 'pending_approval' | 'rejected';
  processed_at?: string;
  processed_by?: string;
  created_at: string;
}

export interface InAppNotification {
  id: string;
  title: string;
  message: string;
  targetAudience: 'all_students' | 'neet_aspirants' | 'jee_aspirants' | 'upsc_aspirants' | 'engineering_students' | 'inactive_students';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  actionUrl?: string;
  sentAt: string;
  sentBy: string;
  readCount: number;
  deliveredCount: number;
  status: 'sent' | 'scheduled' | 'draft';
}

export interface AnnouncementBanner {
  id: string;
  title: string;
  content: string;
  badgeText?: string;
  bannerType: 'info' | 'warning' | 'alert' | 'success';
  targetExam: 'all' | 'neet' | 'jee' | 'upsc' | 'engineering';
  placement: 'header_top' | 'dashboard_top' | 'exam_portal';
  isActive: boolean;
  startDate: string;
  endDate: string;
  dismissible: boolean;
  created_at: string;
}

export interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  previewText: string;
  targetSegment: string;
  recipientsCount: number;
  openRatePercent: number;
  clickRatePercent: number;
  status: 'draft' | 'sending' | 'sent';
  sentAt?: string;
  created_at: string;
}

export interface TutorialVideoConfig {
  id?: string;
  enabled: boolean;
  videoUrl: string;
  storageKey?: string;
  fileName?: string;
  title: string;
  subtitle?: string;
  description?: string;
  mimeType?: string;
  sizeBytes?: number;
  durationSeconds?: number;
  posterUrl?: string;
  updated_at?: string;
}

export interface CMSHomepageData {
  heroTagline: string;
  heroHeadline: string;
  heroSubtext: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  bannerEnabled: boolean;
  bannerMessage: string;
  featuredExamSlugs: string[];
  statsDisplay: {
    studentsLabel: string;
    studentsValue: string;
    questionsLabel: string;
    questionsValue: string;
    testsLabel: string;
    testsValue: string;
  };
  tutorialVideo?: TutorialVideoConfig;
}

export interface CMSStaticPage {
  id: string;
  title: string;
  slug: string;
  category: 'legal' | 'company' | 'help';
  lastUpdated: string;
  status: 'published' | 'draft';
  contentMarkdown: string;
}

export interface CMSFAQItem {
  id: string;
  category: 'general' | 'exams' | 'omr' | 'payments' | 'technical';
  question: string;
  answer: string;
  sortOrder: number;
  isPublished: boolean;
}

export interface PlatformSEOSettings {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogImageUrl: string;
  twitterHandle: string;
  canonicalBaseUrl: string;
  structuredDataEnabled: boolean;
}

export interface PlatformSystemSettings {
  siteName: string;
  brandTagline: string;
  supportEmail: string;
  defaultCurrency: string;
  maintenanceMode: boolean;
  maintenanceNotice: string;
  allowNewRegistrations: boolean;
  sessionTimeoutMinutes: number;
  globalNegativeMarkingDefault: number;
  defaultTestDurationMinutes: number;
  maxLoginAttemptsBeforeLock: number;
}

export interface IntegrationService {
  id: string;
  name: string;
  category: 'payment' | 'database' | 'storage' | 'email' | 'analytics';
  provider: string;
  status: 'connected' | 'error' | 'not_configured';
  lastPing: string;
  maskedKey: string;
  details: string;
}

export interface OMRVerificationRecord {
  id: string;
  candidateRegistrationId: string;
  candidateName: string;
  testPaperName: string;
  rollNumberEntered: string;
  testBookletCode: string;
  scannedAt: string;
  autoExtractedScore: number;
  totalQuestions: number;
  ambiguousCount: number;
  status: 'verified' | 'requires_review' | 'flagged';
  reviewerName?: string;
  reviewNotes?: string;
  bubbles: {
    qNum: number;
    detectedBubble: string | null;
    confidence: number;
    resolvedBubble?: string | null;
    isAmbiguous: boolean;
  }[];
}

export type OMRVerificationItem = OMRVerificationRecord;
