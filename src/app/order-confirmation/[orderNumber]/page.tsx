'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Package, ArrowRight, ShoppingBag, MessageCircle, Copy, CheckCheck } from 'lucide-react';
import { useState } from 'react';

export default function OrderConfirmationPage() {
  const params = useParams<{ orderNumber: string }>();
  const [copied, setCopied] = useState(false);

  const orderNumber = params.orderNumber ?? '';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(orderNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API may not be available in all contexts
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Strip */}
      <section className="relative bg-[#0a0a0a] py-10 md:py-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0066ff] via-[#0052cc] to-[#0066ff]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE4YzAtOS45NC04LjA2LTE4LTE4LTE4UzAgOC4wNiAwIDE4czguMDYgMTggMTggMTggMTgtOC4wNiAxOC0xOHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-6 h-6 text-[#0066ff]" />
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Order Confirmation
            </h1>
          </div>
          <p className="text-sm md:text-base text-gray-400 max-w-lg">
            Your order has been placed successfully.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10 md:py-16">
        <div className="mx-auto max-w-lg px-4 sm:px-6">
          {/* Success Checkmark */}
          <div className="flex justify-center mb-8">
            <div className="success-ring relative flex items-center justify-center w-24 h-24 rounded-full bg-emerald-500">
              <svg
                className="success-check w-12 h-12 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0a0a0a] mb-2">
              Order Confirmed!
            </h2>
            <p className="text-[#6b6b6b] text-sm md:text-base">
              Thank you for your order
            </p>
          </div>

          {/* Order Number Box */}
          <div className="rounded-xl border border-gray-200 bg-[#f8f8f6] p-5 mb-6">
            <p className="text-xs font-medium text-[#6b6b6b] uppercase tracking-wider mb-2">
              Order Number
            </p>
            <div className="flex items-center justify-between gap-3">
              <span className="text-xl md:text-2xl font-bold text-[#0a0a0a] font-mono tracking-wide">
                {orderNumber}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-[#6b6b6b] transition-colors hover:border-[#0066ff] hover:text-[#0066ff]"
              >
                {copied ? (
                  <>
                    <CheckCheck className="w-3.5 h-3.5" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Status Message */}
          <div className="rounded-xl border border-gray-200 p-5 mb-8">
            <p className="text-sm text-[#0a0a0a] leading-relaxed">
              We&apos;ll process your order shortly. You&apos;ll receive updates via WhatsApp or email.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 mb-8">
            <Link
              href="/track"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#0066ff] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#0052cc]"
            >
              <Package className="w-4 h-4" />
              Track Your Order
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/products"
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-6 py-3.5 text-sm font-semibold text-[#0a0a0a] transition-colors hover:border-[#0066ff] hover:text-[#0066ff]"
            >
              <ShoppingBag className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>

          {/* Save Reminder */}
          <p className="text-center text-xs text-[#6b6b6b] mb-6">
            Save your order number for tracking. You can use it anytime on our{' '}
            <Link href="/track" className="text-[#0066ff] hover:underline">
              tracking page
            </Link>
            .
          </p>

          {/* WhatsApp Contact */}
          <div className="rounded-xl border border-gray-200 bg-[#f8f8f6] p-4">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-500/10 shrink-0">
                <MessageCircle className="w-4.5 h-4.5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#0a0a0a] mb-0.5">
                  Have questions?
                </p>
                <p className="text-xs text-[#6b6b6b] mb-2">
                  Reach out to us on WhatsApp for quick support.
                </p>
                <a
                  href="https://wa.me/254788740000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 hover:underline"
                >
                  Chat on WhatsApp
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CSS-only animations */}
      <style jsx>{`
        .success-ring {
          animation: scaleIn 0.4s ease-out forwards;
          box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.3);
        }

        .success-ring::after {
          content: '';
          position: absolute;
          inset: -6px;
          border-radius: 9999px;
          border: 2px solid rgba(16, 185, 129, 0.25);
          animation: ringPulse 1.5s ease-out 0.3s forwards;
          opacity: 0;
        }

        .success-check polyline {
          stroke-dasharray: 30;
          stroke-dashoffset: 30;
          animation: drawCheck 0.5s ease-out 0.3s forwards;
        }

        @keyframes scaleIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          60% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes ringPulse {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.5;
            transform: scale(1);
          }
        }

        @keyframes drawCheck {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}
