package com.anhduc.backend.repository;

import com.anhduc.backend.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface StoreRepository extends JpaRepository<Store, UUID> {
    Optional<Store> findByName(String name);

    @Query("SELECT s.isCentralWarehouse FROM Store s WHERE s.id = :storeId")
    Boolean isCentralWarehouse(@Param("storeId") UUID storeId);
}
