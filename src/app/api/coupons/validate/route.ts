import { NextResponse } from 'next/server';
import { getStoredCoupons } from '@/lib/admin/store';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { code, amount } = body;

    if (!code) {
      return NextResponse.json(
        { success: false, error: 'Coupon code is required' },
        { status: 400 }
      );
    }

    const coupons = getStoredCoupons();
    const coupon = coupons.find(
      (c) => c.code.toUpperCase() === code.trim().toUpperCase()
    );

    if (!coupon) {
      return NextResponse.json(
        { success: false, error: 'Invalid coupon code' },
        { status: 404 }
      );
    }

    if (coupon.status !== 'active') {
      return NextResponse.json(
        { success: false, error: `Coupon code is ${coupon.status}` },
        { status: 400 }
      );
    }

    const now = new Date();
    if (new Date(coupon.expires_at) < now) {
      return NextResponse.json(
        { success: false, error: 'Coupon has expired' },
        { status: 400 }
      );
    }

    if (coupon.used_count >= coupon.total_limit) {
      return NextResponse.json(
        { success: false, error: 'Coupon usage limit has been reached' },
        { status: 400 }
      );
    }

    const orderAmount = Number(amount) || 10;
    if (orderAmount < coupon.min_purchase_amount) {
      return NextResponse.json(
        {
          success: false,
          error: `Minimum order amount of ₹${coupon.min_purchase_amount} required to use this coupon`,
        },
        { status: 400 }
      );
    }

    let discountAmount = 0;
    if (coupon.discount_type === 'percentage') {
      discountAmount = Math.round((orderAmount * coupon.discount_value) / 100);
      if (coupon.max_discount_amount) {
        discountAmount = Math.min(discountAmount, coupon.max_discount_amount);
      }
    } else {
      discountAmount = Math.min(orderAmount, coupon.discount_value);
    }

    const finalAmount = Math.max(0, orderAmount - discountAmount);

    return NextResponse.json({
      success: true,
      data: {
        code: coupon.code,
        name: coupon.name,
        discountType: coupon.discount_type,
        discountValue: coupon.discount_value,
        originalAmount: orderAmount,
        discountAmount,
        finalAmount,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to validate coupon' },
      { status: 500 }
    );
  }
}
