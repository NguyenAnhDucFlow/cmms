package com.anhduc.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MaterialUnit {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;
    @ManyToOne
    Unit unit;
    @ManyToOne
    Material material;
    String variantCode;
    double conversionRate;
    BigDecimal costPrice = BigDecimal.ZERO;
    BigDecimal salePrice;
    BigDecimal lastPurchasePrice;


}
