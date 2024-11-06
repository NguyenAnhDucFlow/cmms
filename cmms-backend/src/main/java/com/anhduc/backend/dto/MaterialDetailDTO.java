package com.anhduc.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
public class MaterialDetailDTO {
    UUID id;
    String materialCode;
    String name;
    BigDecimal costPrice;
    BigDecimal salePrice;
    List<String> images;
    float weightValue;
    String weightUnit;
    String description;
    String coverImageUrl;
    boolean isPoint;
    Boolean isActive;
    String basicUnit;
    String category;
    String brand;
    int minStock;
    int maxStock;
}
