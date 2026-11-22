import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getEntitlementsStore } from '@/lib/server/backendStore';
import { getStoredTransactions, saveStoredTransactions } from '@/lib/admin/store';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const order_id = body.order_id || body.razorpay_order_id;
    const payment_id = body.payment_id || body.razorpay_payment_id;
    const razorpay_signature = body.signature || body.razorpay_signature;

    // Validate missing fields: Return 400
    if (!order_id || !payment_id || !razorpay_signature) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required payment verification fields: order_id, payment_id, and signature are required',
        },
        { status: 400 }
      );
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json(
        { success: false, error: 'Server configuration error: RAZORPAY_KEY_SECRET missing' },
        { status: 500 }
      );
    }

    // Algorithm: HMAC-SHA256(order_id + "|" + payment_id, KEY_SECRET)
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${order_id}|${payment_id}`)
      .digest('hex');

    let isMatch = false;
    try {
      isMatch = crypto.timingSafeEqual(
        Buffer.from(expectedSignature, 'utf-8'),
        Buffer.from(razorpay_signature, 'utf-8')
      );
    } catch {
      isMatch = false;
    }

    // Signature mismatch: return 400, do NOT mark as paid
    if (!isMatch) {
      return NextResponse.json(
        {
          success: false,
          error: 'Signature mismatch: payment verification failed. Access not granted.',
        },
        { status: 400 }
      );
    }

    // Record verified transaction and grant entitlement if student or paper details provided
    const regId = body.studentRegistrationId || 'MW-26-000001';
    const paperSlug = body.paperSlug || 'all';

    const store = getEntitlementsStore();
    if (!store[regId]) {
      store[regId] = [];
    }

    const alreadyProcessed = store[regId].find(
      (e) => e.orderId === order_id || e.paymentId === payment_id
    );

    if (!alreadyProcessed) {
      const newEntitlement = {
        id: `ent_purchased_${Date.now()}`,
        type: 'paid_unlock',
        paperSlug: paperSlug,
        orderId: order_id,
        paymentId: payment_id,
        grantedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'active',
      };
      store[regId].push(newEntitlement);

      const transactions = getStoredTransactions();
      transactions.unshift({
        id: payment_id,
        orderId: order_id,
        studentId: regId,
        studentName: body.studentName || 'Candidate',
        studentEmail: body.studentEmail || 'student@meritwise.in',
        productName: body.productName || 'Examination Paper Access Token',
        amount: body.amount || 10,
        status: 'successful',
        gateway: 'razorpay' as const,
        gatewayPaymentId: payment_id,
        created_at: new Date().toISOString(),
      });
      saveStoredTransactions(transactions);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Payment signature verified successfully',
        order_id,
        payment_id,
        razorpay_order_id: order_id,
        razorpay_payment_id: payment_id,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Payment verification failed' },
      { status: 500 }
    );
  }
}
