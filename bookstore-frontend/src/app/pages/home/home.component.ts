import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Book } from '../../models/book';
import { Category } from '../../models/category';
import { BooksService } from '../../core/books.service';
import { CartService } from '../../core/cart.service';
import { WishlistService } from '../../core/wishlist.service';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  categories: Category[] = [
    { name: "Fantasy", img: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=400&q=80" },
    { name: "Horror", img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80" },
    { name: "Comedy", img: "https://m.media-amazon.com/images/I/71c05lTE03L._AC_UF1000,1000_QL80_.jpg" },
    { name: "Romance", img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80" },
    { name: "Sci-Fi", img: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=400&q=80" },
    { name: "Fiction", img: "https://m.media-amazon.com/images/I/81WcnNQ-TBL.jpg" },
    { name: "Thriller", img: "https://m.media-amazon.com/images/I/71kxa1-0mfL.jpg" },
    { name: "Mystery", img: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0ea?auto=format&fit=crop&w=400&q=80" }
  ];

  cartCount = 0;
  isLoggedIn = false;

  constructor(
    private booksService: BooksService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private authService: AuthService,
    private router: Router   
  ) {}

  ngOnInit(): void {
    // Check authentication status
    this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      if (!loggedIn) {
        // Clear cart and wishlist when not logged in
        this.cartService.clear();
        this.wishlistService.clear();
      }
    });

    // Load books from service
    this.booksService.list().subscribe(data => {
      this.books = data;
      this.filteredBooks = [...this.books];
    });

    // Subscribe to cart changes
    this.cartService.items$.subscribe(items => {
      this.cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
    });
  }

  filterByCategory(cat: string) {
    this.filteredBooks = this.books.filter(b => b.category === cat);
    // Scroll to books section
    document.querySelector('.container h2')?.scrollIntoView({ behavior: 'smooth' });
  }

  showAllBooks() {
    this.filteredBooks = [...this.books];
    // Scroll to books section
    document.querySelector('.container h2')?.scrollIntoView({ behavior: 'smooth' });
  }

  searchBooks(searchValue: string) {
    const query = searchValue.trim().toLowerCase();
    this.filteredBooks = query
      ? this.books.filter(b =>
          b.title.toLowerCase().includes(query) ||
          b.author.toLowerCase().includes(query)
        )
      : [...this.books];
  }

  addToCart(book: Book) {
    if (!this.isLoggedIn) {
      alert('Please login to add items to cart');
      this.router.navigate(['/login']);
      return;
    }
    this.cartService.add(book);
    alert(`"${book.title}" added to cart`);
  }

  addToWishlist(book: Book) {
    if (!this.isLoggedIn) {
      alert('Please login to add items to wishlist');
      this.router.navigate(['/login']);
      return;
    }
    this.wishlistService.toggle(book);
    const inWishlist = this.wishlistService.isInWishlist(String(book.id));
    alert(inWishlist ? `"${book.title}" added to wishlist` : `"${book.title}" removed from wishlist`);
  }

  buyNow(book: Book) {
    if (!this.isLoggedIn) {
      alert('Please login to purchase');
      this.router.navigate(['/login']);
      return;
    }
    this.cartService.add(book, 1); //check
    this.router.navigate(['/cart']); //checkout
  }

  logout() {
    this.authService.logout();
    alert('Logged out successfully');
  }

  onImageError(event: any) {
    event.target.src = '../../assets/images/placeholder.jpg';
  }
}
