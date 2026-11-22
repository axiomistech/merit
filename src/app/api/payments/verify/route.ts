import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getEntitlementsStore } from '@/lib/server/backendStore';
import { getStoredTransactions, saveStoredTransactions } from '@/lib/admin/store';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      studentRegistrationId,
      studentName,
      studentEmail,
      productName,
      amount,
      paperSlug,
    } = body;

    const orderId = razorpay_order_id || body.order_id;
    const paymentId = razorpay_payment_id || body.payment_id;
    const signature = razorpay_signature || body.signature;

    if (!orderId || !paymentId || !signature) {
      return NextResponse.json(
        { success: false, error: 'Incomplete payment verification payload: order_id, payment_id, and signature are required' },
        { status: 400 }
      );
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Cryptographic signature verification
    let isSignatureValid = false;

    if (keySecret) {
      try {
        const generatedSignature = crypto
          .createHmac('sha256', keySecret)
          .update(`${orderId}|${paymentId}`)
          .digest('hex');

        isSignatureValid = crypto.timingSafeEqual(
          Buffer.from(generatedSignature, 'utf-8'),
          Buffer.from(signature, 'utf-8')
        );
      } catch {
        isSignatureValid = false;
      }
    } else if (process.env.NODE_ENV !== 'production') {
      // In non-production testing sandbox without secret
      isSignatureValid =
        signature === 'mock_verified_signature' ||
        orderId.startsWith('order_sim_') ||
        paymentId.startsWith('pay_sim_');
    }

    if (!isSignatureValid) {
      return NextResponse.json(
        { success: false, error: 'Cryptographic signature verification failed. Signature mismatch.' },
        { status: 400 }
      );
    }

    // Grant Entitlement with Idempotency Check
    const store = getEntitlementsStore();
    const regId = studentRegistrationId || 'MW-26-000001';
    if (!store[regId]) {
      store[regId] = [];
    }

    const alreadyProcessed = store[regId].find(
      (e) => e.orderId === orderId || e.paymentId === paymentId
    );

    if (alreadyProcessed) {
      return NextResponse.json({
        success: true,
        message: 'Payment already verified and entitlement active (idempotent)',
        data: {
          paymentId,
          orderId,
          entitlement: alreadyProcessed,
        },
      });
    }

    const newEntitlement = {
      id: `ent_purchased_${Date.now()}`,
      type: 'paid_unlock',
      paperSlug: paperSlug || 'all',
      orderId,
      paymentId,
      grantedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
    };

    store[regId].push(newEntitlement);

    // Record verified transaction in store
    const transactions = getStoredTransactions();
    transactions.unshift({
      id: paymentId,
      orderId,
      studentId: regId,
      studentName: studentName || 'Candidate',
      studentEmail: studentEmail || 'student@meritwise.in',
      productName: productName || 'Standard Examination Paper Token',
      amount: amount || 10,
      status: 'successful',
      gateway: 'razorpay' as const,
      gatewayPaymentId: paymentId,
      created_at: new Date().toISOString(),
    });
    saveStoredTransactions(transactions);

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully and access unlocked.',
      data: {
        paymentId,
        orderId,
        studentRegistrationId: regId,
        entitlement: newEntitlement,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Payment verification failed' },
      { status: 500 }
    );
  }
}
