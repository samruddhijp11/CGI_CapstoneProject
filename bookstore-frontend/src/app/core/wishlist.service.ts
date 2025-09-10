import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../models/book';
import { environment } from '../../environments/environment';

const KEY = 'bookstore_wishlist_v1';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private base = `${environment.apiUrl}/wishlist`;
  private items: Book[] = JSON.parse(localStorage.getItem(KEY) || '[]');
  private subject = new BehaviorSubject<Book[]>([...this.items]);
  items$ = this.subject.asObservable();

  private save() {
    localStorage.setItem(KEY, JSON.stringify(this.items));
    this.subject.next([...this.items]);
  }

  listSync(): Book[] {
    return [...this.items];
  }

  add(book: Book) {
    if (!this.items.find(b => b.id === book.id)) {
      this.items.push(book);
      this.save();
    }
  }

  remove(bookId: string | number) {
    this.items = this.items.filter(b => String(b.id) !== bookId);
    this.save();
  }

  toggle(book: Book) {
    if (this.items.find(b => String(b.id) === book.id)) {
      this.remove(book.id);
    }
    else this.add(book);
  }

  isInWishlist(bookId: string):boolean {
    return this.items.some(b => String(b.id) === bookId);
  }

  clear() {
    this.items = [];
    this.save();
  }
}
