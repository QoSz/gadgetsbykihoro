'use client';

import { useState } from 'react';
import {
  Package,
  ClipboardCheck,
  CreditCard,
  Truck,
  CircleCheckBig,
  Loader2,
  Check,
  RotateCcw,
  MessageCircle,
  CalendarClock,
  ShoppingBag,
  StickyNote,
} from 'lucide-react';
import type {
  OrderStatus,
  OrderItem,
  OrderNote,
  OrderStatusHistory,
} from '@/types/order';
import { ORDER_STATUSES } from '@/types/order';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface OrderData {
  orderNumber: string;
  customerName: string;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
  estimatedDelivery: string | null;
  createdAt: string;
  notes: OrderNote[];
  statusHistory: OrderStatusHistory[];
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STATUS_META: Record<
  OrderStatus,
  { icon: typeof Package; label: string }
> = {
  'Order Confirmed': { icon: ClipboardCheck, label: 'Confirmed' },
  'Payment Verified': { icon: CreditCard, label: 'Payment' },
  'Shipment Processing': { icon: Package, label: 'Processing' },
  'In Transit': { icon: Truck, label: 'In Transit' },
  Delivered: { icon: CircleCheckBig, label: 'Delivered' },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatCurrency(amount: number): string {
  return `KSh ${amount.toLocaleString('en-KE')}`;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatShortDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-KE', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getStatusIndex(status: OrderStatus): number {
  return ORDER_STATUSES.indexOf(status);
}

function getDeliveryCountdown(estimatedDelivery: string): string {
  const now = new Date();
  const delivery = new Date(estimatedDelivery);
  // Reset to start of day for comparison
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const deliveryStart = new Date(
    delivery.getFullYear(),
    delivery.getMonth(),
    delivery.getDate()
  );
  const diffMs = deliveryStart.getTime() - todayStart.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'Delivery expected — contact us for updates';
  if (diffDays === 0) return 'Arriving Today';
  if (diffDays === 1) return 'Arriving Tomorrow';
  return `Arriving in ${diffDays} days`;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StatusBadge({ status }: { status: OrderStatus }) {
  const isDelivered = status === 'Delivered';
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
        isDelivered
          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
          : 'bg-[#0066ff]/10 text-[#0066ff] border border-[#0066ff]/20'
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isDelivered ? 'bg-emerald-500' : 'bg-[#0066ff] animate-pulse'
        }`}
      />
      {status}
    </span>
  );
}

function DeliveryCountdown({
  estimatedDelivery,
}: {
  estimatedDelivery: string;
}) {
  const message = getDeliveryCountdown(estimatedDelivery);
  const isPastDue = message.includes('contact us');

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${
        isPastDue
          ? 'bg-amber-50 border-amber-200'
          : 'bg-[#0066ff]/5 border-[#0066ff]/15'
      }`}
    >
      <CalendarClock
        className={`w-5 h-5 flex-shrink-0 ${isPastDue ? 'text-amber-600' : 'text-[#0066ff]'}`}
      />
      <div>
        <p
          className={`text-sm font-semibold ${isPastDue ? 'text-amber-800' : 'text-[#0a0a0a]'}`}
        >
          {message}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">
          Est.{' '}
          {new Date(estimatedDelivery).toLocaleDateString('en-KE', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Timeline
// ---------------------------------------------------------------------------

function TimelineStep({
  status,
  index,
  currentIndex,
  historyEntry,
  isLast,
}: {
  status: OrderStatus;
  index: number;
  currentIndex: number;
  historyEntry: OrderStatusHistory | undefined;
  isLast: boolean;
}) {
  const isCompleted = index < currentIndex;
  const isCurrent = index === currentIndex;
  const isPending = index > currentIndex;
  const meta = STATUS_META[status];
  const Icon = meta.icon;

  return (
    <>
      {/* ---- Desktop (horizontal) ---- */}
      <div className="hidden md:flex flex-col items-center flex-1 relative">
        {/* Connecting line (before this node) */}
        {index > 0 && (
          <div
            className={`absolute top-5 right-1/2 h-0.5 w-full ${
              isCompleted || isCurrent ? 'bg-[#0066ff]' : 'border-t-2 border-dashed border-gray-200'
            }`}
            style={{ zIndex: 0 }}
          />
        )}

        {/* Node */}
        <div
          className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            isCompleted
              ? 'bg-[#0066ff] shadow-md shadow-[#0066ff]/25'
              : isCurrent
                ? 'bg-[#0066ff] ring-[3px] ring-[#0066ff]/20 shadow-lg shadow-[#0066ff]/30 animate-pulse'
                : 'bg-gray-100 border-2 border-gray-200'
          }`}
        >
          {isCompleted ? (
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
          ) : (
            <Icon
              className={`w-4 h-4 ${isCurrent ? 'text-white' : 'text-gray-400'}`}
            />
          )}
        </div>

        {/* Label */}
        <p
          className={`mt-2.5 text-xs font-semibold text-center leading-tight ${
            isPending ? 'text-gray-400' : 'text-[#0a0a0a]'
          }`}
        >
          {meta.label}
        </p>

        {/* Timestamp */}
        {historyEntry ? (
          <p className="text-[10px] text-gray-500 mt-0.5 text-center">
            {formatShortDate(historyEntry.changedAt)}
          </p>
        ) : (
          <p className="text-[10px] text-transparent mt-0.5 select-none">
            placeholder
          </p>
        )}
      </div>

      {/* ---- Mobile (vertical) ---- */}
      <div className="flex md:hidden gap-3.5">
        {/* Node + line */}
        <div className="flex flex-col items-center">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
              isCompleted
                ? 'bg-[#0066ff] shadow-md shadow-[#0066ff]/25'
                : isCurrent
                  ? 'bg-[#0066ff] ring-[3px] ring-[#0066ff]/20 shadow-lg shadow-[#0066ff]/30 animate-pulse'
                  : 'bg-gray-100 border-2 border-gray-200'
            }`}
          >
            {isCompleted ? (
              <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
            ) : (
              <Icon
                className={`w-3.5 h-3.5 ${isCurrent ? 'text-white' : 'text-gray-400'}`}
              />
            )}
          </div>
          {!isLast && (
            <div
              className={`w-0.5 flex-1 min-h-6 ${
                isCompleted ? 'bg-[#0066ff]' : 'border-l-2 border-dashed border-gray-200'
              }`}
            />
          )}
        </div>

        {/* Text */}
        <div className="pt-1.5 pb-5">
          <p
            className={`text-sm font-semibold leading-none ${
              isPending ? 'text-gray-400' : 'text-[#0a0a0a]'
            }`}
          >
            {status}
          </p>
          {historyEntry && (
            <p className="text-xs text-gray-500 mt-1">
              {formatShortDate(historyEntry.changedAt)}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

function OrderTimeline({
  currentStatus,
  statusHistory,
}: {
  currentStatus: OrderStatus;
  statusHistory: OrderStatusHistory[];
}) {
  const currentIndex = getStatusIndex(currentStatus);

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 md:p-6 shadow-sm">
      <h3 className="text-sm font-bold text-[#0a0a0a] mb-5">
        Order Progress
      </h3>

      {/* Desktop: horizontal row */}
      <div className="hidden md:flex items-start">
        {ORDER_STATUSES.map((status, index) => (
          <TimelineStep
            key={status}
            status={status}
            index={index}
            currentIndex={currentIndex}
            historyEntry={statusHistory.find((h) => h.status === status)}
            isLast={index === ORDER_STATUSES.length - 1}
          />
        ))}
      </div>

      {/* Mobile: vertical list */}
      <div className="md:hidden">
        {ORDER_STATUSES.map((status, index) => (
          <TimelineStep
            key={status}
            status={status}
            index={index}
            currentIndex={currentIndex}
            historyEntry={statusHistory.find((h) => h.status === status)}
            isLast={index === ORDER_STATUSES.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [contact, setContact] = useState('');
  const [order, setOrder] = useState<OrderData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setOrder(null);
    setLoading(true);

    try {
      const params = new URLSearchParams({
        orderNumber: orderNumber.trim(),
        contact: contact.trim(),
      });
      const res = await fetch(`/api/track?${params}`);
      if (!res.ok) {
        const data: { error?: string } = await res.json();
        throw new Error(
          data.error || 'Order not found. Please check your details and try again.'
        );
      }
      const data: OrderData = await res.json();
      setOrder(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setOrder(null);
    setError('');
    setOrderNumber('');
    setContact('');
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-[#0a0a0a] py-10 md:py-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0066ff] via-[#0052cc] to-[#0066ff]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE4YzAtOS45NC04LjA2LTE4LTE4LTE4UzAgOC4wNiAwIDE4czguMDYgMTggMTggMTggMTgtOC4wNiAxOC0xOHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-6 h-6 text-[#0066ff]" />
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Track Your Order
            </h1>
          </div>
          <p className="text-sm md:text-base text-gray-400 max-w-lg">
            Enter your order number and contact details to check the status of
            your order.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-10">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          {!order ? (
            /* ============ Search Form ============ */
            <div className="max-w-xl mx-auto rounded-xl border border-gray-200 p-5 md:p-6 shadow-sm">
              <h2 className="text-lg font-bold text-[#0a0a0a] mb-1">
                Find Your Order
              </h2>
              <p className="text-xs text-gray-500 mb-5">
                Enter the details you used when placing your order.
              </p>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm font-medium flex items-center gap-2">
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label
                    htmlFor="orderNumber"
                    className="block text-xs font-semibold text-[#424242] mb-1.5"
                  >
                    Order Number *
                  </label>
                  <input
                    type="text"
                    id="orderNumber"
                    required
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0066ff]/20 focus:border-[#0066ff] outline-none transition-all text-gray-900 placeholder:text-gray-400"
                    placeholder="e.g., ORD-1234"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact"
                    className="block text-xs font-semibold text-[#424242] mb-1.5"
                  >
                    Phone or Email *
                  </label>
                  <input
                    type="text"
                    id="contact"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0066ff]/20 focus:border-[#0066ff] outline-none transition-all text-gray-900 placeholder:text-gray-400"
                    placeholder="Phone or email used for order"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-2.5 bg-[#0066ff] text-white text-sm rounded-xl font-semibold hover:bg-[#0052cc] transition-all shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Looking up order...
                    </>
                  ) : (
                    'Track Order'
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* ============ Results View ============ */
            <div className="space-y-4">
              {/* Order header card */}
              <div className="rounded-xl border border-gray-100 bg-white p-5 md:p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">
                      Order Number
                    </p>
                    <h2 className="text-lg font-bold text-[#0a0a0a] tracking-tight">
                      {order.orderNumber}
                    </h2>
                    <p className="text-sm text-gray-600 mt-0.5">
                      {order.customerName}
                    </p>
                  </div>
                  <div className="flex flex-col items-start sm:items-end gap-2">
                    <StatusBadge status={order.status} />
                    <p className="text-xs text-gray-500">
                      Placed {formatDate(order.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Delivery countdown */}
              {order.status === 'In Transit' && order.estimatedDelivery && (
                <DeliveryCountdown
                  estimatedDelivery={order.estimatedDelivery}
                />
              )}

              {/* Timeline */}
              <OrderTimeline
                currentStatus={order.status}
                statusHistory={order.statusHistory}
              />

              {/* Order items */}
              <div className="rounded-xl border border-gray-100 bg-white p-5 md:p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <ShoppingBag className="w-4 h-4 text-gray-500" />
                  <h3 className="text-sm font-bold text-[#0a0a0a]">
                    Order Items
                  </h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                    >
                      <div>
                        <p className="text-sm font-medium text-[#0a0a0a]">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-[#0a0a0a] whitespace-nowrap ml-4">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between">
                  <p className="text-sm font-bold text-[#0a0a0a]">Total</p>
                  <p className="text-base font-bold text-[#0a0a0a]">
                    {formatCurrency(order.totalAmount)}
                  </p>
                </div>
              </div>

              {/* Notes */}
              {order.notes.length > 0 && (
                <div className="rounded-xl border border-gray-100 bg-white p-5 md:p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <StickyNote className="w-4 h-4 text-gray-500" />
                    <h3 className="text-sm font-bold text-[#0a0a0a]">Notes</h3>
                  </div>
                  <div className="space-y-2.5">
                    {order.notes.map((note) => (
                      <div
                        key={note.id}
                        className="bg-[#f8f8f6] rounded-lg p-3.5"
                      >
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {note.note}
                        </p>
                        <p className="text-xs text-gray-500 mt-1.5">
                          {formatDate(note.createdAt)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleReset}
                  className="flex-1 px-6 py-2.5 bg-[#0066ff] text-white text-sm rounded-xl font-semibold hover:bg-[#0052cc] transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Track Another Order
                </button>
                <a
                  href="https://wa.me/254788740000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-6 py-2.5 border border-gray-200 text-[#0a0a0a] text-sm rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-green-600" />
                  Contact via WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
