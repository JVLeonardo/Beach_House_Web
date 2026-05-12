CREATE TABLE admin_users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(80) NOT NULL UNIQUE,
    password_hash VARCHAR(100) NOT NULL,
    user_role VARCHAR(40) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_admin_users_username_active ON admin_users(username, active);

INSERT INTO admin_users (username, password_hash, user_role, active)
VALUES (
    'admin',
    '$2a$10$WPKuOj7CBCxc1uNZiVK5..G7sw8B9SEOticSrpEsTFLPgrqiZ3Cd.',
    'ADMIN',
    TRUE
);
