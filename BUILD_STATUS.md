# FORT Learning — Build Status & Architecture Manifest

**Current Status:** All Core Phases & Premium Matte Sage / Warm Ivory Design Directives Completed & Verified  
**Date:** 2026-11-21  
**Product:** FORT Learning (FORTLEARNING.COM)  
**Motto:** Knowledge. Built Strong.

---

## 1. Executive Summary

A complete, production-grade educational examination practice and analytics platform has been designed, implemented, and verified for **FORT Learning**. The application features authentic authentication, atomic candidate registration IDs, PostgreSQL DDL migrations with Row Level Security, centralized scoring with partial marking, live bidirectional physical-grade OMR simulation with A4 vector PDF generation, server-authoritative examination timers, evidence-based concept remediation, and Razorpay payment integration.

The entire platform is implemented with the custom **Matte Sage / Warm Ivory** design system (70% matte white cards on warm off-white canvas, 20% selective glass panels, and 10% accents using Sage Green `#9CAF88` and restrained Tomato Red `#E8412C`).

---

## 2. Completed Functionality & Visual Architecture

### Premium Visual System: Matte Sage / Warm Ivory
- **Color Identity:**
  - Off-White Canvas: `#F7F5EF` (warm, natural, eye-friendly page background)
  - Matte White Surfaces: `#FFFFFF` (layered card and table finish with subtle natural shadows)
  - Deep Forest Typography: `#263126` (high contrast editorial headings)
  - Primary Body Text: `#2E332D`
  - Secondary Text: `#73786E`
  - Muted Text: `#92958D`
  - Sage Green Primary: `#9CAF88` (primary CTA buttons, active tabs, progress bars, correct bubble shading)
  - Sage Light: `#E9EEE3` (subtle badge backgrounds, active pill surfaces)
  - Sage Soft: `#DCE5D3`
  - Sage Deep: `#758B62` (text on light backgrounds, high contrast borders)
  - Tomato Red (Restrained): `#E8412C` (used strictly for negative marks, incorrect answers, and critical alerts)
  - Tomato Light: `#FCE8E4`
  - Borders: `#E6E5DE`
  - Dividers: `#ECEAE4`
- **Glassmorphism Layer (20% Selective):**
  - Floating navigation capsule (`glass-nav`)
  - Preparation focus badges and hero information highlights
- **Typography & Math:**
  - KaTeX mathematical and chemical equation rendering engine supporting both inline (`$...$`) and display (`$$...$$`) math across questions, options, and explanations.

---

### Phase 1: Public Platform & Curricula Portals (15 Distinct Sections)
- **Cinematic, Data-Driven Homepage (`/`):**
  - Section 1: Hero with live interactive examination UI preview and candidate identity
  - Section 2: The Core Problem in Entrance Examination Preparation
  - Section 3: The 5-Stage FORT Pedagogical Architecture
  - Section 4: Target Examination Matrix (NEET, JEE Main, JEE Advanced, UPSC, Engineering)
  - Section 5: Signature Feature: Physical-Grade Live OMR Simulation
  - Section 6: Centralized Multi-Curriculum Scoring Engine
  - Section 7: Diagnostic Analytics & Evidence-Based Remediation Queue
  - Section 8: UPSC Answer-Writing & Rubric Studio
  - Section 9: Security, Anti-Tamper, and Server-Authoritative Timers
  - Section 10: Democratic ₹10 Pricing & Free First Paper Claim
  - Section 11: Real Interactive Question & Shading Simulator
  - Section 12: Detailed Comparison: FORT vs Coaching Websites vs SaaS Portals
  - Section 13: Frequently Asked Questions
  - Section 14: Comprehensive Pre-Footer Conversion CTA
  - Section 15: Statutory Legal & Governance Footer
- **Curricula Portals:**
  - `/neet`: Dedicated medical entrance portal with unit breakdown and NCERT mapping
  - `/neet/omr-practice`: Dedicated physical OMR practice arena
  - `/jee-main`: CBT practice portal with numerical value tolerance guidelines
  - `/jee-advanced`: Rigorous multi-correct partial marking rulebook
  - `/upsc`: Civil services Prelims & Mains answer writing studio
  - `/engineering`: Semester examination and GATE foundation portal
- **Informational & Operational Pages:**
  - `/how-it-works`: Complete step-by-step candidate workflow
  - `/features`: Deep dive into scoring, analytics, and security
  - `/pricing`: Transparent ₹10 pay-per-paper economics and free claim eligibility
  - `/faq`: Comprehensive candidate help index
  - `/contact`: Official support desk and contact routing
  - `/contact/grievance`: Statutory grievance redressal mechanism

---

### Phase 2: Statutory Legal Suite (10 Comprehensive Documents)
1. `/privacy-policy`: DPDP Act 2023 and candidate data compliance
2. `/terms-and-conditions`: Examination rules, platform integrity, and terms
3. `/terms-of-service`: Platform usage, availability, and SLAs
4. `/refund-policy`: Policy on digital goods and test delivery
5. `/cancellation-policy`: Cancellation rules before and after test generation
6. `/payment-terms`: Razorpay gateway rules, GST invoicing, and chargebacks
7. `/disclaimer`: Non-affiliation disclaimer with NTA, IIT JAB, and UPSC
8. `/cookie-policy`: Essential and analytics cookies
9. `/accessibility`: WCAG 2.1 AA standards and screen reader accommodations
10. `/copyright`: Intellectual property rights and question bank protection

---

### Phase 3: Authentication & Guided Onboarding
- **Candidate Registration (`/signup` & `/api/auth/register`):**
  - Generates immutable atomic registration ID sequence (`FORT-26-XXXXXX`)
  - Full name, verified email, password hashing, date of birth, and terms consent
- **Candidate Login (`/login`):**
  - Secure credential verification with session persistence
- **Guided Onboarding (`/onboarding`):**
  - 4-step wizard: examination focus, target year, preparation stage, and practice mode selection

---

### Phase 4: Student Workspace & Curricula Practice Studios
- **Candidate Dashboard (`/dashboard`):**
  - Candidate identity capsule, registration hash, KPI metrics, preparation focus widget, concept mastery health bars, and automated revision queue
- **Discipline Studios:**
  - `/dashboard/neet`: Physics, Chemistry, Botany, Zoology with NCERT unit breakdown
  - `/dashboard/jee-main`: Section A (MCQ) & Section B (Numerical Grid) studio
  - `/dashboard/jee-advanced`: Partial scoring rulebook and Paper 1 / Paper 2 simulations
  - `/dashboard/upsc`: Mains rich-text answer writing studio with live word count and rubric parameters
  - `/dashboard/engineering`: Branch selector (CSE, ECE, EE, ME, CE) with semester subject papers
- **Performance & Archive Utilities:**
  - `/dashboard/analytics`: Speed vs. accuracy diagnostics, percentile benchmarks, and weak concept remediation queue
  - `/dashboard/bookmarks`: Curated question revision queue with KaTeX math rendering
  - `/dashboard/history`: Audit log of timed attempts, scores, and downloadable OMR sheets
  - `/dashboard/purchases`: Entitlement ledger and Razorpay GST invoices
  - `/dashboard/profile`: Immutable registration ID verification and contact details

---

### Phase 5: Examination Engine & Exact NEET 180-Question Physical OMR (Signature Feature)
- **Exact NEET Physical OMR Architecture (`src/components/omr/LiveOMRSheet.tsx`):**
  - Designed directly from the master visual reference with exact proportions, timing marks, and thin reddish borders (`#D45D4C`).
  - **Left Identification Column:**
    - `ROLL No.` box with 10 digit boxes and 10x10 digit bubble grid (0-9) automatically darkened according to candidate's roll number.
    - `TEST BOOKLET No.` box with 7 digit boxes and 7x10 digit bubble grid (0-9) with darkened circles.
    - `Test Booklet Code` box (e.g. Code `A` with darkened circle).
    - `Answer Sheet No.` with Code 39 vector barcode, alignment L-marks, and printed candidate ID (`FORT-26-XXXXXX`).
  - **Exact 180-Question Answer Grid (4 Columns of 45):**
    - Column 1: Questions 001 to 045 (Physics)
    - Column 2: Questions 046 to 090 (Chemistry)
    - Column 3: Questions 091 to 135 (Botany)
    - Column 4: Questions 136 to 180 (Zoology)
    - 4 answer bubbles labeled `1`, `2`, `3`, `4`.
    - Unanswered: white circle with thin reddish outline.
    - Answered: completely filled solid black graphite circle.
    - Bidirectional live synchronization: answering questions darkens OMR bubbles; clicking bubbles selects options; clearing blanks the row.
  - **Bottom Declaration & Verification:**
    - Candidate declaration text
    - Dynamic cursive signature representation + authoritative timestamp
    - Candidate full registered name
    - Mother's name and father's name fields
    - Left hand thumb impression area
    - Invigilator signature slots (1 & 2)
    - Calibration timing track along borders.
- **Section 25 Mandatory: Automatic OMR PDF Download on Exam Submission:**
  - `src/lib/omr/pdfGenerator.ts`: Vector A4 print-ready PDF generated via jsPDF containing all 180 questions, darkened bubbles, barcode, and candidate identity.
  - Upon submission confirmation in `/exam/[attemptId]`, the browser automatically triggers download of `FORT_NEET_OMR_<REGISTRATION_ID>_<ATTEMPT_ID>.pdf`.
  - Displays the exact Submission Success Modal Card matching the user's reference:
    - Top green checkmark circle
    - "Examination Submitted Successfully"
    - "Your responses have been recorded and your answer sheet is ready."
    - Document preview card: "NEET OMR Answer Sheet", "A4 PDF • 180 questions • Personalized"
    - Primary CTA: "↓ Download OMR PDF" (reliable fallback if browser blocks auto-download)
    - Subtext: "Your download should start automatically."
    - Footer links: "View Results" and "Review Answers".
  - Permanent access to the submitted 180-question OMR sheet on `/dashboard/results/[attemptId]`.

---

### Phase 6: Centralized Scoring Engine
- **Engine File:** `src/lib/scoring/engine.ts`
- **Supported Paradigms:**
  - NEET: Standard +4 for correct, -1 for incorrect, 0 for unattempted
  - JEE Main: Section A (+4, -1, 0), Section B numerical tolerance check
  - JEE Advanced: Multi-correct partial marking (+4 for all correct, +3/+2/+1 for correct subsets without errors, -2 for ANY wrong selection)
  - UPSC: Prelims standard negative marking (-0.66 / -0.83)
- **Outputs:** Max score, total score, percentage, accuracy rate, attempt rate, duration, and question-level marks earned.

---

### Phase 7: Result Analytics & Scientific Solutions
- **Evaluated Results (`/dashboard/results/[attemptId]`):**
  - Scorecard banner with total score, accuracy, attempt rate, correct count, and penalized incorrect count
  - Subject discipline accuracy breakdown
  - Question-by-question review with KaTeX formulas and step-by-step concept explanations
  - Final evaluated OMR sheet review and vector PDF export

---

### Phase 8: Payments & Monetization
- **Payment Service (`src/lib/payments/service.ts`):**
  - Server-side Razorpay order creation (₹10 = 1000 Paise)
  - Cryptographically secure HMAC SHA256 timing-safe signature verification
  - Atomic complimentary first-paper claim tracking (`free_paper_claims`)
  - Checkout UI (`/payment`, `/payment/success`, `/payment/failed`)

---

### Phase 9: FORT Control Administration
- **Control Layout & Navigation (`/admin/layout.tsx`):**
  - Clean operational sidebar with nominal health status
- **Admin Modules:**
  - `/admin`: Command center KPI cards and registration feeds
  - `/admin/students`: Candidate registry with search and dossier inspection
  - `/admin/question-bank`: Mathematical question CMS with KaTeX formula support
  - `/admin/question-papers`: Paper builder and duration manager
  - `/admin/payments`: Real-time transaction reconciliation
  - `/admin/pricing`: Dynamic pricing configuration and free claim rules
  - `/admin/system/health`: Subsystem health monitor (PostgreSQL RLS, Razorpay, Resend, OMR PDF Engine)

---

### Phase 10: Utility Pages
- `/not-found`: Elegant 404 page in Matte Sage / Warm Ivory
- `/403`: Access Prohibited security notice
- `/maintenance`: Scheduled maintenance page
- `/session-expired`: Session elapsed alert with quick reconnect
- `/support`: Full-featured ticket desk for candidate inquiries

---

## 3. Database Schema

- **Migration File:** `supabase/migrations/20260101000000_fort_initial_schema.sql`
- **Key Tables:** 40+ normalized tables across:
  - Identities & Auth (`profiles`, `candidate_registrations`, `admin_roles`)
  - Curricula & Syllabus (`examinations`, `subjects`, `chapters`, `concepts`)
  - Question Bank (`questions`, `question_versions`, `question_options`, `answer_keys`, `explanations`)
  - Exam Papers (`question_papers`, `paper_sections`, `paper_questions`)
  - Attempts & OMR (`exam_attempts`, `attempt_responses`, `omr_sheet_instances`)
  - Payments & Entitlements (`payment_orders`, `payment_transactions`, `paper_entitlements`, `free_paper_claims`)
  - Analytics (`concept_mastery_snapshots`, `candidate_remediation_queues`)
- **Row Level Security (RLS):** Enabled across all student and attempt tables.
- **Atomic Registration Generator:** PL/pgSQL function `generate_fort_registration_id()`.

---

## 4. Verification & Testing

| Test Suite / Build Step | Status | Details |
| :--- | :--- | :--- |
| **Vitest Scoring Engine** | **PASSED (3/3)** | Verified NEET (+4/-1), JEE Main numerical tolerances, and JEE Advanced partial marking (+4/+3/+2/+1/-2) |
| **Vitest Analytics Engine** | **PASSED (2/2)** | Verified mastery volume-weighting and weak concept remediation queue prioritization |
| **Vitest OMR Engine** | **PASSED (4/4)** | Verified 180 questions (4 columns of 45), A->1/B->2/C->3/D->4 mapping, Code 39 barcode, and A4 vector PDF generation |
| **TypeScript Typecheck (`tsc --noEmit`)** | **PASSED (0 Errors)** | Clean compilation across all types, components, and pages |
| **Production Build (`next build --webpack`)** | **PASSED (54/54 Routes)** | All 54 routes compiled and optimized statically and dynamically |
