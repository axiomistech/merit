import { NextResponse } from 'next/server';
import { getStoredProducts, getStoredCoupons } from '@/lib/admin/store';

export async function POST(req: Request) {
  try {
    const body = await req.json();
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

    const finalAmount = Math.max(0, price - discountAmount);
    const orderId = `order_${Date.now()}_${Math.floor(100 + Math.random() * 900)}`;

    return NextResponse.json({
      success: true,
      data: {
        orderId,
        currency: 'INR',
        amount: finalAmount, // in INR
        amountInPaise: finalAmount * 100,
        originalAmount: price,
        discountAmount,
        productName: product ? product.title : 'Standard Examination Paper Token',
        studentRegistrationId: studentRegistrationId || 'MW-26-000001',
        customer: {
          name: studentName || 'Candidate',
          email: studentEmail || 'student@fortlearning.com',
        },
        razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_placeholder',
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}
