package com.microservices.example.order_service.service;


import com.microservices.example.order_service.dto.OrderRequest;
import com.microservices.example.order_service.model.Order;
import com.microservices.example.order_service.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {

    private final OrderRepository orderRepository;

    public void placeOrder(OrderRequest orderRequest) {
        Order order = new Order();
        order.setOrderNumber(UUID.randomUUID().toString());
        order.setPrice(orderRequest.price());
        order.setSkuCode(orderRequest.skuCode());
        order.setQuantity(orderRequest.quantity());

        // TODO: Call Inventory Service synchronously to check if product is in stock

        orderRepository.save(order);
        log.info("Order {} placed successfully", order.getId());

        // TODO: Send asynchronous message to Kafka for the Notification Service
    }
}