package com.beachhouse.api.promotion;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;

import com.beachhouse.api.availability.BlockedDateRepository;
import com.beachhouse.api.common.BadRequestException;
import com.beachhouse.api.promotion.dto.PromotionRequest;
import com.beachhouse.api.promotion.dto.PromotionResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PromotionService {

    private final PromotionRepository promotionRepository;
    private final BlockedDateRepository blockedDateRepository;

    public PromotionService(PromotionRepository promotionRepository, BlockedDateRepository blockedDateRepository) {
        this.promotionRepository = promotionRepository;
        this.blockedDateRepository = blockedDateRepository;
    }

    @Transactional(readOnly = true)
    public List<PromotionResponse> listPromotions() {
        return promotionRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<PromotionResponse> listActivePromotions() {
        return promotionRepository.findByActiveTrueAndTargetDateGreaterThanEqualOrderByTargetDateAsc(LocalDate.now())
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public PromotionResponse createPromotion(PromotionRequest request) {
        validateTargetDate(request.targetDate(), request.active());
        Promotion promotion = new Promotion(
                request.title(),
                request.packageType(),
                request.promotionalPrice(),
                request.targetDate(),
                request.visualTheme(),
                request.active());
        return toResponse(promotionRepository.save(promotion));
    }

    @Transactional
    public PromotionResponse togglePromotion(Long id) {
        Promotion promotion = promotionRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Promocion no encontrada"));
        if (!promotion.isActive()) {
            validateTargetDate(promotion.getTargetDate(), true);
        }
        promotion.toggle();
        return toResponse(promotion);
    }

    @Transactional
    public void deletePromotion(Long id) {
        if (!promotionRepository.existsById(id)) {
            throw new BadRequestException("Promocion no encontrada");
        }
        promotionRepository.deleteById(id);
    }

    private void validateTargetDate(LocalDate targetDate, boolean mustBeAvailable) {
        if (!mustBeAvailable) {
            return;
        }
        if (targetDate.isBefore(LocalDate.now())) {
            throw new BadRequestException("No se puede activar una promocion para una fecha pasada");
        }
        if (targetDate.getDayOfWeek() == DayOfWeek.MONDAY) {
            throw new BadRequestException("Los lunes no se aceptan reservas ni promociones");
        }
        boolean blocked = !blockedDateRepository.findByActiveTrueAndBlockedDateIn(List.of(targetDate)).isEmpty();
        if (blocked) {
            throw new BadRequestException("La fecha objetivo esta bloqueada");
        }
    }

    private PromotionResponse toResponse(Promotion promotion) {
        return new PromotionResponse(
                promotion.getId(),
                promotion.getTitle(),
                promotion.getPackageType(),
                promotion.getPromotionalPrice(),
                promotion.getTargetDate(),
                promotion.getVisualTheme(),
                promotion.isActive(),
                promotion.getCreatedAt(),
                promotion.getUpdatedAt());
    }
}
