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
@Table(name = "invoice_details")
public class InvoiceDetail extends AuditAble{

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;
    @ManyToOne
    Invoice invoice;
    String materialCode;
    int quantity;
    BigDecimal costPrice;
    BigDecimal totalPrice;
    String name;
    String unitName;

}


