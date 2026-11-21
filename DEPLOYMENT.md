# FORT Learning — Production Deployment Runbook

## 1. Hosting Architecture

- **Web Application & API Handlers:** Vercel (Next.js 15 App Router Edge / Node runtime)
- **Database & Storage:** Supabase PostgreSQL with automated daily backups
- **DNS & CDN Edge:** Cloudflare with strict SSL/TLS, DDoS mitigation, and WAF rules
- **Payment Processing:** Razorpay API & Webhook endpoints
- **Transactional Notifications:** Resend

---

## 2. Pre-Deployment Checklist

1. **Environment Variables:** Verify that all variables in `.env.example` are populated in the deployment platform settings.
2. **Database Migrations:** Ensure `supabase/migrations/20260101000000_fort_initial_schema.sql` has run completely.
3. **Webhook Endpoints:** Configure Razorpay webhook URL: `https://your-domain.com/api/webhooks/razorpay` with secret.
4. **Compile & Typecheck:** Run `npm run typecheck` and `npm run test` before triggering production release.
