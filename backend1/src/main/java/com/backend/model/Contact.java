package com.backend.model;

import java.util.List;

public class Contact {
    private List<String> phoneNumbers;

    public Contact() {}

    public Contact(List<String> phoneNumbers) {
        this.phoneNumbers = phoneNumbers;
    }

    // Getters & Setters
    public List<String> getPhoneNumbers() { return phoneNumbers; }
    public void setPhoneNumbers(List<String> phoneNumbers) { this.phoneNumbers = phoneNumbers; }
}

