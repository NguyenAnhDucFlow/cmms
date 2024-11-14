package com.anhduc.backend.entity;

import com.anhduc.backend.enums.PurchaseOrderStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "purchase_orders")
public class PurchaseOrder extends AuditAble{

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;
    @ManyToOne
    Supplier supplier;
    @ManyToOne
    Store store;
    String createdBy;
    Instant estimatedDeliveryDate;
    int totalQuantity;
    int totalItems;
    BigDecimal totalAmount;
    PurchaseOrderStatus status;
    String note;

    @OneToMany(mappedBy = "purchaseOrder", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<PurchaseOrderDetail> details;


}


