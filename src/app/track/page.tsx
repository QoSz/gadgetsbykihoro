'use client';

import { useState } from 'react';
import { Package, Check, Clock, Loader2 } from 'lucide-react';

type OrderStatus = 'Received' | 'Processing' | 'Ready for Pickup' | 'Completed';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderNote {
  id: string;
  note: string;
  createdAt: string;
}

interface StatusHistoryEntry {
  id: string;
  status: OrderStatus;
  changedAt: string;
}

interface OrderData {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  notes: OrderNote[];
  statusHistory: StatusHistoryEntry[];
}

const ALL_STATUSES: OrderStatus[] = ['Received', 'Processing', 'Ready for Pickup', 'Completed'];

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

function getStatusIndex(status: OrderStatus): number {
  return ALL_STATUSES.indexOf(status);
}

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
        const data = await res.json();
        throw new Error(data.error || 'Order not found. Please check your details and try again.');
      }
      const data: OrderData = await res.json();
      setOrder(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
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

  const currentStatusIndex = order ? getStatusIndex(order.status) : -1;

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
            Enter your order number and contact details to check the status of your order.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-10">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          {!order ? (
            /* Form View */
            <div className="rounded-xl border border-gray-200 p-5 md:p-6">
              <h2 className="text-lg font-bold text-[#0a0a0a] mb-1">Find Your Order</h2>
              <p className="text-xs text-[#6b6b6b] mb-5">
                Enter the details you used when placing your order.
              </p>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm font-medium flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label htmlFor="orderNumber" className="block text-xs font-semibold text-[#424242] mb-1.5">
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
                  <label htmlFor="contact" className="block text-xs font-semibold text-[#424242] mb-1.5">
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
                  className="w-full px-6 py-2.5 bg-[#0066ff] text-white text-sm rounded-lg font-semibold hover:bg-[#0052cc] transition-all shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
            /* Results View */
            <div className="space-y-5">
              {/* Order Info Header */}
              <div className="rounded-xl border border-gray-200 p-5 md:p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-bold text-[#0a0a0a]">{order.orderNumber}</h2>
                    <p className="text-sm text-[#404040]">{order.customerName}</p>
                  </div>
                  <span className="text-xs text-[#6b6b6b]">
                    {formatDate(order.createdAt)}
                  </span>
                </div>

                {/* Status Timeline */}
                <div className="mt-6">
                  <h3 className="text-sm font-bold text-[#0a0a0a] mb-4">Order Status</h3>
                  <div className="space-y-0">
                    {ALL_STATUSES.map((status, index) => {
                      const stepIndex = getStatusIndex(status);
                      const isCompleted = stepIndex < currentStatusIndex;
                      const isCurrent = stepIndex === currentStatusIndex;
                      const isLast = index === ALL_STATUSES.length - 1;

                      const historyEntry = order.statusHistory.find((h) => h.status === status);

                      return (
                        <div key={status} className="flex gap-3">
                          {/* Node + Connecting Line */}
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                isCompleted
                                  ? 'bg-[#0066ff]'
                                  : isCurrent
                                    ? 'bg-[#0066ff] ring-4 ring-[#0066ff]/20 animate-pulse'
                                    : 'bg-gray-200'
                              }`}
                            >
                              {isCompleted ? (
                                <Check className="w-4 h-4 text-white" />
                              ) : isCurrent ? (
                                <Clock className="w-4 h-4 text-white" />
                              ) : (
                                <div className="w-2 h-2 rounded-full bg-gray-400" />
                              )}
                            </div>
                            {!isLast && (
                              <div
                                className={`w-0.5 h-8 ${
                                  isCompleted ? 'bg-[#0066ff]' : 'bg-gray-200'
                                }`}
                              />
                            )}
                          </div>

                          {/* Label + Timestamp */}
                          <div className="pt-1 pb-4">
                            <p
                              className={`text-sm font-semibold ${
                                isCompleted || isCurrent ? 'text-[#0a0a0a]' : 'text-gray-400'
                              }`}
                            >
                              {status}
                            </p>
                            {historyEntry && (
                              <p className="text-xs text-[#6b6b6b] mt-0.5">
                                {formatDate(historyEntry.changedAt)}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="rounded-xl border border-gray-200 p-5 md:p-6">
                <h3 className="text-sm font-bold text-[#0a0a0a] mb-3">Order Items</h3>
                <div className="divide-y divide-gray-100">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0">
                      <div>
                        <p className="text-sm text-[#404040]">{item.name}</p>
                        <p className="text-xs text-[#6b6b6b]">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold text-[#0a0a0a]">
                        {formatCurrency(item.price)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between">
                  <p className="text-sm font-bold text-[#0a0a0a]">Total</p>
                  <p className="text-sm font-bold text-[#0a0a0a]">
                    {formatCurrency(order.totalAmount)}
                  </p>
                </div>
              </div>

              {/* Admin Notes */}
              {order.notes.length > 0 && (
                <div className="rounded-xl border border-gray-200 p-5 md:p-6">
                  <h3 className="text-sm font-bold text-[#0a0a0a] mb-3">Notes</h3>
                  <div className="space-y-2.5">
                    {order.notes.map((note) => (
                      <div key={note.id} className="bg-[#fafafa] rounded-lg p-4">
                        <p className="text-sm text-[#404040]">{note.note}</p>
                        <p className="text-xs text-[#6b6b6b] mt-1.5">
                          {formatDate(note.createdAt)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Track Another */}
              <button
                onClick={handleReset}
                className="w-full px-6 py-2.5 bg-[#0066ff] text-white text-sm rounded-lg font-semibold hover:bg-[#0052cc] transition-all shadow-sm hover:shadow-md"
              >
                Track Another Order
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
