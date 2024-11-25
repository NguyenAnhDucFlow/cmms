package com.anhduc.backend.dto.request;

import com.anhduc.backend.enums.PartnerType;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerCreationRequest {
    String username;
    String phone;
    String email;
    String password;
    LocalDate dateOfBirth;
    String firstName;
    String lastName;
    String province;
    String district;
    String ward;
    String address;
    String taxCode;
    String note;
    PartnerType partnerType;
    UUID storeId;
}
