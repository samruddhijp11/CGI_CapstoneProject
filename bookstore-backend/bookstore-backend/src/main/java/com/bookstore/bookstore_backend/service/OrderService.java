package com.bookstore.bookstore_backend.service;

import com.bookstore.bookstore_backend.model.Order;
import com.bookstore.bookstore_backend.model.OrderItem;
import com.bookstore.bookstore_backend.model.User;
import com.bookstore.bookstore_backend.model.Book;
import com.bookstore.bookstore_backend.dto.OrderRequest;
import com.bookstore.bookstore_backend.dto.OrderResponse;
import com.bookstore.bookstore_backend.dto.OrderItemResponse;
import com.bookstore.bookstore_backend.repository.OrderRepository;
import com.bookstore.bookstore_backend.repository.UserRepository;
import com.bookstore.bookstore_backend.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class OrderService {
    
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    
    @Autowired
    public OrderService(OrderRepository orderRepository, 
                       UserRepository userRepository, 
                       BookRepository bookRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
    }
    
    // Get all orders for a user
    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }
    
    // Place a new order
//    public Order placeOrder(OrderRequest orderRequest) {
//        // Find the user
//        User user = userRepository.findById(orderRequest.getUserId())
//            .orElseThrow(() -> new RuntimeException("User not found with id: " + orderRequest.getUserId()));
//        
//        // Create the order
//        Order order = new Order();
//        order.setUser(user);
//        order.setTotal(orderRequest.getTotal());
//        order.setStatus(orderRequest.getStatus());
//        order.setCreatedAt(Instant.now());
//        
//        // Convert order items
//        List<OrderItem> orderItems = orderRequest.getItems().stream()
//            .map(itemRequest -> {
//                Book book = bookRepository.findById(itemRequest.getBookId())
//                    .orElseThrow(() -> new RuntimeException("Book not found with id: " + itemRequest.getBookId()));
//                
//                OrderItem orderItem = new OrderItem();
//                orderItem.setOrder(order);
//                orderItem.setBook(book);
//                orderItem.setQuantity(itemRequest.getQuantity());
//                orderItem.setPrice(itemRequest.getPrice());
//                
//                return orderItem;
//            })
//            .collect(Collectors.toList());
//        
//        order.setItems(orderItems);
//        
//        // Save and return the order
//        return orderRepository.save(order);
//    }
    
    // Get order by ID
    public Optional<Order> getOrderById(Long orderId) {
        return orderRepository.findById(orderId);
    }
    
    // Update order status
    public Order updateOrderStatus(Long orderId, String status) {
        return orderRepository.findById(orderId)
            .map(order -> {
                order.setStatus(status);
                return orderRepository.save(order);
            })
            .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));
    }
    
    // Delete order
    public void deleteOrder(Long orderId) {
        orderRepository.deleteById(orderId);
    }
    
    //helper
    public OrderResponse mapToOrderResponse(Order order) {
        OrderResponse response = new OrderResponse();
        response.setId(order.getId());
        response.setTotal(order.getTotal());
        response.setStatus(order.getStatus());
        response.setCreatedAt(order.getCreatedAt());

        response.setItems(
            order.getItems().stream().map(item -> {
                OrderItemResponse itemResponse = new OrderItemResponse();
                itemResponse.setBookId(item.getBook().getId());
                itemResponse.setBookTitle(item.getBook().getTitle());
                itemResponse.setBookAuthor(item.getBook().getAuthor());
                itemResponse.setBookImg(item.getBook().getImg());
                itemResponse.setPrice(item.getPrice());
                itemResponse.setQuantity(item.getQuantity());
                return itemResponse;
            }).toList()
        );

        return response;
    }
    
    public OrderResponse placeOrder(OrderRequest orderRequest) {
        User user = userRepository.findById(orderRequest.getUserId())
            .orElseThrow(() -> new RuntimeException("User not found with id: " + orderRequest.getUserId()));

        Order order = new Order();
        order.setUser(user);
        order.setTotal(orderRequest.getTotal());
        order.setStatus(orderRequest.getStatus());
        order.setCreatedAt(Instant.now());

        List<OrderItem> orderItems = orderRequest.getItems().stream()
            .map(itemRequest -> {
                Book book = bookRepository.findById(itemRequest.getBookId())
                    .orElseThrow(() -> new RuntimeException("Book not found with id: " + itemRequest.getBookId()));

                OrderItem orderItem = new OrderItem();
                orderItem.setOrder(order);
                orderItem.setBook(book);
                orderItem.setQuantity(itemRequest.getQuantity());
                orderItem.setPrice(itemRequest.getPrice());

                return orderItem;
            })
            .toList();

        order.setItems(orderItems);

        Order savedOrder = orderRepository.save(order);

        return mapToOrderResponse(savedOrder);
    }
    
    
 // all orders
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    

}