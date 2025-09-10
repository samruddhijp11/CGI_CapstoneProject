package com.bookstore.bookstore_backend.service;

import com.bookstore.bookstore_backend.model.User;
import com.bookstore.bookstore_backend.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    private final UserRepository userRepo;
    private final BCryptPasswordEncoder passwordEncoder;
    //private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthService(UserRepository userRepo, BCryptPasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }
    public boolean register(User user) {
        if (userRepo.existsByEmail(user.getEmail())) return false;
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);
        return true;
    }

    public Optional<User> login(String email, String rawPassword) {
        return userRepo.findByEmail(email)
                .filter(u -> passwordEncoder.matches(rawPassword, u.getPassword()));
    }
}
