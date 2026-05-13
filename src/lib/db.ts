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
      status TEXT NOT NULL DEFAULT 'Order Confirmed',
      totalAmount INTEGER NOT NULL,
      estimatedDelivery TEXT,
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

  // Migration: add estimatedDelivery column for tables created with old schema
  try {
    await db.execute({ sql: 'ALTER TABLE orders ADD COLUMN estimatedDelivery TEXT', args: [] });
  } catch {
    // Column already exists — expected on fresh installs
  }

  // Migration: fix FK references broken by previous table rebuild
  try {
    const notesInfo = await db.execute({ sql: "SELECT sql FROM sqlite_master WHERE type='table' AND name='order_notes'", args: [] });
    const notesSql = notesInfo.rows[0]?.sql as string | undefined;
    if (notesSql && notesSql.includes('orders_old')) {
      await db.batch([
        'ALTER TABLE order_notes RENAME TO order_notes_old',
        `CREATE TABLE order_notes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          orderId INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
          note TEXT NOT NULL,
          createdAt TEXT NOT NULL DEFAULT (datetime('now'))
        )`,
        'INSERT INTO order_notes SELECT * FROM order_notes_old',
        'DROP TABLE order_notes_old',
        'ALTER TABLE order_status_history RENAME TO order_status_history_old',
        `CREATE TABLE order_status_history (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          orderId INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
          status TEXT NOT NULL,
          changedAt TEXT NOT NULL DEFAULT (datetime('now'))
        )`,
        'INSERT INTO order_status_history SELECT * FROM order_status_history_old',
        'DROP TABLE order_status_history_old',
      ]);
    }
  } catch {
    // Already migrated or fresh install
  }
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
