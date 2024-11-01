package com.anhduc.backend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ListStoreMaterialResponse {

    UUID id;
    String materialCode;
    String name;
    String coverImageUrl;
    BigDecimal salePrice;
    BigDecimal costPrice;
    double quantity;
}
