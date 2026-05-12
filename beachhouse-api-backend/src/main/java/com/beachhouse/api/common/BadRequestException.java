package com.beachhouse.api.common;

// Excepcion para errores controlados del negocio
// Por ejemplo fechas invalidas, promos que no se pueden activar, etc
public class BadRequestException extends RuntimeException {

    public BadRequestException(String message) {
        super(message);
    }
}
