import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  hasPermission,
  verifyServerAdminAccess,
  isAuthorizedAdminEmail,
  INITIAL_ADMIN_USERS,
  ALL_PERMISSIONS,
} from '../../src/lib/admin/auth';
import { AdminUser } from '../../src/types/admin';

describe('Admin RBAC & Security Enforcement (Section 25 & 31)', () => {
  const meritwiseAdminUser: AdminUser = {
    id: 'adm_meritwise_hq',
    name: 'Meritwise HQ Admin',
    email: 'meritwisehq@gmail.com',
    role: 'admin',
    status: 'active',
    created_at: '2026-01-01',
    permissions: ALL_PERMISSIONS,
  };

  const superAdminUser: AdminUser = {
    id: 'adm_01',
    name: 'Super Admin',
    email: 'super@fortlearning.com',
    role: 'super_admin',
    status: 'active',
    created_at: '2026-01-01',
    permissions: [],
  };

  const evaluatorUser: AdminUser = {
    id: 'adm_02',
    name: 'Evaluator',
    email: 'eval@fortlearning.com',
    role: 'evaluator',
    status: 'active',
    created_at: '2026-01-01',
    permissions: ['evaluations.manage', 'omr.manage'],
  };

  describe('Meritwise Admin Role & Authorization (meritwisehq@gmail.com)', () => {
    it('authorizes meritwisehq@gmail.com as the platform Admin', () => {
      expect(isAuthorizedAdminEmail('meritwisehq@gmail.com')).toBe(true);
      expect(isAuthorizedAdminEmail('  MERITWISEHQ@GMAIL.COM  ')).toBe(true);
      expect(isAuthorizedAdminEmail('MeritwiseHQ@Gmail.com')).toBe(true);
    });

    it('rejects regular student emails from administrator authorization', () => {
      expect(isAuthorizedAdminEmail('student@example.com')).toBe(false);
      expect(isAuthorizedAdminEmail('candidate@meritwise.in')).toBe(false);
      expect(isAuthorizedAdminEmail(null)).toBe(false);
      expect(isAuthorizedAdminEmail(undefined)).toBe(false);
    });

    it('grants full administrative permissions to meritwisehq@gmail.com', () => {
      expect(hasPermission(meritwiseAdminUser, 'dashboard.view')).toBe(true);
      expect(hasPermission(meritwiseAdminUser, 'exams.manage')).toBe(true);
      expect(hasPermission(meritwiseAdminUser, 'questions.create')).toBe(true);
      expect(hasPermission(meritwiseAdminUser, 'questions.edit')).toBe(true);
      expect(hasPermission(meritwiseAdminUser, 'tests.create')).toBe(true);
      expect(hasPermission(meritwiseAdminUser, 'tests.publish')).toBe(true);
      expect(hasPermission(meritwiseAdminUser, 'students.manage')).toBe(true);
      expect(hasPermission(meritwiseAdminUser, 'cms.manage')).toBe(true);
      expect(hasPermission(meritwiseAdminUser, 'settings.manage')).toBe(true);
    });

    it('includes meritwisehq@gmail.com in initial admin users with active admin role', () => {
      const hqAdmin = INITIAL_ADMIN_USERS.find((u) => u.email === 'meritwisehq@gmail.com');
      expect(hqAdmin).toBeDefined();
      expect(hqAdmin?.role).toBe('admin');
      expect(hqAdmin?.status).toBe('active');
      expect(hqAdmin?.permissions.length).toBe(ALL_PERMISSIONS.length);
    });
  });

  it('grants all permissions to super_admin', () => {
    expect(hasPermission(superAdminUser, 'payments.manage')).toBe(true);
    expect(hasPermission(superAdminUser, 'questions.publish')).toBe(true);
    expect(hasPermission(superAdminUser, 'admins.manage')).toBe(true);
  });

  it('restricts evaluator to designated permissions and rejects privileged actions', () => {
    expect(hasPermission(evaluatorUser, 'evaluations.manage')).toBe(true);
    expect(hasPermission(evaluatorUser, 'omr.manage')).toBe(true);
    expect(hasPermission(evaluatorUser, 'payments.manage')).toBe(false);
    expect(hasPermission(evaluatorUser, 'admins.manage')).toBe(false);
  });

  it('denies all permissions to unauthenticated users', () => {
    expect(hasPermission(null, 'dashboard.view')).toBe(false);
    expect(hasPermission(null, 'exams.manage')).toBe(false);
  });

  describe('Server-side Admin Request Authorization', () => {
    const TEST_ADMIN_SECRET = 'test_secure_admin_secret_998877';

    beforeEach(() => {
      process.env.ADMIN_SECRET_KEY = TEST_ADMIN_SECRET;
      (process.env as Record<string, string | undefined>).NODE_ENV = 'production';
    });

    afterEach(() => {
      delete process.env.ADMIN_SECRET_KEY;
      (process.env as Record<string, string | undefined>).NODE_ENV = 'test';
    });

    it('denies access when authorization header is missing', () => {
      const req = new Request('http://localhost:3000/api/questions', {
        headers: {},
      });
      const check = verifyServerAdminAccess(req);
      expect(check.authorized).toBe(false);
      expect(check.reason).toMatch(/credentials missing/i);
    });

    it('denies access when authorization header is invalid or tampered', () => {
      const req = new Request('http://localhost:3000/api/questions', {
        headers: { authorization: 'Bearer invalid_wrong_token' },
      });
      const check = verifyServerAdminAccess(req);
      expect(check.authorized).toBe(false);
      expect(check.reason).toMatch(/invalid administrative credentials/i);
    });

    it('grants access when valid Bearer admin secret is provided', () => {
      const req = new Request('http://localhost:3000/api/questions', {
        headers: { authorization: `Bearer ${TEST_ADMIN_SECRET}` },
      });
      const check = verifyServerAdminAccess(req);
      expect(check.authorized).toBe(true);
    });
  });
});
