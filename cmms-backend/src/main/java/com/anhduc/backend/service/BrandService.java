package com.anhduc.backend.service;

import com.anhduc.backend.dto.request.BrandCreationRequest;
import com.anhduc.backend.dto.response.BrandCreationResponse;
import com.anhduc.backend.entity.Brand;
import com.anhduc.backend.repository.BrandRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class BrandService {

    BrandRepository brandRepository;
    ModelMapper modelMapper;

    public BrandCreationResponse create(BrandCreationRequest request) {
        Brand brand = modelMapper.map(request, Brand.class);
        return modelMapper.map(brandRepository.save(brand), BrandCreationResponse.class);
    }

    public List<BrandCreationResponse> findAll() {
        return brandRepository.findAll().stream()
                .map(this::convertToResponse)
                .toList();
    }

    private BrandCreationResponse convertToResponse(Brand brand) {
        return modelMapper.map(brand, BrandCreationResponse.class);
    }

}
