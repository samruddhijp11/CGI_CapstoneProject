import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Order, OrderResponse } from '../models/order';
import { OrderRequest } from '../models/order-request';
import { AuthService } from './auth.service';
import { CartItem } from '../models/cart-item';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  private base = `${environment.apiUrl}/orders`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  place(cartItems: CartItem[], total: number): Observable<Order> {
    const currentUser = this.authService.currentUser();
    
    if (!currentUser) {
      throw new Error('User not logged in');
    }

    // Convert cart items to order request format
    const orderRequest: OrderRequest = {
      userId: currentUser.id || 1, // Fallback to 1 if no ID
      total: total,
      status: 'PLACED',
      items: cartItems.map(item => ({
        bookId: item.book.id,
        quantity: item.quantity,
        price: item.book.price || 0
      }))
    };

/////////
// console.log('=== ORDER PLACEMENT DEBUG ===');
//     console.log('Current User:', currentUser);
//     console.log('Order Request:', orderRequest);
//     console.log('API URL:', this.base);

//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json'
//     });

//     // Add auth token if available
//     const token = this.authService.getToken();
//     if (token) {
//       headers.set('Authorization', `Bearer ${token}`);
//     }
//     return this.http.post<Order>(this.base, orderRequest, { headers }).pipe(
//       tap(response => {
//         console.log('=== ORDER SUCCESS ===');
//         console.log('Response:', response);
//       }),
//       catchError(error => {
//         console.error('=== ORDER ERROR ===');
//         console.error('Error Status:', error.status);
//         console.error('Error Message:', error.message);
//         console.error('Error Response:', error.error);
//         console.error('Full Error:', error);
//         return throwError(() => error);
//       })
//     );

    return this.http.post<Order>(this.base, orderRequest);
  }

  listMine(): Observable<Order[]> {
    const currentUser = this.authService.currentUser();
    
    if (!currentUser) {
      throw new Error('User not logged in');
    }

    const userId = currentUser.id || 1; // Fallback to 1 if no ID
    return this.http.get<Order[]>(`${this.base}/user/${userId}`);
  }

  get(id: string |number): Observable<Order> {
    return this.http.get<Order>(`${this.base}/${id}`);
  }

  // list all orders (admin)
  listAll(): Observable<OrderResponse[]> {
    return this.http.get<OrderResponse[]>(`${this.base}/all`);
  }
}













// @Injectable({ providedIn: 'root' })
// export class OrdersService {
//   private base = `${environment.apiUrl}/orders`;

//   constructor(private http: HttpClient) {}

//   place(order: Order): Observable<Order> {
//     return this.http.post<Order>(this.base, order);
//   }

//   listMine(): Observable<Order[]> {
//     // For now, return empty array since we need user ID from backend
//     return of([]);
//     // Later when you have user management: 
//     // const user = JSON.parse(localStorage.getItem('current_user') || '{}');
//     // return this.http.get<Order[]>(`${this.base}/user/${user.id}`);
//   }

//   get(id: string): Observable<Order> {
//     return this.http.get<Order>(`${this.base}/${id}`);
//   }

//   listAll(): Observable<Order[]> {
//     return this.http.get<Order[]>(this.base);
//   }
// }