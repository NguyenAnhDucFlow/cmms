package com.anhduc.backend.controller;

import com.anhduc.backend.dto.request.CategoryCreationRequest;
import com.anhduc.backend.dto.response.ApiResponse;
import com.anhduc.backend.dto.response.CategoryCreationResponse;
import com.anhduc.backend.service.CategoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryController {

    CategoryService categoryService;

    @PostMapping
    ApiResponse<CategoryCreationResponse> create(@RequestBody CategoryCreationRequest request) {
        return ApiResponse.<CategoryCreationResponse>builder()
                .data(categoryService.create(request))
                .build();
    }

    @GetMapping
    ApiResponse<List<CategoryCreationResponse>> getAll() {
        return ApiResponse.<List<CategoryCreationResponse>>builder()
                .data(categoryService.findAll()).build();
    }

    @GetMapping("/search")
    ApiResponse<List<CategoryCreationResponse>> search(@RequestParam(required = false) String name) {
        return ApiResponse.<List<CategoryCreationResponse>>builder()
                .data(categoryService.search(name)).build();
    }

}
