
package com.backend.model;

// Represents a product within an order, including product details and pricing.

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class OrderProduct {
    private String productId;
    private String name;
    private int quantity;
    private Double unitPrice;
    private String selectedSize;

    // Constructor for initializing order product details
    public OrderProduct(String productId, String name, int quantity, Double unitPrice, String selectedSize) {
        this.productId = productId;
        this.name = name;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.selectedSize = selectedSize;
    }
}

