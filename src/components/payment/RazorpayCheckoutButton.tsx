'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface RazorpaySuccessPayload {
  order_id: string;
  payment_id: string;
  signature: string;
}

export interface RazorpayCheckoutProps {
  amountInPaise?: number; // Amount in paise (minimum 100 paise = ₹1)
  amountInr?: number; // Convenience amount in INR (e.g. 10 for ₹10)
  name?: string;
  description?: string;
  studentName?: string;
  studentEmail?: string;
  studentPhone?: string;
  studentRegistrationId?: string;
  paperSlug?: string;
  notes?: Record<string, string>;
  buttonText?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onSuccess?: (payload: RazorpaySuccessPayload) => void;
  onError?: (error: any) => void;
  onDismiss?: () => void;
}

/**
 * Dynamically loads the official Razorpay Standard Checkout SDK
 */
export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      return resolve(false);
    }
    if ((window as any).Razorpay) {
      return resolve(true);
    }

    const existingScript = document.getElementById('razorpay-checkout-script');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true));
      existingScript.addEventListener('error', () => resolve(false));
      return;
    }

    const script = document.createElement('script');
    script.id = 'razorpay-checkout-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

/**
 * Core function to launch Razorpay Standard Web Checkout Modal
 */
export async function openRazorpayCheckout(options: {
  amountInPaise: number;
  name?: string;
  description?: string;
  studentName?: string;
  studentEmail?: string;
  studentPhone?: string;
  studentRegistrationId?: string;
  paperSlug?: string;
  notes?: Record<string, string>;
  onSuccess?: (payload: RazorpaySuccessPayload) => void;
  onError?: (error: any) => void;
  onDismiss?: () => void;
}): Promise<void> {
  const isLoaded = await loadRazorpayScript();
  if (!isLoaded) {
    const errorMsg = 'Failed to load Razorpay checkout SDK. Please check your network connection.';
    toast.error(errorMsg);
    options.onError?.(new Error(errorMsg));
    return;
  }

  try {
    // 1. Call Backend Order Creation Endpoint: POST /api/create-order
    const orderRes = await fetch('/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: options.amountInPaise,
        currency: 'INR',
        receipt: `rcpt_${Date.now()}`,
        notes: options.notes || {},
      }),
    });

    const orderData = await orderRes.json();
    if (!orderRes.ok || !orderData.success) {
      throw new Error(orderData.error || 'Failed to create payment order');
    }

    const keyId =
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
      orderData.key_id ||
      'rzp_test_U3M02Ve7QK65xf';

    // 2. Open Razorpay Standard Checkout Modal
    const razorpayOptions = {
      key: keyId,
      amount: orderData.amount,
      currency: orderData.currency || 'INR',
      name: 'MERITWISE',
      description: options.description || options.name || 'Examination Paper Access',
      image: '/brand/logo-gold-icon.png',
      order_id: orderData.order_id,
      prefill: {
        name: options.studentName || 'Candidate',
        email: options.studentEmail || '',
        contact: options.studentPhone || '',
      },
      notes: options.notes || {},
      theme: {
        color: '#9CAF88', // Sage green brand color
      },
      modal: {
        ondismiss: () => {
          toast.info('Payment cancelled by user');
          options.onDismiss?.();
        },
      },
      handler: async (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) => {
        try {
          // 3. Send payment details to Backend Verification Endpoint: POST /api/verify-payment
          const verifyRes = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              studentName: options.studentName,
              studentEmail: options.studentEmail,
              studentRegistrationId: options.studentRegistrationId,
              paperSlug: options.paperSlug,
              amount: Math.round(options.amountInPaise / 100),
            }),
          });

          const verifyData = await verifyRes.json();
          if (!verifyRes.ok || !verifyData.success) {
            throw new Error(verifyData.error || 'Payment signature verification failed');
          }

          toast.success('Payment verified successfully!');
          options.onSuccess?.({
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          });
        } catch (verifyErr: any) {
          toast.error(verifyErr.message || 'Payment verification failed');
          options.onError?.(verifyErr);
        }
      },
    };

    const rzp = new (window as any).Razorpay(razorpayOptions);

    rzp.on('payment.failed', (failResponse: any) => {
      const errMsg =
        failResponse.error?.description ||
        failResponse.error?.reason ||
        'Payment failed. Please try again.';
      toast.error(errMsg);
      options.onError?.(failResponse.error || new Error(errMsg));
    });

    rzp.open();
  } catch (err: any) {
    toast.error(err.message || 'Payment initiation failed');
    options.onError?.(err);
  }
}

/**
 * Standard Checkout Button Component
 */
export function RazorpayCheckoutButton({
  amountInPaise,
  amountInr,
  name,
  description,
  studentName,
  studentEmail,
  studentPhone,
  studentRegistrationId,
  paperSlug,
  notes,
  buttonText,
  className = '',
  disabled = false,
  onSuccess,
  onError,
  onDismiss,
}: RazorpayCheckoutProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Preload script in background on mount
    loadRazorpayScript();
  }, []);

  const calculatedPaise =
    amountInPaise !== undefined
      ? amountInPaise
      : (amountInr || 10) * 100;

  const handleClick = async () => {
    setLoading(true);
    try {
      await openRazorpayCheckout({
        amountInPaise: calculatedPaise,
        name,
        description,
        studentName,
        studentEmail,
        studentPhone,
        studentRegistrationId,
        paperSlug,
        notes,
        onSuccess: (data) => {
          setLoading(false);
          onSuccess?.(data);
        },
        onError: (err) => {
          setLoading(false);
          onError?.(err);
        },
        onDismiss: () => {
          setLoading(false);
          onDismiss?.();
        },
      });
    } catch {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || loading}
      className={
        className ||
        'inline-flex items-center justify-center rounded-xl bg-[#9CAF88] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#151A15] shadow-sm transition-all hover:bg-[#8CA078] active:scale-[0.98] disabled:opacity-50'
      }
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <svg
            className="h-4 w-4 animate-spin text-[#151A15]"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Connecting to Razorpay...
        </span>
      ) : (
        buttonText || `Pay ₹${calculatedPaise / 100} with Razorpay`
      )}
    </button>
  );
}
