package com.beachhouse.api.publicapi;

import java.time.LocalDate;
import java.util.List;

import com.beachhouse.api.availability.AvailabilityService;
import com.beachhouse.api.availability.dto.AvailabilityDayResponse;
import com.beachhouse.api.promotion.PromotionService;
import com.beachhouse.api.promotion.dto.PromotionResponse;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public")
public class PublicController {

    private final AvailabilityService availabilityService;
    private final PromotionService promotionService;

    public PublicController(AvailabilityService availabilityService, PromotionService promotionService) {
        this.availabilityService = availabilityService;
        this.promotionService = promotionService;
    }

    @GetMapping("/promotions/active")
    public List<PromotionResponse> activePromotions() {
        return promotionService.listActivePromotions();
    }

    @GetMapping("/availability")
    public List<AvailabilityDayResponse> availability(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        return availabilityService.getAvailability(from, to);
    }
}
