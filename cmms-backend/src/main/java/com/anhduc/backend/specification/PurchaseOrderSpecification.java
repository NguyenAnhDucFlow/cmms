package com.anhduc.backend.specification;

import com.anhduc.backend.entity.PurchaseOrder;
import com.anhduc.backend.enums.PurchaseOrderStatus;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.UUID;

public class PurchaseOrderSpecification {

    private PurchaseOrderSpecification() {
        throw new UnsupportedOperationException("This is a utility class and cannot be instantiated");
    }

    public static Specification<PurchaseOrder> hasStatus(List<PurchaseOrderStatus> statuses) {
        return (root, query, criteriaBuilder) -> {
            if (statuses == null || statuses.isEmpty()) {
                return null;
            }
            return root.get("status").in(statuses);
        };
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
