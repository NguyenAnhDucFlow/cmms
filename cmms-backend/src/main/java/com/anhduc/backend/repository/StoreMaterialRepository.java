package com.anhduc.backend.repository;

import com.anhduc.backend.entity.StoreMaterial;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface StoreMaterialRepository extends JpaRepository<StoreMaterial, UUID> {

    Optional<StoreMaterial> findByMaterialIdAndStoreId(UUID materialId, UUID storeId);
}
