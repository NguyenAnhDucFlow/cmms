package com.anhduc.backend.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MaterialUpdateRequest {

    UUID materialId;
    UUID storeId;
    String materialCode;
    String barcode;
    String name;
    BigDecimal costPrice;
    BigDecimal salePrice;
    List<MultipartFile> imagesFile;
    float weightValue;
    String weightUnit;
    String description;
    int minStock;
    int maxStock;
    String coverImageUrl;
    Boolean isPoint;
    UUID categoryId;
    UUID brandId;
}
