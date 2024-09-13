package com.anhduc.backend.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MaterialCreationRequest {

    String barcode;
    String name;
    String description;
    BigDecimal costPrice;
    BigDecimal salePrice;
    List<MultipartFile> imagesFile;
    int stockQuantity;
    float weight;
    String dimensions;
    String note;
    Boolean isRewardEligible;
    int minStock;
    int maxStock;

    CategoryIdDto category;
    BrandIdDto brand;
    LocationIdDto location;
}