import { NextResponse } from 'next/server';
import { getEntitlementsStore } from '@/lib/server/backendStore';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const studentRegistrationId = searchParams.get('registrationId') || 'MW-26-000001';
    const paperSlug = searchParams.get('paperSlug');

    const store = getEntitlementsStore();
    const userEntitlements = store[studentRegistrationId] || [];

    // Check if free paper credit has been consumed
    const freeEntitlement = userEntitlements.find(
      (e) => (e.type === 'free_unlock' || e.type === 'complimentary_first_test') && e.status === 'active'
    );
    const freePaperAvailable = !freeEntitlement;

    const unlockedPapers = userEntitlements
      .filter((e) => e.status === 'active')
      .map((e) => e.paperSlug);

    if (paperSlug) {
      const hasAccess = userEntitlements.some(
        (e) =>
          e.status === 'active' &&
          (e.paperSlug === 'all' || e.paperSlug === paperSlug)
      );
      const activeEntitlement = userEntitlements.find(
        (e) => e.status === 'active' && (e.paperSlug === 'all' || e.paperSlug === paperSlug)
      );

      return NextResponse.json({
        success: true,
        hasAccess,
        freePaperAvailable,
        freePaperSlug: freeEntitlement?.paperSlug || null,
        entitlement: activeEntitlement || null,
      });
    }

    return NextResponse.json({
      success: true,
      freePaperAvailable,
      freePaperSlug: freeEntitlement?.paperSlug || null,
      unlockedPapers,
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
    const {
      studentRegistrationId,
      paperSlug,
      action = 'free_unlock',
      orderId,
      paymentId,
    } = body;

    if (!studentRegistrationId || !paperSlug) {
      return NextResponse.json(
        { success: false, error: 'Student registration ID and paper slug are required' },
        { status: 400 }
      );
    }

    const store = getEntitlementsStore();
    if (!store[studentRegistrationId]) {
      store[studentRegistrationId] = [];
    }

    const userEntitlements = store[studentRegistrationId];

    // Check if student already owns this paper
    const alreadyOwned = userEntitlements.some(
      (e) => e.status === 'active' && (e.paperSlug === 'all' || e.paperSlug === paperSlug)
    );
    if (alreadyOwned) {
      return NextResponse.json({
        success: true,
        message: 'Question paper is already unlocked',
        paperSlug,
        alreadyOwned: true,
      });
    }

    if (action === 'free_unlock') {
      // Check if student already consumed their 1 free paper unlock
      const existingFree = userEntitlements.find(
        (e) => (e.type === 'free_unlock' || e.type === 'complimentary_first_test') && e.status === 'active'
      );

      if (existingFree) {
        return NextResponse.json(
          {
            success: false,
            error: `Your free question paper entitlement was already used for ${existingFree.paperSlug}. Additional question papers cost ₹10 each.`,
            freePaperConsumed: true,
            usedForPaper: existingFree.paperSlug,
          },
          { status: 400 }
        );
      }

      const freeEntitlement = {
        id: `ent_free_${Date.now()}`,
        type: 'free_unlock',
        paperSlug,
        grantedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'active',
      };

      userEntitlements.push(freeEntitlement);

      return NextResponse.json({
        success: true,
        message: 'Complimentary first question paper unlocked successfully',
        data: freeEntitlement,
      });
    }

    if (action === 'paid_unlock') {
      // SECURITY ENFORCEMENT: Paid entitlements must strictly originate from verified Razorpay transactions
      return NextResponse.json(
        {
          success: false,
          error: 'Direct client-side paid entitlement creation is forbidden. Entitlements must be granted through verified payment settlement via /api/payments/verify.',
        },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { success: false, error: `Invalid unlock action '${action}'` },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to process entitlement' },
      { status: 500 }
    );
  }
}
