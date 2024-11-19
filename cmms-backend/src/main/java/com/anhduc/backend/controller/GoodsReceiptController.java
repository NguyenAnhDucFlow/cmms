package com.anhduc.backend.controller;

import com.anhduc.backend.dto.request.GoodsReceiptCreationRequest;
import com.anhduc.backend.dto.response.ApiResponse;
import com.anhduc.backend.service.GoodsReceiptService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/goods-receipts")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class GoodsReceiptController {

    GoodsReceiptService goodsReceiptService;

    @PostMapping("/direct")
    ApiResponse<Void> create(@RequestBody GoodsReceiptCreationRequest request) {
        goodsReceiptService.createGoodsReceipt(request);
        return ApiResponse.<Void>builder()
                .message("Tạo phiếu nhập hàng thành công !!")
                .build();
    }

}
