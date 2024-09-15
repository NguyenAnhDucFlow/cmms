package com.anhduc.backend.service;

import com.anhduc.backend.dto.request.StoreCreationRequest;
import com.anhduc.backend.dto.response.StoreResponse;
import com.anhduc.backend.entity.Store;
import com.anhduc.backend.repository.StoreRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class StoreService {

    StoreRepository storeRepository;
    ModelMapper modelMapper;

    public StoreResponse create(StoreCreationRequest request) {
        Store store = modelMapper.map(request, Store.class);
        store = storeRepository.save(store);
        return modelMapper.map(store, StoreResponse.class);
    }

    public List<StoreResponse> findAll() {
        return storeRepository.findAll().stream()
                .map(this::convertToResponse)
                .toList();
    }

    private StoreResponse convertToResponse(Store store) {
        return modelMapper.map(store, StoreResponse.class);
    }

}
