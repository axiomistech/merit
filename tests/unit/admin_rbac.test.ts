import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { hasPermission, verifyServerAdminAccess } from '../../src/lib/admin/auth';
import { AdminUser } from '../../src/types/admin';

describe('Admin RBAC & Security Enforcement (Section 25 & 31)', () => {
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
      process.env.NODE_ENV = 'production';
    });

    afterEach(() => {
      delete process.env.ADMIN_SECRET_KEY;
      process.env.NODE_ENV = 'test';
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
