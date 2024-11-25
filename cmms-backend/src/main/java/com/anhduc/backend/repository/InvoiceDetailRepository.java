package com.anhduc.backend.repository;

import com.anhduc.backend.entity.InvoiceDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface InvoiceDetailRepository extends JpaRepository<InvoiceDetail, UUID> {
}
