'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/data/products';
import {
  ShoppingBag,
  User,
  Phone,
  Mail,
  ArrowLeft,
  Loader2,
  AlertCircle,
  MessageCircle,
  ShieldCheck,
  Truck,
  Package,
} from 'lucide-react';

interface FormErrors {
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getCartTotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const cartTotal = getCartTotal();

  function validate(): FormErrors {
    const newErrors: FormErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Full name is required';
    }

    const phone = formData.customerPhone.replace(/\s/g, '');
    if (!phone) {
      newErrors.customerPhone = 'Phone number is required';
    } else if (!/^\+?[0-9]{10,15}$/.test(phone)) {
      newErrors.customerPhone = 'Enter a valid phone number (e.g. +254712345678)';
    }

    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Enter a valid email address';
    }

    return newErrors;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on edit
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (submitError) setSubmitError('');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.customerName.trim(),
          customerPhone: formData.customerPhone.trim(),
          customerEmail: formData.customerEmail.trim(),
          items: cart.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
          totalAmount: cartTotal,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? 'Something went wrong');
      }

      const order = await res.json() as { orderNumber: string };
      clearCart();
      router.push(`/order-confirmation/${order.orderNumber}`);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to place order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  function buildWhatsAppMessage(): string {
    const lines = cart.map(
      (item) => `- ${item.name} x${item.quantity} @ ${formatPrice(item.price)}`
    );
    const msg = [
      'Hi, I would like to place an order:',
      '',
      ...lines,
      '',
      `Total: ${formatPrice(cartTotal)}`,
      '',
      formData.customerName ? `Name: ${formData.customerName}` : '',
      formData.customerPhone ? `Phone: ${formData.customerPhone}` : '',
    ]
      .filter(Boolean)
      .join('\n');
    return encodeURIComponent(msg);
  }

  // Empty cart state
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <section className="relative bg-[#0a0a0a] py-10 md:py-12 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0066ff] via-[#0052cc] to-[#0066ff]" />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
              Checkout
            </h1>
            <p className="text-sm md:text-base text-gray-400">
              Complete your purchase
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-5">
              <ShoppingBag className="w-7 h-7 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-[#0a0a0a] mb-2">Your cart is empty</h2>
            <p className="text-sm text-gray-500 mb-6">
              Add some products to your cart before checking out.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0066ff] hover:bg-[#0052cc] text-white text-sm font-semibold rounded-xl transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-[#0a0a0a] py-10 md:py-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0066ff] via-[#0052cc] to-[#0066ff]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE4YzAtOS45NC04LjA2LTE4LTE4LTE4UzAgOC4wNiAwIDE4czguMDYgMTggMTggMTggMTgtOC4wNiAxOC0xOHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
            Checkout
          </h1>
          <p className="text-sm md:text-base text-gray-400">
            Review your order and complete your purchase
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#0066ff] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left: Customer form */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8">
              <h2 className="text-lg font-bold text-[#0a0a0a] mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-[#0066ff]" />
                Customer Details
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Name */}
                <div>
                  <label htmlFor="customerName" className="block text-xs font-semibold text-[#424242] mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      id="customerName"
                      name="customerName"
                      type="text"
                      autoComplete="name"
                      placeholder="e.g. John Kihoro"
                      value={formData.customerName}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3 py-2.5 text-sm border rounded-lg outline-none transition-all ${
                        errors.customerName
                          ? 'border-red-400 focus:ring-2 focus:ring-red-100 focus:border-red-400'
                          : 'border-gray-200 focus:ring-2 focus:ring-[#0066ff]/20 focus:border-[#0066ff]'
                      }`}
                    />
                  </div>
                  {errors.customerName && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.customerName}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="customerPhone" className="block text-xs font-semibold text-[#424242] mb-1.5">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      id="customerPhone"
                      name="customerPhone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+254 712 345 678"
                      value={formData.customerPhone}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3 py-2.5 text-sm border rounded-lg outline-none transition-all ${
                        errors.customerPhone
                          ? 'border-red-400 focus:ring-2 focus:ring-red-100 focus:border-red-400'
                          : 'border-gray-200 focus:ring-2 focus:ring-[#0066ff]/20 focus:border-[#0066ff]'
                      }`}
                    />
                  </div>
                  {errors.customerPhone && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.customerPhone}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="customerEmail" className="block text-xs font-semibold text-[#424242] mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      id="customerEmail"
                      name="customerEmail"
                      type="email"
                      autoComplete="email"
                      placeholder="john@example.com"
                      value={formData.customerEmail}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3 py-2.5 text-sm border rounded-lg outline-none transition-all ${
                        errors.customerEmail
                          ? 'border-red-400 focus:ring-2 focus:ring-red-100 focus:border-red-400'
                          : 'border-gray-200 focus:ring-2 focus:ring-[#0066ff]/20 focus:border-[#0066ff]'
                      }`}
                    />
                  </div>
                  {errors.customerEmail && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.customerEmail}
                    </p>
                  )}
                </div>

                {/* Submit error */}
                {submitError && (
                  <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-red-700">{submitError}</p>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#0066ff] hover:bg-[#0052cc] disabled:bg-[#0066ff]/60 text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Placing Order...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      Place Order &mdash; {formatPrice(cartTotal)}
                    </>
                  )}
                </button>

                {/* WhatsApp fallback */}
                <a
                  href={`https://wa.me/254788740000?text=${buildWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#1da851] text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Order via WhatsApp Instead
                </a>
              </form>
            </div>
          </div>

          {/* Right: Order summary */}
          <div className="lg:col-span-2">
            <div className="bg-[#f8f8f6] border border-gray-200 rounded-xl p-6 sticky top-24">
              <h2 className="text-lg font-bold text-[#0a0a0a] mb-5 flex items-center gap-2">
                <Package className="w-5 h-5 text-[#0066ff]" />
                Order Summary
              </h2>

              {/* Cart items */}
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-start gap-3">
                    <div className="w-14 h-14 rounded-lg bg-white border border-gray-100 overflow-hidden flex-shrink-0 relative">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#0a0a0a] truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-[#0a0a0a] flex-shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Delivery</span>
                  <span className="text-[#0066ff] font-medium">Calculated later</span>
                </div>
              </div>

              <div className="border-t border-gray-200 mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-[#0a0a0a]">Total</span>
                  <span className="text-lg font-bold text-[#0a0a0a]">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-6 pt-5 border-t border-gray-200 space-y-3">
                <div className="flex items-center gap-2.5 text-xs text-gray-500">
                  <ShieldCheck className="w-4 h-4 text-[#0066ff] flex-shrink-0" />
                  <span>Secure order processing</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-gray-500">
                  <Truck className="w-4 h-4 text-[#0066ff] flex-shrink-0" />
                  <span>Delivery across Kenya</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-gray-500">
                  <Phone className="w-4 h-4 text-[#0066ff] flex-shrink-0" />
                  <span>Support: +254 788 740 000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
