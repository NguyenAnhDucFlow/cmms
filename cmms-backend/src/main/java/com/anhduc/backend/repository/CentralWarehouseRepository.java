package com.anhduc.backend.repository;

import com.anhduc.backend.entity.CentralWarehouse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CentralWarehouseRepository extends JpaRepository<CentralWarehouse, UUID> {
    List<CentralWarehouse> findByMaterialId(UUID materialId);
}