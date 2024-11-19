package com.anhduc.backend.service;

import com.anhduc.backend.dto.PurchaseOrderDTO;
import com.anhduc.backend.dto.request.PurchaseOrderCreationRequest;
import com.anhduc.backend.dto.request.PurchaseOrderDetailCreationRequest;
import com.anhduc.backend.dto.request.PurchaseOrderUpdateRequest;
import com.anhduc.backend.entity.PurchaseOrder;
import com.anhduc.backend.entity.PurchaseOrderDetail;
import com.anhduc.backend.entity.Store;
import com.anhduc.backend.entity.Supplier;
import com.anhduc.backend.enums.PurchaseOrderStatus;
import com.anhduc.backend.exception.AppException;
import com.anhduc.backend.exception.ErrorCode;
import com.anhduc.backend.repository.PurchaseOrderDetailRepository;
import com.anhduc.backend.repository.PurchaseOrderRepository;
import com.anhduc.backend.repository.StoreRepository;
import com.anhduc.backend.repository.SupplierRepository;
import com.anhduc.backend.specification.PurchaseOrderSpecification;
import com.anhduc.backend.utils.UserUtils;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class PurchaseOrderService {

    ModelMapper modelMapper;
    PurchaseOrderRepository purchaseOrderRepository;
    PurchaseOrderDetailRepository purchaseOrderDetailRepository;
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
            orderDetail.setCostPrice(item.getCostPrice());
            orderDetail.setName(item.getName());
            orderDetail.setUnitName(item.getUnitName());

            BigDecimal detailTotalPrice = item.getCostPrice().multiply(new BigDecimal(item.getQuantity()));
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

    @Transactional
    public void update(PurchaseOrderUpdateRequest request) {

        PurchaseOrder purchaseOrder = purchaseOrderRepository.findById(request.getPurchaseOrderId())
                .orElseThrow(() -> new AppException(ErrorCode.PURCHASE_ORDER_NOT_FOUND));

        if (request.getSupplierId() != null) {
            Supplier supplier = supplierRepository.findById(request.getSupplierId())
                    .orElseThrow(() -> new AppException(ErrorCode.SUPPLIER_NOT_EXISTED));
            purchaseOrder.setSupplier(supplier);
        }

        if (request.getStoreId() != null) {
            Store store = storeRepository.findById(request.getStoreId())
                    .orElseThrow(() -> new AppException(ErrorCode.STORE_NOT_EXISTED));
            purchaseOrder.setStore(store);
        }

        purchaseOrder.setEstimatedDeliveryDate(request.getEstimatedDeliveryDate());
        purchaseOrder.setStatus(request.getStatus() != null ? request.getStatus() : purchaseOrder.getStatus());
        purchaseOrder.setNote(request.getNote());

        // Cập nhật danh sách chi tiết đơn hàng
        Map<String, PurchaseOrderDetail> existingDetailsMap = purchaseOrder.getDetails().stream()
                .collect(Collectors.toMap(PurchaseOrderDetail::getMaterialCode, Function.identity()));

        int totalQuantity = 0;
        BigDecimal totalAmount = BigDecimal.ZERO;

        // Cập nhật hoặc thêm chi tiết mới
        for (PurchaseOrderDetailCreationRequest item : request.getDetails()) {
            PurchaseOrderDetail orderDetail = existingDetailsMap.getOrDefault(item.getMaterialCode(), new PurchaseOrderDetail());
            orderDetail.setMaterialCode(item.getMaterialCode());
            orderDetail.setQuantity(item.getQuantity());
            orderDetail.setCostPrice(item.getCostPrice());
            orderDetail.setName(item.getName());
            orderDetail.setUnitName(item.getUnitName());

            BigDecimal detailTotalPrice = item.getCostPrice().multiply(new BigDecimal(item.getQuantity()));
            orderDetail.setTotalPrice(detailTotalPrice);

            // Cộng dồn tổng số lượng và tổng giá trị
            totalQuantity += item.getQuantity();
            totalAmount = totalAmount.add(detailTotalPrice);

            // Nếu là chi tiết mới, thêm vào danh sách đơn hàng
            if (orderDetail.getPurchaseOrder() == null) {
                orderDetail.setPurchaseOrder(purchaseOrder);
                purchaseOrder.getDetails().add(orderDetail);
            }
        }

        // Xóa các chi tiết không còn trong request
        List<PurchaseOrderDetail> detailsToRemove = purchaseOrder.getDetails().stream()
                .filter(detail -> request.getDetails().stream()
                        .noneMatch(item -> item.getMaterialCode().equals(detail.getMaterialCode())))
                .toList();
        purchaseOrder.getDetails().removeAll(detailsToRemove);

        // Cập nhật tổng số lượng, giá trị, và số lượng mục
        purchaseOrder.setTotalQuantity(totalQuantity);
        purchaseOrder.setTotalAmount(totalAmount);
        purchaseOrder.setTotalItems(request.getDetails().size());

        // Lưu cập nhật vào cơ sở dữ liệu
        purchaseOrderRepository.save(purchaseOrder);
    }


    public Page<PurchaseOrder> getPurchaseOrders(
            List<PurchaseOrderStatus> statuses,
            UUID storeId,
            String purchaseOrderCode,
            Pageable pageable) {

        Specification<PurchaseOrder> spec = Specification
                .where(PurchaseOrderSpecification.hasStatus(statuses))
                .and(PurchaseOrderSpecification.hasStore(storeId))
                .and(PurchaseOrderSpecification.hasPurchaseOrderCodeLike(purchaseOrderCode));

        return purchaseOrderRepository.findAll(spec, pageable);
    }

    public PurchaseOrderDTO getById(UUID purchaseOrderId) {
        PurchaseOrder purchaseOrder =  purchaseOrderRepository.findById(purchaseOrderId).orElseThrow(
                () -> new AppException(ErrorCode.PURCHASE_ORDER_NOT_FOUND)
        );
        return mapToDTO(purchaseOrder);
    }

    public PurchaseOrderDTO mapToDTO(PurchaseOrder purchaseOrder) {
        return modelMapper.map(purchaseOrder, PurchaseOrderDTO.class);
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
