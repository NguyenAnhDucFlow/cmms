package com.anhduc.backend.repository;

import com.anhduc.backend.entity.StoreMaterial;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface StoreMaterialRepository extends JpaRepository<StoreMaterial, UUID> {
}
