package com.anhduc.backend.dto;

import com.anhduc.backend.enums.PurchaseOrderStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SearchPurchaseOrderDTO {
    UUID storeId;
    PurchaseOrderStatus status;
    String purchaseOrderCode;
    @Builder.Default
    Integer currentPage = 0;
    @Builder.Default
    Integer size = 8;
}
