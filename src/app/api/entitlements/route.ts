import { NextResponse } from 'next/server';
import { getEntitlementsStore } from '@/lib/server/backendStore';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const studentRegistrationId = searchParams.get('registrationId') || 'FORT-26-000001';
    const paperSlug = searchParams.get('paperSlug');

    const store = getEntitlementsStore();
    const userEntitlements = store[studentRegistrationId] || [
      {
        id: 'ent_free_first_paper',
        type: 'complimentary_first_test',
        paperSlug: 'all',
        grantedAt: '2026-01-01T00:00:00Z',
        expiresAt: '2026-12-31T23:59:59Z',
        status: 'active',
      },
    ];

    if (paperSlug) {
      const hasAccess = userEntitlements.some(
        (e) =>
          e.status === 'active' &&
          (e.paperSlug === 'all' || e.paperSlug === paperSlug)
      );
      return NextResponse.json({
        success: true,
        hasAccess,
        entitlement: userEntitlements.find(
          (e) => e.status === 'active' && (e.paperSlug === 'all' || e.paperSlug === paperSlug)
        ) || null,
      });
    }

    return NextResponse.json({
      success: true,
      data: userEntitlements,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to check entitlements' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { studentRegistrationId, paperSlug } = body;

    if (!studentRegistrationId) {
      return NextResponse.json(
        { success: false, error: 'Student registration ID required' },
        { status: 400 }
      );
    }

    const store = getEntitlementsStore();
    if (!store[studentRegistrationId]) {
      store[studentRegistrationId] = [];
    }

    // Check if complimentary token already claimed
    const existing = store[studentRegistrationId].find(
      (e) => e.type === 'complimentary_first_test'
    );
    if (existing) {
      return NextResponse.json({
        success: true,
        message: 'Complimentary test token already active',
        data: existing,
      });
    }

    const newEntitlement = {
      id: `ent_${Date.now()}`,
      type: 'complimentary_first_test',
      paperSlug: paperSlug || 'all',
      grantedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
    };

    store[studentRegistrationId].push(newEntitlement);

    return NextResponse.json({
      success: true,
      message: 'Complimentary first test access granted successfully',
      data: newEntitlement,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to grant entitlement' },
      { status: 500 }
    );
  }
}
