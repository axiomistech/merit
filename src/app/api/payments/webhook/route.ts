import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getEntitlementsStore } from '@/lib/server/backendStore';
import { getStoredTransactions, saveStoredTransactions } from '@/lib/admin/store';

// Set of processed webhook event IDs to guarantee idempotency
declare global {
  var __fort_processed_webhook_events: Set<string> | undefined;
}

if (!global.__fort_processed_webhook_events) {
  global.__fort_processed_webhook_events = new Set();
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const webhookSignature = req.headers.get('x-razorpay-signature');
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || 'rzp_webhook_secret_placeholder';

    // Verify webhook signature if present
    if (webhookSignature && process.env.NODE_ENV === 'production') {
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(rawBody)
        .digest('hex');

      if (expectedSignature !== webhookSignature) {
        return NextResponse.json(
          { success: false, error: 'Invalid webhook signature' },
          { status: 400 }
        );
      }
    }

    const payload = JSON.parse(rawBody);
    const eventId = payload.event_id || payload.payload?.payment?.entity?.id || `evt_${Date.now()}`;

    // SECTION 16 MANDATORY: DUPLICATE WEBHOOK PREVENTION (IDEMPOTENCY)
    if (global.__fort_processed_webhook_events!.has(eventId)) {
      return NextResponse.json({
        success: true,
        message: 'Duplicate webhook event already processed (idempotent)',
        eventId,
      });
    }

    global.__fort_processed_webhook_events!.add(eventId);

    const event = payload.event;
    if (event === 'payment.captured' || event === 'order.paid') {
      const paymentEntity = payload.payload?.payment?.entity;
      const orderId = paymentEntity?.order_id || 'order_unknown';
      const paymentId = paymentEntity?.id || 'pay_unknown';
      const studentEmail = paymentEntity?.email || 'candidate@example.com';
      const amount = paymentEntity?.amount ? paymentEntity.amount / 100 : 10;

      const regId = paymentEntity?.notes?.registration_id || 'MW-26-000001';
      const store = getEntitlementsStore();
      if (!store[regId]) {
        store[regId] = [];
      }

      // Check if entitlement for this order already exists
      const existingEntitlement = store[regId].find((e: any) => e.orderId === orderId);
      if (!existingEntitlement) {
        store[regId].push({
          id: `ent_webhook_${Date.now()}`,
          type: 'purchased_paper_token',
          paperSlug: paymentEntity?.notes?.paper_slug || 'all',
          orderId,
          paymentId,
          grantedAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'active',
        });
      }

      // Record transaction
      const transactions = getStoredTransactions();
      const existingTxn = transactions.find((t) => t.id === paymentId);
      if (!existingTxn) {
        saveStoredTransactions([
          {
            id: paymentId,
            orderId,
            studentId: regId,
            studentName: paymentEntity?.notes?.student_name || 'Candidate',
            studentEmail,
            productName: paymentEntity?.notes?.product_name || 'Standard Examination Paper Token',
            amount,
            status: 'successful',
            gateway: 'razorpay',
            gatewayPaymentId: paymentId,
            created_at: new Date().toISOString(),
          },
          ...transactions,
        ]);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Webhook processed successfully',
      event: payload.event,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
