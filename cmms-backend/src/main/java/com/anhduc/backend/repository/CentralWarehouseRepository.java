package com.anhduc.backend.repository;

import com.anhduc.backend.entity.CentralWarehouse;
import com.anhduc.backend.entity.Material;
import com.anhduc.backend.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CentralWarehouseRepository extends JpaRepository<CentralWarehouse, UUID> {
    List<CentralWarehouse> findByMaterialId(UUID materialId);
    Optional<CentralWarehouse> findByCompanyAndMaterial(Store store, Material material);

    CentralWarehouse findByMaterialIdAndCompanyId(UUID materialId, UUID companyId);
}