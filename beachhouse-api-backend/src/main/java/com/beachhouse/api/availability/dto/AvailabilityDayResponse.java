package com.beachhouse.api.availability.dto;

import java.time.LocalDate;

public record AvailabilityDayResponse(
        LocalDate date,
        boolean available,
        String reason) {
}
