package com.bookstore.bookstore_backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.bookstore.bookstore_backend.model.Wishlist;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    List<Wishlist> findByUserId(Long userId);
    boolean existsByUserIdAndBookId(Long userId, Long bookId);
}
