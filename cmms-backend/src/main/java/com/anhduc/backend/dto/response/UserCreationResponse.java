package com.anhduc.backend.dto.response;

import com.anhduc.backend.entity.Role;
import com.anhduc.backend.entity.Store;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCreationResponse {
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
    Role role;
    Store store;
}
