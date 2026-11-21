# FORT Learning — System Architecture & Design Documentation

## 1. System Topology

```mermaid
flowchart TD
    Client["Client Browser\n(Desktop / Mobile / Tablet)"]
    NextEdge["Next.js App Router\n(SSR / Server Components)"]
    ExamEngine["Server-Authoritative Exam Engine\n(Stateful Deadline Tracking)"]
    ScoringEngine["Centralized Scoring Engine\n(NEET, JEE, UPSC, Eng)"]
    LiveOMR["Live OMR Matrix & jsPDF Engine\n(Vector A4 PDF Rasterizer)"]
    PaymentEngine["Razorpay Webhook & Order Engine\n(HMAC SHA256 Verification)"]
    SupabaseDB["PostgreSQL / Supabase\n(40+ Normalized Tables & RLS)"]

    Client -->|HTTPS / App Router| NextEdge
    NextEdge --> ExamEngine
    ExamEngine --> ScoringEngine
    ExamEngine --> LiveOMR
    NextEdge --> PaymentEngine
    ExamEngine -->|Transactional Mutex| SupabaseDB
    PaymentEngine -->|Entitlement Grants| SupabaseDB
```

---

## 2. Examination Attempt Lifecycle State Machine

```mermaid
stateDiagram-v2
    [*] --> created
    created --> ready : Validate Candidate & Entitlement
    ready --> active : Initialize Deadline & Start Timer
    active --> active : Autosave Buffer & Event Log
    active --> paused : Permitted Pause (Practice Mode Only)
    paused --> active : Resume
    active --> submitted : Candidate Click Confirm
    active --> auto_submitted : Server Deadline Elapsed (00:00)
    submitted --> evaluated : Calculate Score & Accuracy
    auto_submitted --> evaluated : Calculate Score & Accuracy
    evaluated --> [*] : Release Solutions & OMR PDF
```

---

## 3. Security Boundary & Row Level Security

- **Client Trust Zero:** Clients never submit final scores, timer values, or correct answers.
- **Sealed Answer Keys:** Answer keys and solutions are filtered from client payloads during active tests.
- **PostgreSQL Row Level Security:** Every attempt, answer row, and payment record is partitioned strictly by `auth.uid() = student_id`.
- **Atomic Identification:** Candidate IDs (`FORT-26-XXXXXX`) are minted atomically through a dedicated database sequence.
