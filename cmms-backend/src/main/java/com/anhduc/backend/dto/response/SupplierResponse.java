package com.anhduc.backend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SupplierResponse {

    UUID id;
    String name;
    String phone;
    String address;
    String email;
    String province;
    String district;
    String ward;
    String note;
}
