package com.anhduc.backend.dto.request;

import com.anhduc.backend.entity.Attribute;
import com.anhduc.backend.entity.Unit;
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
    BigDecimal costPrice;
    BigDecimal salePrice;
    List<MultipartFile> imagesFile;
    float weightValue;
    String weightUnit;
    String description;
    int minStock;
    int maxStock;
    String coverImageUrl;
    boolean isPoint;
    int basicUnit;
    List<Unit> units;
    List<Attribute> attributes;
    UUID categoryId;
    UUID brandId;
}
