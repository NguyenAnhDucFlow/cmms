package com.anhduc.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@EntityListeners(AuditingEntityListener.class)
public class PaymentVoucher {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;
    @Column(nullable = false, unique = true)
    String paymentVoucherCode;
    @ManyToOne
    Supplier supplier;
    @ManyToOne
    Store store;
    String createdBy;
    @CreatedDate
    @Column(nullable = false, updatable = false)
    Instant createdAt;
    String description;
    BigDecimal amount;
    @ManyToOne
    GoodsReceipt goodsReceipt;

}


