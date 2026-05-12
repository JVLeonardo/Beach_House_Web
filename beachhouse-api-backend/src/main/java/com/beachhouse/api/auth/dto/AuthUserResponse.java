package com.beachhouse.api.auth.dto;

import java.util.List;

public record AuthUserResponse(
        String username,
        List<String> roles,
        boolean authenticated) {
}
