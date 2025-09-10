package com.bookstore.bookstore_backend.controller;


import com.bookstore.bookstore_backend.dto.AuthRequest;
import com.bookstore.bookstore_backend.dto.AuthResponse;
import com.bookstore.bookstore_backend.model.User;
import com.bookstore.bookstore_backend.security.JwtUtil;
import com.bookstore.bookstore_backend.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {
    private final AuthService authService;
    private final JwtUtil jwtUtil;

    public AuthController(AuthService authService, JwtUtil jwtUtil) {
        this.authService = authService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        boolean ok = authService.register(user);
        return ok ? ResponseEntity.ok().build() : ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest req) {
        return authService.login(req.getEmail(), req.getPassword())
            .map(u -> {
                String token = jwtUtil.generateToken(u.getEmail());
                return ResponseEntity.ok(new AuthResponse(token,u.getId(), u.getEmail(), u.getName(),u.getRole()));
            })
            .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                new AuthResponse(null, null,null, "Invalid credentials",null)
            ));
    }

}

