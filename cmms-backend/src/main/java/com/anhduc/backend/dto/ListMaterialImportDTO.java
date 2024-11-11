package com.anhduc.backend.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ListMaterialImportDTO {
    UUID id;
    String materialCode;
    String name;
    String coverImageUrl;
    BigDecimal costPrice;
    double quantity;
    String unitName;
}
