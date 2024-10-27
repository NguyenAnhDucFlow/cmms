package com.anhduc.backend.controller;

import com.anhduc.backend.dto.request.BrandCreationRequest;
import com.anhduc.backend.dto.response.ApiResponse;
import com.anhduc.backend.dto.response.BrandCreationResponse;
import com.anhduc.backend.service.BrandService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/brands")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BrandController {

    BrandService brandService;

    @PostMapping
    ApiResponse<BrandCreationResponse> create(@RequestBody BrandCreationRequest request) {
        return ApiResponse.<BrandCreationResponse>builder()
                .data(brandService.create(request))
                .build();
    }

    @GetMapping
    ApiResponse<List<BrandCreationResponse>> getAllRoles() {
        return ApiResponse.<List<BrandCreationResponse>>builder()
                .data(brandService.findAll()).build();
    }

}
