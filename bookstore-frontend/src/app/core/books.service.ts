import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Book } from '../models/book';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BooksService {
  private base = `${environment.apiUrl}/books`;

  constructor(private http: HttpClient) {}

  /**
   * List all books.
   * Currently returns a mock list (of(...)). Replace with:
   *   return this.http.get<Book[]>(this.base);
   */
  list(): Observable<Book[]> {
    // return of([
    //   { id: '1', title: 'Pride and Prejudice', author: 'Jane Austen', price: 450, img: '/assets/images/pp.jpg', category: 'Classics' },
    //   { id: '2', title: '1984', author: 'George Orwell', price: 499, img: '/assets/images/1984.jpg', category: 'Dystopian' },
    //   { id: '3', title: "Harry Potter and the Sorcerer's Stone", author: 'J.K. Rowling', price: 499, img: '/assets/images/hp1.jpg', category: 'Fantasy' }
    // ]);
    return this.http.get<Book[]>(this.base);
  }

  /** Get a single book by id (mock). Replace with http call later. */
  get(id: string |number): Observable<Book> {
     return this.http.get<Book>(`${this.base}/${id}`);
    //return of({ id, title: `Sample Book ${id}`, author: 'Author', price: 199, img: '/assets/images/placeholder.jpg', category: 'Misc' });
  }

  /** Search/filter (optional). Replace with backend query when available */
  search(q: string): Observable<Book[]> {
    if (!q || !q.trim()) {
      return this.list();
    }
    // const lower = q.toLowerCase();
    // return of([]);
     return this.http.get<Book[]>(`${this.base}/search?q=${encodeURIComponent(q)}`);
    // return this.http.get<Book[]>(`${this.base}?q=${encodeURIComponent(q)}`);
  }

  // --- Admin endpoints (replace with real HTTP calls later) ---
  create(book: Book): Observable<Book> {
     return this.http.post<Book>(this.base, book);
    //return of({ ...book, id: (Math.random() * 1e6).toFixed(0) });
  }

  update(book: Book): Observable<Book> {
     return this.http.put<Book>(`${this.base}/${book.id}`, book);
    //return of(book);
  }

  delete(id: string | number): Observable<void> {
     return this.http.delete<void>(`${this.base}/${id}`);
    //return of(void 0);
  }
}
