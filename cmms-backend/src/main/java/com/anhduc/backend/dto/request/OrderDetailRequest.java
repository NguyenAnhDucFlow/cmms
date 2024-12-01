package com.anhduc.backend.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderDetailRequest {
    String materialCode;
    int quantity;
    BigDecimal costPrice;
    BigDecimal totalPrice;
    String name;
    String unitName;


}
