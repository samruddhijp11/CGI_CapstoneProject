package com.bookstore.bookstore_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.bookstore.bookstore_backend.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);
}
