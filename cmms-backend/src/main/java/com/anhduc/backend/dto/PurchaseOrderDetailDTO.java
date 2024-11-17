package com.anhduc.backend.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PurchaseOrderDetailDTO {
    UUID id;
    String materialCode;
    int quantity;
    BigDecimal costPrice;
    BigDecimal totalPrice;
    String name;
    String unitName;
}

