import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import crypto from 'crypto';
import { POST as createOrderHandler } from '@/app/api/create-order/route';
import { POST as verifyPaymentHandler } from '@/app/api/verify-payment/route';

describe('Razorpay Standard Web Checkout Integration', () => {
  const TEST_KEY_ID = 'rzp_test_U3M02Ve7QK65xf';
  const TEST_KEY_SECRET = 'CHfLApd02pAWeVBrx8UaRo5w';

  beforeEach(() => {
    process.env.RAZORPAY_KEY_ID = TEST_KEY_ID;
    process.env.RAZORPAY_KEY_SECRET = TEST_KEY_SECRET;
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID = TEST_KEY_ID;
  });

  describe('POST /api/create-order', () => {
    it('rejects missing or invalid amount with 400', async () => {
      const req = new Request('http://localhost:3000/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      const res = await createOrderHandler(req);
      const data = await res.json();

      expect(res.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toMatch(/amount is required/i);
    });

    it('rejects amount less than 100 paise with 400', async () => {
      const req = new Request('http://localhost:3000/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 50 }), // 50 paise is less than minimum 100 paise
      });

      const res = await createOrderHandler(req);
      const data = await res.json();

      expect(res.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toMatch(/minimum amount must be at least 100 paise/i);
    });

    it('returns 500 if Razorpay credentials are missing', async () => {
      delete process.env.RAZORPAY_KEY_ID;
      delete process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      delete process.env.RAZORPAY_KEY_SECRET;

      const req = new Request('http://localhost:3000/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 1000 }),
      });

      const res = await createOrderHandler(req);
      const data = await res.json();

      expect(res.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toMatch(/credentials not configured/i);
    });
  });

  describe('POST /api/verify-payment', () => {
    it('rejects incomplete payload missing signature, order_id, or payment_id with 400', async () => {
      const req = new Request('http://localhost:3000/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_id: 'order_test_123',
          payment_id: 'pay_test_456',
          // missing signature
        }),
      });

      const res = await verifyPaymentHandler(req);
      const data = await res.json();

      expect(res.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toMatch(/missing required/i);
    });

    it('rejects signature mismatch with 400 without marking as paid', async () => {
      const req = new Request('http://localhost:3000/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_id: 'order_test_123',
          payment_id: 'pay_test_456',
          signature: 'invalid_tampered_signature_hex_value',
        }),
      });

      const res = await verifyPaymentHandler(req);
      const data = await res.json();

      expect(res.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toMatch(/signature mismatch/i);
    });

    it('accepts authentic HMAC-SHA256 signature with 200', async () => {
      const orderId = 'order_test_verified_999';
      const paymentId = 'pay_test_verified_888';

      // Generate expected HMAC-SHA256 signature using test secret
      const expectedSignature = crypto
        .createHmac('sha256', TEST_KEY_SECRET)
        .update(`${orderId}|${paymentId}`)
        .digest('hex');

      const req = new Request('http://localhost:3000/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_id: orderId,
          payment_id: paymentId,
          signature: expectedSignature,
          studentName: 'Test Student',
          studentEmail: 'student@meritwise.in',
        }),
      });

      const res = await verifyPaymentHandler(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toMatch(/verified successfully/i);
      expect(data.order_id).toBe(orderId);
      expect(data.payment_id).toBe(paymentId);
    });
  });
});
