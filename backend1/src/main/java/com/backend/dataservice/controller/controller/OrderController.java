package com.backend.dataservice.controller.controller;

import com.backend.model.Order;
import com.backend.dataservice.util.OrderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("dataserviceOrderController")
@RequestMapping("/orders-data")
public class OrderController {

    private static final Logger logger = LoggerFactory.getLogger(OrderController.class);

    private final OrderRepository orderRepository;

    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    // GET: Alle Bestellungen
    @GetMapping
    public List<Order> getAllOrders() {
        logger.info("Fetching all orders from MongoDB");
        return orderRepository.findAll();
    }

    // POST: Neue Bestellung speichern
    @PostMapping
    public Order addOrder(@RequestBody Order newOrder) {
        logger.info("Saving new order: {}", newOrder);
        return orderRepository.save(newOrder);
    }

    // PUT: Bestellung aktualisieren
    @PutMapping("/{orderId}")
    public Order updateOrder(@PathVariable String orderId, @RequestBody Order updatedOrder) {
        logger.info("Updating order with ID: {}", orderId);

        return orderRepository.findById(orderId)
                .map(existingOrder -> {
                    existingOrder.setCustomerUsername(updatedOrder.getCustomerUsername());
                    existingOrder.setProducts(updatedOrder.getProducts());
                    existingOrder.setTotalAmount(updatedOrder.getTotalAmount());
                    existingOrder.setStatus(updatedOrder.getStatus());
                    existingOrder.setCompanyName(updatedOrder.getCompanyName());
                    existingOrder.setEmail(updatedOrder.getEmail());
                    existingOrder.setAddress(updatedOrder.getAddress());
                    existingOrder.setPhoneNumber(updatedOrder.getPhoneNumber());
                    existingOrder.setNotes(updatedOrder.getNotes());
                    existingOrder.setDeliveryCost(updatedOrder.getDeliveryCost()); // falls hinzugefügt
                    return orderRepository.save(existingOrder);
                })
                .orElseThrow(() -> {
                    logger.warn("Order not found: {}", orderId);
                    return new RuntimeException("Order not found: " + orderId);
                });
    }

    // GET: Bestellungen nach Benutzername
    @GetMapping("/user/{username}")
    public List<Order> getOrdersByUser(@PathVariable String username) {
        logger.info("Fetching orders for user: {}", username);
        return orderRepository.findByCustomerUsername(username);
    }
}
