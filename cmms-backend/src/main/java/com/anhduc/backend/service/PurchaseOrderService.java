package com.anhduc.backend.service;

import com.anhduc.backend.dto.request.PurchaseOrderCreationRequest;
import com.anhduc.backend.dto.request.PurchaseOrderDetailCreationRequest;
import com.anhduc.backend.entity.PurchaseOrder;
import com.anhduc.backend.entity.PurchaseOrderDetail;
import com.anhduc.backend.entity.Store;
import com.anhduc.backend.entity.Supplier;
import com.anhduc.backend.enums.PurchaseOrderStatus;
import com.anhduc.backend.exception.AppException;
import com.anhduc.backend.exception.ErrorCode;
import com.anhduc.backend.repository.PurchaseOrderRepository;
import com.anhduc.backend.repository.StoreRepository;
import com.anhduc.backend.repository.SupplierRepository;
import com.anhduc.backend.utils.UserUtils;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class PurchaseOrderService {

    ModelMapper modelMapper;
    PurchaseOrderRepository purchaseOrderRepository;
    SupplierRepository supplierRepository;
    StoreRepository storeRepository;
    UserUtils userUtils;

    @Transactional
    public void create(PurchaseOrderCreationRequest request) {

        Supplier supplier = supplierRepository.findById(request.getSupplierId()).orElseThrow(
                () -> new AppException(ErrorCode.SUPPLIER_NOT_EXISTED)
        );
        Store store = storeRepository.findById(request.getStoreId()).orElseThrow(
                () -> new AppException(ErrorCode.STORE_NOT_EXISTED)
        );
        PurchaseOrder purchaseOrder = PurchaseOrder.builder()
                .supplier(supplier)
                .store(store)
                .estimatedDeliveryDate(request.getEstimatedDeliveryDate())
                .createdBy(userUtils.getCurrentUser())
                .status(request.getStatus() != null ? request.getStatus() : PurchaseOrderStatus.TEMPORARY)
                .note(request.getNote())
                .purchaseOrderCode(generatePurchaseOrderCode())
                .build();

        if (purchaseOrder.getDetails() == null) {
            purchaseOrder.setDetails(new ArrayList<>());
        }

        // tính toán tổng số lượng và tổng giá trị dựa trên chi tiết đơn hàng
        int totalQuantity = 0;
        BigDecimal totalAmount = BigDecimal.ZERO;

        for (PurchaseOrderDetailCreationRequest item : request.getDetails()) {
            PurchaseOrderDetail orderDetail = new PurchaseOrderDetail();

            orderDetail.setMaterialCode(item.getMaterialCode());
            orderDetail.setQuantity(item.getQuantity());
            orderDetail.setUnitPrice(item.getUnitPrice());

            BigDecimal detailTotalPrice = item.getUnitPrice().multiply(new BigDecimal(item.getQuantity()));
            orderDetail.setTotalPrice(detailTotalPrice);
            // cộng dồn vào tổng đơn hàng
            totalQuantity += item.getQuantity();
            totalAmount = totalAmount.add(detailTotalPrice);

            orderDetail.setPurchaseOrder(purchaseOrder);
            purchaseOrder.getDetails().add(orderDetail);
        }

        purchaseOrder.setTotalQuantity(totalQuantity);
        purchaseOrder.setTotalAmount(totalAmount);
        purchaseOrder.setTotalItems(request.getDetails().size());

        purchaseOrderRepository.save(purchaseOrder);
    }


    //-------------------- PRIVATE METHOD ---------------------------------

    private String generatePurchaseOrderCode() {
        String prefix = "PDN";
        String lastCode = purchaseOrderRepository.findMaxPurchaseOrderCodeWithPrefix(prefix);
        int nextNumber = 1;
        if (lastCode != null) {
            String lastNumberStr = lastCode.replace(prefix, "");
            nextNumber = Integer.parseInt(lastNumberStr) + 1;
        }
        return  prefix + String.format("%04d", nextNumber);
    }

}
