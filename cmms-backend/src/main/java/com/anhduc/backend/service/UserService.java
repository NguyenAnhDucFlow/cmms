package com.anhduc.backend.service;

import com.anhduc.backend.dto.request.CustomerCreationRequest;
import com.anhduc.backend.dto.request.UserCreationRequest;
import com.anhduc.backend.dto.response.CustomerResponse;
import com.anhduc.backend.dto.response.UserCreationResponse;
import com.anhduc.backend.entity.Role;
import com.anhduc.backend.entity.Store;
import com.anhduc.backend.entity.User;
import com.anhduc.backend.enums.RoleType;
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

import java.util.HashSet;
import java.util.List;
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
        HashSet<Role> roles = new HashSet<>();
        Role role = roleRepository.findByName(request.getRole()).orElseThrow(
                () -> new AppException(ErrorCode.USER_ROLE_NOT_EXISTED));
        roles.add(role);
        user.setRoles(roles);
        Store store = storeRepository.findByName(request.getStore()).orElseThrow(
                () -> new AppException(ErrorCode.STORE_NOT_EXISTED)
        );
        user.setStore(store);
        user = userRepository.save(user);
        return modelMapper.map(user, UserCreationResponse.class);
    }

    public UserCreationResponse createCustomer(CustomerCreationRequest request) {
        User user = modelMapper.map(request, User.class);
        HashSet<Role> roles = new HashSet<>();
        Role role = roleRepository.findByName(RoleType.CUSTOMER.name()).orElseThrow(
                () -> new AppException(ErrorCode.USER_ROLE_NOT_EXISTED)
        );
        roles.add(role);
        user.setRoles(roles);
        user.setCustomerCode(generateCustomerCode());
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

    public List<CustomerResponse> getAllCustomer(String name) {
        return userRepository.findByRoles_Name(name).stream()
                .map(this::convertToResponse)
                .toList();
    }

    private CustomerResponse convertToResponse(User user) {
        return modelMapper.map(user, CustomerResponse.class);
    }

    public String generateCustomerCode() {
        String prefix = "KH";
        String lastCode = userRepository.findMaxCustomerCodeWithPrefix(prefix);
        int nextNumber = 1;
        if (lastCode != null) {
            String lastNumberStr = lastCode.replace(prefix, "");
            nextNumber = Integer.parseInt(lastNumberStr) + 1;
        }
        return  prefix + String.format("%04d", nextNumber);
    }
}
