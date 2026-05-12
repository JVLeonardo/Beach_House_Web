package com.beachhouse.api.promotion;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "promotions")
public class Promotion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 120)
    private String title;

    @Column(name = "package_type", nullable = false, length = 60)
    private String packageType;

    @Column(name = "promotional_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal promotionalPrice;

    @Column(name = "target_date", nullable = false)
    private LocalDate targetDate;

    @Column(name = "visual_theme", nullable = false, length = 80)
    private String visualTheme;

    @Column(nullable = false)
    private boolean active;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    protected Promotion() {
    }

    public Promotion(String title, String packageType, BigDecimal promotionalPrice, LocalDate targetDate,
            String visualTheme, boolean active) {
        this.title = title;
        this.packageType = packageType;
        this.promotionalPrice = promotionalPrice;
        this.targetDate = targetDate;
        this.visualTheme = visualTheme;
        this.active = active;
    }

    @PrePersist
    void prePersist() {
        Instant now = Instant.now();
        createdAt = now;
        updatedAt = now;
    }

    @PreUpdate
    void preUpdate() {
        updatedAt = Instant.now();
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getPackageType() {
        return packageType;
    }

    public BigDecimal getPromotionalPrice() {
        return promotionalPrice;
    }

    public LocalDate getTargetDate() {
        return targetDate;
    }

    public String getVisualTheme() {
        return visualTheme;
    }

    public boolean isActive() {
        return active;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void toggle() {
        this.active = !this.active;
    }
}
