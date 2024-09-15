package com.anhduc.backend.dto.response;

import com.anhduc.backend.entity.Permission;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoleResponse {

    UUID id;
    String name;
    Set<Permission> permissions;
}
