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
@Table(name = "purchase_order_details")
public class PurchaseOrderDetail extends AuditAble{

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;
    @ManyToOne
    PurchaseOrder purchaseOrder;
    String materialCode;
    int quantity;
    BigDecimal costPrice;
    BigDecimal totalPrice;
    String name;
    String unitName;
    int receivedQuantity;


}


