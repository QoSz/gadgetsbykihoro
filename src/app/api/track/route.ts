import { NextRequest, NextResponse } from 'next/server';
import { queryOne, query } from '@/lib/db';
import type { OrderNote, OrderStatusHistory } from '@/types/order';

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

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const orderNumber = searchParams.get('orderNumber');
  const contact = searchParams.get('contact');

  if (!orderNumber || !contact) {
    return NextResponse.json({ error: 'Order number and contact required' }, { status: 400 });
  }

  const order = await queryOne<OrderRow>(
    'SELECT * FROM orders WHERE orderNumber = ? AND (customerPhone = ? OR customerEmail = ?)',
    [orderNumber.toUpperCase(), contact, contact]
  );

  if (!order) {
    return NextResponse.json({ error: 'Order not found. Check your order number and contact info.' }, { status: 404 });
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
