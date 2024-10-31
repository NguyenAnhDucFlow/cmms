package com.anhduc.backend.repository;

import com.anhduc.backend.entity.StoreMaterial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface StoreMaterialRepository extends JpaRepository<StoreMaterial, UUID> {
    Optional<StoreMaterial> findByStoreIdAndMaterialId(UUID storeId, UUID materialId);
}
