package com.anhduc.backend.repository;

import com.anhduc.backend.entity.GoodsReceiptDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface GoodsReceiptDetailRepository extends JpaRepository<GoodsReceiptDetail, UUID> {
    GoodsReceiptDetail findByGoodsReceiptId(UUID id);
}
