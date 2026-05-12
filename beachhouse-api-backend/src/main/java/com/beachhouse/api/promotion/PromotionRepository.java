package com.beachhouse.api.promotion;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PromotionRepository extends JpaRepository<Promotion, Long> {

    List<Promotion> findByActiveTrueAndTargetDateGreaterThanEqualOrderByTargetDateAsc(LocalDate from);
}
