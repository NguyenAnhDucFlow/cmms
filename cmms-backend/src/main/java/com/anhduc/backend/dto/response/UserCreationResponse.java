package com.anhduc.backend.dto.response;

import com.anhduc.backend.entity.Role;
import com.anhduc.backend.entity.Store;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCreationResponse {
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
    Set<Role> roles;
    Store store;
}
