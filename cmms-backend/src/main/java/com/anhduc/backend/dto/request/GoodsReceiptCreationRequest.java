package com.anhduc.backend.dto.request;

import com.anhduc.backend.enums.GoodsReceiptStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GoodsReceiptCreationRequest {

    String purchaseOrderCode;
    UUID supplierId;
    UUID storeId;
    String createdBy;
    BigDecimal paidAmount;
    GoodsReceiptStatus status;
    String note;
    List<GoodsReceiptDetailCreationRequest> details = new ArrayList<>();
}
