package com.anhduc.backend.controller;

import com.anhduc.backend.dto.ListMaterialImportDTO;
import com.anhduc.backend.dto.MaterialDetailDTO;
import com.anhduc.backend.dto.MaterialFilterDTO;
import com.anhduc.backend.dto.request.MaterialCreationRequest;
import com.anhduc.backend.dto.request.MaterialUpdateRequest;
import com.anhduc.backend.dto.response.ApiResponse;
import com.anhduc.backend.dto.response.ListMaterialForSaleDTO;
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

    @PatchMapping("/{id}/status")
    ApiResponse<Void> updateMaterialStatus(@PathVariable UUID id, @RequestParam boolean status) {
        materialService.updateMaterialStatus(id, status);
        return ApiResponse.<Void>builder()
                .message("Material status updated")
                .build();
    }

    @PutMapping
    ApiResponse<MaterialResponse> update(@ModelAttribute MaterialUpdateRequest request) throws IOException {
        return ApiResponse.<MaterialResponse>builder()
                .data(materialService.update(request))
                .build();
    }

    @GetMapping("/central-materials")
    public ApiResponse<List<ListStoreMaterialResponse>> listMaterialsByCompanyWithFilters(
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

    @GetMapping("/store-materials")
    public ApiResponse<List<ListStoreMaterialResponse>> listMaterialsByStoreWithFilters(
            @ModelAttribute MaterialFilterDTO filter
    ) {
        Page<ListStoreMaterialResponse> storeMaterialResponses = materialService.listMaterialsByStoreWithFilters(filter);
        List<ListStoreMaterialResponse> storeMaterialResponseList = storeMaterialResponses.getContent();
        return ApiResponse.<List<ListStoreMaterialResponse>>builder()
                .data(storeMaterialResponseList)
                .totalElements(storeMaterialResponses.getTotalElements())
                .build();
    }

    @GetMapping("/import-list")
    public ApiResponse<List<ListMaterialImportDTO>> getAllMaterialsForImport(
    ) {
        return ApiResponse.<List<ListMaterialImportDTO>>builder()
                .data(materialService.getAllMaterialsForImport())
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

    @GetMapping("/getAll/{storeId}")
    public ApiResponse<List<ListMaterialForSaleDTO>> getAllMaterials(
    @PathVariable UUID storeId) {
        return ApiResponse.<List<ListMaterialForSaleDTO>>builder()
                .data(materialService.getAllMaterialsForSale(storeId))
                .build();
    }

    @GetMapping("/search")
    public ApiResponse<List<ListMaterialForSaleDTO>> searchMaterials(
            @RequestParam UUID storeId,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) List<String> categories,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<ListMaterialForSaleDTO> result = materialService.searchMaterialsForSale(storeId, name, categories, page, size);
        List<ListMaterialForSaleDTO> listMaterialForSaleDTOList = result.getContent();

        return ApiResponse.<List<ListMaterialForSaleDTO>>builder()
                .data(listMaterialForSaleDTOList)
                .totalElements(result.getTotalElements())
                .build();
    }


}
