package com.beachhouse.api.common;

import java.time.Instant;
import java.util.Map;

// Formato comun para devolver errores al front
public record ApiErrorResponse(
        Instant timestamp,
        int status,
        String message,
        Map<String, String> errors) {
}
