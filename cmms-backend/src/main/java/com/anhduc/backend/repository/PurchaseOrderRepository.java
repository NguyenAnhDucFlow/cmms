package com.anhduc.backend.repository;

import com.anhduc.backend.entity.PurchaseOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, UUID> {


    @Query("SELECT MAX(p.purchaseOrderCode) FROM PurchaseOrder p " +
            "WHERE p.purchaseOrderCode LIKE :prefix%")
    String findMaxPurchaseOrderCodeWithPrefix(@Param("prefix") String prefix);

}
