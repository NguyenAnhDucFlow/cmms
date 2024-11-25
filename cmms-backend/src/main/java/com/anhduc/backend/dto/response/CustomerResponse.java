package com.anhduc.backend.dto.response;

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
public class CustomerResponse {
    UUID id;
    String username;
    String phone;
    String email;
    LocalDate dateOfBirth;
    String firstName;
    String lastName;
    String province;
    String district;
    String ward;
    String address;
    String note;
    String customerCode;
    String taxCode;
    PartnerType partnerType;
}
