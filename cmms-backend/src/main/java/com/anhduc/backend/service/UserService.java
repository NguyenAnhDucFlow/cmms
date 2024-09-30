package com.anhduc.backend.service;

import com.anhduc.backend.dto.request.UserCreationRequest;
import com.anhduc.backend.dto.response.UserCreationResponse;
import com.anhduc.backend.entity.Role;
import com.anhduc.backend.entity.Store;
import com.anhduc.backend.entity.User;
import com.anhduc.backend.exception.AppException;
import com.anhduc.backend.exception.ErrorCode;
import com.anhduc.backend.repository.RoleRepository;
import com.anhduc.backend.repository.StoreRepository;
import com.anhduc.backend.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class UserService {

    UserRepository userRepository;
    ModelMapper modelMapper;
    PasswordEncoder passwordEncoder;
    RoleRepository roleRepository;
    StoreRepository storeRepository;

    public UserCreationResponse create(UserCreationRequest request) {
        User user = modelMapper.map(request, User.class);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        Role role = roleRepository.findByName(request.getRole()).orElseThrow(
                () -> new AppException(ErrorCode.USER_ROLE_NOT_EXISTED));
        user.setRole(role);
        Store store = storeRepository.findByName(request.getStore()).orElseThrow(
                () -> new AppException(ErrorCode.STORE_NOT_EXISTED)
        );
        user.setStore(store);
        user = userRepository.save(user);
        return modelMapper.map(user, UserCreationResponse.class);
    }

    public void delete(UUID userId) {
        userRepository.deleteById(userId);
    }

    public UserCreationResponse getMyInfo() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new AppException(ErrorCode.USER_EXISTED)
        );
        return modelMapper.map(user, UserCreationResponse.class);
    }
}
