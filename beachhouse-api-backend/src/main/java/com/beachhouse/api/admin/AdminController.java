package com.beachhouse.api.admin;

import java.util.List;

import com.beachhouse.api.availability.AvailabilityService;
import com.beachhouse.api.availability.dto.BlockedDateRequest;
import com.beachhouse.api.availability.dto.BlockedDateResponse;
import com.beachhouse.api.promotion.PromotionService;
import com.beachhouse.api.promotion.dto.PromotionRequest;
import com.beachhouse.api.promotion.dto.PromotionResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AvailabilityService availabilityService;
    private final PromotionService promotionService;

    public AdminController(AvailabilityService availabilityService, PromotionService promotionService) {
        this.availabilityService = availabilityService;
        this.promotionService = promotionService;
    }

    @GetMapping("/blocked-dates")
    public List<BlockedDateResponse> listBlockedDates() {
        return availabilityService.listBlockedDates();
    }

    @PostMapping("/blocked-dates")
    @ResponseStatus(HttpStatus.CREATED)
    public BlockedDateResponse createBlockedDate(@Valid @RequestBody BlockedDateRequest request) {
        return availabilityService.createBlockedDate(request);
    }

    @PatchMapping("/blocked-dates/{id}/toggle")
    public BlockedDateResponse toggleBlockedDate(@PathVariable Long id) {
        return availabilityService.toggleBlockedDate(id);
    }

    @DeleteMapping("/blocked-dates/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBlockedDate(@PathVariable Long id) {
        availabilityService.deleteBlockedDate(id);
    }

    @GetMapping("/promotions")
    public List<PromotionResponse> listPromotions() {
        return promotionService.listPromotions();
    }

    @PostMapping("/promotions")
    @ResponseStatus(HttpStatus.CREATED)
    public PromotionResponse createPromotion(@Valid @RequestBody PromotionRequest request) {
        return promotionService.createPromotion(request);
    }

    @PatchMapping("/promotions/{id}/toggle")
    public PromotionResponse togglePromotion(@PathVariable Long id) {
        return promotionService.togglePromotion(id);
    }

    @DeleteMapping("/promotions/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePromotion(@PathVariable Long id) {
        promotionService.deletePromotion(id);
    }
}
