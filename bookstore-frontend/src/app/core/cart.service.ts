import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item';
import { Book } from '../models/book';

const KEY = 'bookstore_cart_v1';

@Injectable({ providedIn: 'root' })
export class CartService {
  private items: CartItem[] = JSON.parse(localStorage.getItem(KEY) || '[]');
  private subject = new BehaviorSubject<CartItem[]>([...this.items]);
  items$ = this.subject.asObservable();

  private save() {
    localStorage.setItem(KEY, JSON.stringify(this.items));
    this.subject.next([...this.items]);
  }

  getItemsSync(): CartItem[] {
    return [...this.items];
  }

  add(book: Book, qty = 1) {
    const found = this.items.find(i => i.book.id === book.id);
    if (found) {
      found.quantity += qty;
    } else {
      this.items.push({ book, quantity: qty });
    }
    this.save();
  }

  updateQuantity(bookId: string, quantity: number) {
    const idx = this.items.findIndex(i => i.book.id === bookId);
    if (idx >= 0) {
      if (quantity <= 0) this.items.splice(idx, 1);
      else this.items[idx].quantity = quantity;
      this.save();
    }
  }

  remove(bookId: string | number) {
    this.items = this.items.filter(i => i.book.id !== bookId);
    this.save();
  }

  clear() {
    this.items = [];
    this.save();
  }

  total(): number {
    return this.items.reduce((s, i) => s + (i.book.price || 0) * i.quantity, 0);
  }
}
