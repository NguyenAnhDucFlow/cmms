package com.anhduc.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.math.BigDecimal;
import java.util.UUID;

@Data
@AllArgsConstructor
public class ListStoreMaterialResponse {
    private UUID id;
    private String materialCode;
    private String coverImageUrl;
    private String name;
    private BigDecimal salePrice;
    private BigDecimal costPrice;
    private double quantity;
}
