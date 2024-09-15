package com.anhduc.backend.service;

import com.anhduc.backend.dto.response.RoleResponse;
import com.anhduc.backend.entity.Role;
import com.anhduc.backend.repository.RoleRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class RoleService {

    RoleRepository roleRepository;
    ModelMapper modelMapper;

    public List<RoleResponse> findAll() {
        return roleRepository.findAll().stream()
                .map(this::convertToResponse)
                .toList();
    }

    private RoleResponse convertToResponse(Role role) {
        return modelMapper.map(role, RoleResponse.class);
    }
}
