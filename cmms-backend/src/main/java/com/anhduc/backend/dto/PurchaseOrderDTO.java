package com.anhduc.backend.dto;

import com.anhduc.backend.enums.PurchaseOrderStatus;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PurchaseOrderDTO {
    UUID id;
    String purchaseOrderCode;
    String supplierName;
    String storeName;
    int totalQuantity;
    Instant estimatedDeliveryDate;
    BigDecimal totalAmount;
    PurchaseOrderStatus status;
    int totalItems;
    String createdBy;
    Instant createdAt;
    Instant updatedAt;
    String note;
    List<PurchaseOrderDetailDTO> details;
}


