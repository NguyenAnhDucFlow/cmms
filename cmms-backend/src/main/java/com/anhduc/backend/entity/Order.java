package com.anhduc.backend.entity;

import com.anhduc.backend.enums.OrderStatus;
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
@Table(name = "orders")
@EntityListeners(AuditingEntityListener.class)
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;
    @ManyToOne
    Store store;
    String createdBy;
    @CreatedDate
    @Column(nullable = false, updatable = false)
    Instant createdAt;
    int totalQuantity;
    int totalItems;
    BigDecimal totalAmount;
    BigDecimal paidAmount;
    BigDecimal debtAmount;
    OrderStatus status;
    String note;

}


