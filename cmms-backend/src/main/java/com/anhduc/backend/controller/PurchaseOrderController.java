package com.anhduc.backend.controller;

import com.anhduc.backend.dto.PurchaseOrderDTO;
import com.anhduc.backend.dto.PurchaseOrderDetailDTO;
import com.anhduc.backend.dto.SearchPurchaseOrderDTO;
import com.anhduc.backend.dto.request.PurchaseOrderCreationRequest;
import com.anhduc.backend.dto.request.PurchaseOrderUpdateRequest;
import com.anhduc.backend.dto.response.ApiResponse;
import com.anhduc.backend.entity.PurchaseOrder;
import com.anhduc.backend.service.PurchaseOrderService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/purchase-order")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PurchaseOrderController {

    PurchaseOrderService purchaseOrderService;
    ModelMapper modelMapper;

    @PostMapping
    ApiResponse<Void> create(@RequestBody PurchaseOrderCreationRequest request) {
        purchaseOrderService.create(request);
        return ApiResponse.<Void>builder()
                .message("Tạo đơn đặt hàng thành công !!")
                .build();
    }

    @PutMapping
    ApiResponse<Void> update(@RequestBody PurchaseOrderUpdateRequest request) {
        purchaseOrderService.update(request);
        return ApiResponse.<Void>builder()
                .message("Cập nhật đơn đặt hàng thành công !!")
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<PurchaseOrderDTO> getById(@PathVariable UUID id) {
        return ApiResponse.<PurchaseOrderDTO>builder()
                .data(purchaseOrderService.getById(id))
                .build();
    }


    @PostMapping("/search")
    public ApiResponse<List<PurchaseOrderDTO>> listMaterialsByStoreWithFilters(
            @RequestBody SearchPurchaseOrderDTO request
    ) {
        Pageable pageable = PageRequest.of(request.getCurrentPage(), request.getSize(), Sort.by("purchaseOrderCode").descending());
        Page<PurchaseOrder> purchaseOrders = purchaseOrderService.getPurchaseOrders(
                request.getStatus(),
                request.getStoreId(),
                request.getPurchaseOrderCode(),
                pageable
        );
        List<PurchaseOrderDTO> purchaseOrderList = purchaseOrders.getContent().stream()
                .map(purchaseOrder -> {
                    PurchaseOrderDTO dto = modelMapper.map(purchaseOrder, PurchaseOrderDTO.class);
                    dto.setDetails(
                            purchaseOrder.getDetails() != null
                                    ? purchaseOrder.getDetails().stream()
                                    .map(detail -> modelMapper.map(detail, PurchaseOrderDetailDTO.class))
                                    .collect(Collectors.toList())
                                    : List.of() // Nếu null, trả về danh sách rỗng
                    );
                    return dto;
                })
                .collect(Collectors.toList());
        return ApiResponse.<List<PurchaseOrderDTO>>builder()
                .data(purchaseOrderList)
                .totalElements(purchaseOrders.getTotalElements())
                .build();
    }



}
