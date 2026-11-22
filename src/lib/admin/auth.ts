import { AdminRole, AdminPermission, AdminUser } from '@/types/admin';

export const ALL_PERMISSIONS: AdminPermission[] = [
  'dashboard.view',
  'analytics.view',
  'students.view',
  'students.manage',
  'exams.view',
  'exams.manage',
  'syllabus.manage',
  'questions.view',
  'questions.create',
  'questions.edit',
  'questions.review',
  'questions.publish',
  'tests.create',
  'tests.edit',
  'tests.publish',
  'omr.manage',
  'evaluations.manage',
  'payments.view',
  'payments.manage',
  'refunds.manage',
  'coupons.manage',
  'notifications.manage',
  'cms.manage',
  'support.manage',
  'admins.manage',
  'settings.manage',
  'audit_logs.view',
];

export const AUTHORIZED_ADMIN_EMAILS: string[] = [
  'meritwisehq@gmail.com',
];

export function isAuthorizedAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  return AUTHORIZED_ADMIN_EMAILS.some((adminEmail) => adminEmail.toLowerCase() === normalized);
}

export const ROLE_DEFAULT_PERMISSIONS: Record<AdminRole, AdminPermission[]> = {
  admin: ALL_PERMISSIONS,
  super_admin: ALL_PERMISSIONS,
  content_admin: [
    'dashboard.view',
    'exams.view',
    'exams.manage',
    'syllabus.manage',
    'questions.view',
    'questions.create',
    'questions.edit',
    'questions.review',
    'questions.publish',
    'tests.create',
    'tests.edit',
    'tests.publish',
    'cms.manage',
  ],
  evaluator: [
    'dashboard.view',
    'evaluations.manage',
    'questions.view',
    'tests.edit',
  ],
  support_admin: [
    'dashboard.view',
    'students.view',
    'students.manage',
    'support.manage',
    'payments.view',
  ],
  finance_admin: [
    'dashboard.view',
    'analytics.view',
    'payments.view',
    'payments.manage',
    'refunds.manage',
    'coupons.manage',
  ],
};

export const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: 'adm_meritwise_hq',
    name: 'Meritwise HQ Admin',
    email: 'meritwisehq@gmail.com',
    role: 'admin',
    status: 'active',
    created_at: '2026-01-01T00:00:00Z',
    last_login: new Date().toISOString(),
    permissions: ALL_PERMISSIONS,
  },
];

export function getAdminSession(): AdminUser | null {
  if (typeof window === 'undefined') return null;

  // 1. Check direct admin session
  const stored = localStorage.getItem('fort_admin_session');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed && isAuthorizedAdminEmail(parsed.email)) {
        return parsed;
      }
    } catch {
      // invalid JSON, ignore
    }
  }

  // 2. Auto-recognition: check student session for meritwisehq@gmail.com
  const studentStored =
    localStorage.getItem('merit_student_session') || localStorage.getItem('fort_student_session');
  if (studentStored) {
    try {
      const studentSession = JSON.parse(studentStored);
      if (studentSession?.email && isAuthorizedAdminEmail(studentSession.email)) {
        const adminUser: AdminUser = {
          id: 'adm_meritwise_hq',
          name: studentSession.fullName || 'Meritwise HQ Admin',
          email: studentSession.email.toLowerCase().trim(),
          role: 'admin',
          status: 'active',
          created_at: '2026-01-01T00:00:00Z',
          last_login: new Date().toISOString(),
          permissions: ALL_PERMISSIONS,
        };
        localStorage.setItem('fort_admin_session', JSON.stringify(adminUser));
        return adminUser;
      }
    } catch {
      // invalid JSON, ignore
    }
  }

  // 3. In production, require explicit authentication via /admin/login
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  // Development sandbox preset convenience
  const defaultUser = INITIAL_ADMIN_USERS[0];
  localStorage.setItem('fort_admin_session', JSON.stringify(defaultUser));
  return defaultUser;
}

export function verifyServerAdminAccess(
  req: Request,
  requiredPermission?: AdminPermission
): { authorized: boolean; reason?: string; userEmail?: string } {
  const authHeader = req.headers.get('authorization') || req.headers.get('x-admin-key');
  const adminSecret = process.env.ADMIN_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (process.env.NODE_ENV !== 'production' && !adminSecret) {
    // Permitted in local development sandbox only when no secret is configured
    return { authorized: true, userEmail: 'meritwisehq@gmail.com' };
  }

  if (!authHeader) {
    return {
      authorized: false,
      reason: 'Administrative credentials missing. Authorization header required.',
    };
  }

  if (!adminSecret) {
    return {
      authorized: false,
      reason: 'Server configuration error: Administrative secret not configured.',
    };
  }

  const expectedBearer = `Bearer ${adminSecret}`;
  const isMatch = authHeader === expectedBearer || authHeader === adminSecret;

  if (!isMatch) {
    return {
      authorized: false,
      reason: 'Invalid administrative credentials. Access denied.',
    };
  }

  return { authorized: true, userEmail: 'meritwisehq@gmail.com' };
}

export function hasPermission(user: AdminUser | null, permission: AdminPermission): boolean {
  if (!user) return false;
  if (user.role === 'admin' || user.role === 'super_admin') return true;
  return user.permissions?.includes(permission) || false;
}

export function logAdminAction(
  actionOrObj:
    | string
    | {
        action: string;
        resource_type: string;
        resource_id?: string;
        change_summary: string;
        metadata?: any;
      },
  resourceType: string = '',
  resourceId?: string,
  summary: string = ''
) {
  if (typeof window === 'undefined') return;
  const user = getAdminSession();
  const logs = JSON.parse(localStorage.getItem('fort_admin_audit_logs') || '[]');

  let action: string;
  let resType: string;
  let resId: string | undefined;
  let changeSummary: string;

  if (typeof actionOrObj === 'object') {
    action = actionOrObj.action;
    resType = actionOrObj.resource_type;
    resId = actionOrObj.resource_id;
    changeSummary = actionOrObj.change_summary;
  } else {
    action = actionOrObj;
    resType = resourceType;
    resId = resourceId;
    changeSummary = summary;
  }

  const entry = {
    id: `log_${Date.now().toString(36)}`,
    actor_name: user?.name || 'System Admin',
    actor_email: user?.email || 'admin@fortlearning.com',
    actor_role: user?.role || 'super_admin',
    action,
    resource_type: resType,
    resource_id: resId,
    change_summary: changeSummary,
    created_at: new Date().toISOString(),
    ip_address: '127.0.0.1 (Loopback)',
  };
  logs.unshift(entry);
  // Keep last 200 logs
  localStorage.setItem('fort_admin_audit_logs', JSON.stringify(logs.slice(0, 200)));
}
