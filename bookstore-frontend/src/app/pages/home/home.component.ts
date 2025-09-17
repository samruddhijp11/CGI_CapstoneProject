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
    { name: "Fantasy", img: "data:image/jpeg;base64,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" },
    { name: "Horror", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYa9Zp-il13uq5mOHCRcu30p7TaP6ItZtLDhxm3tS6wYQ17M40oM6vRUho9zbO_8eTeG0&usqp=CAU" },
    { name: "Comedy", img: "https://i0.wp.com/mandyevebarnett.com/wp-content/uploads/2017/12/humor.jpg?fit=300%2C225&ssl=1" },
    { name: "Romance", img: "https://media.istockphoto.com/id/94381370/photo/heart-shape.jpg?s=612x612&w=0&k=20&c=qC9xsj8raR5EmpCu28VNRV71GMHYTQ4VZbktJHC-CTc=" },
    { name: "Sci-Fi", img: "https://img.freepik.com/free-photo/open-book-with-fairytale-scene_52683-107845.jpg" },
    { name: "Fiction", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH6vxsfAhCwYwwl_nHpfVQi_zccthgEwmbl-Aj37ohQTye_JDU7LOfaEJn4b3q_3erDN8&usqp=CAU" },
    { name: "Thriller", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg5kQbAnJmUrMhpI422IofQaDRm8pRQzCa2mIYNr1dpKUfMDD3ZdNM2pTUYGQulfl-YweqrmM9CaOqHYMTxKq4YEl6VUIN7mh3ZcO9hpMrC9M908Mn4TbqoqlroebKCguPRqXN7BM2mZQ4/s1600/Picture1.png" },
    { name: "Mystery", img: "https://i0.wp.com/buildingjerusalem.blog/wp-content/uploads/2020/07/learn-study-inspect-mystery-pictured-as-magnifying-glass-enlarging-word-symbolizes-researching-exploring-analyzing-meaning-164571087.jpg?resize=800%2C450&ssl=1" }
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
