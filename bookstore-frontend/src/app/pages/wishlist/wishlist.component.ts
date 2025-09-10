import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../core/wishlist.service';
import { CartService } from '../../core/cart.service';
import { Book } from '../../models/book';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist = signal<Book[]>([]);

constructor(
  private wishlistService: WishlistService, 
  private cartService: CartService,
  private authService: AuthService,
  private router: Router
) {}

  ngOnInit() {
    this.loadWishlist();
  }

  loadWishlist() {
    this.wishlist.set(this.wishlistService.listSync());
    this.wishlistService.items$.subscribe(items => this.wishlist.set(items));
  }

  removeFromWishlist(index: number) {
    const book = this.wishlist()[index];
    this.wishlistService.remove(String(book.id));
  }

  addToCart(index: number) {
    const book = this.wishlist()[index];
    this.cartService.add(book);
    alert(`🛒 "${book.title}" added to cart!`);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
