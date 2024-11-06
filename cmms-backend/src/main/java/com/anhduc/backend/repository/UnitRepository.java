package com.anhduc.backend.repository;

import com.anhduc.backend.entity.Unit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UnitRepository extends JpaRepository<Unit, UUID> {
    Optional<Unit> findByName(String name);
}
