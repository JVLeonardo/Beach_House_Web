package com.beachhouse.api.availability.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record BlockedDateRequest(
        @NotNull LocalDate date,
        @NotBlank @Size(max = 180) String reason) {
}
