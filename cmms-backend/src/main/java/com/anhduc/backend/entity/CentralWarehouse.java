package com.anhduc.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CentralWarehouse {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;
    double quantity;
    @ManyToOne
    Material material;
    @ManyToOne
    Store company;
    double reservedQuantity;

    public CentralWarehouse(Store company, Material material, double quantity) {
        this.company = company;
        this.material = material;
        this.quantity = quantity;
    }
}
