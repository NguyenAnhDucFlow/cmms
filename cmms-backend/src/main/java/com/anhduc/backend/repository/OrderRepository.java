package com.anhduc.backend.repository;

import com.anhduc.backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface OrderRepository extends JpaRepository<Order, UUID> {

    @Query("SELECT MAX(o.orderCode) FROM Order o " +
            "WHERE o.orderCode LIKE :prefix%")
    String findMaxOrderCodeWithPrefix(@Param("prefix") String prefix);
}
