package com.anhduc.backend.repository;

import com.anhduc.backend.entity.PurchaseOrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PurchaseOrderDetailRepository extends JpaRepository<PurchaseOrderDetail, UUID> {
    PurchaseOrderDetail findByPurchaseOrderId(UUID id);
}
