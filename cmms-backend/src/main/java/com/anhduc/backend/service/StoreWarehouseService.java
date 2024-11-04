package com.anhduc.backend.service;

import com.anhduc.backend.dto.MaterialFilterDTO;
import com.anhduc.backend.dto.response.ListStoreMaterialResponse;
import com.anhduc.backend.repository.StoreWarehouseRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class StoreWarehouseService {

    StoreWarehouseRepository storeWarehouseRepository;

    public Page<ListStoreMaterialResponse> listMaterialsByStoreWithFilters(MaterialFilterDTO filter) {
        PageRequest pageRequest = PageRequest.of(filter.getCurrentPage(), filter.getSize());
        return storeWarehouseRepository.listMaterialsByStoreWithFilters(filter, pageRequest);
    }
}
