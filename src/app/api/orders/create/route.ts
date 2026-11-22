import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { getStoredProducts, getStoredCoupons } from '@/lib/admin/store';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { productId, studentName, studentEmail, studentRegistrationId, couponCode } = body;

    const products = getStoredProducts();
    const product = products.find((p) => p.id === productId || p.slug === productId);

    let price = product ? product.price : 10; // Default ₹10 standard single paper
    let discountAmount = 0;

    // Apply coupon if provided
    if (couponCode) {
      const coupons = getStoredCoupons();
      const coupon = coupons.find(
        (c) => c.code === couponCode.toUpperCase() && c.status === 'active'
      );
      if (coupon) {
        if (coupon.discount_type === 'percentage') {
          discountAmount = Math.round((price * coupon.discount_value) / 100);
        } else {
          discountAmount = Math.min(price, coupon.discount_value);
        }
      }
    }

    const finalAmount = Math.max(1, price - discountAmount); // Minimum ₹1 (100 paise)
    const amountInPaise = finalAmount * 100;

    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    let orderId = `order_${Date.now()}_${Math.floor(100 + Math.random() * 900)}`;

    if (keyId && keySecret) {
      try {
        const razorpay = new Razorpay({
          key_id: keyId,
          key_secret: keySecret,
        });

        const rzpOrder = await razorpay.orders.create({
          amount: amountInPaise,
          currency: 'INR',
          receipt: `rcpt_${(studentRegistrationId || 'mw').toLowerCase()}_${Date.now().toString().slice(-6)}`,
          notes: {
            productId: productId || 'paper_default',
            productName: product ? product.title : 'Standard Examination Paper Token',
            studentRegistrationId: studentRegistrationId || 'MW-26-000001',
          },
        });

        orderId = rzpOrder.id;
      } catch (err: any) {
        console.warn('Razorpay order creation fallback:', err.message);
      }
    }

    return NextResponse.json({
      success: true,
      order_id: orderId,
      orderId,
      amount: amountInPaise,
      currency: 'INR',
      data: {
        order_id: orderId,
        orderId,
        currency: 'INR',
        amount: finalAmount, // in INR
        amountInPaise,
        originalAmount: price,
        discountAmount,
        productName: product ? product.title : 'Standard Examination Paper Token',
        studentRegistrationId: studentRegistrationId || 'MW-26-000001',
        customer: {
          name: studentName || 'Candidate',
          email: studentEmail || 'student@meritwise.in',
        },
        razorpayKeyId: keyId || 'rzp_test_placeholder',
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}
