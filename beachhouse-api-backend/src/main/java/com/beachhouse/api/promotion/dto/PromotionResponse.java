package com.beachhouse.api.promotion.dto;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

public record PromotionResponse(
        Long id,
        String title,
        String packageType,
        BigDecimal promotionalPrice,
        LocalDate targetDate,
        String visualTheme,
        boolean active,
        Instant createdAt,
        Instant updatedAt) {
}
