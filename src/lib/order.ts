import { queryOne } from './db';

export async function generateOrderNumber(): Promise<string> {
  const row = await queryOne<{ maxId: number | null }>('SELECT MAX(id) as maxId FROM orders');
  const nextId = (row?.maxId ?? 0) + 1;
  return `ORD-${String(nextId).padStart(4, '0')}`;
}
