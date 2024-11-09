package com.anhduc.backend.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MaterialFilterDTO {
    UUID storeId;
    String name;
    UUID category;
    UUID brand;
    Boolean isActive;
    Boolean hasStock;
    Boolean belowMinStock;
    Boolean aboveMaxStock;
    Boolean outOfStock;
    @Builder.Default
    Integer currentPage = 0;
    @Builder.Default
    Integer size = 8;
}
