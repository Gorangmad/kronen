package com.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Map;

@Document(collection = "products")  // 🔥 Updated to "products"
public class Product {
    @Id
    private String id;  // MongoDB document ID
    private int productId;
    private String category;
    private String name;
    private Double unitPrice;
    private Map<String, Double> unitPrices;  // Handles variable sizes like pizza (30cm, 38cm)
    private String description;

    // ✅ Constructors
    public Product() {}

    public Product(int productId, String category, String name, Double unitPrice, Map<String, Double> unitPrices, String description) {
        this.productId = productId;
        this.category = category;
        this.name = name;
        this.unitPrice = unitPrice;
        this.unitPrices = unitPrices;
        this.description = description;
    }

    // ✅ Getters & Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public int getProductId() { return productId; }
    public void setProductId(int productId) { this.productId = productId; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Double getUnitPrice() { return unitPrice; }
    public void setUnitPrice(Double unitPrice) { this.unitPrice = unitPrice; }

    public Map<String, Double> getUnitPrices() { return unitPrices; }
    public void setUnitPrices(Map<String, Double> unitPrices) { this.unitPrices = unitPrices; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
