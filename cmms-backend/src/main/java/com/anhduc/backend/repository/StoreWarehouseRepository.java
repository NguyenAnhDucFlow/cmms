package com.anhduc.backend.repository;

import com.anhduc.backend.dto.MaterialFilterDTO;
import com.anhduc.backend.dto.response.ListStoreMaterialResponse;
import com.anhduc.backend.entity.Material;
import com.anhduc.backend.entity.Store;
import com.anhduc.backend.entity.StoreWarehouse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface StoreWarehouseRepository extends JpaRepository<StoreWarehouse, UUID> {

    Optional<StoreWarehouse> findByStoreAndMaterial(Store store, Material material);

    @Query(value = """
                SELECT m.id,
                       m.material_code AS materialCode,
                       m.cover_image_url AS coverImageUrl,
                       m.name,
                       m.sale_price AS salePrice,
                       m.cost_price AS costPrice,
                       COALESCE(sw.quantity, 0) AS quantity
                FROM materials m
                LEFT JOIN store_warehouses sw 
                       ON sw.material_id = m.id AND sw.store_id = :#{#filter.storeId}
                LEFT JOIN store_materials sm 
                       ON sm.material_id = m.id AND sm.store_id = :#{#filter.storeId}
                WHERE (:#{#filter.name} IS NULL OR LOWER(m.name) LIKE LOWER(CONCAT('%', :#{#filter.name}, '%')))
                  AND (:#{#filter.category} IS NULL OR m.category_id = :#{#filter.category})
                  AND (:#{#filter.brand} IS NULL OR m.brand_id = :#{#filter.brand})
                  AND (:#{#filter.isActive} IS NULL OR m.is_active = :#{#filter.isActive})
                  AND (:#{#filter.hasStock} IS NULL OR (:#{#filter.hasStock} = TRUE AND COALESCE(sw.quantity, 0) > 0))
                  AND (:#{#filter.belowMinStock} IS NULL OR (:#{#filter.belowMinStock} = TRUE AND COALESCE(sw.quantity, 0) < COALESCE(sm.min_stock, m.min_stock)))
                  AND (:#{#filter.aboveMaxStock} IS NULL OR (:#{#filter.aboveMaxStock} = TRUE AND COALESCE(sw.quantity, 0) > COALESCE(sm.max_stock, m.max_stock)))
                  AND (:#{#filter.outOfStock} IS NULL OR (:#{#filter.outOfStock} = TRUE AND COALESCE(sw.quantity, 0) = 0))
            """,
            nativeQuery = true)
    Page<ListStoreMaterialResponse> listMaterialsByStoreWithFilters(
            @Param("filter") MaterialFilterDTO filter,
            Pageable pageable
    );
}
