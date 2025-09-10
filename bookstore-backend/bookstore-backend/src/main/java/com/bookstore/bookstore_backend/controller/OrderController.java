package com.bookstore.bookstore_backend.controller;

import com.bookstore.bookstore_backend.model.Order;
import com.bookstore.bookstore_backend.dto.OrderRequest;
import com.bookstore.bookstore_backend.dto.OrderResponse;
import com.bookstore.bookstore_backend.mapper.OrderMapper;
import com.bookstore.bookstore_backend.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController {
    
    private final OrderService orderService;
    
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }
    
    // Get all orders for a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUserId(@PathVariable Long userId) {
        try {
            List<Order> orders = orderService.getOrdersByUserId(userId);
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    
    // Place a new order
//    @PostMapping
//    public ResponseEntity<Order> placeOrder(@RequestBody OrderRequest orderRequest) {
//        try {
//            Order placedOrder = orderService.placeOrder(orderRequest);
//            return ResponseEntity.ok(placedOrder);
//        } catch (Exception e) {
//            System.err.println("Error placing order: " + e.getMessage());
//            e.printStackTrace();
//            return ResponseEntity.internalServerError().build();
//        }
//    }
    
    
//    @PostMapping
//    public ResponseEntity<OrderResponse> placeOrder(@RequestBody OrderRequest orderRequest) {
//        Order placedOrder = orderService.placeOrder(orderRequest);
//        return ResponseEntity.ok(OrderMapper.toResponse(placedOrder));
//    }
    
    
    @PostMapping
    public ResponseEntity<OrderResponse> placeOrder(@RequestBody OrderRequest orderRequest) {
        OrderResponse orderResponse = orderService.placeOrder(orderRequest);
        return ResponseEntity.ok(orderResponse);
    }

    
    // Get a specific order
    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long orderId) {
        Optional<Order> order = orderService.getOrderById(orderId);
        return order.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }
    
    // Update order status
    @PutMapping("/{orderId}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long orderId, @RequestParam String status) {
        try {
            Order updatedOrder = orderService.updateOrderStatus(orderId, status);
            return ResponseEntity.ok(updatedOrder);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Delete an order
    @DeleteMapping("/{orderId}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long orderId) {
        try {
            orderService.deleteOrder(orderId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    
    
 // ✅ Admin: Get all orders (no filtering by user)
    @GetMapping("/all")
    public ResponseEntity<List<OrderResponse>> getAllOrders() {
        System.out.println("✅ getAllOrders called!");
        List<Order> orders = orderService.getAllOrders();
        System.out.println("✅ Found orders: " + orders.size());
        List<OrderResponse> response = orders.stream()
                .map(o -> orderService.mapToOrderResponse(o))
                .toList();
        return ResponseEntity.ok(response);
    }



}