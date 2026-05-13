'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Plus,
  Search,
  Package,
  X,
  ChevronDown,
  ChevronUp,
  Send,
  Clock,
  Filter,
  CheckCircle,
  Shield,
  Truck,
  CircleCheckBig,
  CalendarDays,
} from 'lucide-react';
import type {
  Order,
  OrderWithDetails,
  OrderStatus,
  OrderItem,
  CreateOrderInput,
  OrderStatusHistory,
} from '@/types/order';
import { ORDER_STATUSES } from '@/types/order';
import { allProducts } from '@/data/products';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const STATUS_BADGE: Record<OrderStatus, string> = {
  'Order Confirmed': 'bg-blue-100 text-blue-700',
  'Payment Verified': 'bg-emerald-100 text-emerald-700',
  'Shipment Processing': 'bg-amber-100 text-amber-700',
  'In Transit': 'bg-purple-100 text-purple-700',
  Delivered: 'bg-green-100 text-green-700',
};

const STEP_ICON: Record<OrderStatus, typeof CheckCircle> = {
  'Order Confirmed': CheckCircle,
  'Payment Verified': Shield,
  'Shipment Processing': Package,
  'In Transit': Truck,
  Delivered: CircleCheckBig,
};

function formatKSh(amount: number): string {
  return `KSh ${amount.toLocaleString()}`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-KE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('en-KE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function todayISO(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const INPUT_CLS =
  'w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0066ff]/20 focus:border-[#0066ff] outline-none transition-all text-gray-900 placeholder:text-gray-400';
const LABEL_CLS = 'block text-xs font-semibold text-[#424242] mb-1.5';
const BTN_PRIMARY =
  'bg-[#0066ff] hover:bg-[#0052cc] text-white rounded-lg font-semibold text-sm transition-colors';

// ---------------------------------------------------------------------------
// Blank item row helper
// ---------------------------------------------------------------------------

function blankItem(): OrderItem {
  return { name: '', quantity: 1, price: 0 };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function AdminOrdersPage() {
  // ---- data state ---
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // ---- filter state ---
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // ---- expanded row ---
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [detail, setDetail] = useState<OrderWithDetails | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // ---- add-order modal ---
  const [showModal, setShowModal] = useState(false);

  // ---- debounce ref ---
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // -----------------------------------------------------------------------
  // Fetch orders list
  // -----------------------------------------------------------------------

  const fetchOrders = useCallback(async (s: string, status: string) => {
    setLoading(true);
    const params = new URLSearchParams();
    if (status) params.set('status', status);
    if (s) params.set('search', s);
    try {
      const res = await fetch(`/api/admin/orders?${params.toString()}`);
      if (res.ok) {
        const data: Order[] = await res.json();
        setOrders(data);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // debounced search (also handles initial load on mount)
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchOrders(search, statusFilter);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search, statusFilter, fetchOrders]);

  // -----------------------------------------------------------------------
  // Fetch single order details
  // -----------------------------------------------------------------------

  const fetchDetail = useCallback(async (id: number) => {
    setDetailLoading(true);
    try {
      const res = await fetch(`/api/admin/orders/${id}`);
      if (res.ok) {
        const data: OrderWithDetails = await res.json();
        setDetail(data);
      }
    } finally {
      setDetailLoading(false);
    }
  }, []);

  function toggleExpand(id: number) {
    if (expandedId === id) {
      setExpandedId(null);
      setDetail(null);
    } else {
      setExpandedId(id);
      fetchDetail(id);
    }
  }

  // -----------------------------------------------------------------------
  // Status update
  // -----------------------------------------------------------------------

  const [statusUpdate, setStatusUpdate] = useState<OrderStatus | ''>('');
  const [statusUpdating, setStatusUpdating] = useState(false);

  async function handleStatusUpdate(orderId: number) {
    if (!statusUpdate) return;
    setStatusUpdating(true);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: statusUpdate }),
      });
      if (res.ok) {
        setStatusUpdate('');
        fetchDetail(orderId);
        fetchOrders(search, statusFilter);
      }
    } finally {
      setStatusUpdating(false);
    }
  }

  // -----------------------------------------------------------------------
  // Estimated delivery update
  // -----------------------------------------------------------------------

  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryUpdating, setDeliveryUpdating] = useState(false);

  async function handleDeliveryUpdate(orderId: number) {
    if (!deliveryDate) return;
    setDeliveryUpdating(true);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estimatedDelivery: deliveryDate }),
      });
      if (res.ok) {
        setDeliveryDate('');
        fetchDetail(orderId);
        fetchOrders(search, statusFilter);
      }
    } finally {
      setDeliveryUpdating(false);
    }
  }

  // -----------------------------------------------------------------------
  // Add note
  // -----------------------------------------------------------------------

  const [newNote, setNewNote] = useState('');
  const [noteAdding, setNoteAdding] = useState(false);

  async function handleAddNote(orderId: number) {
    if (!newNote.trim()) return;
    setNoteAdding(true);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note: newNote.trim() }),
      });
      if (res.ok) {
        setNewNote('');
        fetchDetail(orderId);
      }
    } finally {
      setNoteAdding(false);
    }
  }

  // -----------------------------------------------------------------------
  // After modal closes / order created, refresh
  // -----------------------------------------------------------------------

  function onOrderCreated() {
    setShowModal(false);
    fetchOrders(search, statusFilter);
  }

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------

  return (
    <div className="min-h-screen bg-gray-50/60">
      {/* ---- Page Header ---- */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#0a0a0a]">Order Management</h1>
            <p className="text-sm text-[#6b6b6b] mt-1">
              View, update and manage customer orders
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className={`${BTN_PRIMARY} px-4 py-2.5 flex items-center gap-2`}
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Add New Order</span>
          </button>
        </div>
      </div>

      {/* ---- Search / Filter Bar ---- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* search */}
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search order #, name, phone, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`${INPUT_CLS} pl-9`}
            />
          </div>
          {/* status filter */}
          <div className="relative sm:w-56">
            <Filter
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`${INPUT_CLS} pl-9 appearance-none cursor-pointer`}
            >
              <option value="">All Statuses</option>
              {ORDER_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* ---- Orders Table (desktop) / Cards (mobile) ---- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {loading ? (
          <div className="text-center py-20 text-[#6b6b6b] text-sm">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <Package size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-[#6b6b6b] text-sm">No orders found</p>
          </div>
        ) : (
          <>
            {/* --- Desktop Table --- */}
            <div className="hidden md:block bg-white rounded-xl border border-gray-100 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50/80 text-left text-xs font-semibold text-[#6b6b6b] uppercase tracking-wider">
                    <th className="px-5 py-3">Order #</th>
                    <th className="px-5 py-3">Customer</th>
                    <th className="px-5 py-3">Phone</th>
                    <th className="px-5 py-3">Items</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Date</th>
                    <th className="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((order) => (
                    <OrderTableRow
                      key={order.id}
                      order={order}
                      isExpanded={expandedId === order.id}
                      onToggle={() => toggleExpand(order.id)}
                      detail={expandedId === order.id ? detail : null}
                      detailLoading={expandedId === order.id && detailLoading}
                      statusUpdate={statusUpdate}
                      setStatusUpdate={setStatusUpdate}
                      statusUpdating={statusUpdating}
                      onStatusUpdate={() => handleStatusUpdate(order.id)}
                      deliveryDate={deliveryDate}
                      setDeliveryDate={setDeliveryDate}
                      deliveryUpdating={deliveryUpdating}
                      onDeliveryUpdate={() => handleDeliveryUpdate(order.id)}
                      newNote={newNote}
                      setNewNote={setNewNote}
                      noteAdding={noteAdding}
                      onAddNote={() => handleAddNote(order.id)}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {/* --- Mobile Cards --- */}
            <div className="md:hidden space-y-3">
              {orders.map((order) => (
                <MobileOrderCard
                  key={order.id}
                  order={order}
                  isExpanded={expandedId === order.id}
                  onToggle={() => toggleExpand(order.id)}
                  detail={expandedId === order.id ? detail : null}
                  detailLoading={expandedId === order.id && detailLoading}
                  statusUpdate={statusUpdate}
                  setStatusUpdate={setStatusUpdate}
                  statusUpdating={statusUpdating}
                  onStatusUpdate={() => handleStatusUpdate(order.id)}
                  deliveryDate={deliveryDate}
                  setDeliveryDate={setDeliveryDate}
                  deliveryUpdating={deliveryUpdating}
                  onDeliveryUpdate={() => handleDeliveryUpdate(order.id)}
                  newNote={newNote}
                  setNewNote={setNewNote}
                  noteAdding={noteAdding}
                  onAddNote={() => handleAddNote(order.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ---- Add Order Modal ---- */}
      {showModal && (
        <AddOrderModal onClose={() => setShowModal(false)} onCreated={onOrderCreated} />
      )}
    </div>
  );
}

// ===========================================================================
// Sub-components
// ===========================================================================

// ---- Shared detail props ----

interface OrderDetailProps {
  detail: OrderWithDetails | null;
  detailLoading: boolean;
  statusUpdate: OrderStatus | '';
  setStatusUpdate: (s: OrderStatus | '') => void;
  statusUpdating: boolean;
  onStatusUpdate: () => void;
  deliveryDate: string;
  setDeliveryDate: (d: string) => void;
  deliveryUpdating: boolean;
  onDeliveryUpdate: () => void;
  newNote: string;
  setNewNote: (s: string) => void;
  noteAdding: boolean;
  onAddNote: () => void;
}

// ---- Desktop Table Row ----

interface OrderTableRowProps extends OrderDetailProps {
  order: Order;
  isExpanded: boolean;
  onToggle: () => void;
}

function OrderTableRow({
  order,
  isExpanded,
  onToggle,
  ...detailProps
}: OrderTableRowProps) {
  return (
    <>
      <tr
        onClick={onToggle}
        className="hover:bg-gray-50/60 cursor-pointer transition-colors"
      >
        <td className="px-5 py-3.5 font-medium text-[#0a0a0a]">{order.orderNumber}</td>
        <td className="px-5 py-3.5 text-[#404040]">{order.customerName}</td>
        <td className="px-5 py-3.5 text-[#6b6b6b]">{order.customerPhone}</td>
        <td className="px-5 py-3.5 text-[#6b6b6b]">
          {order.items.length} item{order.items.length !== 1 && 's'}
        </td>
        <td className="px-5 py-3.5">
          <StatusBadge status={order.status} />
        </td>
        <td className="px-5 py-3.5 text-[#6b6b6b]">{formatDate(order.createdAt)}</td>
        <td className="px-5 py-3.5 text-right">
          {isExpanded ? <ChevronUp size={16} className="inline text-[#6b6b6b]" /> : <ChevronDown size={16} className="inline text-[#6b6b6b]" />}
        </td>
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan={7} className="bg-gray-50/40 px-5 py-5">
            <ExpandedDetail {...detailProps} />
          </td>
        </tr>
      )}
    </>
  );
}

// ---- Mobile Card ----

interface MobileCardProps extends OrderDetailProps {
  order: Order;
  isExpanded: boolean;
  onToggle: () => void;
}

function MobileOrderCard({
  order,
  isExpanded,
  onToggle,
  ...detailProps
}: MobileCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-4 py-3.5 flex items-center justify-between text-left"
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-semibold text-[#0a0a0a]">{order.orderNumber}</span>
            <StatusBadge status={order.status} />
          </div>
          <p className="text-sm text-[#404040] truncate">{order.customerName}</p>
          <p className="text-xs text-[#6b6b6b] mt-0.5">{formatDate(order.createdAt)}</p>
        </div>
        {isExpanded ? (
          <ChevronUp size={16} className="text-[#6b6b6b] shrink-0 ml-3" />
        ) : (
          <ChevronDown size={16} className="text-[#6b6b6b] shrink-0 ml-3" />
        )}
      </button>
      {isExpanded && (
        <div className="border-t border-gray-100 px-4 py-4">
          <ExpandedDetail {...detailProps} />
        </div>
      )}
    </div>
  );
}

// ---- Status Badge ----

function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${STATUS_BADGE[status]}`}
    >
      {status}
    </span>
  );
}

// ---- Expanded Detail ----

function ExpandedDetail({
  detail,
  detailLoading,
  statusUpdate,
  setStatusUpdate,
  statusUpdating,
  onStatusUpdate,
  deliveryDate,
  setDeliveryDate,
  deliveryUpdating,
  onDeliveryUpdate,
  newNote,
  setNewNote,
  noteAdding,
  onAddNote,
}: OrderDetailProps) {
  if (detailLoading || !detail) {
    return <p className="text-sm text-[#6b6b6b] py-4">Loading details...</p>;
  }

  return (
    <div className="space-y-6">
      {/* ---- Order info ---- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-xs text-[#6b6b6b] mb-0.5">Customer</p>
          <p className="font-medium text-[#0a0a0a]">{detail.customerName}</p>
        </div>
        <div>
          <p className="text-xs text-[#6b6b6b] mb-0.5">Phone</p>
          <p className="text-[#404040]">{detail.customerPhone}</p>
        </div>
        <div>
          <p className="text-xs text-[#6b6b6b] mb-0.5">Email</p>
          <p className="text-[#404040]">{detail.customerEmail}</p>
        </div>
      </div>

      {/* ---- Items ---- */}
      <div>
        <p className="text-xs font-semibold text-[#424242] mb-2">Items</p>
        <div className="bg-white rounded-lg border border-gray-100 divide-y divide-gray-100">
          {detail.items.map((item, i) => (
            <div key={i} className="flex items-center justify-between px-3 py-2 text-sm">
              <span className="text-[#404040]">
                {item.name} <span className="text-[#6b6b6b]">x{item.quantity}</span>
              </span>
              <span className="font-medium text-[#0a0a0a]">{formatKSh(item.price)}</span>
            </div>
          ))}
          <div className="flex items-center justify-between px-3 py-2 text-sm font-semibold bg-gray-50/60">
            <span className="text-[#424242]">Total</span>
            <span className="text-[#0a0a0a]">{formatKSh(detail.totalAmount)}</span>
          </div>
        </div>
      </div>

      {/* ---- Status Timeline ---- */}
      <div>
        <p className="text-xs font-semibold text-[#424242] mb-3">Status Timeline</p>
        <StatusTimeline
          currentStatus={detail.status}
          statusHistory={detail.statusHistory}
        />
      </div>

      {/* ---- Status Update ---- */}
      <div>
        <p className="text-xs font-semibold text-[#424242] mb-2">Update Status</p>
        <div className="flex items-center gap-2">
          <select
            value={statusUpdate}
            onChange={(e) => setStatusUpdate(e.target.value as OrderStatus | '')}
            className={`${INPUT_CLS} max-w-xs`}
          >
            <option value="">Select new status...</option>
            {ORDER_STATUSES.filter((s) => s !== detail.status).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button
            onClick={onStatusUpdate}
            disabled={!statusUpdate || statusUpdating}
            className={`${BTN_PRIMARY} px-4 py-2 disabled:opacity-50`}
          >
            {statusUpdating ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>

      {/* ---- Estimated Delivery ---- */}
      <div>
        <p className="text-xs font-semibold text-[#424242] mb-2">Estimated Delivery</p>
        {detail.estimatedDelivery && (
          <div className="flex items-center gap-2 mb-2 text-sm text-[#404040]">
            <CalendarDays size={14} className="text-[#0066ff] shrink-0" />
            <span>
              Current: <span className="font-medium text-[#0a0a0a]">{formatDate(detail.estimatedDelivery)}</span>
            </span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            min={todayISO()}
            className={`${INPUT_CLS} max-w-xs`}
          />
          <button
            onClick={onDeliveryUpdate}
            disabled={!deliveryDate || deliveryUpdating}
            className={`${BTN_PRIMARY} px-4 py-2 disabled:opacity-50`}
          >
            {deliveryUpdating ? 'Setting...' : 'Set Date'}
          </button>
        </div>
      </div>

      {/* ---- Notes ---- */}
      <div>
        <p className="text-xs font-semibold text-[#424242] mb-2">Notes</p>
        {detail.notes.length > 0 ? (
          <div className="space-y-2 mb-3">
            {detail.notes.map((note) => (
              <div
                key={note.id}
                className="bg-white rounded-lg border border-gray-100 px-3 py-2"
              >
                <p className="text-sm text-[#404040]">{note.note}</p>
                <p className="text-xs text-[#6b6b6b] mt-1 flex items-center gap-1">
                  <Clock size={12} />
                  {formatDateTime(note.createdAt)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-[#6b6b6b] mb-3">No notes yet.</p>
        )}
        <div className="flex items-start gap-2">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a note..."
            rows={2}
            className={`${INPUT_CLS} resize-none`}
          />
          <button
            onClick={onAddNote}
            disabled={!newNote.trim() || noteAdding}
            className={`${BTN_PRIMARY} p-2.5 disabled:opacity-50 shrink-0`}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ---- Status Timeline (vertical, 5 nodes) ----

function StatusTimeline({
  currentStatus,
  statusHistory,
}: {
  currentStatus: OrderStatus;
  statusHistory: OrderStatusHistory[];
}) {
  const currentIdx = ORDER_STATUSES.indexOf(currentStatus);

  return (
    <div className="flex flex-col gap-0">
      {ORDER_STATUSES.map((status, i) => {
        const reached = i <= currentIdx;
        const historyEntry = statusHistory.find((h) => h.status === status);
        const isLast = i === ORDER_STATUSES.length - 1;
        const Icon = STEP_ICON[status];

        return (
          <div key={status} className="flex items-start gap-3">
            {/* line + dot */}
            <div className="flex flex-col items-center">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  reached
                    ? 'bg-[#0066ff] text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {reached ? <Icon size={14} /> : <Clock size={14} />}
              </div>
              {!isLast && (
                <div
                  className={`w-0.5 h-8 ${
                    i < currentIdx ? 'bg-[#0066ff]' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
            {/* label */}
            <div className="pt-1">
              <p
                className={`text-sm font-medium ${
                  reached ? 'text-[#0a0a0a]' : 'text-gray-400'
                }`}
              >
                {status}
              </p>
              {historyEntry && (
                <p className="text-xs text-[#6b6b6b]">
                  {formatDateTime(historyEntry.changedAt)}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ===========================================================================
// Add Order Modal
// ===========================================================================

function AddOrderModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: () => void;
}) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [items, setItems] = useState<OrderItem[]>([blankItem()]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  function addItemRow() {
    setItems((prev) => [...prev, blankItem()]);
  }

  function removeItemRow(idx: number) {
    setItems((prev) => prev.filter((_, i) => i !== idx));
  }

  function updateItem(idx: number, field: keyof OrderItem, value: string | number) {
    setItems((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, [field]: value } : item))
    );
  }

  function selectItemProduct(idx: number, name: string, price: number) {
    setItems((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, name, price } : item))
    );
  }

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    const validItems = items.filter((item) => item.name.trim());
    if (!customerName.trim() || !customerPhone.trim() || !customerEmail.trim()) {
      setError('Please fill in all customer fields.');
      return;
    }
    if (validItems.length === 0) {
      setError('Add at least one item.');
      return;
    }

    setSubmitting(true);
    try {
      const body: CreateOrderInput = {
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim(),
        items: validItems,
        totalAmount,
      };
      const res = await fetch('/api/admin/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? 'Failed to create order');
        return;
      }
      onCreated();
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto overflow-x-visible">
        {/* header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-[#0a0a0a]">Add New Order</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-[#6b6b6b]"
          >
            <X size={18} />
          </button>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit} className="px-5 py-4 space-y-4">
          {error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
          )}

          {/* customer fields */}
          <div>
            <label className={LABEL_CLS}>Customer Name *</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="John Doe"
              className={INPUT_CLS}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={LABEL_CLS}>Phone *</label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="+254 7XX XXX XXX"
                className={INPUT_CLS}
              />
            </div>
            <div>
              <label className={LABEL_CLS}>Email *</label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="john@example.com"
                className={INPUT_CLS}
              />
            </div>
          </div>

          {/* items */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={LABEL_CLS}>Items</label>
              <button
                type="button"
                onClick={addItemRow}
                className="text-xs font-semibold text-[#0066ff] hover:text-[#0052cc] transition-colors flex items-center gap-1"
              >
                <Plus size={14} /> Add Item
              </button>
            </div>
            <div className="space-y-2">
              {items.map((item, idx) => (
                <ProductItemRow
                  key={idx}
                  item={item}
                  onSelect={(name, price) => selectItemProduct(idx, name, price)}
                  onNameChange={(name) => updateItem(idx, 'name', name)}
                  onQuantityChange={(qty) => updateItem(idx, 'quantity', qty)}
                  onRemove={() => removeItemRow(idx)}
                  canRemove={items.length > 1}
                />
              ))}
            </div>
          </div>

          {/* total */}
          <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100">
            <span className="font-semibold text-[#424242]">Total Amount</span>
            <span className="font-bold text-[#0a0a0a] text-base">{formatKSh(totalAmount)}</span>
          </div>

          {/* submit */}
          <button
            type="submit"
            disabled={submitting}
            className={`${BTN_PRIMARY} w-full py-2.5 disabled:opacity-50`}
          >
            {submitting ? 'Creating...' : 'Create Order'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ---- Product Item Row (searchable product selector) ----

function ProductItemRow({
  item,
  onSelect,
  onNameChange,
  onQuantityChange,
  onRemove,
  canRemove,
}: {
  item: OrderItem;
  onSelect: (name: string, price: number) => void;
  onNameChange: (name: string) => void;
  onQuantityChange: (qty: number) => void;
  onRemove: () => void;
  canRemove: boolean;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filtered = item.name
    ? allProducts
        .filter(
          (p) =>
            p.name.toLowerCase().includes(item.name.toLowerCase()) ||
            p.brand.toLowerCase().includes(item.name.toLowerCase())
        )
        .slice(0, 8)
    : allProducts.slice(0, 8);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="rounded-lg border border-gray-100 bg-gray-50/80 p-3">
      {/* Search row */}
      <div className="flex items-start gap-2">
        <div className="relative flex-1" ref={wrapperRef}>
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            type="text"
            value={item.name}
            onChange={(e) => {
              onNameChange(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder="Search products..."
            className={`${INPUT_CLS} pl-8`}
          />
          {open && filtered.length > 0 && (
            <div className="absolute z-20 top-full mt-1 left-0 right-0 bg-white rounded-lg border border-gray-200 shadow-lg max-h-48 overflow-y-auto">
              {filtered.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    onSelect(p.name, p.price);
                    setOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-blue-50 text-sm border-b border-gray-50 last:border-0"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[#404040] truncate">{p.name}</p>
                      <p className="text-xs text-[#6b6b6b]">{p.brand} · {p.category}</p>
                    </div>
                    <span className="text-xs font-semibold text-[#0a0a0a] shrink-0">
                      {formatKSh(p.price)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors shrink-0"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Qty + Price row — visible after product selection */}
      {item.price > 0 && (
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200/60">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#6b6b6b]">Qty</span>
            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) => onQuantityChange(Math.max(1, parseInt(e.target.value) || 1))}
              className={`${INPUT_CLS} w-16 text-center`}
            />
          </div>
          <span className="text-sm font-semibold text-[#0a0a0a]">
            {formatKSh(item.price * item.quantity)}
          </span>
        </div>
      )}
    </div>
  );
}
