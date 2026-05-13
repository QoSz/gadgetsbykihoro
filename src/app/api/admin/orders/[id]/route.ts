import { NextRequest, NextResponse } from 'next/server';
import { queryOne, query, batch } from '@/lib/db';
import { ORDER_STATUSES } from '@/types/order';
import type { UpdateOrderInput, OrderNote, OrderStatusHistory } from '@/types/order';

interface OrderRow {
  id: number;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  items: string;
  status: string;
  totalAmount: number;
  estimatedDelivery: string | null;
  createdAt: string;
  updatedAt: string;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const order = await queryOne<OrderRow>('SELECT * FROM orders WHERE id = ?', [id]);
  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  const notes = await query<OrderNote>(
    'SELECT * FROM order_notes WHERE orderId = ? ORDER BY createdAt DESC',
    [order.id]
  );

  const statusHistory = await query<OrderStatusHistory>(
    'SELECT * FROM order_status_history WHERE orderId = ? ORDER BY changedAt ASC',
    [order.id]
  );

  return NextResponse.json({
    ...order,
    items: JSON.parse(order.items),
    notes,
    statusHistory,
  });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = (await request.json()) as UpdateOrderInput;

  const existing = await queryOne<OrderRow>('SELECT * FROM orders WHERE id = ?', [id]);
  if (!existing) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  if (body.status && !(ORDER_STATUSES as readonly string[]).includes(body.status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  const setClauses: string[] = [];
  const values: (string | number | null)[] = [];

  if (body.customerName) { setClauses.push('customerName = ?'); values.push(body.customerName); }
  if (body.customerPhone) { setClauses.push('customerPhone = ?'); values.push(body.customerPhone); }
  if (body.customerEmail) { setClauses.push('customerEmail = ?'); values.push(body.customerEmail); }
  if (body.items) { setClauses.push('items = ?'); values.push(JSON.stringify(body.items)); }
  if (body.status) { setClauses.push('status = ?'); values.push(body.status); }
  if (body.totalAmount != null) { setClauses.push('totalAmount = ?'); values.push(body.totalAmount); }
  if (body.estimatedDelivery !== undefined) {
    setClauses.push('estimatedDelivery = ?');
    values.push(body.estimatedDelivery ?? null);
  }

  if (setClauses.length === 0) {
    return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
  }

  setClauses.push("updatedAt = datetime('now')");
  values.push(Number(id));

  const stmts: { sql: string; args: (string | number | null)[] }[] = [
    { sql: `UPDATE orders SET ${setClauses.join(', ')} WHERE id = ?`, args: values },
  ];

  if (body.status && body.status !== existing.status) {
    stmts.push({
      sql: 'INSERT INTO order_status_history (orderId, status) VALUES (?, ?)',
      args: [Number(id), body.status],
    });
  }

  await batch(stmts);

  const updated = await queryOne<OrderRow>('SELECT * FROM orders WHERE id = ?', [id]);
  return NextResponse.json({ ...updated!, items: JSON.parse(updated!.items) });
}
