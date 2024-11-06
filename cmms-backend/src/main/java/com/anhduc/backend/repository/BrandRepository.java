package com.anhduc.backend.repository;

import com.anhduc.backend.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface BrandRepository extends JpaRepository<Brand, UUID> {
    Optional<Brand> findByName(String name);
}
