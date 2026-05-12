package com.beachhouse.api.auth;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DatabaseUserDetailsService implements UserDetailsService {

    private final AdminUserRepository adminUserRepository;

    public DatabaseUserDetailsService(AdminUserRepository adminUserRepository) {
        this.adminUserRepository = adminUserRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AdminUser adminUser = adminUserRepository.findByUsername(username)
                .filter(AdminUser::isActive)
                .orElseThrow(() -> new UsernameNotFoundException("Admin user not found"));

        return User.withUsername(adminUser.getUsername())
                .password(adminUser.getPasswordHash())
                .roles(adminUser.getRole())
                .build();
    }
}
