package com.anhduc.backend.controller;

import com.anhduc.backend.dto.request.MaterialCreationRequest;
import com.anhduc.backend.dto.response.ApiResponse;
import com.anhduc.backend.dto.response.MaterialResponse;
import com.anhduc.backend.service.MaterialService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MaterialController {

    MaterialService materialService;

    @PostMapping
    ApiResponse<MaterialResponse> create(@ModelAttribute MaterialCreationRequest request) throws IOException {
        return ApiResponse.<MaterialResponse>builder()
                .data(materialService.create(request)).build();
    }

}
