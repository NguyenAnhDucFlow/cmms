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
@Table(name = "store_warehouses")
public class StoreWarehouse {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;
    double quantity;
    @ManyToOne
    Material material;
    @ManyToOne
    Store store;
}
