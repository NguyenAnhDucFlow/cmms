package com.anhduc.backend.controller;

import com.anhduc.backend.dto.MaterialDetailDTO;
import com.anhduc.backend.dto.MaterialFilterDTO;
import com.anhduc.backend.dto.request.MaterialCreationRequest;
import com.anhduc.backend.dto.response.ApiResponse;
import com.anhduc.backend.dto.response.ListStoreMaterialResponse;
import com.anhduc.backend.dto.response.MaterialResponse;
import com.anhduc.backend.service.MaterialService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/materials")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MaterialController {

    MaterialService materialService;

    @PostMapping
    ApiResponse<MaterialResponse> create(@ModelAttribute MaterialCreationRequest request) throws IOException {
        return ApiResponse.<MaterialResponse>builder()
                .data(materialService.create(request)).build();
    }

    @PutMapping
    ApiResponse<MaterialResponse> update(@ModelAttribute MaterialCreationRequest request, UUID materialId, UUID storeId) throws IOException {
        return ApiResponse.<MaterialResponse>builder()
                .data(materialService.update(request, materialId, storeId)).build();
    }

    @GetMapping("/central-materials")
    public ApiResponse<List<ListStoreMaterialResponse>> listMaterialsByStoreWithFilters(
            @ModelAttribute MaterialFilterDTO filter
    ) {
        Page<ListStoreMaterialResponse> storeMaterialResponses = materialService.listMaterialsByCompanyWithFilters(filter);
        List<ListStoreMaterialResponse> storeMaterialResponseList = storeMaterialResponses.getContent();
        return ApiResponse.<List<ListStoreMaterialResponse>>builder()
                .data(storeMaterialResponseList)
                .totalElements(storeMaterialResponses.getTotalElements())
                .totalPages(storeMaterialResponses.getTotalPages())
                .build();
    }

    @GetMapping("/{materialId}/stores/{storeId}")
    public ApiResponse<MaterialDetailDTO> getMaterialDetailByStore(
            @PathVariable UUID materialId,
            @PathVariable UUID storeId) {
        MaterialDetailDTO materialDetail = materialService.findMaterialDetailByStore(materialId, storeId);
        return ApiResponse.<MaterialDetailDTO>builder()
                .data(materialDetail).build();
    }

}
