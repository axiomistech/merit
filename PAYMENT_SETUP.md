# FORT Learning — Razorpay Integration Setup

## 1. Overview

FORT Learning implements a transparent, per-paper pricing model:
- **First Paper:** 100% complimentary (claimed atomically per student).
- **Subsequent Papers:** ₹10.00 (1000 paise) per paper.

---

## 2. Configuration Parameters

In `.env.local` or production environment:

```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_signing_secret
```

---

## 3. Webhook Configuration

Set up the webhook in your Razorpay Dashboard:
- **Webhook URL:** `https://fortlearning.com/api/webhooks/razorpay`
- **Secret:** Match `RAZORPAY_WEBHOOK_SECRET`
- **Active Events:**
  - `order.paid`
  - `payment.captured`
  - `payment.failed`
  - `refund.processed`
