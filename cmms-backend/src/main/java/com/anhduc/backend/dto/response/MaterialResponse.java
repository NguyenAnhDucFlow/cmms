package com.anhduc.backend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MaterialResponse {

    UUID id;
    String materialCode;
    String barcode;
    String name;
    BigDecimal costPrice;
    BigDecimal salePrice;
    List<String> images;
    float weightValue;
    String weightUnit;
    String description;
    int minStock;
    int maxStock;
    String coverImageUrl;
    Boolean isPoint;
    Boolean isActive;
    String categoryName;
    String brandName;
}
