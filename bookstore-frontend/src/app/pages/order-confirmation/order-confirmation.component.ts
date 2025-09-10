import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { Order } from '../../models/order';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  lastOrder: Order | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Check if user is logged in
    if (!this.authService.currentUser()) {
      alert('Please login to view order confirmation');
      this.router.navigate(['/login']);
      return;
    }

    this.loadOrderItems();
  }

  loadOrderItems() {
    const storedOrder = localStorage.getItem('lastOrder');
    if (storedOrder) {
      try {
        this.lastOrder = JSON.parse(storedOrder);
      } catch (error) {
        console.error('Error parsing order data:', error);
        this.lastOrder = null;
      }
    }
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = "assets/images/fallback.jpg";
  }

  goToMyOrders() {
    this.router.navigate(['/myorders']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
