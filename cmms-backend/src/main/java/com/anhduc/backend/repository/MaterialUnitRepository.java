package com.anhduc.backend.repository;

import com.anhduc.backend.entity.MaterialUnit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface MaterialUnitRepository extends JpaRepository<MaterialUnit, UUID> {

    Optional<MaterialUnit> findByVariantCode(String materialCode);
}
