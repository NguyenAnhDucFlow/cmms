package com.anhduc.backend.repository;

import com.anhduc.backend.dto.response.PurchaseOrderResponseDTO;
import com.anhduc.backend.entity.PurchaseOrder;
import com.anhduc.backend.enums.PurchaseOrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, UUID>, JpaSpecificationExecutor<PurchaseOrder> {


    @Query("SELECT MAX(p.purchaseOrderCode) FROM PurchaseOrder p " +
            "WHERE p.purchaseOrderCode LIKE :prefix%")
    String findMaxPurchaseOrderCodeWithPrefix(@Param("prefix") String prefix);

    @Query(value = """
    SELECT p
    FROM PurchaseOrder p
    WHERE (:status IS NULL OR p.status = :status)
    AND (:storeId IS NULL OR p.store.id = :storeId)
    AND (:purchaseOrderCode IS NULL OR LOWER(p.purchaseOrderCode) LIKE LOWER(CONCAT('%', :purchaseOrderCode, '%')))""")
    Page<PurchaseOrderResponseDTO> searchDTO(@Param("status") PurchaseOrderStatus status,
                                             @Param("storeId") UUID storeId,
                                             @Param("purchaseOrderCode") String purchaseOrderCode,
                                             Pageable pageable);




}
