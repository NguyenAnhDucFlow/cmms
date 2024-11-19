package com.anhduc.backend.specification;

import com.anhduc.backend.entity.GoodsReceipt;
import com.anhduc.backend.enums.GoodsReceiptStatus;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.UUID;

public class GoodsReceiptSpecification {

    private GoodsReceiptSpecification() {
        throw new UnsupportedOperationException("This is a utility class and cannot be instantiated");
    }

    public static Specification<GoodsReceipt> hasStatus(List<GoodsReceiptStatus> statuses) {
        return (root, query, criteriaBuilder) -> {
            if (statuses == null || statuses.isEmpty()) {
                return null;
            }
            return root.get("status").in(statuses);
        };
    }

    public static Specification<GoodsReceipt> hasStore(UUID storeId) {
        return (root, query, criteriaBuilder) ->
                storeId == null ? null : criteriaBuilder.equal(root.get("store").get("id"), storeId);
    }

    public static Specification<GoodsReceipt> hasGoodsReceiptCodeLike(String goodsReceiptCode) {
        return (root, query, criteriaBuilder) ->
                goodsReceiptCode == null || goodsReceiptCode.isEmpty()
                        ? null
                        : criteriaBuilder.like(root.get("goodsReceiptCode"), "%" + goodsReceiptCode + "%");
    }
}
