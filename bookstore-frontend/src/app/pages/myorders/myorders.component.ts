import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { OrdersService } from '../../core/orders.service';
import { Order } from '../../models/order';
import { AuthService } from '../../core/auth.service';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-myorders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders: Order[] = [];
  loading = true;

  constructor(
    private ordersService: OrdersService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check if user is logged in
    if (!this.authService.currentUser()) {
      alert('Please login to view orders');
      this.router.navigate(['/login']);
      return;
    }

    this.loadOrders();
  }

  loadOrders() {
    this.ordersService.listMine().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to load orders:', error);
        this.loading = false;
        if (error.status === 401) {
          alert('Please login to view orders');
          this.router.navigate(['/login']);
        }
      }
    });
  }

  viewOrder(orderId: number) {
    this.router.navigate(['/order-details', orderId]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/images/fallback.jpg';
  }
}
