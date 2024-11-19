package com.anhduc.backend.repository;

import com.anhduc.backend.dto.MaterialFilterDTO;
import com.anhduc.backend.dto.response.ListStoreMaterialResponse;
import com.anhduc.backend.entity.Material;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface MaterialRepository extends JpaRepository<Material, UUID> {

    @Query(value = """
        SELECT new com.anhduc.backend.dto.response.ListStoreMaterialResponse(
               m.id,
               m.materialCode,
               m.coverImageUrl,
               m.name,
               m.salePrice,
               m.costPrice,
               COALESCE(cw.quantity, 0))
        FROM Material m
        LEFT JOIN CentralWarehouse cw ON cw.material.id = m.id AND cw.company.id = :#{#filter.storeId}
        LEFT JOIN StoreMaterial sm ON sm.material.id = m.id AND sm.store.id = :#{#filter.storeId}
        WHERE (:#{#filter.name} IS NULL OR LOWER(m.name) LIKE LOWER(CONCAT('%', :#{#filter.name}, '%')))
          AND (:#{#filter.category} IS NULL OR m.category.id = :#{#filter.category})
          AND (:#{#filter.brand} IS NULL OR m.brand.id = :#{#filter.brand})
          AND (:#{#filter.isActive} IS NULL OR m.isActive = :#{#filter.isActive})
          AND (:#{#filter.hasStock} IS NULL OR (:#{#filter.hasStock} = TRUE AND COALESCE(cw.quantity, 0) > 0))
          AND (:#{#filter.belowMinStock} IS NULL OR (:#{#filter.belowMinStock} = TRUE AND COALESCE(cw.quantity, 0) < COALESCE(sm.minStock, m.minStock)))
          AND (:#{#filter.aboveMaxStock} IS NULL OR (:#{#filter.aboveMaxStock} = TRUE AND COALESCE(cw.quantity, 0) > COALESCE(sm.maxStock, m.maxStock)))
          AND (:#{#filter.outOfStock} IS NULL OR (:#{#filter.outOfStock} = TRUE AND COALESCE(cw.quantity, 0) = 0))
    """)
    Page<ListStoreMaterialResponse> listMaterialsByCompanyWithFilters(
            @Param("filter") MaterialFilterDTO filter,
            Pageable pageable
    );


    @Query(value = """
        SELECT new com.anhduc.backend.dto.response.ListStoreMaterialResponse(
               m.id,
               m.materialCode,
               m.coverImageUrl,
               m.name,
               m.salePrice,
               m.costPrice,
               COALESCE(cw.quantity, 0))
        FROM Material m
        LEFT JOIN StoreWarehouse cw ON cw.material.id = m.id AND cw.store.id = :#{#filter.storeId}
        LEFT JOIN StoreMaterial sm ON sm.material.id = m.id AND sm.store.id = :#{#filter.storeId}
        WHERE (:#{#filter.name} IS NULL OR LOWER(m.name) LIKE LOWER(CONCAT('%', :#{#filter.name}, '%')))
          AND (:#{#filter.category} IS NULL OR m.category.id = :#{#filter.category})
          AND (:#{#filter.brand} IS NULL OR m.brand.id = :#{#filter.brand})
          AND (:#{#filter.isActive} IS NULL OR m.isActive = :#{#filter.isActive})
          AND (:#{#filter.hasStock} IS NULL OR (:#{#filter.hasStock} = TRUE AND COALESCE(cw.quantity, 0) > 0))
          AND (:#{#filter.belowMinStock} IS NULL OR (:#{#filter.belowMinStock} = TRUE AND COALESCE(cw.quantity, 0) < COALESCE(sm.minStock, m.minStock)))
          AND (:#{#filter.aboveMaxStock} IS NULL OR (:#{#filter.aboveMaxStock} = TRUE AND COALESCE(cw.quantity, 0) > COALESCE(sm.maxStock, m.maxStock)))
          AND (:#{#filter.outOfStock} IS NULL OR (:#{#filter.outOfStock} = TRUE AND COALESCE(cw.quantity, 0) = 0))
    """)
    Page<ListStoreMaterialResponse> listMaterialsByStoreWithFilters(
            @Param("filter") MaterialFilterDTO filter,
            Pageable pageable
    );

    @Query("SELECT MAX(m.materialCode) FROM Material m " +
            "WHERE m.materialCode LIKE :prefix%")
    String findMaxMaterialCodeWithPrefix(@Param("prefix") String prefix);

    Optional<Material> findByMaterialCode(String materialCode);

}
