package com.anhduc.backend.controller;

import com.anhduc.backend.dto.request.InvoiceRequest;
import com.anhduc.backend.dto.response.ApiResponse;
import com.anhduc.backend.service.InvoiceService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/invoices")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class InvoiceController {

    InvoiceService invoiceService;

    @PostMapping()
    ApiResponse<Void> create(@RequestBody InvoiceRequest request) {
        invoiceService.createInvoice(request);
        return ApiResponse.<Void>builder()
                .message("Tạo hóa đơn thành công !!")
                .build();
    }

}
