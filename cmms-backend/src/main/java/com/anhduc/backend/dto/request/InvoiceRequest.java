package com.anhduc.backend.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class InvoiceRequest {

    UUID customerId;
    UUID storeId;
    BigDecimal paidAmount;
    private List<InvoiceDetailDTORequest> details;
    private String note;
}
