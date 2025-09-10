package com.bookstore.bookstore_backend.dto;

import java.util.List;

public class OrderRequest {
 private Long userId;
 private Double total;
 private String status;
 private List<OrderItemRequest> items;
 
 // Constructors
 public OrderRequest() {}
 
 public OrderRequest(Long userId, Double total, String status, List<OrderItemRequest> items) {
     this.userId = userId;
     this.total = total;
     this.status = status;
     this.items = items;
 }
 
 // Getters and Setters
 public Long getUserId() {
     return userId;
 }
 
 public void setUserId(Long userId) {
     this.userId = userId;
 }
 
 public Double getTotal() {
     return total;
 }
 
 public void setTotal(Double total) {
     this.total = total;
 }
 
 public String getStatus() {
     return status;
 }
 
 public void setStatus(String status) {
     this.status = status;
 }
 
 public List<OrderItemRequest> getItems() {
     return items;
 }
 
 public void setItems(List<OrderItemRequest> items) {
     this.items = items;
 }
 
 // Inner class for order items
 public static class OrderItemRequest {
     private Long bookId;
     private Integer quantity;
     private Double price;
     
     // Constructors
     public OrderItemRequest() {}
     
     public OrderItemRequest(Long bookId, Integer quantity, Double price) {
         this.bookId = bookId;
         this.quantity = quantity;
         this.price = price;
     }
     
     // Getters and Setters
     public Long getBookId() {
         return bookId;
     }
     
     public void setBookId(Long bookId) {
         this.bookId = bookId;
     }
     
     public Integer getQuantity() {
         return quantity;
     }
     
     public void setQuantity(Integer quantity) {
         this.quantity = quantity;
     }
     
     public Double getPrice() {
         return price;
     }
     
     public void setPrice(Double price) {
         this.price = price;
     }
 }
}