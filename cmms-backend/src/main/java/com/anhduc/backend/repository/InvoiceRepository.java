package com.anhduc.backend.repository;

import com.anhduc.backend.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface InvoiceRepository extends JpaRepository<Invoice, UUID> {

    @Query("SELECT MAX(i.invoiceCode) FROM Invoice i " +
            "WHERE i.invoiceCode LIKE :prefix%")
    String findMaxInvoiceCodeWithPrefix(@Param("prefix") String prefix);
}
