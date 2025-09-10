package com.bookstore.bookstore_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import com.bookstore.bookstore_backend.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}


