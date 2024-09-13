package com.anhduc.backend.controller;

import com.anhduc.backend.dto.request.MaterialCreationRequest;
import com.anhduc.backend.dto.response.ApiResponse;
import com.anhduc.backend.dto.response.MaterialResponse;
import com.anhduc.backend.service.MaterialService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MaterialController {

    MaterialService materialService;

    @PostMapping
    ApiResponse<MaterialResponse> create(@RequestBody MaterialCreationRequest request) {
        return ApiResponse.<MaterialResponse>builder()
                .results(materialService.create(request)).build();
    }

}
