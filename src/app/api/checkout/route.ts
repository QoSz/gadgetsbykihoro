import { NextRequest, NextResponse } from 'next/server';
import { queryOne, execute } from '@/lib/db';
import { generateOrderNumber } from '@/lib/order';
import type { CreateOrderInput } from '@/types/order';

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

export async function POST(request: NextRequest) {
  let body: CreateOrderInput;

  try {
    body = (await request.json()) as CreateOrderInput;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (
    !body.customerName?.trim() ||
    !body.customerPhone?.trim() ||
    !body.customerEmail?.trim() ||
    !Array.isArray(body.items) ||
    body.items.length === 0 ||
    body.totalAmount == null
  ) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(body.customerEmail)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  const phonePattern = /^\+?[0-9]{10,15}$/;
  if (!phonePattern.test(body.customerPhone.replace(/\s/g, ''))) {
    return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 });
  }

  try {
    const orderNumber = await generateOrderNumber();

    const insertResult = await execute(
      `INSERT INTO orders (orderNumber, customerName, customerPhone, customerEmail, items, status, totalAmount)
       VALUES (?, ?, ?, ?, ?, 'Order Confirmed', ?)`,
      [
        orderNumber,
        body.customerName.trim(),
        body.customerPhone.trim(),
        body.customerEmail.trim(),
        JSON.stringify(body.items),
        body.totalAmount,
      ]
    );

    const orderId = insertResult.lastInsertRowid;

    await execute(
      'INSERT INTO order_status_history (orderId, status) VALUES (?, ?)',
      [Number(orderId), 'Order Confirmed']
    );

    const order = await queryOne<OrderRow>('SELECT * FROM orders WHERE id = ?', [Number(orderId)]);

    return NextResponse.json(
      { ...order!, items: JSON.parse(order!.items) },
      { status: 201 }
    );
  } catch (err) {
    console.error('Checkout error:', err);
    return NextResponse.json(
      { error: 'Failed to create order. Please try again.' },
      { status: 500 }
    );
  }
}
