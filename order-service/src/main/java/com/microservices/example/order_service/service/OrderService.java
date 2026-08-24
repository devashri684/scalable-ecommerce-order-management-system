package com.microservices.example.order_service.service;


import com.microservices.example.order_service.client.InventoryClient;
import com.microservices.example.order_service.dto.OrderRequest;
import com.microservices.example.order_service.model.Order;
import com.microservices.example.order_service.repository.OrderRepository;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.List;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {

    private final OrderRepository orderRepository;
    private final InventoryClient inventoryClient;

    @CircuitBreaker(name = "inventory", fallbackMethod = "fallbackPlaceOrder")
    @Retry(name = "inventory")
    public String placeOrder(OrderRequest orderRequest) {
        boolean isProductInStock = inventoryClient.isInStock(orderRequest.skuCode(), orderRequest.quantity());

        if (isProductInStock) {
            Order order = new Order();
            order.setOrderNumber(UUID.randomUUID().toString());
            order.setPrice(orderRequest.price());
            order.setSkuCode(orderRequest.skuCode());
            order.setQuantity(orderRequest.quantity());
            orderRepository.save(order);
            return "Order Placed Successfully";
        } else {
            throw new RuntimeException("Product with SkuCode " + orderRequest.skuCode() + " is not in stock");
        }
    }

    // Fallback method must have the EXACT same parameter list as placeOrder + a Throwable parameter at the end
    public String fallbackPlaceOrder(OrderRequest orderRequest, Throwable throwable) {
        log.error("Cannot place order for SKU: {}. Downstream failure: {}", orderRequest.skuCode(), throwable.getMessage());
        return "Oops! Something went wrong, please order after some time!";
    }
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}
//DO: Call Inventory Service synchronously to check if product is in stock

// DO: Send asynchronous message to Kafka for the Notification Service