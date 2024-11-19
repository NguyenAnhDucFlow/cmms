package com.anhduc.backend.controller;

import com.anhduc.backend.dto.GoodsReceiptDTO;
import com.anhduc.backend.dto.GoodsReceiptDetailDTO;
import com.anhduc.backend.dto.request.GoodsReceiptCreationRequest;
import com.anhduc.backend.dto.response.ApiResponse;
import com.anhduc.backend.dto.response.SearchGoodsReceiptDTO;
import com.anhduc.backend.entity.GoodsReceipt;
import com.anhduc.backend.service.GoodsReceiptService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/goods-receipts")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class GoodsReceiptController {

    GoodsReceiptService goodsReceiptService;
    ModelMapper modelMapper;

    @PostMapping("/direct")
    ApiResponse<Void> create(@RequestBody GoodsReceiptCreationRequest request) {
        goodsReceiptService.createGoodsReceipt(request);
        return ApiResponse.<Void>builder()
                .message("Tạo phiếu nhập hàng thành công !!")
                .build();
    }


    @PostMapping("/search")
    public ApiResponse<List<GoodsReceiptDTO>> listGoodsReceiptsWithFilters(
            @RequestBody SearchGoodsReceiptDTO request
    ) {
        Pageable pageable = PageRequest.of(request.getCurrentPage(), request.getSize(), Sort.by("goodsReceiptCode").descending());
        Page<GoodsReceipt> goodsReceipts = goodsReceiptService.getGoodsReceipts(
                request.getStatus(),
                request.getStoreId(),
                request.getGoodsReceiptCode(),
                pageable
        );

        List<GoodsReceiptDTO> goodsReceiptList = goodsReceipts.getContent().stream()
                .map(goodsReceipt -> {
                    GoodsReceiptDTO dto = modelMapper.map(goodsReceipt, GoodsReceiptDTO.class);
                    dto.setDetails(
                            goodsReceipt.getDetails() != null
                                    ? goodsReceipt.getDetails().stream()
                                    .map(detail -> modelMapper.map(detail, GoodsReceiptDetailDTO.class))
                                    .collect(Collectors.toList())
                                    : List.of() // Nếu null, trả về danh sách rỗng
                    );
                    return dto;
                })
                .collect(Collectors.toList());

        return ApiResponse.<List<GoodsReceiptDTO>>builder()
                .data(goodsReceiptList)
                .totalElements(goodsReceipts.getTotalElements())
                .build();
    }


}
