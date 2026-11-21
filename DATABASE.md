# FORT Learning — Database Schema & Data Dictionary

## 1. Overview

The FORT database is organized into 11 distinct domain schemas in PostgreSQL:
1. **Identities & Candidates:** `profiles`, `registration_sequences`, `student_examinations`
2. **Examinations & Blueprints:** `examinations`, `examination_versions`, `examination_stages`, `examination_papers`, `examination_sections`, `marking_rules`
3. **Curricula & Syllabus:** `syllabus_nodes`, `subjects`, `concepts`
4. **Question Bank & Versioning:** `questions`, `question_versions`, `question_options`, `question_assets`, `question_concept_mappings`, `answer_keys`, `explanations`
5. **Question Papers:** `question_papers`, `question_paper_questions`
6. **Execution & Attempts:** `attempts`, `attempt_answers`, `attempt_events`, `attempt_snapshots`
7. **Monetization & Entitlements:** `products`, `pricing_rules`, `payment_orders`, `payment_transactions`, `payment_webhook_events`, `refunds`, `entitlements`, `free_paper_claims`
8. **Intelligence & Recommendations:** `answer_metrics`, `concept_metrics`, `student_analytics_snapshots`, `recommendations`
9. **Role-Based Access Control:** `admin_roles`, `admin_permissions`, `role_permissions`, `admin_memberships`
10. **CMS & Marketing:** `homepage_sections`, `homepage_revisions`, `static_pages`, `blog_posts`, `faq_categories`, `faq_items`, `announcements`
11. **Support & Operations:** `support_tickets`, `support_messages`, `audit_logs`, `system_settings`

---

## 2. Atomic Registration Identifier Sequence

```sql
CREATE OR REPLACE FUNCTION public.generate_fort_registration_id()
RETURNS TEXT AS $$
DECLARE
    current_year_short INT;
    next_val BIGINT;
    formatted_id TEXT;
BEGIN
    current_year_short := (EXTRACT(YEAR FROM CURRENT_DATE) % 100)::INT;
    
    INSERT INTO public.registration_sequences (year, sequence_value, updated_at)
    VALUES (current_year_short, 1, timezone('utc'::text, now()))
    ON CONFLICT (year) DO UPDATE
    SET sequence_value = registration_sequences.sequence_value + 1,
        updated_at = timezone('utc'::text, now())
    RETURNING sequence_value INTO next_val;
    
    formatted_id := 'FORT-' || LPAD(current_year_short::TEXT, 2, '0') || '-' || LPAD(next_val::TEXT, 6, '0');
    RETURN formatted_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 3. Migration Instructions

To apply all tables and RLS policies on your Supabase instance:
```bash
npx supabase db push
# or execute supabase/migrations/20260101000000_fort_initial_schema.sql in the Supabase SQL editor.
```
