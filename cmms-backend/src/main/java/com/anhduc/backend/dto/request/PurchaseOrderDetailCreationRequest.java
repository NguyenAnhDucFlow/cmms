package com.anhduc.backend.dto.request;

import com.anhduc.backend.entity.PurchaseOrder;
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
    BigDecimal unitPrice;
}
