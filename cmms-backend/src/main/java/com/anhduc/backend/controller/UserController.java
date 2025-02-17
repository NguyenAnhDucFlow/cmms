package com.anhduc.backend.controller;

import com.anhduc.backend.dto.request.CustomerCreationRequest;
import com.anhduc.backend.dto.request.UserCreationRequest;
import com.anhduc.backend.dto.response.ApiResponse;
import com.anhduc.backend.dto.response.CustomerResponse;
import com.anhduc.backend.dto.response.UserCreationResponse;
import com.anhduc.backend.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {

    UserService userService;

    @PostMapping
    ApiResponse<UserCreationResponse> create(@RequestBody UserCreationRequest request) {
        return ApiResponse.<UserCreationResponse>builder()
                .data(userService.create(request)).build();
    }

    @PostMapping("/register")
    ApiResponse<UserCreationResponse> createCustomer(@RequestBody CustomerCreationRequest request) {
        return ApiResponse.<UserCreationResponse>builder()
                .data(userService.createCustomer(request)).build();
    }

    @DeleteMapping("/{userId}")
    ApiResponse<Void> delete(@PathVariable UUID userId) {
        userService.delete(userId);
        return ApiResponse.<Void>builder()
                .message("Deleted user successfully").build();
    }

    @GetMapping("/by-role/{name}")
    ApiResponse<List<CustomerResponse>> getAll(@PathVariable String name) {
        return ApiResponse.<List<CustomerResponse>>builder()
                .data(userService.getAllCustomer(name)).build();
    }

    @GetMapping("/my-info")
    ApiResponse<UserCreationResponse> getMyInfo() {
        return ApiResponse.<UserCreationResponse>builder()
                .data(userService.getMyInfo())
                .build();
    }
}
