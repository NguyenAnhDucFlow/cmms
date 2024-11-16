package com.anhduc.backend.dto.response;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Data
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PurchaseOrderResponseDTO {
    UUID id;
    String purchaseOrderCode;
    String supplierName;
    Instant createdAt;
    Instant estimatedDeliveryDate;
    BigDecimal totalAmount;
    String status;

    public PurchaseOrderResponseDTO(UUID id, String purchaseOrderCode, String supplierName,
                                    Instant createdAt, Instant estimatedDeliveryDate,
                                    BigDecimal totalAmount, String status) {
        this.id = id;
        this.purchaseOrderCode = purchaseOrderCode;
        this.supplierName = supplierName;
        this.createdAt = createdAt;
        this.estimatedDeliveryDate = estimatedDeliveryDate;
        this.totalAmount = totalAmount;
        this.status = status;
    }
}


