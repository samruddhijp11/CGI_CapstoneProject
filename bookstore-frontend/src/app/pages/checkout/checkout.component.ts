// checkout.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../core/cart.service';
import { OrdersService } from '../../core/orders.service';
import { AuthService } from '../../core/auth.service';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  items: CartItem[] = [];
  total = 0;
  paymentMethod = '';
  upiId = '';
  address = { name: '', address: '', city: '', pincode: '', phone: '' };

  constructor(
    private cartService: CartService,
    private ordersService: OrdersService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Check if user is logged in
    if (!this.authService.currentUser()) {
      alert('Please login to checkout');
      this.router.navigate(['/login']);
      return;
    }

    this.items = this.cartService.getItemsSync();
    this.renderSummary();
  }

  renderSummary() {
    this.total = this.items.reduce((sum, item) => sum + (item.book.price || 0) * item.quantity, 0);
  }

  onPaymentChange(value: string) {
    this.paymentMethod = value;
  }

  deliveryWindow() {
    const today = new Date();
    const min = new Date(today); 
    min.setDate(today.getDate() + 3);
    const max = new Date(today); 
    max.setDate(today.getDate() + 5);
    const fmt = (d: Date) => d.toLocaleDateString("en-US", {month:"short", day:"numeric"});
    return `${fmt(min)} - ${fmt(max)}`;
  }

  placeOrder() {
    if (!this.items.length) { 
      alert("No items to place order."); 
      return; 
    }
    
    if (!this.paymentMethod) { 
      alert("Please select a payment method."); 
      return; 
    }
    
    if (!this.address.name || !this.address.address) { 
      alert("Please fill delivery name & address."); 
      return; 
    }
    
    if (this.paymentMethod === 'upi' && !this.upiId) { 
      alert("Enter UPI ID."); 
      return; 
    }

    // Check if user is still logged in
    if (!this.authService.currentUser()) {
      alert('Please login to place order');
      this.router.navigate(['/login']);
      return;
    }

    this.ordersService.place(this.items, this.total).subscribe({
      next: (placedOrder) => {
        const paymentMessage = this.paymentMethod === 'upi' ? 
          `✅ Payment successful via UPI (${this.upiId})` : 
          '🚚 Cash on Delivery selected';
        
        alert(paymentMessage);
        localStorage.setItem('lastOrder', JSON.stringify(placedOrder));
        this.cartService.clear();
        this.router.navigate(['/order-confirmation']);
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
  }
}