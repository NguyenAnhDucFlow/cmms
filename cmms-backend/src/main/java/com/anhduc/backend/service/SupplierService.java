package com.anhduc.backend.service;

import com.anhduc.backend.dto.request.SupplierCreationRequest;
import com.anhduc.backend.dto.response.SupplierResponse;
import com.anhduc.backend.entity.Supplier;
import com.anhduc.backend.repository.SupplierRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class SupplierService {

    SupplierRepository supplierRepository;
    ModelMapper modelMapper;

    public SupplierResponse create(SupplierCreationRequest request) {
        Supplier supplier = modelMapper.map(request, Supplier.class);
        supplier = supplierRepository.save(supplier);
        return modelMapper.map(supplier, SupplierResponse.class);
    }

    public List<SupplierResponse> findAll() {
        return supplierRepository.findAll().stream()
                .map(this::convertToResponse)
                .toList();
    }

    private SupplierResponse convertToResponse(Supplier supplier) {
        return modelMapper.map(supplier, SupplierResponse.class);
    }

}
