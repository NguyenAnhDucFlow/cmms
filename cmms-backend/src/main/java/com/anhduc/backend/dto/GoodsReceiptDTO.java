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
public class GoodsReceiptDTO {
    UUID id;
    String goodsReceiptCode;
    String supplierName;
    String storeName;
    int totalQuantity;
    BigDecimal totalAmount;
    PurchaseOrderStatus status;
    BigDecimal paidAmount;
    int totalItems;
    String createdBy;
    Instant createdAt;
    Instant updatedAt;
    List<GoodsReceiptDetailDTO> details;
}


