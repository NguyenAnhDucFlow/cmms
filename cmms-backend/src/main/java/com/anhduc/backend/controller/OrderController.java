package com.anhduc.backend.controller;

import com.anhduc.backend.dto.request.OrderRequest;
import com.anhduc.backend.dto.response.ApiResponse;
import com.anhduc.backend.dto.response.OrderResponse;
import com.anhduc.backend.service.OrderService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderController {

    OrderService orderService;

    @PostMapping
    ApiResponse<Void> create(@RequestBody OrderRequest request) {
        orderService.createOrder(request);
        return ApiResponse.<Void>builder()
                .message("Tạo đơn hàng thành công !!")
                .build();
    }

    @GetMapping("/{createdBy}")
    ApiResponse<List<OrderResponse>> getAll(@PathVariable String createdBy) {
        return ApiResponse.<List<OrderResponse>>builder()
                .data(orderService.getOrders(createdBy))
                        .build();
    }

}