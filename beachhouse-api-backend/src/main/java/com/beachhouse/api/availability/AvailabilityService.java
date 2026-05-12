package com.beachhouse.api.availability;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import com.beachhouse.api.availability.dto.AvailabilityDayResponse;
import com.beachhouse.api.availability.dto.BlockedDateRequest;
import com.beachhouse.api.availability.dto.BlockedDateResponse;
import com.beachhouse.api.common.BadRequestException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AvailabilityService {

    private final BlockedDateRepository blockedDateRepository;

    public AvailabilityService(BlockedDateRepository blockedDateRepository) {
        this.blockedDateRepository = blockedDateRepository;
    }

    @Transactional(readOnly = true)
    public List<BlockedDateResponse> listBlockedDates() {
        return blockedDateRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public BlockedDateResponse createBlockedDate(BlockedDateRequest request) {
        BlockedDate blockedDate = blockedDateRepository.findByBlockedDate(request.date())
                .map(existing -> {
                    existing.setReason(request.reason());
                    if (!existing.isActive()) {
                        existing.toggle();
                    }
                    return existing;
                })
                .orElseGet(() -> new BlockedDate(request.date(), request.reason()));

        return toResponse(blockedDateRepository.save(blockedDate));
    }

    @Transactional
    public BlockedDateResponse toggleBlockedDate(Long id) {
        BlockedDate blockedDate = blockedDateRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Fecha bloqueada no encontrada"));
        blockedDate.toggle();
        return toResponse(blockedDate);
    }

    @Transactional
    public void deleteBlockedDate(Long id) {
        if (!blockedDateRepository.existsById(id)) {
            throw new BadRequestException("Fecha bloqueada no encontrada");
        }
        blockedDateRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<AvailabilityDayResponse> getAvailability(LocalDate from, LocalDate to) {
        if (from == null || to == null || to.isBefore(from)) {
            throw new BadRequestException("Rango de fechas invalido");
        }

        Map<LocalDate, BlockedDate> blockedDates = blockedDateRepository
                .findByActiveTrueAndBlockedDateBetween(from, to)
                .stream()
                .collect(Collectors.toMap(BlockedDate::getBlockedDate, Function.identity()));

        LocalDate today = LocalDate.now();
        return from.datesUntil(to.plusDays(1))
                .map(date -> toAvailabilityDay(date, today, blockedDates.get(date)))
                .toList();
    }

    private AvailabilityDayResponse toAvailabilityDay(LocalDate date, LocalDate today, BlockedDate blockedDate) {
        if (date.isBefore(today)) {
            return new AvailabilityDayResponse(date, false, "Fecha pasada");
        }
        if (date.getDayOfWeek() == DayOfWeek.MONDAY) {
            return new AvailabilityDayResponse(date, false, "Lunes cerrado por limpieza y administracion");
        }
        if (blockedDate != null) {
            return new AvailabilityDayResponse(date, false, blockedDate.getReason());
        }
        return new AvailabilityDayResponse(date, true, "Disponible");
    }

    private BlockedDateResponse toResponse(BlockedDate blockedDate) {
        return new BlockedDateResponse(
                blockedDate.getId(),
                blockedDate.getBlockedDate(),
                blockedDate.getReason(),
                blockedDate.isActive(),
                blockedDate.getCreatedAt(),
                blockedDate.getUpdatedAt());
    }
}
