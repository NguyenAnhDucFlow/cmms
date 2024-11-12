package com.anhduc.backend.controller;

import com.anhduc.backend.dto.request.SupplierCreationRequest;
import com.anhduc.backend.dto.response.ApiResponse;
import com.anhduc.backend.dto.response.SupplierResponse;
import com.anhduc.backend.service.SupplierService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/suppliers")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SupplierController {

    SupplierService supplierService;

    @PostMapping
    ApiResponse<SupplierResponse> create(@RequestBody SupplierCreationRequest request) {
        return  ApiResponse.<SupplierResponse>builder()
                .data(supplierService.create(request)).build();
    }

    @GetMapping
    ApiResponse<List<SupplierResponse>> getAllRoles() {
        return ApiResponse.<List<SupplierResponse>>builder()
                .data(supplierService.findAll()).build();
    }
}
