import { CartItem } from './cart-item';
import { OrderItem } from './order-item';

// export interface Order {
//   id?: string;
//   items: CartItem[];
//   total: number;
//   createdAt?: string;
//   delivery?: string;
//   status?: 'PLACED' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

//   title?: string; // optional: used in admin view
//   date?: string;  // for compatibility with localStorage-based orders


// }


export interface Order {
  id?: number;
  user?: {
    id: number;
    email: string;
    name: string;
  };
  userId?: number; // For requests
  total: number;
  status: string;
  createdAt?: string;
  items: OrderItem[];
}


export interface OrderItemResponse {
  bookId: number;
  bookTitle: string;
  bookAuthor: string;
  bookImg?: string;
  quantity: number;
  price: number;
}

export interface OrderResponse {
  id: number;
  status: string;
  total: number;
  createdAt: string;   // Instant maps to ISO string
  userId: number;
  items: OrderItemResponse[];
}

