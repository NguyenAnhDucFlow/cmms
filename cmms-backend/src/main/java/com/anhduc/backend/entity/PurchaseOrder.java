package com.anhduc.backend.entity;

import com.anhduc.backend.enums.PurchaseOrderStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

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
@EntityListeners(AuditingEntityListener.class)
public class PurchaseOrder extends AuditAble{

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;
    @Column(nullable = false, unique = true)
    String purchaseOrderCode;
    @ManyToOne
    Supplier supplier;
    @ManyToOne
    Store store;
    String createdBy;
    @CreatedDate
    @Column(nullable = false, updatable = false)
    Instant createdAt;
    @LastModifiedDate
    @Column(nullable = false)
    Instant updatedAt;
    Instant estimatedDeliveryDate;
    int totalQuantity;
    int totalItems;
    BigDecimal totalAmount;
    PurchaseOrderStatus status;
    String note;

    @OneToMany(mappedBy = "purchaseOrder", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<PurchaseOrderDetail> details;

    @OneToOne(mappedBy = "purchaseOrder", cascade = CascadeType.ALL, orphanRemoval = true)
    private GoodsReceipt goodsReceipt;

}


