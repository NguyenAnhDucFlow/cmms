package com.anhduc.backend.entity;

import com.anhduc.backend.enums.PartnerType;
import com.anhduc.backend.enums.ShipperStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "shippers")
public class Shipper extends AuditAble{

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;
    @Column(unique = true, nullable = false)
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
