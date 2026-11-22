'use client';

import { EXAMINATIONS } from '@/data/seedData';
import {
  AdminRole,
  AdminPermission,
  AdminUser,
  AuditLogEntry,
  SupportTicketItem,
  CouponItem,
  ProductPackage,
  PricingRule,
  RefundRecord,
  InAppNotification,
  AnnouncementBanner,
  EmailCampaign,
  CMSHomepageData,
  TutorialVideoConfig,
  CMSStaticPage,
  CMSFAQItem,
  PlatformSEOSettings,
  PlatformSystemSettings,
  IntegrationService,
  OMRVerificationItem,
} from '@/types/admin';
import { logAdminAction } from './auth';

export interface AdminExamRecord {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  category: 'medical' | 'engineering' | 'civil_services' | 'postgraduate' | 'university';
  description: string;
  tagline: string;
  subjectsCount: number;
  questionsCount: number;
  publishedTestsCount: number;
  status: 'published' | 'draft' | 'archived';
  defaultDurationMinutes: number;
  defaultMarks: number;
  negativeMarkingScheme: string;
  created_at: string;
}

export interface AdminQuestionRecord {
  id: string;
  versionId: string;
  examSlug: string;
  subjectSlug: string;
  subjectName: string;
  chapterSlug: string;
  conceptSlug: string;
  conceptName: string;
  questionType: 'single_correct' | 'multiple_correct' | 'numerical' | 'descriptive' | 'assertion_reason';
  difficulty: 'easy' | 'medium' | 'hard';
  marks: number;
  negativeMarks: number;
  status: 'published' | 'pending_review' | 'draft' | 'archived';
  text: string;
  options: { key: string; text: string }[];
  answerKey: { correctOptions?: string[]; numericalValue?: number; numericalTolerance?: number };
  explanation?: { text: string };
  reportReason?: string;
  created_at: string;
  updated_at: string;
}

export interface AdminTestRecord {
  id: string;
  name: string;
  slug: string;
  examSlug: string;
  paperType: 'mock_exam' | 'chapter_test' | 'subject_test' | 'previous_year';
  durationMinutes: number;
  totalQuestions: number;
  maxMarks: number;
  price: number;
  isFreeEligible: boolean;
  status: 'published' | 'draft' | 'paused' | 'archived';
  questionIds: string[];
  created_at: string;
}

export interface AdminStudentRecord {
  id: string;
  registrationId: string;
  fullName: string;
  email: string;
  accountStatus: 'active' | 'suspended';
  targetExam: string;
  testsAttempted: number;
  totalPurchases: number;
  created_at: string;
  last_activity: string;
  administrativeNotes?: string[];
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

// Initial seed generators
export function getInitialExams(): AdminExamRecord[] {
  return EXAMINATIONS.map((e) => ({
    id: `exam_${e.slug}`,
    slug: e.slug,
    name: e.name,
    shortName: e.shortName,
    category: e.category,
    description: e.description,
    tagline: e.tagline,
    subjectsCount: e.subjects.length,
    questionsCount: 0,
    publishedTestsCount: 0,
    status: 'published',
    defaultDurationMinutes: e.slug === 'neet' ? 200 : 180,
    defaultMarks: e.slug === 'neet' ? 720 : 300,
    negativeMarkingScheme: e.slug === 'neet' ? '+4 / -1' : '+4 / -1 / 0',
    created_at: '2026-01-01T00:00:00Z',
  }));
}

export function getInitialQuestions(): AdminQuestionRecord[] {
  // STRICT RULE: No simulated, fabricated, or seed questions. Empty by default.
  return [];
}

export function getInitialStudents(): AdminStudentRecord[] {
  // STRICT RULE: No simulated, fabricated, or mock student registrations. Empty by default.
  return [];
}

export function getInitialTransactions(): AdminTransactionRecord[] {
  // STRICT RULE: No simulated, fabricated, or dummy payment records. Empty by default.
  return [];
}

export function getInitialCoupons(): CouponItem[] {
  return [
    {
      id: 'cpn_01',
      code: 'WELCOME50',
      name: 'New Candidate Discount',
      description: '50% off on all individual test papers',
      discount_type: 'percentage',
      discount_value: 50,
      applicable_exams: ['all'],
      min_purchase_amount: 10,
      total_limit: 1000,
      used_count: 0,
      per_user_limit: 1,
      starts_at: '2026-01-01T00:00:00Z',
      expires_at: '2026-12-31T23:59:59Z',
      status: 'active',
      revenue_generated: 0,
    },
    {
      id: 'cpn_02',
      code: 'NEET2026',
      name: 'NEET Aspirant Promotion',
      description: 'Flat ₹5 discount on NEET mock series',
      discount_type: 'fixed',
      discount_value: 5,
      applicable_exams: ['neet'],
      min_purchase_amount: 10,
      total_limit: 500,
      used_count: 0,
      per_user_limit: 2,
      starts_at: '2026-01-01T00:00:00Z',
      expires_at: '2026-06-30T23:59:59Z',
      status: 'active',
      revenue_generated: 0,
    },
  ];
}

export function getInitialSupportTickets(): SupportTicketItem[] {
  // STRICT RULE: No fabricated support tickets. Empty by default.
  return [];
}

// Persistent Store Helpers
export function getStoredExams(): AdminExamRecord[] {
  if (typeof window === 'undefined') return getInitialExams();
  const stored = localStorage.getItem('fort_admin_exams');
  if (!stored) {
    const init = getInitialExams();
    localStorage.setItem('fort_admin_exams', JSON.stringify(init));
    return init;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return getInitialExams();
  }
}

export function saveStoredExams(exams: AdminExamRecord[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('fort_admin_exams', JSON.stringify(exams));
}

export function getStoredQuestions(): AdminQuestionRecord[] {
  if (typeof window === 'undefined') return getInitialQuestions();
  const stored = localStorage.getItem('fort_admin_questions');
  if (!stored) {
    const init = getInitialQuestions();
    localStorage.setItem('fort_admin_questions', JSON.stringify(init));
    return init;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return getInitialQuestions();
  }
}

export function saveStoredQuestions(questions: AdminQuestionRecord[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('fort_admin_questions', JSON.stringify(questions));
}

export function getInitialTests(): AdminTestRecord[] {
  // STRICT RULE: No simulated, fabricated, or seed examination papers. Empty by default.
  return [];
}

export function getStoredTests(): AdminTestRecord[] {
  if (typeof window === 'undefined') return getInitialTests();
  const stored = localStorage.getItem('fort_admin_tests');
  if (!stored) {
    const init = getInitialTests();
    localStorage.setItem('fort_admin_tests', JSON.stringify(init));
    return init;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return getInitialTests();
  }
}

export function saveStoredTests(tests: AdminTestRecord[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('fort_admin_tests', JSON.stringify(tests));
}

export function getStoredStudents(): AdminStudentRecord[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('fort_admin_students');
  if (!stored) return [];
  try {
    const list: AdminStudentRecord[] = JSON.parse(stored);
    const mockEmails = new Set([
      'dhanush.student@gmail.com',
      'aarav.sharma@example.com',
      'priya.iyer@example.com',
      'rohan.d@example.com',
    ]);
    const mockIds = new Set(['usr_001', 'usr_002', 'usr_003', 'usr_004']);
    const cleanList = list.filter((s) => !mockEmails.has(s.email?.toLowerCase()) && !mockIds.has(s.id));
    if (cleanList.length !== list.length) {
      localStorage.setItem('fort_admin_students', JSON.stringify(cleanList));
    }
    return cleanList;
  } catch {
    return [];
  }
}

export function saveStoredStudents(students: AdminStudentRecord[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('fort_admin_students', JSON.stringify(students));
}

export function getStoredTransactions(): AdminTransactionRecord[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('fort_admin_transactions');
  if (!stored) return [];
  try {
    const list: AdminTransactionRecord[] = JSON.parse(stored);
    const mockTxnIds = new Set(['txn_001', 'txn_002', 'txn_003']);
    const mockGateways = new Set(['pay_rzp_live_0192837', 'pay_rzp_live_0192838', 'pay_rzp_live_0192839']);
    const cleanList = list.filter((t) => !mockTxnIds.has(t.id) && !mockGateways.has(t.gatewayPaymentId));
    if (cleanList.length !== list.length) {
      localStorage.setItem('fort_admin_transactions', JSON.stringify(cleanList));
    }
    return cleanList;
  } catch {
    return [];
  }
}

export function saveStoredTransactions(txns: AdminTransactionRecord[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('fort_admin_transactions', JSON.stringify(txns));
}

export function getStoredCoupons(): CouponItem[] {
  if (typeof window === 'undefined') return getInitialCoupons();
  const stored = localStorage.getItem('fort_admin_coupons');
  if (!stored) {
    const init = getInitialCoupons();
    localStorage.setItem('fort_admin_coupons', JSON.stringify(init));
    return init;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return getInitialCoupons();
  }
}

export function saveStoredCoupons(coupons: CouponItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('fort_admin_coupons', JSON.stringify(coupons));
}

export function getStoredSupportTickets(): SupportTicketItem[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('fort_admin_support_tickets');
  if (!stored) return [];
  try {
    const list: SupportTicketItem[] = JSON.parse(stored);
    const mockTicketIds = new Set(['tkt_01', 'tkt_02', 'TCK-26-001', 'TCK-26-002']);
    const cleanList = list.filter((t) => !mockTicketIds.has(t.id) && !mockTicketIds.has(t.ticket_number));
    if (cleanList.length !== list.length) {
      localStorage.setItem('fort_admin_support_tickets', JSON.stringify(cleanList));
    }
    return cleanList;
  } catch {
    return [];
  }
}

export function saveStoredSupportTickets(tickets: SupportTicketItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('fort_admin_support_tickets', JSON.stringify(tickets));
}

// ---------------- PRODUCTS & PACKS ----------------
export function getInitialProducts(): ProductPackage[] {
  return [
    {
      id: 'prod_neet_full_2026',
      title: 'NEET 2026 Ultimate Mock Series (10 Full Tests + OMR)',
      slug: 'neet-2026-ultimate-mock-series',
      examSlug: 'neet',
      paperType: 'mock_series',
      description: 'Ten full-length 720-mark simulated examinations with instant printable A4 OMR sheets, detailed KaTeX solutions, and all-India percentile ranking.',
      price: 99,
      originalPrice: 199,
      includedPapersCount: 10,
      accessValidityDays: 365,
      features: ['10 NTA-format 720-mark papers', 'Automatic printable NEET OMR generation', 'Negative marking analytics (-1/+4)', 'Subject & chapter diagnostic report'],
      status: 'active',
      salesCount: 0,
      created_at: '2026-01-10T10:00:00Z',
    },
    {
      id: 'prod_jee_advanced_pack',
      title: 'JEE Advanced High-Yield Numerical & Matrix Pack',
      slug: 'jee-advanced-pack',
      examSlug: 'jee-advanced',
      paperType: 'chapter_bundle',
      description: '6 intensive simulation tests focusing on multi-correct, integer, and paragraph questions with partial marking calculations.',
      price: 149,
      originalPrice: 249,
      includedPapersCount: 6,
      accessValidityDays: 180,
      features: ['Partial marking evaluation engine', 'Multi-correct with decimal numericals', 'Time-per-question velocity metrics'],
      status: 'active',
      salesCount: 0,
      created_at: '2026-02-01T12:00:00Z',
    },
    {
      id: 'prod_upsc_mains_pack',
      title: 'UPSC Mains GS Answer Evaluation (5 Papers)',
      slug: 'upsc-mains-gs-evaluation',
      examSlug: 'upsc-cse',
      paperType: 'full_pass',
      description: 'Human evaluator reviewed descriptive answers with rubric-based marks (0-10) and structured improvement feedback.',
      price: 499,
      originalPrice: 799,
      includedPapersCount: 5,
      accessValidityDays: 90,
      features: ['Verified educator grading within 48h', 'Rubric breakdown across structure & depth', 'Model answers and reference pointers'],
      status: 'active',
      salesCount: 0,
      created_at: '2026-02-15T09:30:00Z',
    },
    {
      id: 'prod_single_paper_token',
      title: 'Standard Examination Practice Token (1 Full Paper)',
      slug: 'standard-paper-token',
      examSlug: 'all',
      paperType: 'single_paper',
      description: 'Standard pay-per-test access for any mock or custom test paper across MERITWISE.',
      price: 10,
      originalPrice: 20,
      includedPapersCount: 1,
      accessValidityDays: 30,
      features: ['Full paper simulation', 'Instant solution access', 'OMR download (for NEET)'],
      status: 'active',
      salesCount: 0,
      created_at: '2026-01-01T00:00:00Z',
    },
  ];
}

export function getStoredProducts(): ProductPackage[] {
  if (typeof window === 'undefined') return getInitialProducts();
  const stored = localStorage.getItem('fort_admin_products');
  if (!stored) {
    const init = getInitialProducts();
    localStorage.setItem('fort_admin_products', JSON.stringify(init));
    return init;
  }
  try { return JSON.parse(stored); } catch { return getInitialProducts(); }
}

export function saveStoredProducts(products: ProductPackage[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('fort_admin_products', JSON.stringify(products));
}

// ---------------- PRICING RULES ----------------
export function getInitialPricingRules(): PricingRule[] {
  return [
    {
      id: 'rule_global',
      examSlug: 'all',
      examName: 'Global Default Baseline',
      basePrice: 10,
      firstPaperFree: true,
      bundleDiscountPercent: 20,
      descriptiveEvaluationSurcharge: 0,
      isActive: true,
      updated_at: '2026-11-20T10:00:00Z',
    },
    {
      id: 'rule_neet',
      examSlug: 'neet',
      examName: 'NEET (UG) Medical',
      basePrice: 10,
      firstPaperFree: true,
      bundleDiscountPercent: 25,
      descriptiveEvaluationSurcharge: 0,
      isActive: true,
      updated_at: '2026-11-20T10:00:00Z',
    },
    {
      id: 'rule_jee',
      examSlug: 'jee-main',
      examName: 'JEE Main Engineering',
      basePrice: 10,
      firstPaperFree: true,
      bundleDiscountPercent: 20,
      descriptiveEvaluationSurcharge: 0,
      isActive: true,
      updated_at: '2026-11-20T10:00:00Z',
    },
    {
      id: 'rule_upsc',
      examSlug: 'upsc-cse',
      examName: 'UPSC Civil Services (Mains Evaluated)',
      basePrice: 49,
      firstPaperFree: false,
      bundleDiscountPercent: 15,
      descriptiveEvaluationSurcharge: 40,
      isActive: true,
      updated_at: '2026-11-20T10:00:00Z',
    },
  ];
}

export function getStoredPricingRules(): PricingRule[] {
  if (typeof window === 'undefined') return getInitialPricingRules();
  const stored = localStorage.getItem('fort_admin_pricing_rules');
  if (!stored) {
    const init = getInitialPricingRules();
    localStorage.setItem('fort_admin_pricing_rules', JSON.stringify(init));
    return init;
  }
  try { return JSON.parse(stored); } catch { return getInitialPricingRules(); }
}

export function saveStoredPricingRules(rules: PricingRule[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('fort_admin_pricing_rules', JSON.stringify(rules));
}

// ---------------- REFUNDS ----------------
export function getInitialRefunds(): RefundRecord[] {
  // STRICT RULE: No fabricated refund records. Empty by default.
  return [];
}

export function getStoredRefunds(): RefundRecord[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('fort_admin_refunds');
  if (!stored) return [];
  try {
    const list: RefundRecord[] = JSON.parse(stored);
    const mockRefIds = new Set(['ref_9011', 'ref_9012']);
    const cleanList = list.filter((r) => !mockRefIds.has(r.id));
    if (cleanList.length !== list.length) {
      localStorage.setItem('fort_admin_refunds', JSON.stringify(cleanList));
    }
    return cleanList;
  } catch {
    return [];
  }
}

export function saveStoredRefunds(refunds: RefundRecord[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('fort_admin_refunds', JSON.stringify(refunds));
}

// ---------------- NOTIFICATIONS ----------------
export function getInitialNotifications(): InAppNotification[] {
  // STRICT RULE: No fabricated in-app notifications. Empty by default.
  return [];
}

export function getStoredNotifications(): InAppNotification[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('fort_admin_notifications');
  if (!stored) return [];
  try {
    const list: InAppNotification[] = JSON.parse(stored);
    const mockNotifs = new Set(['notif_001', 'notif_002']);
    const cleanList = list.filter((n) => !mockNotifs.has(n.id));
    if (cleanList.length !== list.length) {
      localStorage.setItem('fort_admin_notifications', JSON.stringify(cleanList));
    }
    return cleanList;
  } catch {
    return [];
  }
}

export function saveStoredNotifications(notifs: InAppNotification[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('fort_admin_notifications', JSON.stringify(notifs));
}

// ---------------- ANNOUNCEMENTS ----------------
export function getInitialAnnouncements(): AnnouncementBanner[] {
  return [
    {
      id: 'ann_01',
      title: 'NEET 2026 Registration Announcement',
      content: 'National Testing Agency official bulletin released. Practice according to updated syllabus guidelines.',
      badgeText: 'Important',
      bannerType: 'info',
      targetExam: 'neet',
      placement: 'header_top',
      isActive: true,
      startDate: '2026-11-01T00:00:00Z',
      endDate: '2026-12-31T23:59:59Z',
      dismissible: true,
      created_at: '2026-11-01T10:00:00Z',
    },
    {
      id: 'ann_02',
      title: 'First Full Examination Paper Is Free For All Registered Candidates',
      content: 'Claim your complimentary full-length test with personalized OMR sheet and instantaneous diagnostic scoring upon registration.',
      badgeText: 'Offer',
      bannerType: 'success',
      targetExam: 'all',
      placement: 'dashboard_top',
      isActive: true,
      startDate: '2026-01-01T00:00:00Z',
      endDate: '2026-12-31T23:59:59Z',
      dismissible: false,
      created_at: '2026-01-01T00:00:00Z',
    },
  ];
}

export function getStoredAnnouncements(): AnnouncementBanner[] {
  if (typeof window === 'undefined') return getInitialAnnouncements();
  const stored = localStorage.getItem('fort_admin_announcements');
  if (!stored) {
    const init = getInitialAnnouncements();
    localStorage.setItem('fort_admin_announcements', JSON.stringify(init));
    return init;
  }
  try { return JSON.parse(stored); } catch { return getInitialAnnouncements(); }
}

export function saveStoredAnnouncements(announcements: AnnouncementBanner[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('fort_admin_announcements', JSON.stringify(announcements));
}

// ---------------- EMAIL CAMPAIGNS ----------------
export function getInitialCampaigns(): EmailCampaign[] {
  // STRICT RULE: No fabricated email campaigns. Empty by default.
  return [];
}

export function getStoredCampaigns(): EmailCampaign[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('fort_admin_campaigns');
  if (!stored) return [];
  try {
    const list: EmailCampaign[] = JSON.parse(stored);
    const mockCamps = new Set(['camp_01', 'camp_02']);
    const cleanList = list.filter((c) => !mockCamps.has(c.id));
    if (cleanList.length !== list.length) {
      localStorage.setItem('fort_admin_campaigns', JSON.stringify(cleanList));
    }
    return cleanList;
  } catch {
    return [];
  }
}

export function saveStoredCampaigns(campaigns: EmailCampaign[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('fort_admin_campaigns', JSON.stringify(campaigns));
}

// ---------------- CMS HOMEPAGE ----------------
export function getInitialCMSHomepage(): CMSHomepageData {
  return {
    heroTagline: 'STRUCTURED LEARNING & EXAMINATION INFRASTRUCTURE',
    heroHeadline: 'Knowledge. Built Strong.',
    heroSubtext: 'The rigorous digital examination platform engineered for serious aspirants. Real NTA-format tests, authentic printable OMR sheets, sub-concept analytics, and KaTeX-rendered solutions.',
    primaryCtaText: 'Start Practicing',
    primaryCtaLink: '/login',
    secondaryCtaText: 'Explore Exams',
    secondaryCtaLink: '/#exams',
    bannerEnabled: true,
    bannerMessage: 'First examination paper is complimentary for all registered candidates.',
    featuredExamSlugs: ['neet', 'jee-main', 'jee-advanced', 'upsc-cse'],
    statsDisplay: {
      studentsLabel: 'Aspirants Practicing',
      studentsValue: '0',
      questionsLabel: 'Curated Question Bank',
      questionsValue: '0',
      testsLabel: 'Full Mocks Completed',
      testsValue: '0',
    },
    tutorialVideo: {
      id: 'vid_default_walkthrough',
      enabled: true,
      videoUrl: '/api/videos/meritwise-platform-walkthrough.mp4',
      storageKey: 'tutorial-videos/meritwise-platform-walkthrough.mp4',
      fileName: 'meritwise-platform-walkthrough.mp4',
      title: 'MERITWISE Platform Walkthrough & Tutorial',
      subtitle: 'See how Meritwise works in action.',
      description: 'Complete platform demonstration: Timed examination simulation, physical-grade vector OMR response sheets, and diagnostic analytics.',
      mimeType: 'video/mp4',
      sizeBytes: 23552,
      updated_at: new Date().toISOString(),
    },
  };
}

export function getStoredCMSHomepage(): CMSHomepageData {
  if (typeof window === 'undefined') return getInitialCMSHomepage();
  const stored = localStorage.getItem('fort_admin_cms_homepage');
  if (!stored) {
    const init = getInitialCMSHomepage();
    localStorage.setItem('fort_admin_cms_homepage', JSON.stringify(init));
    return init;
  }
  try { return JSON.parse(stored); } catch { return getInitialCMSHomepage(); }
}

export function saveStoredCMSHomepage(data: CMSHomepageData) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('fort_admin_cms_homepage', JSON.stringify(data));
}

export function getStoredTutorialVideo(): TutorialVideoConfig {
  const hp = getStoredCMSHomepage();
  return hp.tutorialVideo || {
    id: 'vid_default_walkthrough',
    enabled: true,
    videoUrl: '/api/videos/meritwise-platform-walkthrough.mp4',
    storageKey: 'tutorial-videos/meritwise-platform-walkthrough.mp4',
    fileName: 'meritwise-platform-walkthrough.mp4',
    title: 'MERITWISE Platform Walkthrough & Tutorial',
    subtitle: 'See how Meritwise works in action.',
    description: 'Complete platform demonstration: Timed examination simulation, physical-grade vector OMR response sheets, and diagnostic analytics.',
    mimeType: 'video/mp4',
    sizeBytes: 23552,
    updated_at: new Date().toISOString(),
  };
}

export function saveStoredTutorialVideo(video: TutorialVideoConfig) {
  const hp = getStoredCMSHomepage();
  hp.tutorialVideo = video;
  saveStoredCMSHomepage(hp);
}

// ---------------- CMS PAGES ----------------
export function getInitialCMSPages(): CMSStaticPage[] {
  return [
    {
      id: 'page_terms',
      title: 'Terms of Service',
      slug: 'terms',
      category: 'legal',
      lastUpdated: '2026-11-01',
      status: 'published',
      contentMarkdown: '# Terms of Service\n\nWelcome to MERITWISE. By accessing or using our services, you agree to be bound by these terms...',
    },
    {
      id: 'page_privacy',
      title: 'Privacy Policy',
      slug: 'privacy',
      category: 'legal',
      lastUpdated: '2026-11-01',
      status: 'published',
      contentMarkdown: '# Privacy Policy\n\nYour privacy is paramount. MERITWISE safeguards candidate information, test records, and payment credentials...',
    },
    {
      id: 'page_refund',
      title: 'Refund & Cancellation Policy',
      slug: 'refund',
      category: 'legal',
      lastUpdated: '2026-11-15',
      status: 'published',
      contentMarkdown: '# Refund Policy\n\nWe maintain fair, transparent refund guidelines for all digital test paper purchases...',
    },
    {
      id: 'page_honor',
      title: 'Academic Honor Code',
      slug: 'honor-code',
      category: 'legal',
      lastUpdated: '2026-10-20',
      status: 'published',
      contentMarkdown: '# Examination Honor Code\n\nCandidates must adhere to honest, timed examination standards during simulated tests...',
    },
  ];
}

export function getStoredCMSPages(): CMSStaticPage[] {
  if (typeof window === 'undefined') return getInitialCMSPages();
  const stored = localStorage.getItem('fort_admin_cms_pages');
  if (!stored) {
    const init = getInitialCMSPages();
    localStorage.setItem('fort_admin_cms_pages', JSON.stringify(init));
    return init;
  }
  try { return JSON.parse(stored); } catch { return getInitialCMSPages(); }
}

export function saveStoredCMSPages(pages: CMSStaticPage[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('fort_admin_cms_pages', JSON.stringify(pages));
}

// ---------------- CMS FAQS ----------------
export function getInitialCMSFAQs(): CMSFAQItem[] {
  return [
    {
      id: 'faq_01',
      category: 'general',
      question: 'What is MERITWISE and how is it different from traditional test series?',
      answer: 'MERITWISE combines authentic examination simulations (including authentic printable A4 NEET OMR answer sheets) with deep cognitive diagnostic analytics. Rather than generic percentage scores, we break down speed, accuracy, and sub-concept mastery.',
      sortOrder: 1,
      isPublished: true,
    },
    {
      id: 'faq_02',
      category: 'exams',
      question: 'Are the questions aligned with the latest NTA and UPSC syllabus?',
      answer: 'Yes. All questions undergo editorial verification and are classified against the current official syllabus hierarchies, including updated chapter weightages.',
      sortOrder: 2,
      isPublished: true,
    },
    {
      id: 'faq_03',
      category: 'omr',
      question: 'How does the authentic printable NEET OMR sheet work?',
      answer: 'During or after your mock examination attempt, MERITWISE generates a personalized A4 OMR sheet populated with your Candidate Name, Roll Number, Test Booklet Code, and darkened response bubbles. You can print it or download it as a high-resolution vector PDF.',
      sortOrder: 3,
      isPublished: true,
    },
    {
      id: 'faq_04',
      category: 'payments',
      question: 'Is my first practice test free?',
      answer: 'Yes! Newly registered candidates automatically receive a complimentary entitlement to attempt their first full examination paper without entering any credit card or payment details.',
      sortOrder: 4,
      isPublished: true,
    },
  ];
}

export function getStoredCMSFAQs(): CMSFAQItem[] {
  if (typeof window === 'undefined') return getInitialCMSFAQs();
  const stored = localStorage.getItem('fort_admin_cms_faqs');
  if (!stored) {
    const init = getInitialCMSFAQs();
    localStorage.setItem('fort_admin_cms_faqs', JSON.stringify(init));
    return init;
  }
  try { return JSON.parse(stored); } catch { return getInitialCMSFAQs(); }
}

export function saveStoredCMSFAQs(faqs: CMSFAQItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('fort_admin_cms_faqs', JSON.stringify(faqs));
}

// ---------------- SEO SETTINGS ----------------
export function getInitialSEO(): PlatformSEOSettings {
  return {
    metaTitle: 'MERITWISE — Knowledge. Built Strong. | NEET, JEE & UPSC Examination Practice',
    metaDescription: 'Authentic examination practice and simulated test series for NEET, JEE Main, JEE Advanced, and UPSC CSE. Personalized OMR sheets, chapter diagnostics, and timed test engines.',
    metaKeywords: 'NEET test series, JEE mock exam, UPSC answer writing, NEET OMR sheet download, online mock test, MERITWISE learning',
    ogImageUrl: 'https://fortlearning.com/og-image.png',
    twitterHandle: '@fortlearning',
    canonicalBaseUrl: 'https://fortlearning.com',
    structuredDataEnabled: true,
  };
}

export function getStoredSEO(): PlatformSEOSettings {
  if (typeof window === 'undefined') return getInitialSEO();
  const stored = localStorage.getItem('fort_admin_seo');
  if (!stored) {
    const init = getInitialSEO();
    localStorage.setItem('fort_admin_seo', JSON.stringify(init));
    return init;
  }
  try { return JSON.parse(stored); } catch { return getInitialSEO(); }
}

export function saveStoredSEO(seo: PlatformSEOSettings) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('fort_admin_seo', JSON.stringify(seo));
}

// ---------------- SYSTEM SETTINGS ----------------
export function getInitialSettings(): PlatformSystemSettings {
  return {
    siteName: 'MERITWISE',
    brandTagline: 'Knowledge. Built Strong.',
    supportEmail: 'support@fortlearning.com',
    defaultCurrency: 'INR (₹)',
    maintenanceMode: false,
    maintenanceNotice: 'MERITWISE is undergoing scheduled maintenance. Services will resume shortly.',
    allowNewRegistrations: true,
    sessionTimeoutMinutes: 120,
    globalNegativeMarkingDefault: -1,
    defaultTestDurationMinutes: 180,
    maxLoginAttemptsBeforeLock: 5,
  };
}

export function getStoredSettings(): PlatformSystemSettings {
  if (typeof window === 'undefined') return getInitialSettings();
  const stored = localStorage.getItem('fort_admin_settings');
  if (!stored) {
    const init = getInitialSettings();
    localStorage.setItem('fort_admin_settings', JSON.stringify(init));
    return init;
  }
  try { return JSON.parse(stored); } catch { return getInitialSettings(); }
}

export function saveStoredSettings(settings: PlatformSystemSettings) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('fort_admin_settings', JSON.stringify(settings));
}

// ---------------- INTEGRATIONS ----------------
export function getInitialIntegrations(): IntegrationService[] {
  return [
    {
      id: 'int_razorpay',
      name: 'Razorpay Payment Gateway',
      category: 'payment',
      provider: 'Razorpay Standard Checkout & Webhooks',
      status: 'connected',
      lastPing: '2026-11-21T20:25:00Z',
      maskedKey: 'rzp_live_••••••••••••••••34a1',
      details: 'Processes payments via UPI, NetBanking, Debit/Credit Cards. Automatic refund API enabled.',
    },
    {
      id: 'int_supabase',
      name: 'Supabase PostgreSQL Database & Auth',
      category: 'database',
      provider: 'Managed Postgres with Row-Level Security',
      status: 'connected',
      lastPing: '2026-11-21T20:30:00Z',
      maskedKey: 'sbp_••••••••••••••••098f',
      details: 'Primary relational schema for exams, questions, submissions, audit logs, and student profiles.',
    },
    {
      id: 'int_storage',
      name: 'Cloudflare R2 / S3 Object Storage',
      category: 'storage',
      provider: 'S3-compatible Vector PDF & Asset Store',
      status: 'connected',
      lastPing: '2026-11-21T19:50:00Z',
      maskedKey: 'r2_key_••••••••••••••••77e2',
      details: 'Stores generated candidate OMR PDFs, descriptive answer script uploads, and question diagrams.',
    },
    {
      id: 'int_email',
      name: 'Resend / AWS SES Email Gateway',
      category: 'email',
      provider: 'Transactional & Campaign SMTP API',
      status: 'connected',
      lastPing: '2026-11-21T18:15:00Z',
      maskedKey: 're_••••••••••••••••443b',
      details: 'Delivers registration verification, purchase invoices, and weekly performance digests.',
    },
    {
      id: 'int_analytics',
      name: 'PostHog / Mixpanel Analytics',
      category: 'analytics',
      provider: 'Event stream and cohort funnel tracker',
      status: 'connected',
      lastPing: '2026-11-21T20:10:00Z',
      maskedKey: 'phc_••••••••••••••••99c0',
      details: 'Anonymized drop-off tracking during practice, time-per-question velocity, and conversion.',
    },
  ];
}

export function getStoredIntegrations(): IntegrationService[] {
  if (typeof window === 'undefined') return getInitialIntegrations();
  const stored = localStorage.getItem('fort_admin_integrations');
  if (!stored) {
    const init = getInitialIntegrations();
    localStorage.setItem('fort_admin_integrations', JSON.stringify(init));
    return init;
  }
  try { return JSON.parse(stored); } catch { return getInitialIntegrations(); }
}

export function saveStoredIntegrations(integrations: IntegrationService[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('fort_admin_integrations', JSON.stringify(integrations));
}

// ---------------- OMR VERIFICATION QUEUE ----------------
export function getInitialOMRRecords(): OMRVerificationItem[] {
  // STRICT RULE: No fabricated OMR verification queue records. Empty by default.
  return [];
}

export function getStoredOMRRecords(): OMRVerificationItem[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('fort_admin_omr_records');
  if (!stored) return [];
  try {
    const list: OMRVerificationItem[] = JSON.parse(stored);
    const mockOMR = new Set(['omr_rec_001', 'omr_rec_002']);
    const cleanList = list.filter((o) => !mockOMR.has(o.id));
    if (cleanList.length !== list.length) {
      localStorage.setItem('fort_admin_omr_records', JSON.stringify(cleanList));
    }
    return cleanList;
  } catch {
    return [];
  }
}

export function saveStoredOMRRecords(records: OMRVerificationItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('fort_admin_omr_records', JSON.stringify(records));
}
