# FORT Learning — Quality Assurance & Testing Suite

## 1. Test Architecture

The testing suite covers:
- **Unit Tests:** Centralized scoring engine, negative marking penalties, partial marking, numerical tolerance evaluation, concept mastery weighting, and recommendation logic.
- **Integration Tests:** Razorpay order creation, HMAC signature verification, atomic free paper claims, and live OMR state synchronization.
- **E2E Journeys:** Registration -> Onboarding -> NEET Mock Test -> OMR Bubbling -> Submission -> Instant Result Analysis.

---

## 2. Running Tests

```bash
# Run complete test suite
npm run test

# Run tests in watch mode
npm run test:watch

# Execute TypeScript typechecking
npm run typecheck
```
