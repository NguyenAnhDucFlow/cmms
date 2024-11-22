package com.anhduc.backend.service;

import com.anhduc.backend.dto.response.ShipperResponse;
import com.anhduc.backend.entity.Shipper;
import com.anhduc.backend.enums.ShipperStatus;
import com.anhduc.backend.repository.ShipperRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ShipperService {

    ShipperRepository shipperRepository;
    ModelMapper modelMapper;

    public List<ShipperResponse> search(
            ShipperStatus status
            ) {
        return shipperRepository.findByStatusOrAll(status).stream()
                .map(this::convertToResponse)
                .toList();
    }
    private ShipperResponse convertToResponse(Shipper shipper) {
        return modelMapper.map(shipper, ShipperResponse.class);
    }
}
