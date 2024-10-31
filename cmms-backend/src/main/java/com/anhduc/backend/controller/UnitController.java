package com.anhduc.backend.controller;

import com.anhduc.backend.dto.request.UnitCreationRequest;
import com.anhduc.backend.dto.response.ApiResponse;
import com.anhduc.backend.dto.response.UnitCreationResponse;
import com.anhduc.backend.service.UnitService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/units")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UnitController {

    UnitService unitService;

    @PostMapping
    ApiResponse<UnitCreationResponse> create(@RequestBody UnitCreationRequest request) {
        return ApiResponse.<UnitCreationResponse>builder()
                .data(unitService.create(request))
                .build();
    }

    @GetMapping
    ApiResponse<List<UnitCreationResponse>> getAllRoles() {
        return ApiResponse.<List<UnitCreationResponse>>builder()
                .data(unitService.findAll()).build();
    }

}
