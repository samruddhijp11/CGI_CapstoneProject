package com.bookstore.bookstore_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bookstore.bookstore_backend.model.Book;
import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByCategory(String category);
    List<Book> findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(String title, String author);
}
