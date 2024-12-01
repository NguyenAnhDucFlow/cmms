package com.anhduc.backend.enums;

public enum OrderStatus {
    PENDING, // Đang chờ thanh toán (COD)
    PAID,    // Đã thanh toán (Chuyển khoản)
    SHIPPED, // Đã giao hàng
    COMPLETED, // Đã hoàn thành
    CANCELLED // Đã hủy
}
