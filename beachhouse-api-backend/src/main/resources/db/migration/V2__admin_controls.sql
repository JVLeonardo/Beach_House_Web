CREATE TABLE blocked_dates (
    id BIGSERIAL PRIMARY KEY,
    blocked_date DATE NOT NULL UNIQUE,
    reason VARCHAR(180) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE promotions (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(120) NOT NULL,
    package_type VARCHAR(60) NOT NULL,
    promotional_price NUMERIC(10, 2) NOT NULL,
    target_date DATE NOT NULL,
    visual_theme VARCHAR(80) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_blocked_dates_active_date ON blocked_dates (active, blocked_date);
CREATE INDEX idx_promotions_active_date ON promotions (active, target_date);
