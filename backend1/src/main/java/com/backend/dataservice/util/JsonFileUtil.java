package com.backend.dataservice.util;

// Utility class for reading and writing JSON files using Jackson ObjectMapper.

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Component
public class JsonFileUtil {
    private static final String BASE_PATH = "";
    private final ObjectMapper objectMapper = new ObjectMapper();

    public <T> List<T> readJsonFile(String fileName, TypeReference<List<T>> typeReference) throws IOException {
        // Load from classpath (inside the JAR)
        ClassPathResource resource = new ClassPathResource("data/" + fileName);

        if (!resource.exists()) {
            throw new IOException("File not found in classpath: " + fileName);
        }

        try (InputStream inputStream = resource.getInputStream();
             InputStreamReader reader = new InputStreamReader(inputStream, StandardCharsets.UTF_8)) {

            // Read JSON as generic map
            var rootNode = objectMapper.readTree(reader);

            // If JSON has a "menu" structure, extract products
            if (rootNode.has("menu")) {
                var menuNode = rootNode.get("menu");
                List<T> allProducts = new ArrayList<>();

                // Iterate through categories inside "menu"
                menuNode.fields().forEachRemaining(entry -> {
                    try {
                        List<T> products = objectMapper.readValue(entry.getValue().toString(), typeReference);
                        allProducts.addAll(products);
                    } catch (IOException e) {
                        throw new RuntimeException("Error parsing category: " + entry.getKey(), e);
                    }
                });

                return allProducts;
            }

            // If JSON is already a flat list, return as-is
            return objectMapper.readValue(rootNode.toString(), typeReference);
        }
    }



    // Writes a list of objects to a JSON file.
    public <T> void writeJsonFile(String fileName, List<T> data) throws IOException {
        objectMapper.writeValue(new File(BASE_PATH + fileName), data);
    }
}