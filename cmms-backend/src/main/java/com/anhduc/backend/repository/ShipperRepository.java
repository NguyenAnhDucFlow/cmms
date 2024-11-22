package com.anhduc.backend.repository;

import com.anhduc.backend.entity.Shipper;
import com.anhduc.backend.enums.ShipperStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface ShipperRepository extends JpaRepository<Shipper, UUID> {

    @Query("SELECT s FROM Shipper s WHERE :status IS NULL OR s.shipperStatus = :status")
    List<Shipper> findByStatusOrAll(@Param("status") ShipperStatus status);
}
