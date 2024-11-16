package com.anhduc.backend.specification;

import com.anhduc.backend.entity.PurchaseOrder;
import com.anhduc.backend.enums.PurchaseOrderStatus;
import org.springframework.data.jpa.domain.Specification;

import java.util.UUID;

public class PurchaseOrderSpecification {
    public static Specification<PurchaseOrder> hasStatus(PurchaseOrderStatus status) {
        return (root, query, criteriaBuilder) ->
                status == null ? null : criteriaBuilder.equal(root.get("status"), status);
    }

    public static Specification<PurchaseOrder> hasStore(UUID storeId) {
        return (root, query, criteriaBuilder) ->
                storeId == null ? null : criteriaBuilder.equal(root.get("store").get("id"), storeId);
    }

    public static Specification<PurchaseOrder> hasPurchaseOrderCodeLike(String purchaseOrderCode) {
        return (root, query, criteriaBuilder) ->
                purchaseOrderCode == null || purchaseOrderCode.isEmpty()
                        ? null
                        : criteriaBuilder.like(root.get("purchaseOrderCode"), "%" + purchaseOrderCode + "%");
    }
}
