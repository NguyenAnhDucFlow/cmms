package com.anhduc.backend.controller;

import com.anhduc.backend.dto.request.PurchaseOrderCreationRequest;
import com.anhduc.backend.dto.response.ApiResponse;
import com.anhduc.backend.service.PurchaseOrderService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/purchase-order")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PurchaseOrderController {

    PurchaseOrderService purchaseOrderService;

    @PostMapping
    ApiResponse<Void> create(@RequestBody PurchaseOrderCreationRequest request) {
        purchaseOrderService.create(request);
        return ApiResponse.<Void>builder()
                .message("Tạo đơn đặt hàng thành công !!")
                .build();
    }

}
