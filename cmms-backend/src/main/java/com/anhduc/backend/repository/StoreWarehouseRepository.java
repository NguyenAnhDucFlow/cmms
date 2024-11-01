package com.anhduc.backend.repository;

import com.anhduc.backend.entity.StoreWarehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface StoreWarehouseRepository extends JpaRepository<StoreWarehouse, UUID> {

//    @Query("""
//        SELECT new com.anhduc.backend.dto.response.ListStoreMaterialResponse(
//            m.id,
//            m.materialCode,
//            m.coverImageUrl,
//            m.name,
//            m.salePrice,
//            m.costPrice,
//            sw.quantity
//        )
//        FROM StoreWarehouse sw
//        JOIN sw.material m
//        LEFT JOIN StoreMaterial sm ON sm.material = m AND sm.store = :store
//        WHERE sw.store.id = :storeId
//          AND (:name IS NULL OR LOWER(m.name) LIKE LOWER(CONCAT('%', :name, '%')))
//          AND (:category IS NULL OR m.category.id = :category)
//          AND (:brand IS NULL OR m.brand.id = :brand)
//          AND (:isActive IS NULL OR m.isActive = :isActive)
//          AND (:hasStock IS NULL OR (sw.quantity > 0) = :hasStock)
//          AND (:belowMinStock IS NULL OR (sw.quantity < COALESCE(sm.minStock, m.minStock)) = :belowMinStock)
//          AND (:aboveMaxStock IS NULL OR (sw.quantity > COALESCE(sm.maxStock, m.maxStock)) = :aboveMaxStock)
//          AND (:outOfStock IS NULL OR (sw.quantity = 0) = :outOfStock)
//    """)
//    Page<ListStoreMaterialResponse> findMaterialsByStoreWithFilters(
//            @Param("storeId") UUID storeId,
//            @Param("name") String name,
//            @Param("category") UUID category,
//            @Param("brand") UUID brand,
//            @Param("isActive") Boolean isActive,
//            @Param("hasStock") Boolean hasStock,
//            @Param("belowMinStock") Boolean belowMinStock,
//            @Param("aboveMaxStock") Boolean aboveMaxStock,
//            @Param("outOfStock") Boolean outOfStock,
//            Pageable pageable
//    );
}
