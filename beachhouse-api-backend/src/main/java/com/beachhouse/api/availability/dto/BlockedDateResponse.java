package com.beachhouse.api.availability.dto;

import java.time.Instant;
import java.time.LocalDate;

public record BlockedDateResponse(
        Long id,
        LocalDate date,
        String reason,
        boolean active,
        Instant createdAt,
        Instant updatedAt) {
}
