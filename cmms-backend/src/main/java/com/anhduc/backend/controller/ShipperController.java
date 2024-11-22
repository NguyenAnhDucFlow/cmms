package com.anhduc.backend.controller;

import com.anhduc.backend.dto.response.ApiResponse;
import com.anhduc.backend.dto.response.ShipperResponse;
import com.anhduc.backend.enums.ShipperStatus;
import com.anhduc.backend.service.ShipperService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/shipper")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ShipperController {

    ShipperService shipperService;

    @GetMapping("/{status}")
    ApiResponse<List<ShipperResponse>> getAllRoles(@PathVariable ShipperStatus status) {
        return ApiResponse.<List<ShipperResponse>>builder()
                .data(shipperService.search(status)).build();
    }
}
