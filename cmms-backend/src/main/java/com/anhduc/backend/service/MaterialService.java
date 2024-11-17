package com.anhduc.backend.service;

import com.anhduc.backend.dto.ListMaterialImportDTO;
import com.anhduc.backend.dto.MaterialDetailDTO;
import com.anhduc.backend.dto.MaterialFilterDTO;
import com.anhduc.backend.dto.request.MaterialCreationRequest;
import com.anhduc.backend.dto.request.MaterialUpdateRequest;
import com.anhduc.backend.dto.response.ListStoreMaterialResponse;
import com.anhduc.backend.dto.response.MaterialResponse;
import com.anhduc.backend.entity.*;
import com.anhduc.backend.exception.AppException;
import com.anhduc.backend.exception.ErrorCode;
import com.anhduc.backend.repository.*;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class MaterialService {

    MaterialRepository materialRepository;
    ModelMapper modelMapper;
    S3StorageService s3StorageService;
    CategoryRepository categoryRepository;
    BrandRepository brandRepository;
    UnitRepository unitRepository;
    StoreRepository storeRepository;
    StoreMaterialRepository storeMaterialRepository;
    CentralWarehouseRepository centralWarehouseRepository;

    @Transactional
    public MaterialResponse create(MaterialCreationRequest request) throws IOException {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_EXISTED));
        Brand brand = brandRepository.findById(request.getBrandId())
                .orElseThrow(() -> new AppException(ErrorCode.BRAND_NOT_EXISTED));
        Unit basicUnit = unitRepository.findById(request.getBasicUnitId()).orElseThrow(
                () -> new AppException(ErrorCode.UNIT_NOT_EXISTED)
        );
        String materialCode = generateMaterialCode();
        Material material = Material.builder()
                .name(request.getName())
                .materialCode(materialCode)
                .isActive(true)
                .barcode(request.getBarcode())
                .category(category)
                .brand(brand)
                .basicUnit(basicUnit)
                .costPrice(request.getCostPrice())
                .salePrice(request.getSalePrice())
                .isPoint(request.getIsPoint())
                .description(request.getDescription())
                .maxStock(request.getMaxStock())
                .minStock(request.getMinStock())
                .weightUnit(request.getWeightUnit())
                .weightValue(request.getWeightValue())
                .build();
        if (request.getMaterialUnitDtoList() != null && !request.getMaterialUnitDtoList().isEmpty()) {
            List<MaterialUnit> materialUnits = request.getMaterialUnitDtoList().stream().map(
                    materialUnitDto -> {
                        Unit unit = unitRepository.findById(materialUnitDto.getUnitId())
                                .orElseThrow(() -> new AppException(ErrorCode.UNIT_NOT_EXISTED));
                        String variantCode = materialCode + "_" +unit.getName().toUpperCase();
                        return MaterialUnit.builder()
                                .unit(unit)
                                .variantCode(variantCode)
                                .material(material)
                                .conversionRate(materialUnitDto.getConversionRate())
                                .salePrice(BigDecimal.valueOf(materialUnitDto.getPrice()))
                                .build();
                    }
            ).toList();
            material.setMaterialUnits(materialUnits);
        }
        List<String> images = new ArrayList<>();
        if (request.getImagesFile() != null && !request.getImagesFile().isEmpty()) {
            for (MultipartFile file : request.getImagesFile()) {
                String filename = file.getOriginalFilename();
                String extension = filename != null ? filename.substring(filename.lastIndexOf(".")) : null;
                String newFilename = UUID.randomUUID() + extension;
                String fileUrl = s3StorageService.uploadFile(newFilename, file);
                images.add(fileUrl);
                if (request.getCoverImageUrl() == null)
                    material.setCoverImageUrl(fileUrl);
            }
            material.setImages(images);
        }
        materialRepository.save(material);
        MaterialResponse materialResponse = modelMapper.map(material, MaterialResponse.class);
        materialResponse.setBrandName(material.getBrand().getName());
        materialResponse.setCategoryName(material.getCategory().getName());
        return materialResponse;
    }

    @Transactional
    public MaterialResponse update(MaterialUpdateRequest request) throws IOException {
        Material material = materialRepository.findById(request.getMaterialId()).orElseThrow(
                () -> new AppException(ErrorCode.MATERIAL_NOT_FOUND)
        );
        Store store = storeRepository.findById(request.getStoreId()).orElseThrow(
                () -> new AppException(ErrorCode.STORE_NOT_EXISTED)
        );
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_EXISTED));
        Brand brand = brandRepository.findById(request.getBrandId())
                .orElseThrow(() -> new AppException(ErrorCode.BRAND_NOT_EXISTED));

        material.setName(request.getName());
        material.setBarcode(request.getBarcode());
        material.setPoint(request.getIsPoint());
        material.setDescription(request.getDescription());
        material.setSalePrice(request.getSalePrice());
        material.setWeightUnit(request.getWeightUnit());
        material.setWeightValue(request.getWeightValue());
        material.setCategory(category);
        material.setBrand(brand);

        StoreMaterial storeMaterial = storeMaterialRepository
                .findByMaterialIdAndStoreId(request.getMaterialId(), request.getStoreId())
                        .orElseGet(
                                () -> {
                                    StoreMaterial newStoreMaterial = new StoreMaterial();
                                    newStoreMaterial.setMaterial(material);
                                    newStoreMaterial.setStore(store);
                                    return  storeMaterialRepository.save(newStoreMaterial);
                                }
                        );

        storeMaterial.setMaxStock(request.getMaxStock());
        storeMaterial.setMinStock(request.getMinStock());
        storeMaterialRepository.save(storeMaterial);

        List<String> images = new ArrayList<>();
        if (request.getImagesFile() != null && !request.getImagesFile().isEmpty()) {
            for (MultipartFile file : request.getImagesFile()) {
                String filename = file.getOriginalFilename();
                String extension = filename != null ? filename.substring(filename.lastIndexOf(".")) : null;
                String newFilename = UUID.randomUUID() + extension;
                String fileUrl = s3StorageService.uploadFile(newFilename, file);
                images.add(fileUrl);
                if (request.getCoverImageUrl() == null)
                    material.setCoverImageUrl(fileUrl);
            }
            material.setImages(images);
        } else {
            material.setCoverImageUrl(request.getCoverImageUrl());
            material.setImages(request.getImages());
        }

        materialRepository.save(material);
        MaterialResponse materialResponse = modelMapper.map(material, MaterialResponse.class);
        materialResponse.setBrandName(material.getBrand().getName());
        materialResponse.setCategoryName(material.getCategory().getName());
        return materialResponse;
    }

    public void updateMaterialStatus(UUID materialId, boolean isActive) {
        Material material = materialRepository.findById(materialId).orElseThrow(
                () -> new AppException(ErrorCode.MATERIAL_NOT_FOUND)
        );
        material.setIsActive(isActive);
        materialRepository.save(material);
    }

    public Page<ListStoreMaterialResponse> listMaterialsByCompanyWithFilters(MaterialFilterDTO filter) {
        PageRequest pageRequest = PageRequest.of(filter.getCurrentPage(), filter.getSize(), Sort.by("materialCode").descending());
        return materialRepository.listMaterialsByCompanyWithFilters(filter, pageRequest);
    }

    public Page<ListStoreMaterialResponse> listMaterialsByStoreWithFilters(MaterialFilterDTO filter) {
        PageRequest pageRequest = PageRequest.of(filter.getCurrentPage(), filter.getSize(), Sort.by("materialCode").descending());
        return materialRepository.listMaterialsByStoreWithFilters(filter, pageRequest);
    }

    public MaterialDetailDTO findMaterialDetailByStore(UUID materialId, UUID storeId) {
        Optional<StoreMaterial> storeMaterialOpt = storeMaterialRepository.findByMaterialIdAndStoreId(materialId, storeId);

        if (storeMaterialOpt.isPresent()) {
            StoreMaterial storeMaterial = storeMaterialOpt.get();
            Material material = storeMaterial.getMaterial();

            return new MaterialDetailDTO(
                    material.getId(),
                    material.getMaterialCode(),
                    material.getName(),
                    material.getBarcode(),
                    material.getCostPrice(),
                    material.getSalePrice(),
                    material.getImages(),
                    material.getWeightValue(),
                    material.getWeightUnit(),
                    material.getDescription(),
                    material.getCoverImageUrl(),
                    material.isPoint(),
                    material.getIsActive(),
                    material.getBasicUnit().getName(),
                    material.getCategory().getName(),
                    material.getBrand().getName(),
                    storeMaterial.getMinStock() >= 0 ? storeMaterial.getMinStock() : material.getMinStock(),
                    storeMaterial.getMaxStock() >= 0 ? storeMaterial.getMaxStock() : material.getMaxStock()
            );
        } else {
            Material material = materialRepository.findById(materialId)
                    .orElseThrow(() -> new AppException(ErrorCode.MATERIAL_NOT_FOUND));

            return new MaterialDetailDTO(
                    material.getId(),
                    material.getMaterialCode(),
                    material.getName(),
                    material.getBarcode(),
                    material.getCostPrice(),
                    material.getSalePrice(),
                    material.getImages(),
                    material.getWeightValue(),
                    material.getWeightUnit(),
                    material.getDescription(),
                    material.getCoverImageUrl(),
                    material.isPoint(),
                    material.getIsActive(),
                    material.getBasicUnit().getName(),
                    material.getCategory().getName(),
                    material.getBrand().getName(),
                    material.getMinStock(),
                    material.getMaxStock()
            );
        }
    }


    public List<ListMaterialImportDTO> getAllMaterialsForImport() {
        List<Material> materials = materialRepository.findAll();
        List<ListMaterialImportDTO> materialDTOs = new ArrayList<>();

        for (Material material : materials) {
            // Lấy tổng tồn kho từ CentralWarehouse
            double totalQuantity = centralWarehouseRepository
                    .findByMaterialId(material.getId())
                    .stream()
                    .mapToDouble(CentralWarehouse::getQuantity)
                    .sum();

            if (material.getBasicUnit() != null) {
                ListMaterialImportDTO baseUnitDto = new ListMaterialImportDTO(
                        material.getMaterialCode(),
                        material.getName(),
                        material.getCoverImageUrl(),
                        material.getCostPrice(),
                        totalQuantity,
                        material.getBasicUnit().getName()
                );
                materialDTOs.add(baseUnitDto);
            }

            if (material.getMaterialUnits() != null && !material.getMaterialUnits().isEmpty()) {
                for (MaterialUnit variant : material.getMaterialUnits()) {
                    ListMaterialImportDTO variantDto = new ListMaterialImportDTO(
                            variant.getVariantCode(),
                            material.getName(),
                            material.getCoverImageUrl(),
                            variant.getCostPrice(),
                            totalQuantity,
                            variant.getUnit().getName()
                    );
                    materialDTOs.add(variantDto);
                }
            }
        }

        return materialDTOs;
    }



    //-------------------- PRIVATE METHOD ---------------------------------

    private String generateMaterialCode() {
        String prefix = "SP";
        String lastCode = materialRepository.findMaxMaterialCodeWithPrefix(prefix);
        int nextNumber = 1;
        if (lastCode != null) {
            String lastNumberStr = lastCode.replace(prefix, "");
            nextNumber = Integer.parseInt(lastNumberStr) + 1;
        }
        return  prefix + String.format("%04d", nextNumber);
    }

}
