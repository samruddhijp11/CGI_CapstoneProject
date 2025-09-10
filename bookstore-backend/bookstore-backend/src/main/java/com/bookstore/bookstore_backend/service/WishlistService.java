package com.bookstore.bookstore_backend.service;

import com.bookstore.bookstore_backend.model.Wishlist;
import com.bookstore.bookstore_backend.repository.WishlistRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class WishlistService {
    private final WishlistRepository wishlistRepository;

    public WishlistService(WishlistRepository wishlistRepository) {
        this.wishlistRepository = wishlistRepository;
    }

    public List<Wishlist> getWishlistByUserId(Long userId) {
        return wishlistRepository.findByUserId(userId);
    }

    public Wishlist addToWishlist(Wishlist wishlist) {
        if (!wishlistRepository.existsByUserIdAndBookId(wishlist.getUser().getId(), wishlist.getBook().getId())) {
            return wishlistRepository.save(wishlist);
        }
        return null; // or throw exception for duplicate
    }

    public void removeFromWishlist(Long wishlistId) {
        wishlistRepository.deleteById(wishlistId);
    }
}
