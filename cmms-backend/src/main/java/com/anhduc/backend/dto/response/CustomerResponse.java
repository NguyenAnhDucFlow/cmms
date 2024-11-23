package com.anhduc.backend.dto.response;

import com.anhduc.backend.enums.PartnerType;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerResponse {
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
