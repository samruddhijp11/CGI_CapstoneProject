package com.bookstore.bookstore_backend.mapper;

import com.bookstore.bookstore_backend.dto.OrderItemResponse;
import com.bookstore.bookstore_backend.dto.OrderResponse;
import com.bookstore.bookstore_backend.model.Order;
import com.bookstore.bookstore_backend.model.OrderItem;

import java.util.stream.Collectors;

public class OrderMapper {

    public static OrderResponse toResponse(Order order) {
        OrderResponse dto = new OrderResponse();
        dto.setId(order.getId());
        dto.setStatus(order.getStatus());
        dto.setTotal(order.getTotal());
        dto.setCreatedAt(order.getCreatedAt());
        dto.setUserId(order.getUser().getId());

        dto.setItems(order.getItems().stream().map(OrderMapper::toItemResponse).collect(Collectors.toList()));

        return dto;
    }

    private static OrderItemResponse toItemResponse(OrderItem item) {
        OrderItemResponse dto = new OrderItemResponse();
        dto.setBookId(item.getBook().getId());
        //dto.setBookTitle(item.getBook().getTitle()); // optional
        dto.setQuantity(item.getQuantity());
        dto.setPrice(item.getPrice());
        return dto;
    }
}
