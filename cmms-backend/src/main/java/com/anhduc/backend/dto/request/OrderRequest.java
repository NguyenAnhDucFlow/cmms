package com.anhduc.backend.dto.request;

import com.anhduc.backend.enums.PaymentMethod;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderRequest {
    String shippingAddress;
    PaymentMethod paymentMethod;
    List<OrderDetailRequest> orderDetails;

}
