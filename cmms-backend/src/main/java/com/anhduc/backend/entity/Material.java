package com.anhduc.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "materials")
public class Material extends AuditAble{

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;
    String materialCode;
    String barcode;
    String name;
    BigDecimal costPrice;
    BigDecimal salePrice;
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "product_images", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "image_url")
    List<String> images;
    float weightValue;
    String weightUnit;
    float width;
    float length;
    String sizeUnit;
    String description;
    int minStock;
    int maxStock;
    Boolean isBatch;
    String coverImageUrl;

    @ManyToOne
    Category category;
    @ManyToOne
    Brand brand;
    @ManyToOne
    Location location;
}
