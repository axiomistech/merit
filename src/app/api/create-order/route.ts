import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    let { amount, currency = 'INR', receipt, notes } = body;

    // Minimum amount: 100 paise (₹1)
    if (amount === undefined || amount === null || typeof amount !== 'number' || isNaN(amount)) {
      return NextResponse.json(
        { success: false, error: 'Amount is required and must be a number in paise' },
        { status: 400 }
      );
    }

    if (amount < 100) {
      return NextResponse.json(
        { success: false, error: 'Minimum amount must be at least 100 paise (₹1.00)' },
        { status: 400 }
      );
    }

    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { success: false, error: 'Razorpay API credentials not configured on server' },
        { status: 500 }
      );
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const orderOptions = {
      amount: Math.round(amount),
      currency: currency.toUpperCase(),
      receipt: receipt || `rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      notes: notes || {},
    };

    const order = await razorpay.orders.create(orderOptions);

    return NextResponse.json(
      {
        success: true,
        order_id: order.id,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        key_id: keyId,
        receipt: order.receipt,
      },
      { status: 200 }
    );
  } catch (error: any) {
    // Check for Razorpay authentication error (status 401)
    if (
      error.statusCode === 401 ||
      error.status === 401 ||
      (error.message && error.message.toLowerCase().includes('auth'))
    ) {
      return NextResponse.json(
        { success: false, error: 'Razorpay authentication failed: Invalid Key ID or Key Secret' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: error.error?.description || error.message || 'Failed to create Razorpay order',
      },
      { status: 500 }
    );
  }
}
