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
public class MaterialCreationRequest {

    String materialCode;
    String barcode;
    String name;
    @Builder.Default
    BigDecimal costPrice = BigDecimal.ZERO;
    BigDecimal salePrice;
    List<MultipartFile> imagesFile;
    float weightValue;
    String weightUnit;
    String description;
    int minStock;
    int maxStock;
    String coverImageUrl;
    Boolean isPoint;
    UUID basicUnitId;
    List<MaterialUnitDto> materialUnitDtoList;
    UUID categoryId;
    UUID brandId;
}
