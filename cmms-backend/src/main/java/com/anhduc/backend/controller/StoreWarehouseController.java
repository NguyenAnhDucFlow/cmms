package com.anhduc.backend.controller;

import com.anhduc.backend.dto.MaterialFilterDTO;
import com.anhduc.backend.dto.response.ApiResponse;
import com.anhduc.backend.dto.response.ListStoreMaterialResponse;
import com.anhduc.backend.service.StoreWarehouseService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/store-warehouses")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class StoreWarehouseController {

    StoreWarehouseService storeWarehouseService;

    @GetMapping()
    public ApiResponse<List<ListStoreMaterialResponse>> listMaterialsByStoreWithFilters(
            @ModelAttribute MaterialFilterDTO filter
    ) {
        Page<ListStoreMaterialResponse> storeMaterialResponses = storeWarehouseService.listMaterialsByStoreWithFilters(filter);
        List<ListStoreMaterialResponse> storeMaterialResponseList = storeMaterialResponses.getContent();
        return ApiResponse.<List<ListStoreMaterialResponse>>builder()
                .data(storeMaterialResponseList)
                .totalElements(storeMaterialResponses.getTotalElements())
                .totalPages(storeMaterialResponses.getTotalPages())
                .build();
    }

}
