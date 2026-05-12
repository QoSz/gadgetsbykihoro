import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne, execute } from '@/lib/db';
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
  createdAt: string;
  updatedAt: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const status = searchParams.get('status');
  const search = searchParams.get('search');

  let queryStr = 'SELECT * FROM orders';
  const conditions: string[] = [];
  const params: (string | number | null)[] = [];

  if (status) {
    conditions.push('status = ?');
    params.push(status);
  }

  if (search) {
    conditions.push('(orderNumber LIKE ? OR customerName LIKE ? OR customerPhone LIKE ? OR customerEmail LIKE ?)');
    const pattern = `%${search}%`;
    params.push(pattern, pattern, pattern, pattern);
  }

  if (conditions.length > 0) {
    queryStr += ' WHERE ' + conditions.join(' AND ');
  }

  queryStr += ' ORDER BY createdAt DESC';

  const orders = await query<OrderRow>(queryStr, params);

  return NextResponse.json(
    orders.map((o) => ({ ...o, items: JSON.parse(o.items) }))
  );
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as CreateOrderInput;

  if (!body.customerName || !body.customerPhone || !body.customerEmail || !body.items || body.totalAmount == null) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const orderNumber = await generateOrderNumber();

  const insertResult = await execute(
    `INSERT INTO orders (orderNumber, customerName, customerPhone, customerEmail, items, status, totalAmount)
     VALUES (?, ?, ?, ?, ?, 'Received', ?)`,
    [orderNumber, body.customerName, body.customerPhone, body.customerEmail, JSON.stringify(body.items), body.totalAmount]
  );

  const orderId = insertResult.lastInsertRowid;

  await execute(
    'INSERT INTO order_status_history (orderId, status) VALUES (?, ?)',
    [Number(orderId), 'Received']
  );

  const order = await queryOne<OrderRow>('SELECT * FROM orders WHERE id = ?', [Number(orderId)]);

  return NextResponse.json({ ...order!, items: JSON.parse(order!.items) }, { status: 201 });
}
