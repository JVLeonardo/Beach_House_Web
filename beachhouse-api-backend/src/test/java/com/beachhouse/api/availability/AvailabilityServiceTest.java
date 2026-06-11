package com.beachhouse.api.availability;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class AvailabilityServiceTest {

    @Mock
    private BlockedDateRepository blockedDateRepository;

    @Test
    void mondayIsAvailableWhenItIsNotBlocked() {
        LocalDate monday = LocalDate.now().plusWeeks(1).with(java.time.DayOfWeek.MONDAY);
        when(blockedDateRepository.findByActiveTrueAndBlockedDateBetween(monday, monday))
                .thenReturn(List.of());

        AvailabilityService service = new AvailabilityService(blockedDateRepository);

        assertThat(service.getAvailability(monday, monday).getFirst().available()).isTrue();
    }
}
