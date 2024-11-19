package com.anhduc.backend.repository;

import com.anhduc.backend.entity.PaymentVoucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface PaymentVoucherRepository extends JpaRepository<PaymentVoucher, UUID> {


    @Query("SELECT MAX(p.paymentVoucherCode) FROM PaymentVoucher p " +
            "WHERE p.paymentVoucherCode LIKE :prefix%")
    String findMaxPaymentVoucherCodeWithPrefix(@Param("prefix") String prefix);

}
