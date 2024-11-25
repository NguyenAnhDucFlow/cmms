package com.anhduc.backend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {

     UUID id;
     String email;
     String firstName;
     String lastName;
     Boolean noPassword;
     Set<RoleResponse> roles;
}
