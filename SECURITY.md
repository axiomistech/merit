# FORT Learning — Security Model & Threat Mitigation

## 1. Security Architecture Principles

1. **Server-Side Authorization First:** Every attempt to read, update, or submit answers, process payments, or view analytics is authenticated and authorized server-side.
2. **PostgreSQL Row Level Security (RLS):** Activated on all user-facing data tables. Candidates cannot access rows belonging to other candidates.
3. **Sealed Answer Keys:** Answer keys, numerical tolerances, and explanations are explicitly excluded from examination execution payloads until final submission is evaluated and sealed.
4. **Server-Authoritative Time:** Remaining time is computed strictly against a server deadline timestamp.
5. **HMAC SHA256 Webhook Verification:** Payment webhooks from Razorpay are validated with timing-safe HMAC signatures before any entitlement is recorded.
6. **Zero Client Trust for Entitlements:** Free paper claims and paid paper access are governed by server-side transactions with unique constraints, preventing race conditions or double claims.

---

## 2. Threat Analysis & Mitigations

| Threat Vector | Mitigation Strategy |
| :--- | :--- |
| **Answer Key Leak via DevTools** | Answer key fields are completely omitted from the active exam payload and populated only during result evaluation. |
| **Timer Tampering in Console** | Submission is triggered by the authoritative deadline stored in the database. Client timestamp manipulation has zero impact. |
| **Payment Signature Forgery** | `crypto.timingSafeEqual` verifies Razorpay HMAC SHA256 signatures server-side. |
| **IDOR on Attempts & Results** | Attempts check `auth.uid() = student_id` at both the Route Handler level and PostgreSQL RLS policy level. |
| **Registration ID Guessing** | Registration IDs are public tracking handles; actual authentication is anchored to cryptographic UUID session tokens in secure cookies. |
