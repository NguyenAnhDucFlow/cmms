package com.anhduc.backend.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PurchaseOrderDetailCreationRequest {

    String materialCode;
    int quantity;
    BigDecimal costPrice;
    String name;
    String unitName;
}
