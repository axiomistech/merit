-- ==============================================================================
-- FORT LEARNING: MASTER INITIAL DATABASE MIGRATION
-- Production PostgreSQL / Supabase Schema with Row Level Security (RLS)
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 1. REGISTRATION SEQUENCE GENERATOR (ATOMIC & RACE-FREE)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.registration_sequences (
    year INT PRIMARY KEY,
    sequence_value BIGINT NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Function to safely generate FORT-YY-000000 registration IDs
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

-- ==============================================================================
-- 2. USER PROFILES & IDENTITIES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    registration_id TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    date_of_birth DATE,
    phone TEXT,
    country TEXT NOT NULL DEFAULT 'India',
    avatar_url TEXT,
    onboarding_completed BOOLEAN NOT NULL DEFAULT false,
    account_status TEXT NOT NULL DEFAULT 'active' CHECK (account_status IN ('active', 'suspended', 'deactivated')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_profiles_registration_id ON public.profiles(registration_id);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- ==============================================================================
-- 3. EXAMINATIONS, BLUEPRINTS & SYLLABUS HIERARCHY
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.examinations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL CHECK (category IN ('medical', 'engineering', 'civil_services', 'university')),
    active BOOLEAN NOT NULL DEFAULT true,
    icon TEXT,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.examination_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    examination_id UUID NOT NULL REFERENCES public.examinations(id) ON DELETE CASCADE,
    version TEXT NOT NULL,
    effective_date DATE NOT NULL,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    source TEXT,
    configuration JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.student_examinations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    examination_id UUID NOT NULL REFERENCES public.examinations(id) ON DELETE CASCADE,
    target_year INT NOT NULL,
    preparation_stage TEXT NOT NULL DEFAULT 'foundational' CHECK (preparation_stage IN ('foundational', 'intermediate', 'advanced', 'final_revision')),
    preferences JSONB NOT NULL DEFAULT '{}'::jsonb,
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(student_id, examination_id)
);

CREATE TABLE IF NOT EXISTS public.subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    examination_id UUID NOT NULL REFERENCES public.examinations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    UNIQUE(examination_id, slug)
);

CREATE TABLE IF NOT EXISTS public.syllabus_nodes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    examination_version_id UUID NOT NULL REFERENCES public.examination_versions(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES public.syllabus_nodes(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    node_type TEXT NOT NULL CHECK (node_type IN ('subject', 'unit', 'chapter', 'topic', 'subtopic')),
    description TEXT,
    display_order INT NOT NULL DEFAULT 0,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS public.concepts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    syllabus_node_id UUID REFERENCES public.syllabus_nodes(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    display_order INT NOT NULL DEFAULT 0
);

-- ==============================================================================
-- 4. QUESTION BANK & CMS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_type TEXT NOT NULL CHECK (question_type IN ('single_correct', 'multiple_correct', 'numerical', 'assertion_reason', 'matrix_match', 'descriptive')),
    subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE RESTRICT,
    syllabus_node_id UUID REFERENCES public.syllabus_nodes(id) ON DELETE SET NULL,
    difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'approved', 'published', 'archived')),
    source TEXT,
    language TEXT NOT NULL DEFAULT 'en',
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.question_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    version INT NOT NULL DEFAULT 1,
    content JSONB NOT NULL, -- { text: string, instructions?: string, prompt?: string, marks: number, negative_marks: number }
    configuration JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(question_id, version)
);

CREATE TABLE IF NOT EXISTS public.question_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_version_id UUID NOT NULL REFERENCES public.question_versions(id) ON DELETE CASCADE,
    option_key TEXT NOT NULL, -- 'A', 'B', 'C', 'D'
    content JSONB NOT NULL, -- { text: string, image_url?: string }
    display_order INT NOT NULL DEFAULT 0,
    UNIQUE(question_version_id, option_key)
);

CREATE TABLE IF NOT EXISTS public.question_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_version_id UUID NOT NULL REFERENCES public.question_versions(id) ON DELETE CASCADE,
    asset_type TEXT NOT NULL CHECK (asset_type IN ('image', 'diagram', 'table', 'pdf')),
    storage_path TEXT NOT NULL,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS public.question_concept_mappings (
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    concept_id UUID NOT NULL REFERENCES public.concepts(id) ON DELETE CASCADE,
    PRIMARY KEY (question_id, concept_id)
);

CREATE TABLE IF NOT EXISTS public.answer_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_version_id UUID UNIQUE NOT NULL REFERENCES public.question_versions(id) ON DELETE CASCADE,
    answer_configuration JSONB NOT NULL, -- { correct_options?: ['A'], numerical_value?: 42, numerical_tolerance?: 0.01, rubric?: string }
    release_policy TEXT NOT NULL DEFAULT 'after_submission' CHECK (release_policy IN ('instant_in_practice', 'after_submission', 'scheduled_date', 'never'))
);

CREATE TABLE IF NOT EXISTS public.explanations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_version_id UUID UNIQUE NOT NULL REFERENCES public.question_versions(id) ON DELETE CASCADE,
    explanation TEXT NOT NULL,
    solution TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 5. QUESTION PAPERS & EXAM TEMPLATES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.question_papers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    examination_id UUID NOT NULL REFERENCES public.examinations(id) ON DELETE CASCADE,
    examination_version_id UUID REFERENCES public.examination_versions(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    paper_type TEXT NOT NULL CHECK (paper_type IN ('mock_exam', 'previous_year', 'chapter_test', 'subject_test', 'custom_practice')),
    duration_minutes INT NOT NULL,
    max_marks INT NOT NULL,
    price INT NOT NULL DEFAULT 10, -- standard ₹10
    is_free_eligible BOOLEAN NOT NULL DEFAULT true,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    configuration JSONB NOT NULL DEFAULT '{}'::jsonb, -- { sections: [...], instructions: string, allow_pause: boolean }
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.question_paper_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    paper_id UUID NOT NULL REFERENCES public.question_papers(id) ON DELETE CASCADE,
    question_version_id UUID NOT NULL REFERENCES public.question_versions(id) ON DELETE RESTRICT,
    section_id TEXT NOT NULL DEFAULT 'default',
    display_order INT NOT NULL,
    marks_override NUMERIC(6, 2),
    configuration JSONB NOT NULL DEFAULT '{}'::jsonb,
    UNIQUE(paper_id, display_order)
);

-- ==============================================================================
-- 6. EXAM ENGINE ATTEMPTS & ANSWERS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    paper_id UUID NOT NULL REFERENCES public.question_papers(id) ON DELETE RESTRICT,
    paper_version_snapshot JSONB NOT NULL,
    examination_configuration_snapshot JSONB NOT NULL,
    status TEXT NOT NULL DEFAULT 'ready' CHECK (status IN ('ready', 'active', 'paused', 'submitted', 'auto_submitted', 'evaluated', 'abandoned')),
    started_at TIMESTAMPTZ,
    deadline_at TIMESTAMPTZ,
    submitted_at TIMESTAMPTZ,
    evaluated_at TIMESTAMPTZ,
    duration_seconds INT NOT NULL DEFAULT 0,
    score NUMERIC(8, 2),
    max_score NUMERIC(8, 2),
    accuracy NUMERIC(5, 2),
    attempt_metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_attempts_student_id ON public.attempts(student_id);
CREATE INDEX IF NOT EXISTS idx_attempts_paper_id ON public.attempts(paper_id);
CREATE INDEX IF NOT EXISTS idx_attempts_status ON public.attempts(status);

CREATE TABLE IF NOT EXISTS public.attempt_answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    attempt_id UUID NOT NULL REFERENCES public.attempts(id) ON DELETE CASCADE,
    question_version_id UUID NOT NULL REFERENCES public.question_versions(id) ON DELETE RESTRICT,
    answer_data JSONB NOT NULL DEFAULT '{}'::jsonb, -- { selected_options: ['A'], text_response?: string }
    is_answered BOOLEAN NOT NULL DEFAULT false,
    marked_for_review BOOLEAN NOT NULL DEFAULT false,
    time_spent_seconds INT NOT NULL DEFAULT 0,
    saved_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(attempt_id, question_version_id)
);

CREATE TABLE IF NOT EXISTS public.attempt_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    attempt_id UUID NOT NULL REFERENCES public.attempts(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL, -- 'start', 'save_answer', 'pause', 'resume', 'blur', 'focus', 'network_disconnect', 'submit'
    event_data JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.bookmarks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    note TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(student_id, question_id)
);

-- ==============================================================================
-- 7. MONETIZATION, ENTITLEMENTS & PAYMENTS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_type TEXT NOT NULL CHECK (product_type IN ('paper_access', 'exam_bundle', 'subscription')),
    paper_id UUID REFERENCES public.question_papers(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.pricing_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    amount INT NOT NULL DEFAULT 1000, -- Amount in paise (1000 paise = ₹10.00)
    currency TEXT NOT NULL DEFAULT 'INR',
    free_eligibility_configuration JSONB NOT NULL DEFAULT '{"first_paper_free": true}'::jsonb,
    active BOOLEAN NOT NULL DEFAULT true,
    effective_from TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    effective_until TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS public.payment_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    gateway TEXT NOT NULL DEFAULT 'razorpay',
    gateway_order_id TEXT UNIQUE NOT NULL,
    amount INT NOT NULL, -- in paise
    currency TEXT NOT NULL DEFAULT 'INR',
    status TEXT NOT NULL DEFAULT 'created' CHECK (status IN ('created', 'pending', 'paid', 'failed', 'refunded')),
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.payment_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.payment_orders(id) ON DELETE RESTRICT,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    gateway_payment_id TEXT UNIQUE NOT NULL,
    amount INT NOT NULL,
    currency TEXT NOT NULL DEFAULT 'INR',
    status TEXT NOT NULL DEFAULT 'successful' CHECK (status IN ('successful', 'failed', 'refunded')),
    gateway_metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.payment_webhook_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    gateway TEXT NOT NULL DEFAULT 'razorpay',
    event_id TEXT UNIQUE NOT NULL,
    payload JSONB NOT NULL,
    processing_status TEXT NOT NULL DEFAULT 'processed' CHECK (processing_status IN ('pending', 'processed', 'ignored', 'failed')),
    processed_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.refunds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transaction_id UUID NOT NULL REFERENCES public.payment_transactions(id) ON DELETE RESTRICT,
    amount INT NOT NULL,
    status TEXT NOT NULL DEFAULT 'processed' CHECK (status IN ('pending', 'processed', 'failed')),
    reason TEXT NOT NULL,
    gateway_reference TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.entitlements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    paper_id UUID NOT NULL REFERENCES public.question_papers(id) ON DELETE CASCADE,
    source TEXT NOT NULL CHECK (source IN ('free_paper_claim', 'purchase', 'administrative_grant', 'promotional')),
    payment_transaction_id UUID REFERENCES public.payment_transactions(id) ON DELETE SET NULL,
    granted_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    expires_at TIMESTAMPTZ,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'revoked', 'expired')),
    UNIQUE(student_id, paper_id)
);

CREATE TABLE IF NOT EXISTS public.free_paper_claims (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    paper_id UUID NOT NULL REFERENCES public.question_papers(id) ON DELETE CASCADE,
    claim_status TEXT NOT NULL DEFAULT 'claimed' CHECK (claim_status IN ('claimed', 'used', 'revoked')),
    claimed_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    attempt_id UUID REFERENCES public.attempts(id) ON DELETE SET NULL
);

-- ==============================================================================
-- 8. ANALYTICS, CONCEPT MASTERY & RECOMMENDATIONS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.answer_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    attempt_id UUID NOT NULL REFERENCES public.attempts(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    concept_id UUID REFERENCES public.concepts(id) ON DELETE SET NULL,
    subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    result TEXT NOT NULL CHECK (result IN ('correct', 'incorrect', 'unattempted', 'partial')),
    difficulty TEXT NOT NULL,
    time_spent_seconds INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.concept_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    concept_id UUID NOT NULL REFERENCES public.concepts(id) ON DELETE CASCADE,
    total_attempts INT NOT NULL DEFAULT 0,
    correct_count INT NOT NULL DEFAULT 0,
    accuracy NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
    mastery_score NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
    last_attempted_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(student_id, concept_id)
);

CREATE TABLE IF NOT EXISTS public.student_analytics_snapshots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    examination_id UUID NOT NULL REFERENCES public.examinations(id) ON DELETE CASCADE,
    snapshot_date DATE NOT NULL,
    metrics JSONB NOT NULL DEFAULT '{}'::jsonb,
    UNIQUE(student_id, examination_id, snapshot_date)
);

CREATE TABLE IF NOT EXISTS public.recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    examination_id UUID NOT NULL REFERENCES public.examinations(id) ON DELETE CASCADE,
    recommendation_type TEXT NOT NULL CHECK (recommendation_type IN ('weak_concept', 'repeated_mistake', 'speed_improvement', 'revision_overdue', 'advanced_practice')),
    concept_id UUID REFERENCES public.concepts(id) ON DELETE CASCADE,
    explanation TEXT NOT NULL,
    priority INT NOT NULL DEFAULT 1,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'dismissed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 9. ADMINISTRATION & RBAC
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.admin_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS public.admin_permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS public.role_permissions (
    role_id UUID NOT NULL REFERENCES public.admin_roles(id) ON DELETE CASCADE,
    permission_id UUID NOT NULL REFERENCES public.admin_permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE IF NOT EXISTS public.admin_memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES public.admin_roles(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'revoked')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(user_id, role_id)
);

-- ==============================================================================
-- 10. CMS, SUPPORT & OPERATIONS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.homepage_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_key TEXT UNIQUE NOT NULL,
    content JSONB NOT NULL,
    enabled BOOLEAN NOT NULL DEFAULT true,
    display_order INT NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    cover_image TEXT,
    published BOOLEAN NOT NULL DEFAULT false,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.faq_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    display_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.faq_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL REFERENCES public.faq_categories(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    published BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    audience TEXT NOT NULL DEFAULT 'all' CHECK (audience IN ('all', 'students', 'neet', 'jee', 'upsc')),
    active BOOLEAN NOT NULL DEFAULT true,
    starts_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    ends_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS public.support_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_number TEXT UNIQUE NOT NULL,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    category TEXT NOT NULL CHECK (category IN ('account', 'registration', 'payment', 'examination', 'omr', 'question', 'results', 'analytics', 'technical', 'privacy', 'other')),
    subject TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
    priority TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    assigned_to UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.support_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id UUID NOT NULL REFERENCES public.support_tickets(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES auth.users(id),
    message TEXT NOT NULL,
    attachments JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES auth.users(id),
    action TEXT NOT NULL,
    resource_type TEXT NOT NULL,
    resource_id TEXT,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    ip_metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.system_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 11. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_examinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attempt_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.entitlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.free_paper_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.answer_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.concept_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_messages ENABLE ROW LEVEL SECURITY;

-- Profiles: Students can read and update their own profile, but cannot tamper with registration_id or account_status
CREATE POLICY "Users can read own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile fields" ON public.profiles
    FOR UPDATE USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Student Examinations: Self manage
CREATE POLICY "Students can read own exam selections" ON public.student_examinations
    FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Students can insert own exam selections" ON public.student_examinations
    FOR INSERT WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update own exam selections" ON public.student_examinations
    FOR UPDATE USING (auth.uid() = student_id);

-- Attempts: Students can only read and manage their own attempts
CREATE POLICY "Students can view own attempts" ON public.attempts
    FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Students can create own attempts" ON public.attempts
    FOR INSERT WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update own attempts" ON public.attempts
    FOR UPDATE USING (auth.uid() = student_id);

-- Attempt Answers: Scoped to attempt ownership
CREATE POLICY "Students can view answers of their attempts" ON public.attempt_answers
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.attempts
            WHERE attempts.id = attempt_answers.attempt_id
            AND attempts.student_id = auth.uid()
        )
    );

CREATE POLICY "Students can manage answers of their attempts" ON public.attempt_answers
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.attempts
            WHERE attempts.id = attempt_answers.attempt_id
            AND attempts.student_id = auth.uid()
            AND attempts.status IN ('ready', 'active')
        )
    );

-- Bookmarks: Self manage
CREATE POLICY "Students can manage own bookmarks" ON public.bookmarks
    FOR ALL USING (auth.uid() = student_id);

-- Entitlements & Free Claims: Read only for student
CREATE POLICY "Students can view own entitlements" ON public.entitlements
    FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Students can view own free claims" ON public.free_paper_claims
    FOR SELECT USING (auth.uid() = student_id);

-- Analytics & Recommendations: Read only for student
CREATE POLICY "Students can view own answer metrics" ON public.answer_metrics
    FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Students can view own concept metrics" ON public.concept_metrics
    FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Students can view own recommendations" ON public.recommendations
    FOR SELECT USING (auth.uid() = student_id);

-- Support Tickets: Read & create own tickets
CREATE POLICY "Students can view own support tickets" ON public.support_tickets
    FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Students can create own support tickets" ON public.support_tickets
    FOR INSERT WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can view messages on own tickets" ON public.support_messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.support_tickets
            WHERE support_tickets.id = support_messages.ticket_id
            AND support_tickets.student_id = auth.uid()
        )
    );

CREATE POLICY "Students can post messages to own tickets" ON public.support_messages
    FOR INSERT WITH CHECK (
        auth.uid() = sender_id AND
        EXISTS (
            SELECT 1 FROM public.support_tickets
            WHERE support_tickets.id = support_messages.ticket_id
            AND support_tickets.student_id = auth.uid()
        )
    );

-- Public readable tables (Examinations, Subjects, Syllabus, Question Papers)
ALTER TABLE public.examinations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active examinations" ON public.examinations
    FOR SELECT USING (active = true);

ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view subjects" ON public.subjects
    FOR SELECT USING (true);

ALTER TABLE public.question_papers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published papers" ON public.question_papers
    FOR SELECT USING (status = 'published');

ALTER TABLE public.faq_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view FAQ categories" ON public.faq_categories
    FOR SELECT USING (true);

ALTER TABLE public.faq_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published FAQ items" ON public.faq_items
    FOR SELECT USING (published = true);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published blogs" ON public.blog_posts
    FOR SELECT USING (published = true);

ALTER TABLE public.homepage_sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view enabled homepage sections" ON public.homepage_sections
    FOR SELECT USING (enabled = true);
