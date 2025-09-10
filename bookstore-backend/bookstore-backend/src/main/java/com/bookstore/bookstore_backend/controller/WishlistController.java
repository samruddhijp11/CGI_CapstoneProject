package com.bookstore.bookstore_backend.controller;

import com.bookstore.bookstore_backend.model.Wishlist;
import com.bookstore.bookstore_backend.service.WishlistService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin(origins = "http://localhost:4200")
public class WishlistController {
    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @GetMapping("/{userId}")
    public List<Wishlist> getWishlist(@PathVariable Long userId) {
        return wishlistService.getWishlistByUserId(userId);
    }

    @PostMapping
    public Wishlist addToWishlist(@RequestBody Wishlist wishlist) {
        return wishlistService.addToWishlist(wishlist);
    }

    @DeleteMapping("/{wishlistId}")
    public void removeFromWishlist(@PathVariable Long wishlistId) {
        wishlistService.removeFromWishlist(wishlistId);
    }
}
