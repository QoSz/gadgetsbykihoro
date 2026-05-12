import { NextRequest, NextResponse } from 'next/server';
import { queryOne, execute } from '@/lib/db';
import type { OrderNote } from '@/types/order';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = (await request.json()) as { note: string };

  if (!body.note?.trim()) {
    return NextResponse.json({ error: 'Note is required' }, { status: 400 });
  }

  const order = await queryOne<{ id: number }>('SELECT id FROM orders WHERE id = ?', [id]);
  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  const result = await execute(
    'INSERT INTO order_notes (orderId, note) VALUES (?, ?)',
    [Number(id), body.note.trim()]
  );

  const note = await queryOne<OrderNote>(
    'SELECT * FROM order_notes WHERE id = ?',
    [Number(result.lastInsertRowid)]
  );

  return NextResponse.json(note, { status: 201 });
}
