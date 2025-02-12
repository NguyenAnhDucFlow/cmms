package com.anhduc.backend.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SupplierCreationRequest {
    String name;
    String phone;
    String address;
    String email;
    String province;
    String district;
    String ward;
    String note;
}
