package com.beachhouse.api.availability;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BlockedDateRepository extends JpaRepository<BlockedDate, Long> {

    Optional<BlockedDate> findByBlockedDate(LocalDate blockedDate);

    List<BlockedDate> findByActiveTrueAndBlockedDateBetween(LocalDate from, LocalDate to);
    
    List<BlockedDate> findByActiveTrueAndBlockedDateIn(Collection<LocalDate> dates);
}
