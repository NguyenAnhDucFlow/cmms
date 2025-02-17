package com.anhduc.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import lombok.Getter;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY(1001, "Uncategorized error", HttpStatus.BAD_REQUEST),
    USER_EXISTED(1002, "User existed", HttpStatus.BAD_REQUEST),
    USERNAME_INVALID(1003, "Username must be at least {min} characters", HttpStatus.BAD_REQUEST),
    INVALID_PASSWORD(1004, "Password must be at least {min} characters", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1005, "User not existed", HttpStatus.NOT_FOUND),
    UNAUTHENTICATED(1006, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1007, "You do not have permission", HttpStatus.FORBIDDEN),
    INVALID_DOB(1008, "Your age must be at least {min}", HttpStatus.BAD_REQUEST),
    USER_ROLE_NOT_EXISTED(1009, "User role not existed", HttpStatus.NOT_FOUND),
    STORE_NOT_EXISTED(1010, "Store not existed", HttpStatus.NOT_FOUND),
    EMAIL_OR_PASSWORD_NOT_CORRECT(1011, "Email hoặc mật khẩu không chính xác", HttpStatus.NOT_FOUND),
    CATEGORY_NOT_EXISTED(1012, "Category not existed", HttpStatus.NOT_FOUND),
    BRAND_NOT_EXISTED(1013, "Brand not existed", HttpStatus.NOT_FOUND),
    UNIT_NOT_EXISTED(1014, "Unit not existed", HttpStatus.NOT_FOUND),
    STORE_MATERIAL_NOT_FOUND(1015, "Store Material not found", HttpStatus.NOT_FOUND),
    PERMISSION_NOT_EXISTED(1016, "Permission not existed", HttpStatus.NOT_FOUND),
    MATERIAL_NOT_FOUND(1017, "Material not existed", HttpStatus.NOT_FOUND),
    SUPPLIER_NOT_EXISTED(1017, "Supplier not existed", HttpStatus.NOT_FOUND),
    PURCHASE_ORDER_NOT_FOUND(1018, "Purchase order not existed", HttpStatus.NOT_FOUND),
    INVALID_PURCHASE_ORDER_STATUS(1019, "Invalid Purchase Order Status", HttpStatus.BAD_REQUEST),
    ORDER_DETAIL_NOT_FOUND(1020, "Order detail not found", HttpStatus.NOT_FOUND),
    INVALID_QUANTITY(1021, "Received quantity exceeds ordered quantity for material", HttpStatus.BAD_REQUEST),
    ;

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;
}