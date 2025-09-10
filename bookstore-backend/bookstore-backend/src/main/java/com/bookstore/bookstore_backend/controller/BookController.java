package com.bookstore.bookstore_backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

import com.bookstore.bookstore_backend.model.Book;
import com.bookstore.bookstore_backend.service.BookService;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:4200") // Allow Angular dev server
public class BookController {

    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @GetMapping("/{id}")
    public Book getBookById(@PathVariable Long id) {
        return bookService.getBookById(id);
    }
    
    @GetMapping("/search")
    public List<Book> searchBooks(@RequestParam("q") String query) {
        return bookService.searchBooks(query);
    }


    @PostMapping
    public Book createBook(@RequestBody Book book) {
    	 book.setId(null);
        return bookService.saveBook(book);
    }
    
    @PutMapping("/{id}")
    public Book updateBook(@PathVariable Long id, @RequestBody Book book) {
        book.setId(id);  // ensure correct id
        return bookService.saveBook(book);
    }

    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
    }
}
