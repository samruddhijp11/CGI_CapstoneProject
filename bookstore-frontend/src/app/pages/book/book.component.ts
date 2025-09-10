import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BooksService } from '../../core/books.service';
import { CartService } from '../../core/cart.service';
import { WishlistService } from '../../core/wishlist.service';
import { Book } from '../../models/book';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  bookId: string | null = null;
  book: Book | null = null;
  loading = true;

  constructor(
  private route: ActivatedRoute,
  private booksService: BooksService,
  private cartService: CartService,
  private wishlistService: WishlistService,
  private authService: AuthService,
  private router: Router
) {}

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id');
    if (this.bookId) {
      this.booksService.get(this.bookId).subscribe(b => {
        this.book = b;
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
  }

  addToCart(book: Book) {
    this.cartService.add(book);
    alert(`🛒 "${book.title}" added to cart!`);
  }

  buyNow(book: Book) {
    if (!this.authService.currentUser()) {
      alert('Please login to buy now');
      this.router.navigate(['/login']);
      return;
    }

    // Clear cart and add this single item
    this.cartService.clear();
    this.cartService.add(book);
    
    // Navigate to checkout
    this.router.navigate(['/checkout']);
  }

  toggleWishlist(book: Book) {
  const wasInWishlist = this.wishlistService.isInWishlist(String(book.id));
  this.wishlistService.toggle(book);
  
  if (wasInWishlist) {
    alert(`"${book.title}" already in wishlist!`);
  } else {
    alert(`"${book.title}" added to wishlist!`);
  }
}

  isInWishlist(book: Book):boolean {
    return this.wishlistService.isInWishlist(String(book.id));
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
