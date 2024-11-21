package com.anhduc.backend.repository;

import com.anhduc.backend.entity.Material;
import com.anhduc.backend.entity.Store;
import com.anhduc.backend.entity.StoreWarehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface StoreWarehouseRepository extends JpaRepository<StoreWarehouse, UUID> {

    Optional<StoreWarehouse> findByStoreAndMaterial(Store store, Material material);

    StoreWarehouse findByMaterialIdAndStoreId(UUID materialId, UUID storeId);

}
