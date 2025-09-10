export interface OrderRequest {
  userId: number |string;
  total: number;
  status: string;
  items: OrderItemRequest[];
}

export interface OrderItemRequest {
  bookId: string | number;
  quantity: number;
  price: number;
}