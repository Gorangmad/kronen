package com.backend.model;

public class OpeningHours {
    private String montagSamstag;
    private String sonntagFeiertage;
    private String dienstag;

    public OpeningHours() {}

    public OpeningHours(String montagSamstag, String sonntagFeiertage, String dienstag) {
        this.montagSamstag = montagSamstag;
        this.sonntagFeiertage = sonntagFeiertage;
        this.dienstag = dienstag;
    }

    // Getters & Setters
    public String getMontagSamstag() { return montagSamstag; }
    public void setMontagSamstag(String montagSamstag) { this.montagSamstag = montagSamstag; }
    public String getSonntagFeiertage() { return sonntagFeiertage; }
    public void setSonntagFeiertage(String sonntagFeiertage) { this.sonntagFeiertage = sonntagFeiertage; }
    public String getDienstag() { return dienstag; }
    public void setDienstag(String dienstag) { this.dienstag = dienstag; }
}
