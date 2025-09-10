import { Book } from './book';

export interface CartItem {
  book: Book;
  quantity: number;
}
  // fallback properties (for localStorage compatibility)
  // id?: string;
  // title?: string;
  // image?: string;
  // price?: number;
  // qty?: number;
//}
