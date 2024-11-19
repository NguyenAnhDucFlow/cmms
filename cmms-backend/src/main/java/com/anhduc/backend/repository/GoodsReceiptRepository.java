package com.anhduc.backend.repository;

import com.anhduc.backend.entity.GoodsReceipt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface GoodsReceiptRepository extends JpaRepository<GoodsReceipt, UUID> {


    @Query("SELECT MAX(p.goodsReceiptCode) FROM GoodsReceipt p " +
            "WHERE p.goodsReceiptCode LIKE :prefix%")
    String findMaxGoodsReceiptCodeWithPrefix(@Param("prefix") String prefix);

}
