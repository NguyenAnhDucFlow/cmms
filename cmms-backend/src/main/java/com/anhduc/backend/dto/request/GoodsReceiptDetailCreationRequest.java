package com.anhduc.backend.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GoodsReceiptDetailCreationRequest {

    String materialCode;
    int quantity;
    BigDecimal costPrice;
    String name;
    String unitName;
}
