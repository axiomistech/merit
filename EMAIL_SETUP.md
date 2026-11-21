# FORT Learning — Transactional Email Setup (Resend)

## 1. Overview

FORT Learning uses Resend for responsive transactional email templates:
- Candidate registration & FORT ID confirmation
- Email verification & password reset
- Free paper unlock receipt & payment confirmations
- Exam submission receipts & result summary notifications

---

## 2. Environment Variables

```env
RESEND_API_KEY=re_your_api_key_here
EMAIL_FROM="FORT Learning <support@fortlearning.com>"
```

---

## 3. Domain Verification

Configure DNS records on Cloudflare / registrar:
- DKIM TXT record
- SPF TXT record
- DMARC TXT record
