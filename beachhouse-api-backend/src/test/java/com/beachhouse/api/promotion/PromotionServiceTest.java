package com.beachhouse.api.promotion;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;

import com.beachhouse.api.availability.BlockedDateRepository;
import com.beachhouse.api.promotion.dto.PromotionRequest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class PromotionServiceTest {

    @Mock
    private PromotionRepository promotionRepository;

    @Mock
    private BlockedDateRepository blockedDateRepository;

    @Test
    void activePromotionCanTargetAnAvailableMonday() {
        LocalDate monday = LocalDate.now().plusWeeks(1).with(DayOfWeek.MONDAY);
        PromotionRequest request = new PromotionRequest(
                "Promocion lunes",
                "1/2 Dia",
                new BigDecimal("390.00"),
                monday,
                "gold",
                true);

        when(blockedDateRepository.findByActiveTrueAndBlockedDateIn(List.of(monday)))
                .thenReturn(List.of());
        when(promotionRepository.save(any(Promotion.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        PromotionService service = new PromotionService(promotionRepository, blockedDateRepository);

        assertThatCode(() -> service.createPromotion(request)).doesNotThrowAnyException();
    }
}
