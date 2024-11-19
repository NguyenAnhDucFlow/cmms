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
@Table(name = "good_receipt_details")
public class GoodsReceiptDetail extends AuditAble{

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;
    @ManyToOne
    GoodsReceipt goodsReceipt;
    String materialCode;
    int quantity;
    BigDecimal costPrice;
    BigDecimal totalPrice;
    String name;
    String unitName;

}


