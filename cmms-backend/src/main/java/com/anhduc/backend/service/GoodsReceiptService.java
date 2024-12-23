package com.anhduc.backend.service;

import com.anhduc.backend.dto.request.GoodsReceiptCreationRequest;
import com.anhduc.backend.dto.request.GoodsReceiptDetailCreationRequest;
import com.anhduc.backend.entity.*;
import com.anhduc.backend.enums.GoodsReceiptStatus;
import com.anhduc.backend.enums.PurchaseOrderStatus;
import com.anhduc.backend.enums.ReceiptType;
import com.anhduc.backend.exception.AppException;
import com.anhduc.backend.exception.ErrorCode;
import com.anhduc.backend.repository.*;
import com.anhduc.backend.specification.GoodsReceiptSpecification;
import com.anhduc.backend.utils.UserUtils;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class GoodsReceiptService {

    GoodsReceiptRepository goodsReceiptRepository;
    SupplierRepository supplierRepository;
    StoreRepository storeRepository;
    MaterialRepository materialRepository;
    MaterialUnitRepository materialUnitRepository;
    CentralWarehouseRepository centralWarehouseRepository;
    StoreWarehouseRepository storeWarehouseRepository;
    PaymentVoucherService paymentVoucherService;
    NotificationService notificationService;
    PurchaseOrderRepository purchaseOrderRepository;
    PurchaseOrderDetailRepository purchaseOrderDetailRepository;
    UserUtils userUtils;

    @Transactional
    public void createGoodsReceipt(GoodsReceiptCreationRequest request) {

        Supplier supplier = supplierRepository.findById(request.getSupplierId())
                .orElseThrow(() -> new AppException(ErrorCode.SUPPLIER_NOT_EXISTED));

        Store store = storeRepository.findById(request.getStoreId())
                .orElseThrow(() -> new AppException(ErrorCode.STORE_NOT_EXISTED));

        GoodsReceipt goodsReceipt = new GoodsReceipt();
        goodsReceipt.setSupplier(supplier);
        goodsReceipt.setStore(store);
        goodsReceipt.setGoodsReceiptCode(generateGoodsReceiptCode());
        goodsReceipt.setCreatedBy(userUtils.getCurrentUser());
        goodsReceipt.setReceiptType(ReceiptType.DIRECT_PURCHASE);
        goodsReceipt.setNote(request.getNote());
        goodsReceipt.setPaidAmount(request.getPaidAmount());
        goodsReceipt.setStatus(request.getStatus() != null ? request.getStatus() : GoodsReceiptStatus.TEMPORARY);

        int totalQuantity = 0;
        BigDecimal totalAmount = BigDecimal.ZERO;

        if (goodsReceipt.getDetails() == null || goodsReceipt.getDetails().isEmpty()) {
            goodsReceipt.setDetails(new ArrayList<>());
        }

        for (GoodsReceiptDetailCreationRequest item : request.getDetails()) {
            GoodsReceiptDetail goodsReceiptDetail = new GoodsReceiptDetail();

            goodsReceiptDetail.setQuantity(item.getQuantity());
            goodsReceiptDetail.setMaterialCode(item.getMaterialCode());
            goodsReceiptDetail.setCostPrice(item.getCostPrice());
            goodsReceiptDetail.setName(item.getName());
            goodsReceiptDetail.setUnitName(item.getUnitName());

            BigDecimal detailTotalPrice = item.getCostPrice().multiply(new BigDecimal(item.getQuantity()));
            goodsReceiptDetail.setTotalPrice(detailTotalPrice);

            totalQuantity += item.getQuantity();
            totalAmount = totalAmount.add(detailTotalPrice);

            goodsReceiptDetail.setGoodsReceipt(goodsReceipt);
            goodsReceipt.getDetails().add(goodsReceiptDetail);

            if (GoodsReceiptStatus.COMPLETED.equals(goodsReceipt.getStatus())) {
                updateMaterialCostAndLastPrice(item.getMaterialCode(), item.getCostPrice(), item.getQuantity());
                updateWarehouse(store, item.getMaterialCode(), item.getQuantity());
            }
        }

        goodsReceipt.setDebtAmount(totalAmount.subtract(goodsReceipt.getPaidAmount()));
        goodsReceipt.setTotalQuantity(totalQuantity);
        goodsReceipt.setTotalAmount(totalAmount);
        goodsReceipt.setTotalItems(request.getDetails().size());

        goodsReceiptRepository.save(goodsReceipt);

        if (GoodsReceiptStatus.COMPLETED.equals(goodsReceipt.getStatus())) {
            BigDecimal remainingAmount = totalAmount.subtract(request.getPaidAmount());
            if (remainingAmount.compareTo(BigDecimal.ZERO) > 0) {
                paymentVoucherService.paymentVoucherForSupplier(supplier, goodsReceipt, request.getPaidAmount());
            }

            notificationService.createNotificationGoodsReceipt(goodsReceipt.getGoodsReceiptCode(),
                    goodsReceipt.getCreatedBy(), goodsReceipt.getTotalAmount().toString());
        }
    }

    @Transactional
    public void createPurchaseOrderGoodsReceipt(GoodsReceiptCreationRequest request) {
        PurchaseOrder purchaseOrder = purchaseOrderRepository.findById(request.getPurchaseOrderId())
                .orElseThrow(() -> new AppException(ErrorCode.PURCHASE_ORDER_NOT_FOUND));

        if (!purchaseOrder.getStatus().equals(PurchaseOrderStatus.CONFIRMED)) {
            throw new AppException(ErrorCode.INVALID_PURCHASE_ORDER_STATUS);
        }

        Supplier supplier = supplierRepository.findById(request.getSupplierId())
                .orElseThrow(() -> new AppException(ErrorCode.SUPPLIER_NOT_EXISTED));

        Store store = storeRepository.findById(request.getStoreId())
                .orElseThrow(() -> new AppException(ErrorCode.STORE_NOT_EXISTED));

        GoodsReceipt goodsReceipt = new GoodsReceipt();
        goodsReceipt.setSupplier(supplier);
        goodsReceipt.setStore(store);
        goodsReceipt.setGoodsReceiptCode(generateGoodsReceiptCode());
        goodsReceipt.setCreatedBy(userUtils.getCurrentUser());
        goodsReceipt.setReceiptType(ReceiptType.DIRECT_PURCHASE);
        goodsReceipt.setNote(request.getNote());
        goodsReceipt.setPaidAmount(request.getPaidAmount());
        goodsReceipt.setStatus(request.getStatus() != null ? request.getStatus() : GoodsReceiptStatus.TEMPORARY);

        int totalQuantity = 0;
        BigDecimal totalAmount = BigDecimal.ZERO;

        if (goodsReceipt.getDetails() == null || goodsReceipt.getDetails().isEmpty()) {
            goodsReceipt.setDetails(new ArrayList<>());
        }

        for (GoodsReceiptDetailCreationRequest item : request.getDetails()) {
            GoodsReceiptDetail goodsReceiptDetail = new GoodsReceiptDetail();

            goodsReceiptDetail.setQuantity(item.getQuantity());
            goodsReceiptDetail.setMaterialCode(item.getMaterialCode());
            goodsReceiptDetail.setCostPrice(item.getCostPrice());
            goodsReceiptDetail.setName(item.getName());
            goodsReceiptDetail.setUnitName(item.getUnitName());

            BigDecimal detailTotalPrice = item.getCostPrice().multiply(new BigDecimal(item.getQuantity()));
            goodsReceiptDetail.setTotalPrice(detailTotalPrice);

            totalQuantity += item.getQuantity();
            totalAmount = totalAmount.add(detailTotalPrice);

            goodsReceiptDetail.setGoodsReceipt(goodsReceipt);
            goodsReceipt.getDetails().add(goodsReceiptDetail);

            // Cập nhật số lượng đã nhận trong PurchaseOrderDetail
            PurchaseOrderDetail orderDetail = purchaseOrder.getDetails().stream()
                    .filter(detail -> detail.getMaterialCode().equals(item.getMaterialCode()))
                    .findFirst()
                    .orElseThrow(() -> new AppException(ErrorCode.ORDER_DETAIL_NOT_FOUND));

            if (orderDetail.getReceivedQuantity() + item.getQuantity() > orderDetail.getQuantity()) {
                throw new AppException(ErrorCode.INVALID_QUANTITY);
            }

            orderDetail.setReceivedQuantity(orderDetail.getReceivedQuantity() + item.getQuantity());

            if (GoodsReceiptStatus.COMPLETED.equals(goodsReceipt.getStatus())) {
                purchaseOrderDetailRepository.save(orderDetail);
                updateWarehouse(store, item.getMaterialCode(), item.getQuantity());
            }
        }

        goodsReceipt.setDebtAmount(totalAmount.subtract(goodsReceipt.getPaidAmount()));
        goodsReceipt.setTotalQuantity(totalQuantity);
        goodsReceipt.setTotalAmount(totalAmount);
        goodsReceipt.setTotalItems(request.getDetails().size());

        goodsReceiptRepository.save(goodsReceipt);

        if (GoodsReceiptStatus.COMPLETED.equals(goodsReceipt.getStatus())) {

            purchaseOrder.setStatus(PurchaseOrderStatus.RECEIVED);

            BigDecimal remainingAmount = totalAmount.subtract(request.getPaidAmount());
            if (remainingAmount.compareTo(BigDecimal.ZERO) > 0) {
                paymentVoucherService.paymentVoucherForSupplier(supplier, goodsReceipt, request.getPaidAmount());
            }

            notificationService.createNotificationGoodsReceipt(goodsReceipt.getGoodsReceiptCode(),
                    goodsReceipt.getCreatedBy(), goodsReceipt.getTotalAmount().toString());
        }
    }


    public Page<GoodsReceipt> getGoodsReceipts(
            List<GoodsReceiptStatus> statuses,
            UUID storeId,
            String purchaseOrderCode,
            Pageable pageable) {

        Specification<GoodsReceipt> spec = Specification
                .where(GoodsReceiptSpecification.hasStatus(statuses))
                .and(GoodsReceiptSpecification.hasStore(storeId))
                .and(GoodsReceiptSpecification.hasGoodsReceiptCodeLike(purchaseOrderCode));

        return goodsReceiptRepository.findAll(spec, pageable);
    }



    //------------------------PRIVATE METHOD----------------------------

    private String generateGoodsReceiptCode() {
        String prefix = "PN";
        String lastCode = goodsReceiptRepository.findMaxGoodsReceiptCodeWithPrefix(prefix);
        int nextNumber = 1;
        if (lastCode != null) {
            String lastNumberStr = lastCode.replace(prefix, "");
            nextNumber = Integer.parseInt(lastNumberStr) + 1;
        }
        return  prefix + String.format("%04d", nextNumber);
    }

    private double processMaterialCode(String materialCode, double quantity) {
        Optional<Material> materialOpt = materialRepository.findByMaterialCode(materialCode);
        if (materialOpt.isPresent()) {
            return quantity;
        }
        Optional<MaterialUnit> materialUnitOpt = materialUnitRepository.findByVariantCode(materialCode);
        if (materialUnitOpt.isPresent()) {
            return quantity * materialUnitOpt.get().getConversionRate();
        }
        throw new RuntimeException("Material code not found in Materials or Material_Unit.");
    }

    private void updateWarehouse(Store store, String materialCode, double quantity) {
        double quantityInBasicUnit = processMaterialCode(materialCode, quantity);

        // Xác định material từ materialCode hoặc variantCode
        Material material = materialRepository.findByMaterialCode(materialCode)
                .orElseGet(() -> materialUnitRepository.findByVariantCode(materialCode)
                        .map(MaterialUnit::getMaterial)
                        .orElseThrow(() -> new
                                RuntimeException("Material code not found as materialCode or variantCode: " + materialCode))
                );

        if (store.isCentralWarehouse()) {
            CentralWarehouse warehouse = centralWarehouseRepository.findByCompanyAndMaterial(store, material)
                    .orElse(new CentralWarehouse(store, material, 0));
            warehouse.setQuantity(warehouse.getQuantity() + quantityInBasicUnit);
            centralWarehouseRepository.save(warehouse);
        } else {
            StoreWarehouse warehouse = storeWarehouseRepository.findByStoreAndMaterial(store, material)
                    .orElse(new StoreWarehouse(store, material, 0));
            warehouse.setQuantity(warehouse.getQuantity() + quantityInBasicUnit);
            storeWarehouseRepository.save(warehouse);
        }
    }

    private void updateMaterialCostAndLastPrice(String materialCode, BigDecimal purchasePrice, int quantity) {
        Optional<Material> materialOpt = materialRepository.findByMaterialCode(materialCode);

        if (materialOpt.isPresent()) {
            Material material = materialOpt.get();

            // Tính toán giá vốn bình quân gia quyền mới
            BigDecimal currentTotalCost = material.getCostPrice().multiply(new BigDecimal(material.getMinStock()));
            BigDecimal newTotalCost = purchasePrice.multiply(new BigDecimal(quantity));
            BigDecimal totalStock = new BigDecimal(material.getMinStock() + quantity);

            BigDecimal updatedCostPrice = currentTotalCost.add(newTotalCost).divide(totalStock, BigDecimal.ROUND_HALF_UP);

            // Cập nhật giá vốn và giá nhập cuối
            material.setCostPrice(updatedCostPrice);
            material.setLastPurchasePrice(purchasePrice);
            material.setMinStock(material.getMinStock() + quantity); // Cập nhật tồn kho tối thiểu

            materialRepository.save(material);

            // Cập nhật cho MaterialUnit nếu có
            List<MaterialUnit> materialUnits = materialUnitRepository.findByMaterial(material);
            for (MaterialUnit unit : materialUnits) {
                unit.setCostPrice(material.getCostPrice().multiply(BigDecimal.valueOf(unit.getConversionRate())));
                unit.setLastPurchasePrice(purchasePrice.multiply(BigDecimal.valueOf(unit.getConversionRate())));
                materialUnitRepository.save(unit);
            }
        }
    }


}

