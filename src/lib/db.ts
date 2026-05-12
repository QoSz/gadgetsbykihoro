import { createClient, type InStatement } from '@libsql/client';

const db = createClient({
  url: process.env.TURSO_DATABASE_URL ?? 'file:./data/orders.db',
  authToken: process.env.TURSO_AUTH_TOKEN,
});

let initialized = false;

export async function initDb() {
  if (initialized) return;
  initialized = true;

  await db.batch([
    `CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      orderNumber TEXT NOT NULL UNIQUE,
      customerName TEXT NOT NULL,
      customerPhone TEXT NOT NULL,
      customerEmail TEXT NOT NULL,
      items TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'Received' CHECK(status IN ('Received','Processing','Ready for Pickup','Completed')),
      totalAmount INTEGER NOT NULL,
      createdAt TEXT NOT NULL DEFAULT (datetime('now')),
      updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
    )`,
    `CREATE TABLE IF NOT EXISTS order_notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      orderId INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
      note TEXT NOT NULL,
      createdAt TEXT NOT NULL DEFAULT (datetime('now'))
    )`,
    `CREATE TABLE IF NOT EXISTS order_status_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      orderId INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
      status TEXT NOT NULL,
      changedAt TEXT NOT NULL DEFAULT (datetime('now'))
    )`,
  ]);
}

export async function query<T>(sql: string, args: (string | number | null)[] = []): Promise<T[]> {
  await initDb();
  const result = await db.execute({ sql, args });
  return result.rows as T[];
}

export async function queryOne<T>(sql: string, args: (string | number | null)[] = []): Promise<T | undefined> {
  const rows = await query<T>(sql, args);
  return rows[0];
}

export async function execute(sql: string, args: (string | number | null)[] = []) {
  await initDb();
  return db.execute({ sql, args });
}

export async function batch(stmts: InStatement[]) {
  await initDb();
  return db.batch(stmts);
}
