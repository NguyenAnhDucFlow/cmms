package com.anhduc.backend.entity;

import com.anhduc.backend.enums.GoodsReceiptStatus;
import com.anhduc.backend.enums.ReceiptType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.CreatedDate;
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
@Table(name = "goods_receipts")
@EntityListeners(AuditingEntityListener.class)
public class GoodsReceipt{

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;
    String goodsReceiptCode;
    String purchaseOrderCode;
    @ManyToOne
    Supplier supplier;
    @ManyToOne
    Store store;
    String createdBy;
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private Instant receiptDate;
    int totalQuantity;
    int totalItems;
    BigDecimal totalAmount;
    BigDecimal paidAmount;
    GoodsReceiptStatus status;
    ReceiptType receiptType;
    String note;

    @OneToMany(mappedBy = "goodsReceipt", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<GoodsReceiptDetail> details;

    @OneToOne
    private PurchaseOrder purchaseOrder;

}


