package com.anhduc.backend.entity;

import com.anhduc.backend.enums.InvoiceStatus;
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
@Table(name = "invoices")
@EntityListeners(AuditingEntityListener.class)
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;
    @Column(nullable = false, unique = true)
    String invoiceCode;
    @ManyToOne
    Order order;
    @ManyToOne
    Store store;
    String createdBy;
    @ManyToOne
    User customer;
    @CreatedDate
    @Column(nullable = false, updatable = false)
    Instant createdAt;
    int totalQuantity;
    int totalItems;
    BigDecimal totalAmount;
    BigDecimal paidAmount;
    BigDecimal debtAmount;
    InvoiceStatus status;
    String note;

    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<InvoiceDetail> details;

}


