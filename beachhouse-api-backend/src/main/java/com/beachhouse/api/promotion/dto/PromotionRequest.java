package com.beachhouse.api.promotion.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record PromotionRequest(
        @NotBlank @Size(max = 120) String title,
        @NotBlank @Size(max = 60) String packageType,
        @NotNull @DecimalMin("1.00") BigDecimal promotionalPrice,
        @NotNull LocalDate targetDate,
        @NotBlank @Size(max = 80) String visualTheme,
        boolean active) {
}
