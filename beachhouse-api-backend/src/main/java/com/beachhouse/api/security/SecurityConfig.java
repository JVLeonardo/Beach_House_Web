package com.beachhouse.api.security;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // Encoder principal para passwords
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Este manager es el que usa el login para pedirle a Spring que autentique
    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                // Crea sesion solo cuando haga falta, por ejemplo despues del login correcto
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/actuator/health", "/api/public/**", "/api/auth/login").permitAll()

                        .requestMatchers("/api/auth/logout", "/api/auth/me", "/api/admin/**").hasRole("ADMIN")
                        // Cualquier ruta no declarada se bloquea por seguridad.
                        .anyRequest().denyAll())
                // No usamos el formulario default de Spring, porque el login lo maneja nuestro front.
                .formLogin(form -> form.disable())

                // Se deja Basic para peticiones admin/fetch cuando no alcanza con la cookie de sesion.
                .httpBasic(Customizer.withDefaults())
                // Logout custom desde el controller, no el endpoint automatico de Spring.
                .logout(logout -> logout.disable())
                .exceptionHandling(exception -> exception
                        // 401: no inicio sesion o mando credenciales mal.
                        .authenticationEntryPoint((request, response, authException) -> response.sendError(401))
                        // 403: si esta autenticado pero no tiene el rol necesario.
                        .accessDeniedHandler((request, response, accessDeniedException) -> response.sendError(403)));

        return http.build();
    }

    // Config para que el front local pueda hablar con el backend
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(List.of(
                "http://localhost:*",
                "http://127.0.0.1:*",
                "http://192.168.*.*:*",
                "http://10.*.*.*:*",
                "http://172.16.*.*:*",
                "http://172.17.*.*:*",
                "http://172.18.*.*:*",
                "http://172.19.*.*:*",
                "http://172.20.*.*:*",
                "http://172.21.*.*:*",
                "http://172.22.*.*:*",
                "http://172.23.*.*:*",
                "http://172.24.*.*:*",
                "http://172.25.*.*:*",
                "http://172.26.*.*:*",
                "http://172.27.*.*:*",
                "http://172.28.*.*:*",
                "http://172.29.*.*:*",
                "http://172.30.*.*:*",
                "http://172.31.*.*:*",
                "null"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "X-Requested-With"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
