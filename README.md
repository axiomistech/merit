# FORT Learning — Knowledge. Built Strong.

**FORT Learning** (FORTLEARNING.COM) is institutional digital learning and examination practice infrastructure built for NEET, JEE Main, JEE Advanced, UPSC Civil Services, and University Engineering candidates.

---

## 1. Core Philosophy & Design

```
Learning → Understanding → Practice → Examination → Analysis → Improvement
```

- **Academic Seriousness:** Data-driven practice with zero fabricated metrics, fake rankings, or vanity timers.
- **Physical-Grade Live OMR Simulation:** Real-time bidirectional bubble filling and print-ready high-resolution vector A4 PDF generation.
- **Server-Authoritative Exam Engine:** Strict countdown deadlines that resist browser sleep or tab switches, with automatic final submission.
- **Centralized Scoring & Partial Marking:** Support for NEET (+4, -1, 0), JEE Main numerical values, JEE Advanced multi-correct partial marking, and UPSC negative penalties.
- **Honest Monetization:** First eligible examination paper is 100% free upon verified account creation. Subsequent papers cost ₹10 each with verified Razorpay webhooks.

---

## 2. Tech Stack

- **Frontend:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Lucide Icons, Framer Motion, KaTeX
- **Backend & Database:** PostgreSQL, Supabase, Row Level Security (RLS), Server Actions, Database Migrations
- **Payments:** Razorpay (HMAC SHA256 Webhooks & Order Lifecycle)
- **Emails:** Resend (Transactional Notification Templates)
- **PDF Generation:** jsPDF (High-Resolution A4 Vector OMR Generation)
- **Testing:** Vitest, React Testing Library, JSDOM

---

## 3. Getting Started

### Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0

### Installation

```bash
git clone https://github.com/fortlearning/fort.git
cd fort
npm install
```

### Environment Configuration

Copy the example environment configuration:

```bash
cp .env.example .env.local
```

Fill in your configuration variables in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `RESEND_API_KEY`

---

## 4. Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts local Next.js development server at `http://localhost:3000` |
| `npm run build` | Compiles production Next.js application |
| `npm run start` | Launches production server |
| `npm run typecheck` | Executes TypeScript strict compiler check (`tsc --noEmit`) |
| `npm run test` | Executes unit tests via Vitest |

---

## 5. Architectural Modules

```
src/
├── app/                  # Next.js App Router (Public, Dashboard, Exam, Admin, Legal)
├── components/           # UI components, Live OMR Sheet, KaTeX MathText
├── data/                 # Rich seed question catalog (NEET, JEE, UPSC, Engineering)
├── lib/                  # Scoring engine, Payments, OMR PDF generator, Supabase client
└── types/                # TypeScript database and examination engine definitions
```

---

## 6. Statutory Disclaimer

FORT Learning is an independent educational platform and is not affiliated with, endorsed by, or connected to the National Testing Agency (NTA), the Union Public Service Commission (UPSC), the Indian Institutes of Technology (IITs), or any university board.
