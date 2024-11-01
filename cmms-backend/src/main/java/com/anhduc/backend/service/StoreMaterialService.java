//package com.anhduc.backend.service;
//
//import com.anhduc.backend.entity.StoreMaterial;
//import com.anhduc.backend.exception.AppException;
//import com.anhduc.backend.exception.ErrorCode;
//import com.anhduc.backend.repository.StoreMaterialRepository;
//import lombok.AccessLevel;
//import lombok.RequiredArgsConstructor;
//import lombok.experimental.FieldDefaults;
//import org.springframework.stereotype.Service;
//
//import java.util.UUID;
//
//@Service
//@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
//@RequiredArgsConstructor
//public class StoreMaterialService {
//
//    StoreMaterialRepository storeMaterialRepository;
//
//    public void updateStoreMaterial(UUID storeId, UUID materialId, int minStock, int maxStock) {
//        StoreMaterial storeMaterial = storeMaterialRepository.findByStoreIdAndMaterialId(storeId, materialId)
//                .orElseThrow(() -> new AppException(ErrorCode.STORE_MATERIAL_NOT_FOUND));
//
//        storeMaterial.setMinStock(minStock);
//        storeMaterial.setMaxStock(maxStock);
//
//        storeMaterialRepository.save(storeMaterial);
//    }
//}