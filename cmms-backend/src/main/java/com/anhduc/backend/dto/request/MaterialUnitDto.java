package com.anhduc.backend.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MaterialUnitDto {

    UUID unitId;
    double conversionRate;
    @Builder.Default
    BigDecimal price = BigDecimal.ZERO;

}
