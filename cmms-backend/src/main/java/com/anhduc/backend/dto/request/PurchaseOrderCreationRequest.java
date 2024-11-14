package com.anhduc.backend.dto.request;

import com.anhduc.backend.enums.PurchaseOrderStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PurchaseOrderCreationRequest {

    UUID supplierId;
    UUID storeId;
    Instant estimatedDeliveryDate;
    PurchaseOrderStatus status;
    String note;
    private List<PurchaseOrderDetailCreationRequest> details = new ArrayList<>();;
}
