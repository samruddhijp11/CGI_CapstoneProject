// models/order-item.ts
export interface OrderItem {
  id?: number;
  book: {
    id: string | number;
    title: string;
    author: string;
    price: number;
    img?: string;
  };
  quantity: number;
  price: number;
}