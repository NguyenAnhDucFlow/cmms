package com.anhduc.backend.dto.response;

import com.anhduc.backend.enums.OrderStatus;
import com.anhduc.backend.enums.PaymentMethod;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderResponse {

    UUID id;
    String orderCode;
    String createdBy;
    String firstName;
    String lastName;
    String email;
    double tax;
    Instant createdAt;
    BigDecimal totalAmount;
    BigDecimal paidAmount;
    BigDecimal debtAmount;
    OrderStatus status;
    String shippingAddress;
    PaymentMethod paymentMethod;
    private List<OrderDetailResponse> details;
}
