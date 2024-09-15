package com.anhduc.backend.controller;

import com.anhduc.backend.dto.request.StoreCreationRequest;
import com.anhduc.backend.dto.response.ApiResponse;
import com.anhduc.backend.dto.response.StoreResponse;
import com.anhduc.backend.service.StoreService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/stores")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class StoreController {

    StoreService storeService;

    @PostMapping
    ApiResponse<StoreResponse> create(StoreCreationRequest request) {
        return  ApiResponse.<StoreResponse>builder()
                .data(storeService.create(request)).build();
    }

    @GetMapping
    ApiResponse<List<StoreResponse>> getAllRoles() {
        return ApiResponse.<List<StoreResponse>>builder()
                .data(storeService.findAll()).build();
    }
}
