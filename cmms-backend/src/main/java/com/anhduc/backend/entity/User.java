package com.anhduc.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "users")
public class User extends AuditAble{

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;
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
    String note;
    @ManyToMany
    Set<Role> roles;
    @OneToOne
    @JsonBackReference
    Store store;

}
