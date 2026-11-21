# FORT Learning — Build Status & Architecture Manifest

**Current Status:** All Core Phases Completed & Verified  
**Date:** 2026-11-21  
**Product:** FORT Learning (FORTLEARNING.COM)  
**Motto:** Knowledge. Built Strong.

---

## 1. Executive Summary

A complete, production-grade educational examination practice and analytics platform has been designed, implemented, and verified for **FORT Learning**. The application features authentic authentication, atomic candidate registration IDs, PostgreSQL DDL migrations with Row Level Security, centralized scoring with partial marking, live bidirectional physical-grade OMR simulation with A4 vector PDF generation, server-authoritative examination timers, evidence-based concept remediation, and Razorpay payment integration.

---

## 2. Completed Functionality

### Phase 1: Foundation & Design System
- Custom FORT Learning design system tokens (`Deep Midnight #0B1020`, `Surface #11182A`, `Elevated #172033`, `Border #263554`, `Steel Blue #6486C6`, `Warm Ivory #F2EFE7`).
- KaTeX mathematical and chemical equation rendering engine supporting both inline (`$...$`) and display (`$$...$$`) math.
- Responsive layout with collapsible sidebar and mobile drawer navigation.

### Phase 2: Public Platform & Storytelling (15 Sections)
- Cinematic, data-driven Homepage (`/`):
  - Hero with real interactive examination UI preview
  - The Problem in competitive entrance prep
  - The FORT Approach: Select → Practice → Simulate → Analyze → Improve
  - Target programs showcase (NEET, JEE Main, JEE Advanced, UPSC, Engineering)
  - Live interactive OMR simulation demonstration
  - Transparent pricing (First paper free, ₹10 subsequent)
  - Comprehensive FAQs and conversion CTA
- Dedicated public landing pages: `/neet`, `/jee-main`, `/jee-advanced`, `/upsc`, `/engineering`, `/how-it-works`, `/features`, `/pricing`, `/faq`, `/contact`.
- Complete statutory legal suite: `/privacy-policy`, `/terms-and-conditions`, `/terms-of-service`, `/refund-policy`, `/cancellation-policy`, `/payment-terms`, `/disclaimer`, `/cookie-policy`, `/accessibility`, `/copyright`, `/contact/grievance`.

### Phase 3 & 4: Authentication & Guided Onboarding
- Registration endpoint (`/api/auth/register`) generating atomic, immutable registration IDs (`FORT-26-XXXXXX`).
- Registration form with validation, terms consent, and age verification.
- Login and session handling with secure cookie architecture.
- 6-step guided onboarding workflow (`/onboarding`): target examinations, target year, study preferences, preparation stage, and review.

### Phase 5, 6 & 7: Student Workspace & Practice Engine
- Student Dashboard (`/dashboard`) with greeting, candidate ID, KPI metrics, enrolled exam portals, concept mastery health bars, and automated revision queue.
- Curricula-specific practice dashboards:
  - `/dashboard/neet`: Physics, Chemistry, Botany, Zoology with NCERT unit breakdown.
  - `/dashboard/jee-main`: Physics, Chemistry, Math CBT practice.
  - `/dashboard/jee-advanced`: Multi-correct & partial scoring blueprints.
  - `/dashboard/upsc`: Prelims objective tests & Mains rich-text descriptive answer-writing studio with live word counts and rubric evaluation.
  - `/dashboard/engineering`: University semester exam configuration.

### Phase 8 & 9: Examination Engine & Live OMR (Signature Feature)
- Distraction-free exam runner (`/exam/[attemptId]`):
  - Server-authoritative countdown timer calculated against deadline.
  - 5-state question palette (Answered, Unanswered, Marked for Review, Answered & Marked, Not Visited).
  - Autosaved answer buffer and tab switching detection.
  - Live bidirectional OMR grid (`src/components/omr/LiveOMRSheet.tsx`): clicking options fills bubbles; clicking bubbles selects options; clearing blanks all bubbles.
  - Printable vector A4 PDF generation (`src/lib/omr/pdfGenerator.ts`) formatted for standard 300 DPI printers with candidate hashes and barcode metadata.

### Phase 10: Centralized Scoring Engine
- Centralized scoring engine (`src/lib/scoring/engine.ts`):
  - Standard NEET (+4, -1, 0)
  - JEE Main MCQs and numerical value tolerances
  - JEE Advanced multi-correct strict partial marking
  - UPSC negative penalty calculation (-0.66 / -0.83)
  - Independent accuracy rate and score percentage calculations.

### Phase 11: Result & Performance Intelligence
- Evaluated results page (`/dashboard/results/[attemptId]`):
  - Subject discipline accuracy breakdown
  - Question-by-question review with KaTeX formulas and scientific explanations
  - Final evaluated OMR sheet display and PDF download
  - Evidence-based concept remediation recommendations (`src/lib/analytics/engine.ts`).

### Phase 12: Payments & Monetization
- Razorpay payment service (`src/lib/payments/service.ts`):
  - Server-side order creation
  - HMAC SHA256 timing-safe signature verification
  - Atomic complimentary first-paper claim (`free_paper_claims`)
  - Checkout UI (`/payment`, `/payment/success`, `/payment/failed`)
  - Student purchases and transaction ledger (`/dashboard/purchases`).

### Phase 13: FORT Control Administration
- Admin Control Center (`/admin`):
  - Student registry (`/admin/students`) with search and dossier inspection
  - Question Bank CMS (`/admin/question-bank`) with KaTeX formula editor
  - Paper Builder (`/admin/question-papers`)
  - Payments & Revenue Audit (`/admin/payments`)
  - Pricing & Policy Configuration (`/admin/pricing`)
  - System Health & Diagnostics (`/admin/system/health`).

---

## 3. Database Schema

- Migration file: `supabase/migrations/20260101000000_fort_initial_schema.sql`
- Contains 40+ normalized tables across identities, syllabus, questions, attempts, payments, entitlements, and analytics.
- Row Level Security (RLS) active on all user-facing tables.

---

## 4. Verification & Testing

- **Vitest Unit Tests:** `tests/unit/scoring.test.ts` (3 tests passed)
  - Perfect attempt scoring
  - NEET negative marking (+4, -1, 0)
  - Zero attempts handling without division by zero
- **Analytics Tests:** `tests/unit/analytics.test.ts` (2 tests passed)
  - Volume-weighted concept mastery score
  - Evidence-based remediation generation
- **TypeScript Typecheck:** `npm run typecheck` passed cleanly (0 errors).

---

## 5. External Credentials Required for Production

| Service | Environment Variable | Status |
| :--- | :--- | :--- |
| Supabase URL | `NEXT_PUBLIC_SUPABASE_URL` | Configured / Placeholder fallback active |
| Supabase Anon Key | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Configured / Placeholder fallback active |
| Supabase Service Role | `SUPABASE_SERVICE_ROLE_KEY` | Configured / Placeholder fallback active |
| Razorpay Key ID | `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Sandbox mode operational |
| Razorpay Secret | `RAZORPAY_KEY_SECRET` | Sandbox mode operational |
| Resend API Key | `RESEND_API_KEY` | Configured / Templates ready |

---

## 6. Documentation Suite

- `README.md`: Project overview, setup, and scripts
- `BUILD_STATUS.md`: Build manifest and status report
- `ARCHITECTURE.md`: Topology and attempt state machine diagrams
- `DATABASE.md`: Schema dictionary and atomic sequence DDL
- `SECURITY.md`: RLS policies and threat mitigation
- `DEPLOYMENT.md`: Vercel & Cloudflare deployment runbook
- `PAYMENT_SETUP.md`: Razorpay webhook and order setup
- `EMAIL_SETUP.md`: Resend transactional email guide
- `CONTENT_IMPORT.md`: Question bank schema and import guide
- `TESTING.md`: Test execution documentation
