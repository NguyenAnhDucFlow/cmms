package com.anhduc.backend.service;

import com.anhduc.backend.dto.request.InvoiceDetailDTORequest;
import com.anhduc.backend.dto.request.InvoiceRequest;
import com.anhduc.backend.entity.*;
import com.anhduc.backend.enums.InvoiceStatus;
import com.anhduc.backend.exception.AppException;
import com.anhduc.backend.exception.ErrorCode;
import com.anhduc.backend.repository.*;
import com.anhduc.backend.utils.UserUtils;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Optional;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class InvoiceService {

    InvoiceRepository invoiceRepository;
    StoreRepository storeRepository;
    UserRepository userRepository;
    UserUtils userUtils;
    StoreWarehouseRepository storeWarehouseRepository;
    CentralWarehouseRepository centralWarehouseRepository;
    MaterialRepository materialRepository;
    MaterialUnitRepository materialUnitRepository;

    @Transactional
    public void createInvoice(InvoiceRequest request) {

        Store store = storeRepository.findById(request.getStoreId())
                .orElseThrow(() -> new AppException(ErrorCode.STORE_NOT_EXISTED));

        User customer = userRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Invoice invoice = new Invoice();
        invoice.setStore(store);
        invoice.setCustomer(customer);
        invoice.setStatus(InvoiceStatus.PAID);
        invoice.setInvoiceCode(generateInvoiceCode());
        invoice.setCreatedBy(userUtils.getCurrentUser());
        invoice.setNote(request.getNote());

        int totalQuantity = 0;
        BigDecimal totalAmount = BigDecimal.ZERO;

        if (invoice.getDetails() == null || invoice.getDetails().isEmpty()) {
            invoice.setDetails(new ArrayList<>());
        }

        for (InvoiceDetailDTORequest item : request.getDetails()) {
            InvoiceDetail invoiceDetail = new InvoiceDetail();

            invoiceDetail.setQuantity(item.getQuantity());
            invoiceDetail.setMaterialCode(item.getMaterialCode());
            invoiceDetail.setCostPrice(item.getCostPrice());
            invoiceDetail.setName(item.getName());
            invoiceDetail.setUnitName(item.getUnitName());

            BigDecimal detailTotalPrice = item.getCostPrice().multiply(new BigDecimal(item.getQuantity()));
            invoiceDetail.setTotalPrice(detailTotalPrice);

            totalQuantity += item.getQuantity();
            totalAmount = totalAmount.add(detailTotalPrice);

            invoiceDetail.setInvoice(invoice);
            invoice.getDetails().add(invoiceDetail);

            updateWarehouse(store, item.getMaterialCode(), item.getQuantity());

        }
        invoice.setDebtAmount(totalAmount.subtract(invoice.getPaidAmount()));
        invoice.setTotalQuantity(totalQuantity);
        invoice.setTotalAmount(totalAmount);
        invoice.setTotalItems(request.getDetails().size());

        invoiceRepository.save(invoice);

    }


    // -----------------------------PRIVATE METHOD ---------------------------------
    private String generateInvoiceCode() {
        String prefix = "HD";
        String lastCode = invoiceRepository.findMaxInvoiceCodeWithPrefix(prefix);
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
        // Xử lý để quy đổi về đơn vị cơ bản (basic unit)
        double quantityInBasicUnit = processMaterialCode(materialCode, quantity);

        // Xác định Material từ materialCode hoặc variantCode
        Material material = materialRepository.findByMaterialCode(materialCode)
                .orElseGet(() -> materialUnitRepository.findByVariantCode(materialCode)
                        .map(MaterialUnit::getMaterial)
                        .orElseThrow(() -> new RuntimeException(
                                "Material code not found as materialCode or variantCode: " + materialCode))
                );

        // Kiểm tra và cập nhật tồn kho tại kho trung tâm hoặc kho cửa hàng
        if (store.isCentralWarehouse()) {
            CentralWarehouse warehouse = centralWarehouseRepository.findByCompanyAndMaterial(store, material)
                    .orElseThrow(() -> new RuntimeException(
                            "Material not found in Central Warehouse for company: " + store.getName()));

            // Kiểm tra tồn kho trước khi trừ
            if (warehouse.getQuantity() < quantityInBasicUnit) {
                throw new RuntimeException("Insufficient stock in Central Warehouse for material: " + material.getName());
            }

            // Trừ số lượng từ kho trung tâm
            warehouse.setQuantity(warehouse.getQuantity() - quantityInBasicUnit);
            centralWarehouseRepository.save(warehouse);

        } else {
            StoreWarehouse warehouse = storeWarehouseRepository.findByStoreAndMaterial(store, material)
                    .orElseThrow(() -> new RuntimeException(
                            "Material not found in Store Warehouse for store: " + store.getName()));

            // Kiểm tra tồn kho trước khi trừ
            if (warehouse.getQuantity() < quantityInBasicUnit) {
                throw new RuntimeException("Insufficient stock in Store Warehouse for material: " + material.getName());
            }

            // Trừ số lượng từ kho cửa hàng
            warehouse.setQuantity(warehouse.getQuantity() - quantityInBasicUnit);
            storeWarehouseRepository.save(warehouse);
        }
    }


}
