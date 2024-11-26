package com.anhduc.backend.repository;

import com.anhduc.backend.entity.Material;
import com.anhduc.backend.entity.MaterialUnit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MaterialUnitRepository extends JpaRepository<MaterialUnit, UUID> {

    Optional<MaterialUnit> findByVariantCode(String materialCode);
    List<MaterialUnit> findByMaterial(Material material);
}
