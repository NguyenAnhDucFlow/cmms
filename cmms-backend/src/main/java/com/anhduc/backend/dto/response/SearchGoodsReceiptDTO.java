package com.anhduc.backend.dto.response;

import com.anhduc.backend.enums.GoodsReceiptStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SearchGoodsReceiptDTO {
    UUID storeId;
    List<GoodsReceiptStatus> status;
    String goodsReceiptCode;
    @Builder.Default
    Integer currentPage = 0;
    @Builder.Default
    Integer size = 8;

}
