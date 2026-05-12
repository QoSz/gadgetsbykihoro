export const ORDER_STATUSES = ['Received', 'Processing', 'Ready for Pickup', 'Completed'] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderNote {
  id: number;
  orderId: number;
  note: string;
  createdAt: string;
}

export interface OrderStatusHistory {
  id: number;
  orderId: number;
  status: string;
  changedAt: string;
}

export interface CreateOrderInput {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  items: OrderItem[];
  totalAmount: number;
}

export interface UpdateOrderInput {
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  items?: OrderItem[];
  status?: OrderStatus;
  totalAmount?: number;
}

export interface OrderWithDetails extends Order {
  notes: OrderNote[];
  statusHistory: OrderStatusHistory[];
}
