import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CartService } from '../../core/cart.service';
import { OrdersService } from '../../core/orders.service';
import { CartItem } from '../../models/cart-item';
import { Order } from '../../models/order';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: CartItem[] = [];
  total: number = 0;
  paymentMethod: string | null = null;

  constructor(
    private cartService: CartService,
    private ordersService: OrdersService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check if user is logged in
    if (!this.authService.currentUser()) {
      alert('Please login to access cart');
      this.router.navigate(['/login']);
      return;
    }

    this.loadCart();
    this.cartService.items$.subscribe(items => {
      this.cart = items;
      this.calculateTotal();
    });
  }

  loadCart() {
    this.cart = this.cartService.getItemsSync();
    this.calculateTotal();
  }

  updateQuantity(item: CartItem, change: number) {
    const newQty = item.quantity + change;
    this.cartService.updateQuantity(String(item.book.id), newQty);
  }

  remove(item: CartItem) {
    this.cartService.remove(item.book.id);
  }

  calculateTotal() {
    this.total = this.cartService.total();
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/images/fallback.jpg';
  }

  placeOrder() {
    if (!this.paymentMethod) {
      alert('Please select a payment method.');
      return;
    }

    if (this.cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    // Check if user is still logged in
    if (!this.authService.currentUser()) {
      alert('Please login to place order');
      this.router.navigate(['/login']);
      return;
    }

    this.ordersService.place(this.cart, this.total).subscribe({
      next: (placedOrder) => {
        alert('Order placed successfully!');

        if (placedOrder.id !== undefined) {
          this.ordersService.get(placedOrder.id).subscribe(fullOrder => {
            localStorage.setItem('lastOrder', JSON.stringify(fullOrder));
            this.cartService.clear();
            this.router.navigate(['/order-confirmation']);
          });
        } else {
          console.error('Order ID is missing in response');
        }
      },
      error: (error) => {
        console.error('Order placement failed:', error);
        if (error.status === 401) {
          alert('Please login to place order');
          this.router.navigate(['/login']);
        } else {
          alert('Failed to place order. Please try again.');
        }
      }
    });


    // this.ordersService.place(this.cart, this.total).subscribe({
    //   next: (placedOrder) => {
    //     alert('Order placed successfully!');
    //     localStorage.setItem('lastOrder', JSON.stringify(placedOrder));
    //     this.cartService.clear();
    //     this.router.navigate(['/order-confirmation']);
    //   },
    //   error: (error) => {
    //     console.error('Order placement failed:', error);
    //     if (error.status === 401) {
    //       alert('Please login to place order');
    //       this.router.navigate(['/login']);
    //     } else {
    //       alert('Failed to place order. Please try again.');
    //     }
    //   }
    // });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}