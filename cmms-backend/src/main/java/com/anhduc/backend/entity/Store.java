package com.anhduc.backend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "stores")
public class Store extends AuditAble{

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;
    String name;
    String address;
    String phone;
    String email;
    String province;
    String district;
    String ward;
    boolean isCentralWarehouse = false;
    @OneToOne(mappedBy = "store")
    @JsonManagedReference
    User user;


}
