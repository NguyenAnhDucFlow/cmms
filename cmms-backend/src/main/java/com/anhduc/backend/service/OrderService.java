package com.anhduc.backend.service;

import com.anhduc.backend.dto.request.OrderDetailRequest;
import com.anhduc.backend.dto.request.OrderRequest;
import com.anhduc.backend.entity.Order;
import com.anhduc.backend.entity.OrderDetail;
import com.anhduc.backend.enums.OrderStatus;
import com.anhduc.backend.enums.PaymentMethod;
import com.anhduc.backend.repository.OrderRepository;
import com.anhduc.backend.utils.UserUtils;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class OrderService {

    OrderRepository orderRepository;
    UserUtils userUtils;

    public void createOrder(OrderRequest orderRequest) {
        // Tạo đơn hàng
        Order order = new Order();
        order.setShippingAddress(orderRequest.getShippingAddress());
        order.setPaymentMethod(orderRequest.getPaymentMethod());
        order.setStatus(OrderStatus.PENDING); // Trạng thái mặc định khi tạo đơn
        order.setOrderCode(generateOrderCode());
        order.setCreatedBy(userUtils.getCurrentUser());

        // Thêm chi tiết sản phẩm vào đơn hàng
        List<OrderDetail> orderDetails = new ArrayList<>();
        BigDecimal totalAmount = BigDecimal.ZERO;

        for (OrderDetailRequest detailRequest : orderRequest.getOrderDetails()) {
            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setMaterialCode(detailRequest.getMaterialCode());
            orderDetail.setQuantity(detailRequest.getQuantity());
            orderDetail.setCostPrice(detailRequest.getCostPrice());
            orderDetail.setTotalPrice(detailRequest.getTotalPrice());
            orderDetail.setName(detailRequest.getName());
            orderDetail.setUnitName(detailRequest.getUnitName());
            orderDetail.setOrder(order);
            orderDetails.add(orderDetail);
            totalAmount = totalAmount.add(detailRequest.getTotalPrice());
        }
        order.setDetails(orderDetails);
        order.setTotalAmount(totalAmount);

        // Xử lý thanh toán ngay lập tức
        if (order.getPaymentMethod() == PaymentMethod.BANK_TRANSFER) {
            order.setPaidAmount(order.getTotalAmount());
            order.setDebtAmount(BigDecimal.ZERO);
            order.setStatus(OrderStatus.PAID);
        } else if (order.getPaymentMethod() == PaymentMethod.COD) {
            order.setPaidAmount(BigDecimal.ZERO);
            order.setDebtAmount(order.getTotalAmount());
            order.setStatus(OrderStatus.PENDING); // Đợi thanh toán khi giao hàng
        }

        orderRepository.save(order);
    }


    // ----------------------PRIVATE METHOD ----------------------------------
    private String generateOrderCode() {
        String prefix = "DH";
        String lastCode = orderRepository.findMaxOrderCodeWithPrefix(prefix);
        int nextNumber = 1;
        if (lastCode != null) {
            String lastNumberStr = lastCode.replace(prefix, "");
            nextNumber = Integer.parseInt(lastNumberStr) + 1;
        }
        return  prefix + String.format("%04d", nextNumber);
    }
}
