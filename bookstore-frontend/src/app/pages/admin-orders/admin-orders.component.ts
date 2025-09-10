import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { OrdersService } from '../../core/orders.service';
import { Order, OrderResponse } from '../../models/order';
import { Book } from '../../models/book';
import { BooksService } from '../../core/books.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule,FormsModule, DatePipe],
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders: OrderResponse[] = [];

  newBook: Book = {
    id: 0,
    title: '',
    author: '',
    price: 0,
    img: '',
    category: '',
    quantity: 0,
    description:''

  };
  //loading = true;
  

  constructor(private router: Router, private ordersService: OrdersService, private bookService: BooksService) {}

  ngOnInit() {
    this.ordersService.listAll().subscribe(res => {
      this.orders = res; 
    });
    //this.loadAllOrders();

  }

  // loadAllOrders() {
  //   this.ordersService.listAll().subscribe({
  //     next: (orders) => {
  //       this.orders = orders;
  //       this.loading = false;
  //     },
  //     error: (error) => {
  //       console.error('Failed to load orders:', error);
  //       this.loading = false;
  //       if (error.status === 401) {
  //         alert('Please login to view orders');
  //         this.router.navigate(['/login']);
  //       }
  //     }
  //   });
  // }

  goHome() {
    this.router.navigate(['/']);
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  // getTotal(order: Order): number {
  //   if (!order.items) return 0;

  //   return order.items.reduce((acc, i) => {
  //     // ✅ works for both {book, quantity} and {title, qty}
  //     if (i.book) {
  //       return acc + (i.book.price || 0) * (i.quantity || 1);
  //     }
  //     return acc + (i.price || 0) * (i.quantity || 1);
  //   }, 0);
  // }

   getTotal(order: OrderResponse): number {
    return order.total || 0;   // backend already gives total
  }

  // getTotal(order: Order): number {
  //   if (!order.items || order.items.length === 0) return 0;

  //   return order.items.reduce((acc, item) => {
  //     const price = item.book ? item.book.price : item.price || 0;
  //     const qty = item.quantity || 1;
  //     return acc + price * qty;
  //   }, 0);
  // }


  addBook() {
    const bookData = {
    title: this.newBook.title,
    author: this.newBook.author,
    price: this.newBook.price,
    quantity: this.newBook.quantity,
    img: this.newBook.img,
    category: this.newBook.category,
    description: this.newBook.description
  };
    this.bookService.create(this.newBook).subscribe({
      next: () => {
        alert('Book added successfully!');
        this.router.navigate(['/admin-books']); // redirect to list
      },
      error: (err) => {
        console.error(err);
        alert('Failed to add book.');
      }
    });
  }

}
