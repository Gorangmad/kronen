package com.backend.graphql.resolver;

import com.backend.model.Order;
import com.backend.model.OrderInput;
import com.backend.model.OrderProduct;
import com.backend.graphql.util.OrderDataUtil;
import com.backend.graphql.util.ProductServiceUtil;
import com.backend.OrderWebSocketHandler;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Controller
public class OrderResolver {

    private final OrderDataUtil orderDataUtil;
    private final ProductServiceUtil productServiceUtil;
    private final OrderWebSocketHandler webSocketHandler;

    public OrderResolver(OrderDataUtil orderDataUtil,
                         ProductServiceUtil productServiceUtil,
                         OrderWebSocketHandler webSocketHandler) {
        this.orderDataUtil = orderDataUtil;
        this.productServiceUtil = productServiceUtil;
        this.webSocketHandler = webSocketHandler;
    }

    // Query to retrieve orders by customerUsername
    @QueryMapping
    public List<Order> ordersByCustomer(@Argument String customerUsername) throws IOException {
        return orderDataUtil.loadOrders().stream()
                .filter(order -> order.getCustomerUsername().equalsIgnoreCase(customerUsername))
                .toList();
    }

    // Query to retrieve all orders
    @QueryMapping
    public List<Order> allOrders() throws IOException {
        return orderDataUtil.loadOrders();
    }

    // Query to fetch a single order by ID
    @QueryMapping
    public Order order(@Argument String id) throws IOException {
        return orderDataUtil.loadOrders().stream()
                .filter(order -> order.getId().equalsIgnoreCase(id))
                .findFirst()
                .orElse(null);
    }

    // Mutation: Create a new order
    @MutationMapping
    public Order createOrder(@Argument OrderInput input) throws IOException {
        List<OrderProduct> products = input.getProducts().stream()
                .map(productInput -> new OrderProduct(
                        productInput.getProductId(),
                        productInput.getName(),
                        productInput.getQuantity(),
                        productInput.getUnitPrice()
                ))
                .collect(Collectors.toList());

        Order newOrder = new Order(
                UUID.randomUUID().toString(),
                input.getCustomerUsername(),
                products,
                calculateTotalAmount(products) + (float) input.getDeliveryCost(),
                "Pending",
                LocalDateTime.now().toString(),
                input.getCompanyName(),
                input.getEmail(),
                input.getAddress(),
                input.getPhoneNumber(),
                input.getNotes(),
                input.getDeliveryCost(),
                input.getPaymentMethod()
        );

        // Save the order
        orderDataUtil.saveOrder(newOrder);

        // Send to Android app via WebSocket
        ObjectMapper mapper = new ObjectMapper();
        String orderJson = mapper.writeValueAsString(newOrder);
        webSocketHandler.sendOrderUpdate(orderJson);

        return newOrder;
    }

    // Mutation: Update order status
    @MutationMapping
    public Order updateOrderStatus(@Argument String orderId, @Argument String newStatus) throws IOException {
        List<Order> orders = orderDataUtil.loadOrders();

        Order orderToUpdate = orders.stream()
                .filter(order -> order.getId().equalsIgnoreCase(orderId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Order not found: " + orderId));

        List<String> validStatuses = List.of("Pending", "Shipped", "Done");
        if (!validStatuses.contains(newStatus)) {
            throw new IllegalArgumentException("Invalid status: " + newStatus);
        }

        orderToUpdate.setStatus(newStatus);
        orderDataUtil.updateOrder(orderId, orderToUpdate);

        return orderToUpdate;
    }

    // Helper: Calculate total amount
    private float calculateTotalAmount(List<OrderProduct> products) {
        return (float) products.stream()
                .mapToDouble(product -> product.getQuantity() * (product.getUnitPrice() != null ? product.getUnitPrice() : 0))
                .sum();
    }
}
