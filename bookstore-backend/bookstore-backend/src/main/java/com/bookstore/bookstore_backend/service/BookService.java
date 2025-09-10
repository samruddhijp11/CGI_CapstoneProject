package com.bookstore.bookstore_backend.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

import com.bookstore.bookstore_backend.model.Book;
import com.bookstore.bookstore_backend.repository.BookRepository;

@Service
public class BookService {

    private final BookRepository bookRepository;

    @Autowired
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Book getBookById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found with id " + id));
    }
    
    public List<Book> searchBooks(String query) {
        return bookRepository.findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(query, query);
    }


    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }

    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }
    
//    public Book updateBook(Long id, Book updatedBook) {
//        return bookRepository.findById(id)
//                .map(book -> {
//                    book.setTitle(updatedBook.getTitle());
//                    book.setAuthor(updatedBook.getAuthor());
//                    book.setPrice(updatedBook.getPrice());
//                    book.setImg(updatedBook.getImg());
//                    return bookRepository.save(book);
//                })
//                .orElseThrow(() -> new RuntimeException("Book not found"));
//    }
}
