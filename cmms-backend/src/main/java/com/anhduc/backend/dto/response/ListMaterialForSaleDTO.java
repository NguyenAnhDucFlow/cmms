package com.anhduc.backend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ListMaterialForSaleDTO {
    String materialCode;
    String name;
    String coverImageUrl;
    List<String> images;
    BigDecimal salePrice;
    double quantity;
    double availableQuantity;
    double reservedQuantity;
    String unitName;
}
