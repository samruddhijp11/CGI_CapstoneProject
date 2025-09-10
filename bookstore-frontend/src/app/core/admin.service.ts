import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book } from '../models/book';
import { Order } from '../models/order';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private baseBooks = `${environment.apiUrl}/admin/books`;
  private baseOrders = `${environment.apiUrl}/admin/orders`;

  constructor(private http: HttpClient) {}

  listAllBooks(): Observable<Book[]> {
     return this.http.get<Book[]>(this.baseBooks);
    //return of([]);
  }

  createBook(book: Book): Observable<Book> {
     return this.http.post<Book>(this.baseBooks, book);
    //return of({ ...book, id: (Math.random() * 1e6).toFixed(0) });
  }

  updateBook(book: Book): Observable<Book> {
     return this.http.put<Book>(`${this.baseBooks}/${book.id}`, book);
    //return of(book);
  }

  deleteBook(id: string): Observable<void> {
     return this.http.delete<void>(`${this.baseBooks}/${id}`);
    //return of(void 0);
  }

  listAllOrders(): Observable<Order[]> {
     return this.http.get<Order[]>(this.baseOrders);
    //return of([]);
  }

  updateOrderStatus(id: string, status: Order['status']): Observable<Order> {
     return this.http.patch<Order>(`${this.baseOrders}/${id}`, { status });
    //return of({ id, items: [], total: 0, status, createdAt: new Date().toISOString() });
  }
}
