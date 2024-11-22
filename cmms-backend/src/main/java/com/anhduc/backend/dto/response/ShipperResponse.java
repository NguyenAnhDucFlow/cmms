package com.anhduc.backend.dto.response;

import com.anhduc.backend.enums.PartnerType;
import com.anhduc.backend.enums.ShipperStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ShipperResponse {

    UUID id;
    String shipperCode;
    String name;
    String phone;
    String email;
    LocalDate dateOfBirth;
    String province;
    String district;
    String ward;
    String address;
    String note;
    PartnerType partnerType;
    ShipperStatus shipperStatus;
}
