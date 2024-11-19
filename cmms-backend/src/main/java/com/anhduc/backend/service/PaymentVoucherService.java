package com.anhduc.backend.service;

import com.anhduc.backend.entity.GoodsReceipt;
import com.anhduc.backend.entity.PaymentVoucher;
import com.anhduc.backend.entity.Supplier;
import com.anhduc.backend.repository.PaymentVoucherRepository;
import com.anhduc.backend.utils.UserUtils;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class PaymentVoucherService {

    PaymentVoucherRepository paymentVoucherRepository;
    UserUtils userUtils;

    public void paymentVoucherForSupplier(Supplier supplier, GoodsReceipt goodsReceipt, BigDecimal amount) {
        PaymentVoucher paymentVoucher = new PaymentVoucher();
        paymentVoucher.setPaymentVoucherCode(generatePurchaseOrderCode());
        paymentVoucher.setSupplier(supplier);
        paymentVoucher.setGoodsReceipt(goodsReceipt);
        paymentVoucher.setAmount(amount);
        paymentVoucher.setCreatedBy(userUtils.getCurrentUser());
        paymentVoucherRepository.save(paymentVoucher);
    }


    //-------------------- PRIVATE METHOD ---------------------------------

    private String generatePurchaseOrderCode() {
        String prefix = "PC";
        String lastCode = paymentVoucherRepository.findMaxPaymentVoucherCodeWithPrefix(prefix);
        int nextNumber = 1;
        if (lastCode != null) {
            String lastNumberStr = lastCode.replace(prefix, "");
            nextNumber = Integer.parseInt(lastNumberStr) + 1;
        }
        return  prefix + String.format("%04d", nextNumber);
    }

}
