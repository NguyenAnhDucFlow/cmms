package com.anhduc.backend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ListMaterialForSaleDTO {
    UUID id;
    String materialCode;
    String name;
    String coverImageUrl;
    List<String> images;
    BigDecimal salePrice;
    double quantity;
    double availableQuantity;
    double reservedQuantity;
    String unitName;
    String category;
}
