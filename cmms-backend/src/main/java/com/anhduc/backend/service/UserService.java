package com.anhduc.backend.service;

import com.anhduc.backend.dto.request.UserCreationRequest;
import com.anhduc.backend.dto.response.UserCreationResponse;
import com.anhduc.backend.entity.Role;
import com.anhduc.backend.entity.User;
import com.anhduc.backend.exception.AppException;
import com.anhduc.backend.exception.ErrorCode;
import com.anhduc.backend.repository.RoleRepository;
import com.anhduc.backend.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.UUID;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class UserService {

    UserRepository userRepository;
    ModelMapper modelMapper;
    PasswordEncoder passwordEncoder;
    RoleRepository roleRepository;

    public UserCreationResponse create(UserCreationRequest userCreationRequest) {
        User user = modelMapper.map(userCreationRequest, User.class);
        user.setPassword(passwordEncoder.encode(userCreationRequest.getPassword()));
        HashSet<Role> roles = new HashSet<>();
        Role role = roleRepository.findByName("ROLE_USER").orElseThrow(
                () -> new AppException(ErrorCode.USER_ROLE_NOT_EXISTED)
        );
        roles.add(role);
        user.setRoles(roles);
        user = userRepository.save(user);
        return modelMapper.map(user, UserCreationResponse.class);
    }

    public void delete(UUID userId) {
        userRepository.deleteById(userId);
    }
}
